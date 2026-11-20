const fields = [
  ["name", "Garden name", "e.g. Greenhouse North"],
  ["address", "Address", "Street, city, country"],
  ["slots", "Number of slots", "e.g. 8"],
  ["code", "Garden code", "Unique garden code"],
];

export default function CreateGardenDialog({ form, onChange, onSubmit, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <form className="garden-form" onSubmit={onSubmit}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">×</button>
        <h2>Add a garden</h2>
        <p>Enter the garden details to create its workspace.</p>
        {fields.map(([key, label, placeholder]) => (
          <label key={key}>
            {label}
            <input
              required
              name={key}
              placeholder={placeholder}
              type={key === "slots" ? "number" : "text"}
              min={key === "slots" ? 1 : undefined}
              value={form[key]}
              onChange={onChange}
            />
          </label>
        ))}
        <button className="login-submit" type="submit">Create garden</button>
      </form>
    </div>
  );
}
