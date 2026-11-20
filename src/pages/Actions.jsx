import Icon from "../components/Icon";
import { Intro, PageFooter } from "../components/Shared";
import { gardenActions } from "../data/actions";

export default function Actions() {
  return (
    <>
      <Intro title="Garden actions." subtitle="A log of care given to each growing plot." right="Example activity log" />
      <section className="panel actions-panel" aria-labelledby="actions-title">
        <div className="actions-heading">
          <div><div className="garden-eyebrow"><Icon name="clock" size={14} /> CARE HISTORY</div><h3 id="actions-title">Recent actions</h3><p>Track watering, treatments, and feeding across your garden.</p></div>
          <span className="actions-count">{gardenActions.length} entries</span>
        </div>
        <div className="actions-list">
          {gardenActions.map((action) => (
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
