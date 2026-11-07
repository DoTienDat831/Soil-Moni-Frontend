import Icon from "./Icon";

export function MetricCard({ icon, label, value, unit, range, status = "Normal" }) {
  return (
    <section className="panel metric-card">
      <div className="metric-top">
        <div className="metric-label">
          <Icon name={icon} size={19} />
          {label}
        </div>
        <span className="soft-pill">{status}</span>
      </div>
      <div className="metric-value">
        {value}<small>{unit}</small>
      </div>
      <p className="metric-range">{range}</p>
    </section>
  );
}

export function NpkCard({ nitrogen = 120, phosphorus = 45, potassium = 180 }) {
  return (
    <section className="panel metric-card npk-card">
      <div className="metric-top">
        <div className="metric-label">
          <Icon name="sprout" size={19} />
          NPK
        </div>
        <span className="soft-pill">Normal</span>
      </div>
      <div className="npk-values">
        <div><small>N</small><strong>{nitrogen}</strong></div>
        <div><small>P</small><strong>{phosphorus}</strong></div>
        <div><small>K</small><strong>{potassium}</strong></div>
      </div>
      <div className="npk-unit">mg/kg</div>
      <p className="metric-range">N 100–150 · P 30–60 · K 150–200</p>
    </section>
  );
}
