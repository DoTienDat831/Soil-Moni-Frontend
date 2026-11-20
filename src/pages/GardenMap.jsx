import { useEffect, useRef, useState } from "react";
import Icon from "../components/Icon";
import { Intro, PageFooter } from "../components/Shared";
import { gardenMetrics } from "../data/gardenMap";
import useGardenMap from "../hooks/useGardenMap";

export default function GardenMap() {
  const { garden, plots, selected, setSelected } = useGardenMap();
  const [spaceDown, setSpaceDown] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const spaceRef = useRef(false);
  const dragRef = useRef(null);
  const didDragRef = useRef(false);

  useEffect(() => {
    const keyDown = (event) => {
      if (event.code === "Space" && !["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) {
        event.preventDefault();
        spaceRef.current = true;
        setSpaceDown(true);
      }
    };
    const keyUp = (event) => {
      if (event.code === "Space") { spaceRef.current = false; setSpaceDown(false); }
    };
    const blur = () => { spaceRef.current = false; setSpaceDown(false); setDragging(false); dragRef.current = null; };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("blur", blur);
    return () => { window.removeEventListener("keydown", keyDown); window.removeEventListener("keyup", keyUp); window.removeEventListener("blur", blur); };
  }, []);

  function startPan(event) {
    if (!spaceRef.current || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
    didDragRef.current = false;
    setDragging(true);
  }

  function movePan(event) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) didDragRef.current = true;
    setPan({ x: drag.panX + dx, y: drag.panY + dy });
  }

  function endPan(event) {
    if (!dragRef.current) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setDragging(false);
  }

  return (
    <>
      <Intro title={garden?.name || "Your garden, bed by bed."} subtitle={`${garden?.area ? `${garden.area} m² · ` : ""}${garden?.plantCount ?? plots.length} plants · Select a bed to see its soil readings.`} right="Waiting for sensor data" />
      <section className="panel garden-panel garden-page-panel" aria-labelledby="garden-map-title">
        <div className="garden-header">
          <div>
            <div className="garden-eyebrow"><Icon name="sprout" size={14} /> YOUR GROWING SPACE</div>
            <h3 id="garden-map-title">Garden map</h3>
            <p>{plots.length} planting slots · {garden?.rows || 2} × {garden?.columns || 4} layout</p>
          </div>
          <span className="garden-live garden-offline"><i /> Sensor data unavailable</span>
        </div>
        <div className="garden-content">
          <div className={`garden-scene ${spaceDown ? "pan-ready" : ""} ${dragging ? "is-panning" : ""}`} aria-label={`Garden layout with ${plots.length} soil plots`} onPointerDown={startPan} onPointerMove={movePan} onPointerUp={endPan} onPointerCancel={endPan}>
            <div className="garden-compass"><span>N</span><b>↑</b></div>
            <div className="garden-ground" style={{
              width: `calc(var(--plot-w) * ${garden?.columns || 4} + ${11 * ((garden?.columns || 4) - 1)}px)`,
              height: `calc(var(--plot-h) * ${garden?.rows || 2} + ${14 * ((garden?.rows || 2) - 1)}px)`,
              "--pan-x": `${pan.x}px`, "--pan-y": `${pan.y}px`,
            }}>
              {plots.map((plot, index) => (
                <button
                  type="button"
                  key={plot.id}
                  aria-label={`Select ${plot.name}`}
                  aria-pressed={selected.id === plot.id}
                  className={`garden-plot tone-healthy ${selected.id === plot.id ? "plot-selected" : ""}`}
                  style={{ left: `calc(var(--plot-w) * ${index % (garden?.columns || 4)} + ${11 * (index % (garden?.columns || 4))}px)`, top: `calc(var(--plot-h) * ${Math.floor(index / (garden?.columns || 4))} + ${14 * Math.floor(index / (garden?.columns || 4))}px)` }}
                  onClick={() => { if (didDragRef.current) { didDragRef.current = false; return; } setSelected(plot); }}
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
            <div className="garden-scene-caption"><span>GARDEN LAYOUT</span><span>{garden?.rows || 2} ROWS · {garden?.columns || 4} COLUMNS</span></div>
          </div>
          <div className="garden-details garden-reading-details">
            <div className="selected-bed-heading">
              <div><span>SELECTED SLOT {selected.id}</span><h4>{selected.name}</h4><p>{selected.crop} · {selected.soilType || "Soil not set"}</p></div>
              <span className="selected-bed-mark"><Icon name="sprout" size={19} /></span>
            </div>
            <div className="reading-status"><i /> Awaiting connection · Showing default values</div>
            <div className="soil-metric-grid">
              {gardenMetrics.map((metric) => (
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
