import { useState } from "react";
import Icon from "../components/Icon";
import SoilChart from "../components/SoilChart";
import { FilterChip, Intro, PageFooter } from "../components/Shared";

function AnalyticsChart({ title, value, unit, variant, selectedPeriod }) {
  const axis = variant === "ph" ? ["7.0", "6.75", "6.5", "6.25", "6.0"] :
    variant === "moisture" ? ["70", "65", "60", "55", "50"] :
    variant === "temp" ? ["30", "28", "26", "24", "22"] : ["200", "150", "100", "50", "0"];
  return (
    <section className="panel analytics-chart-card">
      <div className="analytics-card-head">
        <div><Icon name={variant === "ph" ? "flask" : variant === "moisture" ? "droplet" : variant === "temp" ? "thermometer" : "sprout"} size={19} /><strong>{title}</strong></div>
        <b>{value}{unit}</b>
      </div>
      <div className="chart-unit">{variant === "ph" ? "pH" : variant === "moisture" ? "%" : variant === "temp" ? "°C" : "mg/kg"}</div>
      <div className="analytics-plot">
        <div className="axis-labels">{axis.map((a) => <span key={a}>{a}</span>)}</div>
        <SoilChart variant={variant} />
      </div>
      <div className="analytics-chart-foot"><span>{selectedPeriod === "24 Hours" ? "Nov 3–4 · 24 hours" : selectedPeriod === "7 Days" ? "Oct 29–Nov 4 · 7 days" : "Oct 5–Nov 4 · 30 days"}</span><strong>Within ideal range</strong></div>
    </section>
  );
}

function SummaryCard({ title, values }) {
  return (
    <section className="panel summary-card">
      <h4>{title}</h4>
      <div className="summary-values">
        {values.slice(0, 3).map((v) => <div key={v[0]}><small>{v[0]}</small><strong>{v[1]}</strong></div>)}
      </div>
      <div className="summary-bottom"><span>N / P / K</span><strong>{values[3]?.[1] || "118.8 / 44.2 / 178.8 mg/kg"}</strong></div>
    </section>
  );
}

export default function Analytics() {
  const [period, setPeriod] = useState("24 Hours");
  const [visible, setVisible] = useState(["pH", "Moisture", "Temp", "NPK"]);
  const toggle = (p) => setVisible((old) => old.includes(p) ? old.filter((x) => x !== p) : [...old, p]);
  const charts = [
    { title: "pH", value: "6.5", unit: " pH", variant: "ph" },
    { title: "Moisture", value: "65", unit: "%", variant: "moisture" },
    { title: "Temp", value: "27", unit: "°C", variant: "temp" },
    { title: "NPK", value: "120 / 45 / 180", unit: " mg/kg", variant: "npk" },
  ];
  return (
    <>
      <Intro title="A closer look at your soil." subtitle="Indoor planter  ·  Single measuring point" />
      <div className="analytics-toolbar">
        <div className="period-filters">
          {["24 Hours", "7 Days", "30 Days"].map((p) => <FilterChip key={p} active={period === p} onClick={() => setPeriod(p)}>{p}</FilterChip>)}
        </div>
        <div className="parameter-filters">
          <span>Parameters</span>
          {charts.map((c) => <FilterChip key={c.title} active={visible.includes(c.title)} onClick={() => toggle(c.title)}>{c.title}</FilterChip>)}
        </div>
      </div>
      <div className="analytics-grid">
        {charts.filter((c) => visible.includes(c.title)).map((c) => <AnalyticsChart key={c.title} {...c} selectedPeriod={period} />)}
      </div>
      <div className="summary-heading"><h3>Data Summary</h3><span>Today · 00:00–10:42 AM</span></div>
      <div className="summary-grid">
        <SummaryCard title="Average" values={[["pH", "6.4 pH"], ["Moisture", "63.6%"], ["Temp", "26.3°C"], ["N / P / K", "118.8 / 44.2 / 178.8 mg/kg"]]} />
        <SummaryCard title="Highest" values={[["pH", "6.5 pH"], ["Moisture", "65%"], ["Temp", "27°C"], ["N / P / K", "120 / 45 / 180 mg/kg"]]} />
        <SummaryCard title="Lowest" values={[["pH", "6.3 pH"], ["Moisture", "62%"], ["Temp", "25.8°C"], ["N / P / K", "118 / 44 / 178 mg/kg"]]} />
      </div>
      <PageFooter />
    </>
  );
}
