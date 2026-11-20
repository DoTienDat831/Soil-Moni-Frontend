import { Navigate, Route, Routes } from "react-router";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import WorkspaceSettings from "./pages/WorkspaceSettings";
import RequireAuth from "./components/RequireAuth";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth><DashboardLayout /></RequireAuth>} />
      <Route path="/projects" element={<RequireAuth><Navigate to="/overview" replace /></RequireAuth>} />
      <Route path="/workspace/settings" element={<RequireAuth><WorkspaceSettings /></RequireAuth>} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<RequireAuth><DashboardLayout /></RequireAuth>} />
    </Routes>
  );
}
