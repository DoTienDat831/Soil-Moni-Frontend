import { useState } from "react";
import { gardenPlots } from "../data/gardenMap";

export default function useGardenMap() {
  let garden = null;
  try { garden = JSON.parse(sessionStorage.getItem("soilMonitorActiveGarden") || "null"); } catch { /* Use the sample garden if stored data is invalid. */ }
  const plots = garden?.beds?.length ? garden.beds.map((bed, index) => ({ ...bed, id: String(index + 1).padStart(2, "0"), crop: bed.crop || "Unassigned" })) : gardenPlots;
  const [selectedId, setSelectedId] = useState(plots[0]?.id);
  const selected = plots.find((plot) => plot.id === selectedId) || plots[0];
  return { garden, plots, selected, setSelected: (plot) => setSelectedId(plot.id) };
}
