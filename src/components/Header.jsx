import { useState } from "react";
import { useNavigate } from "react-router";
import Icon from "./Icon";
import { Avatar, StatusPill } from "./Shared";
import { clearAuth } from "../services/auth";

export default function Header({ title }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();
  let user = null;
  try { user = JSON.parse(sessionStorage.getItem("soilMonitorUser") || "null"); } catch { /* Ignore invalid cached profile data. */ }
  const name = user?.fullName || user?.username || "Account";
  const initials = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  function signOut() {
    clearAuth();
    navigate("/login", { replace: true });
  }

  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>Wednesday, November 4, 2026 <span>·</span> 10:42 AM</p>
      </div>

      <div className="topbar-actions">
        <StatusPill />
        <span className="topbar-divider" />
        <button className="icon-button" aria-label="Notifications">
          <Icon name="bell" size={21} />
        </button>
        <div className="account-menu-wrap">
          <button className="account-avatar-button" type="button" aria-label="Open account menu" aria-expanded={accountOpen} onClick={() => setAccountOpen((open) => !open)}>
            <Avatar initials={initials} />
          </button>
          {accountOpen && <div className="account-menu" role="menu">
            <div className="account-menu-name">{name}</div>
            <button type="button" role="menuitem" onClick={signOut}><Icon name="logout" size={17} />Sign out</button>
          </div>}
        </div>
      </div>
    </header>
  );
}
