import { NavLink } from "react-router";
import Icon from "./Icon";
import { Avatar, Brand } from "./Shared";

const navItems = [
  { to: "/overview", label: "Overview", icon: "grid" },
  { to: "/garden", label: "Garden Map", icon: "sprout" },
  { to: "/analytics", label: "Analytics", icon: "chart" },
  { to: "/sensors", label: "Sensor Monitoring", icon: "radio" },
  { to: "/settings", label: "Settings", icon: "settings" },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? "is-collapsed" : ""}`}>
      <div className="sidebar-brand-row">
        <Brand />
        <button
          className="sidebar-toggle"
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Icon name="menu" size={18} />
        </button>
      </div>
      <div className="nav-section-label">Workspace</div>
      <nav className="side-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
          aria-label={item.label}
          title={collapsed ? item.label : undefined}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
            <span className="active-dot" />
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="grow-card">
          <Icon name="sprout" size={21} />
          <strong>My growing space</strong>
          <p>Eight garden beds, ready for soil readings.</p>
          <span className="live-line"><i /> Garden workspace</span>
        </div>
        <div className="sidebar-user">
          <Avatar initials="AL" />
          <div>
            <strong>Alex Lee</strong>
            <span>Personal workspace</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
