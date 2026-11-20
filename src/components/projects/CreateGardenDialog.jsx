import { useMemo, useState } from "react";
import Icon from "../Icon";

const plants = ["Tomato", "Lettuce", "Carrot", "Herbs", "Pepper", "Beans", "Strawberry", "Other"];
const soils = ["Loamy", "Sandy", "Clay", "Silty", "Peaty", "Chalky", "Potting mix"];

export default function CreateGardenDialog({ form, onChange, onSubmit, onClose }) {
  const [step, setStep] = useState(1);
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(Number(form.slots) || 1);
  const [beds, setBeds] = useState([]);
  const [sharedCrop, setSharedCrop] = useState("");
  const [sharedSoil, setSharedSoil] = useState("");
  const slots = Math.min(20, Math.max(1, Number(form.slots) || 1));
  const rowOptions = useMemo(() => Array.from({ length: slots }, (_, i) => i + 1).filter((n) => slots % n === 0), [slots]);

  function setBed(index, key, value) {
    setBeds((current) => {
      const next = Array.from({ length: slots }, (_, i) => current[i] || { name: `Bed ${String(i + 1).padStart(2, "0")}`, crop: "", soilType: "" });
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  }

  function applyShared(key, value) {
    if (!value.trim()) return;
    setBeds((current) => Array.from({ length: slots }, (_, i) => ({
      name: current[i]?.name || `Bed ${String(i + 1).padStart(2, "0")}`,
      crop: current[i]?.crop || "",
      soilType: current[i]?.soilType || "",
      ...current[i],
      [key]: value.trim(),
    })));
  }

  function submit(event) {
    event.preventDefault();
    onSubmit(event, { rows, columns, beds: Array.from({ length: slots }, (_, i) => beds[i] || { name: `Bed ${String(i + 1).padStart(2, "0")}`, crop: "", soilType: "" }) });
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <form className="garden-form garden-setup-form" onSubmit={step === 1 ? (event) => { event.preventDefault(); setRows(1); setColumns(slots); setStep(2); } : submit}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">×</button>
        <div className="garden-setup-step">STEP {step} OF 2</div>
        {step === 1 ? <>
          <h2>Create a garden</h2><p>Set the garden details and number of planting slots.</p>
          <label>Garden name<input required name="name" placeholder="e.g. Greenhouse North" value={form.name} onChange={onChange} /></label>
          <label>Area (m²)<input required name="area" type="number" min="0.1" step="0.1" placeholder="e.g. 120" value={form.area} onChange={onChange} /></label>
          <label>Slots (1–20)<input required name="slots" type="number" min="1" max="20" step="1" placeholder="e.g. 8" value={form.slots} onChange={onChange} /></label>
          <label>Number of plants<input required name="plantCount" type="number" min="0" step="1" placeholder="e.g. 40" value={form.plantCount} onChange={onChange} /></label>
          <label>Address<input required name="address" placeholder="Street, city, country" value={form.address} onChange={onChange} /></label>
          <button className="login-submit" type="submit">Arrange planting slots <Icon name="arrow" size={16} /></button>
        </> : <>
          <h2>Arrange your beds</h2><p>Choose a rectangular layout for {slots} slots, then customize each bed.</p>
          <div className="garden-layout-controls">
            <label>Rows<select value={rows} onChange={(e) => { const value = Number(e.target.value); setRows(value); setColumns(slots / value); }}>{rowOptions.map((n) => <option key={n} value={n}>{n}</option>)}</select></label>
            <span>×</span>
            <label>Columns<select value={columns} onChange={(e) => { const value = Number(e.target.value); setColumns(value); setRows(slots / value); }}>{rowOptions.map((n) => <option key={n} value={slots / n}>{slots / n}</option>)}</select></label>
            <strong>= {slots} slots</strong>
          </div>
          <div className="garden-bulk-editor">
            <strong>Quick setup</strong><span>Apply a shared value to every slot, then customize individual beds below.</span>
            <div className="garden-bulk-fields">
              <label>Plant type<input list="plant-type-suggestions" value={sharedCrop} onChange={(e) => setSharedCrop(e.target.value)} placeholder="e.g. Cherry tomato" /><datalist id="plant-type-suggestions">{plants.map((plant) => <option key={plant} value={plant} />)}</datalist><button type="button" onClick={() => applyShared("crop", sharedCrop)}>Apply to all slots</button></label>
              <label>Soil type<input list="soil-type-suggestions" value={sharedSoil} onChange={(e) => setSharedSoil(e.target.value)} placeholder="e.g. Sandy loam" /><datalist id="soil-type-suggestions">{soils.map((soil) => <option key={soil} value={soil} />)}</datalist><button type="button" onClick={() => applyShared("soilType", sharedSoil)}>Apply to all slots</button></label>
            </div>
          </div>
          <div className="garden-bed-editor-grid" style={{ "--bed-columns": columns }}>
            {Array.from({ length: slots }, (_, i) => {
              const bed = beds[i] || { name: `Bed ${String(i + 1).padStart(2, "0")}`, crop: "", soilType: "" };
              return <fieldset className="garden-bed-editor" key={i}><legend>Slot {i + 1}</legend>
                <label>Bed name<input required value={bed.name} onChange={(e) => setBed(i, "name", e.target.value)} /></label>
                <label>Plant type<input required list="plant-type-suggestions" value={bed.crop} placeholder="Enter plant type" onChange={(e) => setBed(i, "crop", e.target.value)} /></label>
                <label>Soil type<input required list="soil-type-suggestions" value={bed.soilType} placeholder="Enter soil type" onChange={(e) => setBed(i, "soilType", e.target.value)} /></label>
              </fieldset>;
            })}
          </div>
          <div className="garden-setup-actions"><button type="button" className="garden-back-button" onClick={() => setStep(1)}>Back</button><button className="login-submit" type="submit">Create garden</button></div>
        </>}
      </form>
    </div>
  );
}
