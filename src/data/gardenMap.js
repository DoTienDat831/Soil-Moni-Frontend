export const gardenPlots = Array.from({ length: 8 }, (_, index) => ({
  id: String(index + 1).padStart(2, "0"),
  name: `Raised bed ${String.fromCharCode(65 + index)}`,
  crop: ["Tomatoes", "Leafy greens", "Carrots", "Herbs", "Peppers", "Beans", "Strawberries", "Squash"][index],
}));

export const gardenMetrics = [
  { key: "ph", label: "pH", unit: "pH", icon: "flask", note: "Soil acidity" },
  { key: "moisture", label: "Soil moisture", unit: "%", icon: "droplet", note: "Volumetric water content" },
  { key: "ec", label: "EC", unit: "mS/cm", icon: "signal", note: "Electrical conductivity" },
  { key: "nitrogen", label: "Nitrogen", unit: "mg/kg", icon: "leaf", note: "Available nitrogen (N)" },
  { key: "phosphorus", label: "Phosphorus", unit: "mg/kg", icon: "leaf", note: "Available phosphorus (P)" },
  { key: "potassium", label: "Potassium (K)", unit: "mg/kg", icon: "leaf", note: "Available potassium (K)" },
];
