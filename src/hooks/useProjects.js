import { useState } from "react";
import { useNavigate } from "react-router";
import { clearAuth } from "../services/auth";

const STORAGE_KEY = "soilMonitorGardens";
const emptyForm = { name: "", area: "", address: "", slots: "", plantCount: "" };

function readGardens() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function readUser() {
  try {
    return JSON.parse(sessionStorage.getItem("soilMonitorUser") || "null");
  } catch {
    return null;
  }
}

export default function useProjects() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [gardens, setGardens] = useState(readGardens);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const user = readUser();
  const displayName = user?.fullName || user?.username || "Guest user";
  const initials = displayName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function createGarden(event, layout) {
    event.preventDefault();
    const garden = { ...form, ...layout, id: crypto.randomUUID(), area: Number(form.area), slots: Number(form.slots), plantCount: Number(form.plantCount) };
    const nextGardens = [...gardens, garden];
    setGardens(nextGardens);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextGardens));
    window.dispatchEvent(new Event("soil-monitor:gardens-updated"));
    setForm(emptyForm);
    setDialogOpen(false);
  }

  function openGarden(garden) {
    sessionStorage.setItem("soilMonitorActiveGarden", JSON.stringify(garden));
    navigate(`/garden/${garden.id}/map`);
  }

  function signOut() {
    clearAuth();
    navigate("/login");
  }

  function openSettings() {
    navigate("/workspace/settings");
  }

  function openMessages() {
    navigate("/messages");
  }

  return {
    collapsed, setCollapsed, gardens, dialogOpen, setDialogOpen,
    form, updateField, createGarden, openGarden, displayName, initials,
    signOut, openSettings, openMessages,
  };
}
