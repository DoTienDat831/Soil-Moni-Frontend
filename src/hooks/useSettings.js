import { useState } from "react";

export default function useSettings() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [unit, setUnit] = useState("°C");
  const [frequency, setFrequency] = useState("5 mins");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Alex Lee");
  const [notice, setNotice] = useState("");

  function saveName() {
    setEditing(false);
    setNotice("Profile updated.");
  }

  return {
    push, setPush, email, setEmail, unit, setUnit,
    frequency, setFrequency, editing, setEditing,
    name, setName, notice, saveName,
  };
}
