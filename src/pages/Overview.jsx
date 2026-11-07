import Icon from "../components/Icon";
import AlertCard from "../components/AlertCard";
import { MetricCard } from "../components/MetricCard";
import { Intro, PageFooter } from "../components/Shared";

const gardenPlots = ["Tomatoes", "Leafy greens", "Carrots", "Herbs", "Peppers", "Beans", "Strawberries", "Squash"];

function WeatherCard() {
  return (
    <section className="panel metric-card weather-card">
      <div className="metric-top"><div className="metric-label"><Icon name="info" size={19} />Weather</div><span className="soft-pill weather-pending">No location</span></div>
      <div className="weather-value"><span className="weather-symbol">☁</span><strong>—</strong><small>°C</small></div>
      <p className="metric-range">Set a location to see local conditions</p>
    </section>
  );
}

function PlotHealth() {
  return (
    <section className="plot-health-section" aria-labelledby="plot-health-title">
      <div className="plot-health-heading"><div><h3 id="plot-health-title">Soil health by plot</h3><p>Individual health scores update when sensors are connected.</p></div><span className="health-waiting"><i /> Awaiting readings</span></div>
      <div className="plot-health-grid">
        {gardenPlots.map((crop, index) => (
          <article className="panel plot-health-card" key={crop}>
            <div className="plot-health-card-top"><span className="plot-health-icon"><Icon name="sprout" size={17} /></span><span>Plot {String(index + 1).padStart(2, "0")}</span></div>
            <strong className="plot-health-score">0<small>/100</small></strong>
            <div className="plot-health-track"><i /></div>
            <div className="plot-health-meta"><span>{crop}</span><small>No readings</small></div>
          </article>
        ))}
      </div>
    </section>
  );
}

const recentRows = [
  ["10:42 AM", "6.5", "65%", "27°C", "120 / 45 / 180"],
  ["10:37 AM", "6.5", "65%", "27°C", "120 / 45 / 180"],
  ["10:32 AM", "6.5", "64%", "26.9°C", "119 / 45 / 180"],
  ["10:27 AM", "6.4", "64%", "26.8°C", "119 / 44 / 179"],
];

function RecentReadings() {
  return (
    <section className="panel table-panel">
      <div className="panel-title-row"><h3>Recent Readings</h3><span>Every 5 minutes</span></div>
      <div className="table-scroll">
        <table className="data-table">
          <thead><tr><th>Time</th><th>pH</th><th>Moisture</th><th>Temp</th><th>N / P / K · mg/kg</th><th /></tr></thead>
          <tbody>
            {recentRows.map((r, i) => (
              <tr key={r[0]}>
                {r.map((cell, j) => <td key={j}>{cell}{i === 0 && j === 0 ? <i className="row-live-dot" /> : null}</td>)}
                <td><Icon name="checkCircle" size={15} className="success-icon" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


export default function Overview() {
  return (
    <>
      <Intro title="A little check-in for your garden." subtitle="8 growing plots  ·  Environmental overview" />
      <div className="metric-grid">
        <MetricCard icon="grid" label="Garden plots" value="8" unit="beds" range="2 rows · 4 plots per row" status="Garden" />
        <MetricCard icon="droplet" label="Soil moisture" value="0" unit="%" range="Average across all plots" status="No data" />
        <MetricCard icon="thermometer" label="Ambient temperature" value="0" unit="°C" range="Local air temperature" status="No data" />
        <WeatherCard />
      </div>
      <div className="overview-bottom">
        <RecentReadings />
        <AlertCard />
      </div>
      <PlotHealth />
      <PageFooter />
    </>
  );
}
