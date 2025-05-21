import AppRoutes from "./routes/AppRoutes";
import "./styles/globals.css";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

const App = () => (
  <AuthProvider>
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  </AuthProvider>
);

export default App;