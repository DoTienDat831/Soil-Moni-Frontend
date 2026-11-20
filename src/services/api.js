import { getAccessToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function apiRequest(path, options = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;

  const headers = new Headers(options.headers || {});
  const isPublicAuthRequest = /^\/auth\/(login|register)$/.test(normalizedPath);
  const accessToken = !isPublicAuthRequest ? getAccessToken() : null;
  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  let body = options.body;
  if (body && typeof body === "object" && !isFormData) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      data && typeof data === "object" && data.message
        ? data.message
        : `API request failed (${response.status})`;

    const error = new Error(message);
    error.status = response.status;
    if (response.status === 401 && accessToken) {
      sessionStorage.removeItem("soilMonitorAccessToken");
      sessionStorage.removeItem("soilMonitorUser");
      sessionStorage.removeItem("soilMonitorActiveGarden");
      window.location.assign("/login");
    }
    throw error;
  }

  return data;
}
