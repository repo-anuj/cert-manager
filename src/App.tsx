import AppRoutes from "./routes/AppRoutes";
import "./styles/globals.css";
import { AuthProvider } from "./context/AuthContext";

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;