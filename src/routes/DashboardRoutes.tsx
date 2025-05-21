import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Certificates from "../pages/Certificates";
import CertificateDetail from "../pages/CertificateDetail";
import AddCertificate from "../pages/AddCertificate";
import Awards from "../pages/Awards";
import AwardDetail from "../pages/AwardDetail";
import AddAward from "../pages/AddAward";
import Shared from "../pages/Shared";
import Profile from "../pages/Profile";
import PublicCertificateView from "../pages/PublicCertificateView";
import PublicProfile from "../pages/PublicProfile";

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
      {/* Shared and Analytics */}
      <Route path="shared" element={<Shared />} />
      {/* Profile */}
      <Route path="profile" element={<Profile />} />
      {/* Other routes */}
      <Route path="settings" element={<div className="p-6 text-white">Settings Page (Coming Soon)</div>} />
    </Route>
    {/* Public routes outside dashboard layout */}
    <Route path="/share/:id" element={<PublicCertificateView />} />
    <Route path="/profile/:username" element={<PublicProfile />} />
  </Routes>
);

export default DashboardRoutes;
