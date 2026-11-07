import { Navigate, Route, Routes } from "react-router";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<DashboardLayout />} />
    </Routes>
  );
}
