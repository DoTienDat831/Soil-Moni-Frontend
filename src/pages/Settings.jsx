import { useState } from "react";
import Icon from "../components/Icon";
import { Avatar, Intro, PageFooter, Toggle } from "../components/Shared";

export default function Settings() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [unit, setUnit] = useState("°C");
  const [frequency, setFrequency] = useState("5 mins");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Alex Lee");
  const [notice, setNotice] = useState("");
  const saveName = () => { setEditing(false); setNotice("Profile updated."); };

  return (
    <>
      <Intro title="A little more personal." subtitle="Your account, alerts and preferences for one small growing space." right={<><Icon name="checkCircle" size={16} />All changes saved</>} />
      <div className="settings-grid">
        <section className="panel settings-card profile-card">
          <div className="settings-card-head"><div><h3>Profile &amp; Account</h3><p>The personal side of your growing space.</p></div><Icon name="user" size={22} /></div>
          <div className="profile-main">
            <Avatar size="large" />
            <div className="profile-copy">
              {editing ? <input value={name} onChange={(e) => setName(e.target.value)} aria-label="Profile name" /> : <strong>{name}</strong>}
              <span>alex.lee@email.com</span>
            </div>
            <button className="outline-button" onClick={() => editing ? saveName() : setEditing(true)}>{editing ? "Save" : "Edit Profile"}</button>
          </div>
          <div className="profile-foot"><Icon name="shield" size={17} />Personal workspace · Indoor planter</div>
          {notice && <p className="inline-notice">{notice}</p>}
        </section>
        <section className="panel settings-card notifications-card">
          <div className="settings-card-head"><div><h3>Notifications</h3><p>Stay informed when your soil needs attention.</p></div><Icon name="bell" size={22} /></div>
          <div className="setting-row">
            <div><strong>Push Notifications</strong><p>Get instant alerts when moisture, temperature or pH exceed safe levels.</p></div>
            <Toggle checked={push} onChange={setPush} label="Push Notifications" />
          </div>
          <div className="setting-row">
            <div><strong>Email Alerts</strong><p>Receive the same soil alerts in your inbox.</p></div>
            <Toggle checked={email} onChange={setEmail} label="Email Alerts" />
          </div>
        </section>
        <section className="panel settings-card device-network-card">
          <div className="settings-card-head"><div><h3>Device &amp; Network</h3><p>Keep your indoor planter connected.</p></div><Icon name="wifi" size={23} /></div>
          <div className="wifi-row">
            <span className="wifi-bubble"><Icon name="wifi" size={23} /></span>
            <div><small>Wi-Fi network</small><strong>Home_Wi-Fi_2.4G</strong><span>2.4 GHz · Excellent signal</span></div>
            <span className="connected-pill"><i />Connected</span>
          </div>
          <div className="sync-row">
            <div><strong>Data Sync Frequency</strong><p>How often new soil readings are synced.</p></div>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option>5 mins</option><option>15 mins</option><option>1 hour</option>
            </select>
          </div>
          <div className="last-sync"><Icon name="refresh" size={16} />Last synced today at 10:42 AM</div>
        </section>
        <section className="panel settings-card units-card">
          <div className="settings-card-head"><div><h3>Measurement Units</h3><p>Familiar units. Clearer soil insights.</p></div><Icon name="ruler" size={22} /></div>
          <div className="unit-row">
            <div><strong>Temperature</strong><p>Used across your dashboard and alerts.</p></div>
            <div className="segmented">
              {["°C", "°F"].map((u) => <button key={u} className={unit === u ? "selected" : ""} onClick={() => setUnit(u)}>{u}</button>)}
            </div>
          </div>
          <div className="unit-row npk-unit-row">
            <div><strong>NPK</strong><p>Nitrogen, phosphorus and potassium.</p></div>
            <span className="locked-unit">mg/kg <Icon name="lock" size={15} /></span>
          </div>
          <div className="info-note"><Icon name="info" size={16} />NPK is locked to mg/kg to keep nutrient readings consistent.</div>
        </section>
      </div>
      <PageFooter />
    </>
  );
}
