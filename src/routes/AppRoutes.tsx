import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Route>

      {/* Fallback route for 404 */}
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center">Page not found</div>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;