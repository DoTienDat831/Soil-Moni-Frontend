import { useState } from "react";
import Icon from "../components/Icon";
import { Intro, PageFooter } from "../components/Shared";

const plots = Array.from({ length: 8 }, (_, index) => ({
  id: String(index + 1).padStart(2, "0"),
  name: `Raised bed ${String.fromCharCode(65 + index)}`,
  crop: ["Tomatoes", "Leafy greens", "Carrots", "Herbs", "Peppers", "Beans", "Strawberries", "Squash"][index],
}));

const metrics = [
  { key: "ph", label: "pH", unit: "pH", icon: "flask", note: "Soil acidity" },
  { key: "moisture", label: "Soil moisture", unit: "%", icon: "droplet", note: "Volumetric water content" },
  { key: "ec", label: "EC", unit: "mS/cm", icon: "signal", note: "Electrical conductivity" },
  { key: "nitrogen", label: "Nitrogen", unit: "mg/kg", icon: "leaf", note: "Available nitrogen (N)" },
  { key: "phosphorus", label: "Phosphorus", unit: "mg/kg", icon: "leaf", note: "Available phosphorus (P)" },
  { key: "potassium", label: "Potassium (K)", unit: "mg/kg", icon: "leaf", note: "Available potassium (K)" },
];

export default function GardenMap() {
  const [selected, setSelected] = useState(plots[0]);

  return (
    <>
      <Intro title="Your garden, bed by bed." subtitle="Select a plot to see its soil readings." right="Waiting for sensor data" />
      <section className="panel garden-panel garden-page-panel" aria-labelledby="garden-map-title">
        <div className="garden-header">
          <div>
            <div className="garden-eyebrow"><Icon name="sprout" size={14} /> YOUR GROWING SPACE</div>
            <h3 id="garden-map-title">Garden map</h3>
            <p>Choose one of the eight beds to inspect its soil.</p>
          </div>
          <span className="garden-live garden-offline"><i /> Sensor data unavailable</span>
        </div>
        <div className="garden-content">
          <div className="garden-scene" aria-label="Isometric garden layout with two rows of four soil plots">
            <div className="garden-compass"><span>N</span><b>↑</b></div>
            <div className="garden-ground">
              {plots.map((plot, index) => (
                <button
                  type="button"
                  key={plot.id}
                  aria-label={`Select ${plot.name}`}
                  aria-pressed={selected.id === plot.id}
                  className={`garden-plot plot-${index + 1} tone-healthy ${selected.id === plot.id ? "plot-selected" : ""}`}
                  onClick={() => setSelected(plot)}
                >
                  <span className="plot-face plot-face-top">
                    <span className="plot-number">{plot.id}</span>
                    <span className="plot-sprout"><Icon name="sprout" size={21} /></span>
                    <span className="plot-score">0</span>
                  </span>
                  <span className="plot-face plot-face-front" />
                  <span className="plot-face plot-face-side" />
                </button>
              ))}
            </div>
            <div className="garden-scene-caption"><span>BACK OF GARDEN</span><span>GARDEN PATH</span></div>
          </div>
          <div className="garden-details garden-reading-details">
            <div className="selected-bed-heading">
              <div><span>SELECTED PLOT {selected.id}</span><h4>{selected.name}</h4><p>{selected.crop}</p></div>
              <span className="selected-bed-mark"><Icon name="sprout" size={19} /></span>
            </div>
            <div className="reading-status"><i /> Awaiting connection · Showing default values</div>
            <div className="soil-metric-grid">
              {metrics.map((metric) => (
                <article className="soil-metric-card" key={metric.key}>
                  <div><span className="soil-metric-icon"><Icon name={metric.icon} size={16} /></span><span>{metric.label}</span></div>
                  <strong>0<small>{metric.unit}</small></strong>
                  <p>{metric.note}</p>
                </article>
              ))}
            </div>
            <p className="reading-footnote"><Icon name="info" size={14} /> Values will appear here when a sensor is connected.</p>
          </div>
        </div>
      </section>
      <PageFooter />
    </>
  );
}
