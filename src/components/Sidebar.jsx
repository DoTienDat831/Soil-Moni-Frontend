import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Icon from "./Icon";
import { Avatar, Brand } from "./Shared";


export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  let activeGarden = null;
  const [gardens, setGardens] = useState(() => {
    try { return JSON.parse(localStorage.getItem("soilMonitorGardens") || "[]"); } catch { return []; }
  });
  try { activeGarden = JSON.parse(sessionStorage.getItem("soilMonitorActiveGarden") || "null"); } catch { /* Ignore invalid cached garden data. */ }
  useEffect(() => {
    const refreshGardens = () => {
      try { setGardens(JSON.parse(localStorage.getItem("soilMonitorGardens") || "[]")); } catch { setGardens([]); }
    };
    window.addEventListener("soil-monitor:gardens-updated", refreshGardens);
    return () => window.removeEventListener("soil-monitor:gardens-updated", refreshGardens);
  }, []);
  const gardenView = location.pathname.startsWith("/garden/") && activeGarden;
  const navItems = gardenView ? [
    { to: `/garden/${activeGarden.id}/map`, label: "Garden Map", icon: "sprout" },
    { to: `/garden/${activeGarden.id}/actions`, label: "Actions", icon: "clock" },
    { to: `/garden/${activeGarden.id}/analytics`, label: "Analytics", icon: "chart" },
    { to: `/garden/${activeGarden.id}/settings`, label: "Settings", icon: "settings" },
  ] : [
    { to: "/overview", label: "Overview", icon: "grid" },
    { to: "/sensors", label: "Sensor Monitoring", icon: "radio" },
    { to: "/search", label: "Search", icon: "search" },
    { to: "/settings", label: "Settings", icon: "settings" },
  ];
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
        >{collapsed ? ">" : "<"}</button>
      </div>

      {gardenView && <Link className={`GardenName ${collapsed ? "garden-home-collapsed" : ""}`} to="/overview" aria-label="Back to gardens" title="Back to gardens">
        {collapsed ? <Icon name="home" size={18} /> : <>{activeGarden.name}<small>Back to gardens</small></>}
      </Link>}

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
      {!gardenView && <section className="sidebar-gardens">
        <div className="sidebar-gardens-heading"><span>Gardens</span><button type="button" title="Create garden" onClick={() => window.dispatchEvent(new Event("soil-monitor:create-garden"))}>+</button></div>
        {gardens.map((garden) => <Link key={garden.id} className="sidebar-garden-link" to={`/garden/${garden.id}/map`} onClick={() => sessionStorage.setItem("soilMonitorActiveGarden", JSON.stringify(garden))}><Icon name="sprout" size={16} />{!collapsed && garden.name}</Link>)}
      </section>}

      <div className="sidebar-bottom">

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
