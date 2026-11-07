import Icon from "./Icon";
import { Avatar, StatusPill } from "./Shared";

export default function Header({ title }) {
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
        <Avatar />
      </div>
    </header>
  );
}
