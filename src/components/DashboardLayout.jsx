import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Overview from "../pages/Overview";
import Analytics from "../pages/Analytics";
import SensorMonitoring from "../pages/SensorMonitoring";
import Settings from "../pages/Settings";
import GardenMap from "../pages/GardenMap";

const pageTitles = {
  "/overview": "Soil Monitoring Dashboard",
  "/garden": "Garden Map & Soil Readings",
  "/analytics": "Soil Data Analytics",
  "/sensors": "Sensor System Status",
  "/settings": "System Settings",
};

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || pageTitles["/overview"];

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)} />
      <div className="main-column">
        <Header title={title} />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/garden" element={<GardenMap />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/sensors" element={<SensorMonitoring />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
