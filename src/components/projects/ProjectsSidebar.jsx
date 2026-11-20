import Icon from "../Icon";
import { Brand } from "../Shared";

export default function ProjectsSidebar({ collapsed, onToggle, displayName, initials, onSettings, onMessages, onSignOut }) {
  return (
    <aside className="projects-sidebar">
      <div className="projects-brand-row">
        <Brand />
        <button type="button" className="sidebar-toggle" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <Icon name="menu" size={18} />
        </button>
      </div>
      <div className="projects-nav-label">WORKSPACE</div>
      <button className="projects-nav" onClick={onSettings}><Icon name="settings" />Setting</button>
      <button className="projects-nav" onClick={onMessages}><Icon name="mail" />Messages</button>
      <div className="projects-sidebar-bottom">
        <div className="projects-profile"><span>{initials}</span><strong>{displayName}</strong></div>
        <button className="projects-nav signout" onClick={onSignOut}><Icon name="x" />Sign out</button>
      </div>
    </aside>
  );
}
