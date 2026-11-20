import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Analytics from "../pages/Analytics";
import SensorMonitoring from "../pages/SensorMonitoring";
import Settings from "../pages/Settings";
import GardenMap from "../pages/GardenMap";
import Actions from "../pages/Actions";
import Search from "../pages/Search";
import Projects from "../pages/Projects";

const pageTitles = {
  "/overview": "Overview · Your gardens",
  "/garden": "Garden Map & Soil Readings",
  "/actions": "Garden Actions Log",
  "/analytics": "Soil Data Analytics",
  "/sensors": "Sensor System Status",
  "/search": "Organization User Search",
  "/settings": "System Settings",
};

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || (location.pathname.endsWith("/actions") ? pageTitles["/actions"] : location.pathname.endsWith("/analytics") ? pageTitles["/analytics"] : location.pathname.includes("/garden/") ? pageTitles["/garden"] : pageTitles["/overview"]);

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)} />
      <div className="main-column">
        <Header title={title} />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<Projects />} />
            <Route path="/garden" element={<GardenMap />} />
            <Route path="/garden/:gardenId/map" element={<GardenMap />} />
            <Route path="/garden/:gardenId/actions" element={<Actions />} />
            <Route path="/garden/:gardenId/analytics" element={<Analytics />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/sensors" element={<SensorMonitoring />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
