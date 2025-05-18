// src/routes/AuthRoutes.tsx
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AuthRoutes = () => (
  <Routes>
    <Route path="signin" element={<SignIn />} />
    <Route path="signup" element={<SignUp />} />
  </Routes>
);

export default AuthRoutes;