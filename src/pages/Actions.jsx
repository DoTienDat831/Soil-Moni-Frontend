import Icon from "../components/Icon";
import { Intro, PageFooter } from "../components/Shared";

const actions = [
  { id: 1, type: "Watering", icon: "droplet", plot: "Raised bed A", detail: "Tomatoes · 4 L", time: "Today · 08:30 AM", tone: "water" },
  { id: 2, type: "Fertilizing", icon: "sprout", plot: "Raised bed C", detail: "Carrots · Organic compost", time: "Yesterday · 04:15 PM", tone: "fertilize" },
  { id: 3, type: "Pest treatment", icon: "shield", plot: "Raised bed D", detail: "Herbs · Neem spray", time: "Nov 5 · 09:10 AM", tone: "treat" },
  { id: 4, type: "Watering", icon: "droplet", plot: "Raised bed F", detail: "Beans · 3 L", time: "Nov 4 · 07:45 AM", tone: "water" },
  { id: 5, type: "Fertilizing", icon: "sprout", plot: "Raised bed B", detail: "Leafy greens · Liquid feed", time: "Nov 2 · 05:20 PM", tone: "fertilize" },
  { id: 6, type: "Pest treatment", icon: "shield", plot: "Raised bed H", detail: "Squash · Insecticidal soap", time: "Oct 31 · 10:00 AM", tone: "treat" },
];

export default function Actions() {
  return (
    <>
      <Intro title="Garden actions." subtitle="A log of care given to each growing plot." right="Example activity log" />
      <section className="panel actions-panel" aria-labelledby="actions-title">
        <div className="actions-heading">
          <div><div className="garden-eyebrow"><Icon name="clock" size={14} /> CARE HISTORY</div><h3 id="actions-title">Recent actions</h3><p>Track watering, treatments, and feeding across your garden.</p></div>
          <span className="actions-count">{actions.length} entries</span>
        </div>
        <div className="actions-list">
          {actions.map((action) => (
            <article className="action-log-row" key={action.id}>
              <span className={`action-log-icon action-${action.tone}`}><Icon name={action.icon} size={18} /></span>
              <div className="action-log-main"><strong>{action.type}</strong><span>{action.plot} <i>·</i> {action.detail}</span></div>
              <time>{action.time}</time>
            </article>
          ))}
        </div>
        <p className="actions-disclaimer"><Icon name="info" size={14} /> Sample entries shown. Connect a backend to record real garden actions.</p>
      </section>
      <PageFooter />
    </>
  );
}
