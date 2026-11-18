import { useState } from "react";
import { useNavigate } from "react-router";
import Icon from "../components/Icon";
import { Brand } from "../components/Shared";
import { apiRequest } from "../services/api";

function PlantIllustration() {
  return (
    <div className="plant-illustration" aria-hidden="true">
      <div className="plant-orbit" />
      <div className="plant-ground" />
      <svg viewBox="0 0 430 390" className="plant-svg">
        <ellipse cx="214" cy="344" rx="116" ry="13" fill="#c7ddc9" />
        <path d="M151 238h128l-20 104q-2 10-13 10h-61q-11 0-14-10Z" fill="#dce9c9" />
        <path d="M151 238h128l-4 25H155Z" fill="#f4f7e8" />
        <ellipse cx="215" cy="240" rx="53" ry="6" fill="#a99579" />
        <path d="M215 240V102" stroke="#277750" strokeWidth="9" strokeLinecap="round" />
        <path d="M214 177C159 175 126 139 132 92c48-2 78 25 82 85Z" fill="#247a54" />
        <path d="M216 145c-2-58 31-103 91-98 2 54-30 95-91 98Z" fill="#5b9b67" />
        <path d="M214 176c-20-31-41-48-67-61" stroke="#247a54" strokeWidth="2" fill="none" opacity=".5" />
      </svg>
      <div className="plant-stat"><Icon name="droplet" size={20} /><div><strong>65%</strong><span>Moisture · Normal</span></div></div>
      <div className="plant-status"><Icon name="sprout" size={17} />Growing well</div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [form, setForm] = useState({ username: "", fullName: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  async function submit(event) {
    event.preventDefault(); setMessage("");
    if (registering && form.password !== form.confirmPassword) { setMessage("Mật khẩu xác nhận không khớp."); return; }
    setBusy(true);
    try {
      if (registering) {
        await apiRequest("/auth/register", { method: "POST", body: { username: form.username.trim(), email: form.email.trim(), password: form.password, fullName: form.fullName.trim() } });
        setRegistering(false); setForm({ ...form, password: "", confirmPassword: "" });
        setMessage("Tạo tài khoản thành công. Hãy đăng nhập.");
      } else {
        const user = await apiRequest("/auth/login", { method: "POST", body: { email: form.email.trim(), password: form.password } });
        sessionStorage.setItem("soilMonitorUser", JSON.stringify(user));
        navigate("/overview");
      }
    } catch (error) { setMessage(error.message || "Không thể kết nối máy chủ."); }
    finally { setBusy(false); }
  }

  return <div className="login-page"><section className="login-visual"><Brand /><div className="visual-content"><div className="eyebrow"><span />Small space. Smarter growth.</div><h1>Healthy soil.<br />A little more insight.</h1><p>A closer look at the soil beneath your plant. Simple, real-time insights for a healthier growing space.</p><PlantIllustration /></div><div className="visual-footer"><span>SOIL FERTILITY MONITORING SYSTEM</span><Icon name="leaf" size={19} /></div></section><section className="login-form-side"><div className="secure-note"><Icon name="shield" size={17} />Soil Monitor account</div><div className="login-form-wrap"><div className="login-icon"><Icon name="sprout" size={25} /></div><h2>{registering ? "Create your account." : "Welcome back."}</h2><p className="login-subtitle">{registering ? "Enter your details to get started." : "Login with your email and password."}</p><form onSubmit={submit}>
    {registering && <><label htmlFor="username">Username</label><div className="input-wrap"><Icon name="user" size={19} /><input id="username" name="username" autoComplete="username" maxLength={100} required value={form.username} onChange={update} placeholder="Choose a username" /></div><label htmlFor="fullName">Full name</label><div className="input-wrap"><Icon name="user" size={19} /><input id="fullName" name="fullName" autoComplete="name" maxLength={200} value={form.fullName} onChange={update} placeholder="Your name" /></div></>}
    <label htmlFor="email">Email</label><div className="input-wrap"><Icon name="mail" size={19} /><input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update} placeholder="you@example.com" /></div><label htmlFor="password">Password</label><div className="input-wrap"><Icon name="lock" size={19} /><input id="password" name="password" type="password" autoComplete={registering ? "new-password" : "current-password"} minLength={registering ? 8 : undefined} maxLength={100} required value={form.password} onChange={update} placeholder={registering ? "At least 8 characters" : "Your password"} /></div>
    {registering && <><label htmlFor="confirmPassword">Confirm password</label><div className="input-wrap"><Icon name="lock" size={19} /><input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required value={form.confirmPassword} onChange={update} placeholder="Enter password again" /></div></>}
    {message && <p className="form-message" role="status">{message}</p>}<button className="login-submit" type="submit" disabled={busy}>{busy ? "Đang xử lý…" : registering ? "Create account" : "Login"} <Icon name="arrow" size={19} /></button></form><p className="auth-switch">{registering ? "Already have an account?" : "Don't have an account?"} <button type="button" className="text-button" onClick={() => { setRegistering(!registering); setMessage(""); }}>{registering ? "Login" : "Register"}</button></p></div></section></div>;
}
