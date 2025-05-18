import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/dashboard" className="text-2xl font-heading font-bold text-primary">
            CertManager
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-gray-700 hover:text-primary">
              Dashboard
            </Link>
            <Link to="/dashboard/certificates" className="text-gray-700 hover:text-primary">
              My Certificates
            </Link>
            <Link to="/dashboard/upload" className="text-gray-700 hover:text-primary">
              Upload
            </Link>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:block text-gray-700">{user?.name}</span>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              >
                <Link
                  to="/dashboard/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
