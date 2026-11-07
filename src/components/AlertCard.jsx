import Icon from "./Icon";

export default function AlertCard() {
  return (
    <section className="panel alerts-panel">
      <div className="panel-title-row">
        <h3>Alerts</h3>
        <span className="count-badge">0</span>
      </div>

      <div className="alert-content">
        <span className="alert-icon"><Icon name="shield" size={22} /></span>
        <div>
          <strong>All Parameters Normal</strong>
          <p>Your latest readings are within the recommended ranges. No action needed.</p>
        </div>
      </div>

      <div className="alert-foot">
        <Icon name="clock" size={15} />
        Last checked today at 10:42 AM
      </div>
    </section>
  );
}
