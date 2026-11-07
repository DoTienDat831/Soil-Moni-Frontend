import Icon from "./Icon";

export function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark"><Icon name="sprout" size={23} /></span>
      <span>Soil Monitor</span>
    </div>
  );
}

export function Avatar({ initials = "AL", size = "normal" }) {
  return (
    <span className={`avatar ${size === "small" ? "avatar-small" : size === "large" ? "avatar-large" : ""}`}>
      {initials}
    </span>
  );
}

export function StatusPill({ children = "Online" }) {
  return <span className="status-pill"><i />{children}</span>;
}

export function Intro({ title, subtitle, right = "Updated just now" }) {
  return (
    <div className="page-intro">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="updated-label"><i />{right}</div>
    </div>
  );
}

export function PageFooter() {
  return (
    <div className="page-footer">
      <span><Icon name="radio" size={13} />Live soil insights, one small space at a time.</span>
      <span>All readings synced</span>
    </div>
  );
}

export function FilterChip({ active, children, onClick }) {
  return (
    <button className={`filter-chip ${active ? "selected" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      className={`toggle ${checked ? "on" : ""}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}
