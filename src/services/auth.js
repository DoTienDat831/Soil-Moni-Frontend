const TOKEN_KEY = "soilMonitorAccessToken";
const USER_KEY = "soilMonitorUser";

export function getAccessToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function saveAuth(accessToken, user) {
  sessionStorage.setItem(TOKEN_KEY, accessToken);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem("soilMonitorActiveGarden");
}

export function saveUser(user) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}
