import { useState } from "react";

export default function useAnalytics() {
  const [period, setPeriod] = useState("24 Hours");
  const [visible, setVisible] = useState(["pH", "Moisture", "Temp", "NPK"]);

  function toggleParameter(parameter) {
    setVisible((current) => current.includes(parameter)
      ? current.filter((item) => item !== parameter)
      : [...current, parameter]);
  }

  return { period, setPeriod, visible, toggleParameter };
}
