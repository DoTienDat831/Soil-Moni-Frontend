import Icon from "../components/Icon";
import { Intro, PageFooter, StatusPill } from "../components/Shared";

const logs = [
  ["10:42:00 AM", "Transmission", "Packet sent success", "20ms"],
  ["10:41:30 AM", "Network ping", "Ping acknowledged", "19ms"],
  ["10:37:00 AM", "Transmission", "Packet sent success", "21ms"],
  ["10:36:30 AM", "Network ping", "Ping acknowledged", "20ms"],
  ["10:32:00 AM", "Transmission", "Packet sent success", "20ms"],
  ["10:31:30 AM", "Network ping", "Ping acknowledged", "18ms"],
];

export default function SensorMonitoring() {
  return (
    <>
      <Intro title="One sensor. Everything connected." subtitle="Indoor planter  ·  Single measuring point" />
      <div className="sensor-top-grid">
        <section className="panel connection-card">
          <div className="panel-title-row"><h3>Connection Status</h3><StatusPill /></div>
          <div className="connection-main">
            <span className="connection-icon"><Icon name="radio" size={23} /></span>
            <div><strong>Connected and reporting</strong><p>One station · Indoor planter</p></div>
          </div>
          <div className="connection-detail"><Icon name="wifi" size={18} /><span>Signal Strength: Excellent</span><Icon name="signal" size={24} className="signal-bars" /></div>
          <div className="connection-detail"><Icon name="plug" size={18} /><span>Power: 100% Plugged in</span></div>
          <div className="connection-last"><Icon name="clock" size={15} />Last transmission today at 10:42 AM</div>
        </section>
        <section className="panel device-card">
          <div className="panel-title-row"><h3>Device Info</h3><span>Single sensor assembly</span></div>
          <h2>4-in-1 Smart Soil Sensor</h2>
          <p>Four sensing modules. One common measuring point.</p>
          <div className="module-grid">
            {[
              ["flask", "pH module"], ["droplet", "Moisture module"],
              ["thermometer", "Temp module"], ["sprout", "NPK module"],
            ].map(([icon, label]) => <div className="module-item" key={label}><Icon name={icon} size={19} /><span>{label}</span><b><Icon name="checkCircle" size={15} />Active</b></div>)}
          </div>
        </section>
      </div>
      <div className="sensor-bottom-grid">
        <section className="panel log-card">
          <div className="panel-title-row"><h3>Data Log</h3><span>Today · November 4</span></div>
          <p className="panel-description">Recent network pings and soil data transmissions.</p>
          <div className="table-scroll">
            <table className="data-table log-table">
              <thead><tr><th>Time</th><th>Type</th><th>Event</th><th>Latency</th><th /></tr></thead>
              <tbody>{logs.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}<td><Icon name="checkCircle" size={15} className="success-icon" /></td></tr>)}</tbody>
            </table>
          </div>
          <div className="log-foot"><i />All packets delivered · Latest latency 20ms</div>
        </section>
        <section className="panel system-alerts-card">
          <div className="panel-title-row"><h3>System Alerts</h3><span className="count-badge">0</span></div>
          <div className="system-alert-item">
            <span className="alert-icon"><Icon name="shield" size={22} /></span>
            <div><strong>No hardware issues detected</strong><p>All four sensing modules are active and reporting as expected.</p></div>
          </div>
          <div className="system-alert-item">
            <span className="alert-icon"><Icon name="radio" size={22} /></span>
            <div><strong>Connection is stable</strong><p>Your station is connected. No interrupted transmissions detected.</p></div>
          </div>
          <div className="alert-foot"><Icon name="clock" size={15} />Last checked today at 10:42 AM</div>
        </section>
      </div>
      <PageFooter />
    </>
  );
}

