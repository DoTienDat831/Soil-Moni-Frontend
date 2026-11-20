import { useState } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "../services/api";
import { saveAuth } from "../services/auth";

const emptyForm = { username: "", fullName: "", email: "", password: "", confirmPassword: "" };

export default function useAuthForm() {
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleMode() {
    setRegistering((current) => !current);
    setMessage("");
  }

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    if (registering && form.password !== form.confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    setBusy(true);
    try {
      if (registering) {
        await apiRequest("/auth/register", {
          method: "POST",
          body: { username: form.username.trim(), email: form.email.trim(), password: form.password, fullName: form.fullName.trim() },
        });
        setRegistering(false);
        setForm((current) => ({ ...current, password: "", confirmPassword: "" }));
        setMessage("Tạo tài khoản thành công. Hãy đăng nhập.");
      } else {
        const auth = await apiRequest("/auth/login", {
          method: "POST",
          body: { email: form.email.trim(), password: form.password },
        });
        saveAuth(auth.accessToken, auth.user);
        navigate("/overview", { replace: true });
      }
    } catch (error) {
      setMessage(error.message || "Không thể kết nối máy chủ.");
    } finally {
      setBusy(false);
    }
  }

  return { registering, form, message, busy, update, toggleMode, submit };
}
