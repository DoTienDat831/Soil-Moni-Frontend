import { useState } from "react";
import { useNavigate } from "react-router";
import Icon from "../components/Icon";
import { Brand } from "../components/Shared";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (isRegistering && !fullName.trim()) {
      setMessage("Enter your full name to create an account.");
      return;
    }
    if (isRegistering && !organization) {
      setMessage("Choose an organization or select Free User.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setMessage("Enter your email address and password to continue.");
      return;
    }
    if (isRegistering && password.length < 8) {
      setMessage("Use at least 8 characters for your password.");
      return;
    }
    if (isRegistering && password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }
    if (isRegistering) {
      setIsRegistering(false);
      setPassword("");
      setConfirmPassword("");
      setMessage(`Account details are ready${organization === "Free User" ? " as a Free User" : ` for ${organization}`}. Connect an authentication service to finish creating your account.`);
      return;
    }
    navigate("/overview");
  };

  const changeMode = () => {
    setIsRegistering((registering) => !registering);
    setMessage("");
  };

  return (
    <div className="login-page">
      <section className="login-visual">
        <Brand />
        <div className="visual-content">
          <div className="eyebrow"><span />Small space. Smarter growth.</div>
          <h1>Healthy soil.<br />A little more insight.</h1>
          <p>A closer look at the soil beneath your plant. Simple, real-time insights for a healthier growing space.</p>
          <PlantIllustration />
        </div>
        <div className="visual-footer"><span>SOIL FERTILITY MONITORING SYSTEM</span><Icon name="leaf" size={19} /></div>
      </section>
      <section className="login-form-side">
        <div className="secure-note"><Icon name="shield" size={17} />Your growing space, securely connected</div>
        <div className="login-form-wrap">
          <div className="login-icon"><Icon name="sprout" size={25} /></div>
          <h2>{isRegistering ? "Create your account." : "Welcome back."}</h2>
          <p className="login-subtitle">{isRegistering ? "Join Soil Monitor and grow with confidence." : "Login to see how your soil is doing today."}</p>
          <form onSubmit={submit}>
            {isRegistering && <><label htmlFor="full-name">Full name</label><div className="input-wrap"><Icon name="user" size={19} /><input id="full-name" type="text" autoComplete="name" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div></>}
            {isRegistering && <><label htmlFor="organization">Organization</label><div className="input-wrap register-select-wrap"><Icon name="grid" size={19} /><select id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} required><option value="" disabled>Select an organization</option><option value="GreenGrow Farm">GreenGrow Farm</option><option value="GreenGrow Research">GreenGrow Research</option><option value="Free User">Free User</option></select></div></>}
            <label htmlFor="email">Email</label>
            <div className="input-wrap"><Icon name="mail" size={19} /><input id="email" type="email" autoComplete="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <label htmlFor="password">Password</label>
            <div className="input-wrap"><Icon name="lock" size={19} /><input id="password" type={showPassword ? "text" : "password"} autoComplete={isRegistering ? "new-password" : "current-password"} placeholder={isRegistering ? "Create a password (8+ characters)" : "Enter your password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={isRegistering ? 8 : undefined} /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Show or hide password"><Icon name={showPassword ? "eye" : "eyeOff"} size={20} /></button></div>
            {isRegistering ? <><label htmlFor="confirm-password">Confirm password</label><div className="input-wrap"><Icon name="lock" size={19} /><input id="confirm-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Enter your password again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div></> : <div className="login-options">
              <label className="remember-option"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /><span />Remember me</label>
              <button type="button" className="text-button" onClick={() => setMessage("Password reset is a demo feature and is not connected to a backend.")}>Forgot password</button>
            </div>}
            {message && <p className="form-message">{message}</p>}
            <button className="login-submit" type="submit">{isRegistering ? "Create account" : "Login"} <Icon name="arrow" size={19} /></button>
          </form>
          <p className="auth-switch">{isRegistering ? "Already have an account?" : "Don't have an account?"} <button type="button" className="text-button" onClick={changeMode}>{isRegistering ? "Login" : "Register"}</button></p>
          <div className="login-tagline"><i />One small space. Always in view.</div>
        </div>
        <div className="login-bottom"><span>© 2026 Soil Monitor</span><span>Need help? Contact support</span></div>
      </section>
    </div>
  );
}

