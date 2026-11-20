import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { apiRequest } from "../services/api";
import { clearAuth, getAccessToken, saveUser } from "../services/auth";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;
    const token = getAccessToken();

    if (!token) {
      setStatus("signed-out");
      return () => { active = false; };
    }

    apiRequest("/auth/me")
      .then((user) => {
        if (!active) return;
        saveUser(user);
        setStatus("signed-in");
      })
      .catch((error) => {
        if (!active) return;
        if (error.status === 401) {
          clearAuth();
          setStatus("signed-out");
        } else {
          setStatus("error");
        }
      });

    return () => { active = false; };
  }, []);

  if (status === "checking") return <div role="status" aria-live="polite">Đang kiểm tra đăng nhập…</div>;
  if (status === "error") {
    return <div role="alert">Không thể kiểm tra đăng nhập với máy chủ. Hãy thử tải lại trang.</div>;
  }
  if (status === "signed-out") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
