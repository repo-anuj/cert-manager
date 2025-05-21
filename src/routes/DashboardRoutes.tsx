import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Certificates from "../pages/Certificates";
import CertificateDetail from "../pages/CertificateDetail";
import AddCertificate from "../pages/AddCertificate";
import Awards from "../pages/Awards";
import AwardDetail from "../pages/AwardDetail";
import AddAward from "../pages/AddAward";

const DashboardRoutes = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="certificates" element={<Certificates />} />
      <Route path="certificates/:id" element={<CertificateDetail />} />
      <Route path="add-certificate" element={<AddCertificate />} />
      {/* Award routes */}
      <Route path="awards" element={<Awards />} />
      <Route path="awards/:id" element={<AwardDetail />} />
      <Route path="add-award" element={<AddAward />} />
      {/* Add more dashboard routes as needed */}
      <Route path="shared" element={<div className="p-6 text-white">Shared Certificates Page (Coming Soon)</div>} />
      <Route path="settings" element={<div className="p-6 text-white">Settings Page (Coming Soon)</div>} />
      <Route path="profile" element={<div className="p-6 text-white">Profile Page (Coming Soon)</div>} />
    </Route>
  </Routes>
);

export default DashboardRoutes;
