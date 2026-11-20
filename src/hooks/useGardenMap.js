import { useState } from "react";
import { gardenPlots } from "../data/gardenMap";

export default function useGardenMap() {
  const [selected, setSelected] = useState(gardenPlots[0]);
  return { plots: gardenPlots, selected, setSelected };
}
