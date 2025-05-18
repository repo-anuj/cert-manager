import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Certificates from "../pages/Certificates";

const DashboardRoutes = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="certificates" element={<Certificates />} />
      {/* Add more dashboard routes as needed */}
      <Route path="upload" element={<div className="p-6">Upload Certificate Page (Coming Soon)</div>} />
      <Route path="shared" element={<div className="p-6">Shared Certificates Page (Coming Soon)</div>} />
      <Route path="settings" element={<div className="p-6">Settings Page (Coming Soon)</div>} />
      <Route path="profile" element={<div className="p-6">Profile Page (Coming Soon)</div>} />
    </Route>
  </Routes>
);

export default DashboardRoutes;
