import { useNavigate, useParams } from "react-router";
import Icon from "../components/Icon";
import { Intro } from "../components/Shared";

export default function GardenSettings() {
  const { gardenId } = useParams();
  const navigate = useNavigate();
  let gardens = [];
  try { gardens = JSON.parse(localStorage.getItem("soilMonitorGardens") || "[]"); } catch { /* Keep the page usable if local data is malformed. */ }
  const garden = gardens.find((item) => item.id === gardenId);

  function deleteGarden() {
    if (!garden || !window.confirm(`Delete “${garden.name}”? This will permanently remove the garden and its bed setup.`)) return;
    const remaining = gardens.filter((item) => item.id !== gardenId);
    localStorage.setItem("soilMonitorGardens", JSON.stringify(remaining));
    sessionStorage.removeItem("soilMonitorActiveGarden");
    window.dispatchEvent(new Event("soil-monitor:gardens-updated"));
    navigate("/overview", { replace: true });
  }

  return <>
    <Intro title="Garden settings" subtitle={garden ? `Manage ${garden.name} and its workspace.` : "This garden is no longer available."} />
    {garden && <section className="panel garden-settings-card">
      <div className="garden-settings-section"><span className="garden-settings-icon"><Icon name="sprout" size={20} /></span><div><strong>{garden.name}</strong><p>{garden.area} m² · {garden.slots} slots · {garden.plantCount} plants</p><small>{garden.address}</small></div></div>
      <div className="garden-danger-zone"><div><strong>Delete this garden</strong><p>Remove this garden, its bed layout and its saved settings from this workspace.</p></div><button type="button" className="garden-delete-button" onClick={deleteGarden}><Icon name="x" size={16} /> Delete garden</button></div>
    </section>}
  </>;
}
