import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar as AceternitySidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconHome,
  IconCertificate,
  IconAward,
  IconShare,
  IconSettings,
  IconLogout,
  IconUser
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true); // Default to open for better UX

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Navigation items with Tabler icons
  const navItems = [
    {
      path: "/dashboard",
      label: "Overview",
      icon: <IconHome className="h-5 w-5 shrink-0 text-neutral-200" />
    },
    {
      path: "/dashboard/certificates",
      label: "My Certificates",
      icon: <IconCertificate className="h-5 w-5 shrink-0 text-neutral-200" />
    },
    {
      path: "/dashboard/awards",
      label: "Awards",
      icon: <IconAward className="h-5 w-5 shrink-0 text-neutral-200" />
    },
    {
      path: "/dashboard/shared",
      label: "Shared",
      icon: <IconShare className="h-5 w-5 shrink-0 text-neutral-200" />
    },
    {
      path: "/dashboard/settings",
      label: "Settings",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-200" />
    },
  ];

  // Add sidebar-expanded class to body when sidebar is open
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('sidebar-expanded');
    };
  }, [open]);

  return (
    <AceternitySidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}

          {/* Profile Section at Top */}
          {open && (
            <div className="mt-6 mb-4 flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <p className="mt-2 text-white font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-gray-400">{user?.email || "user@example.com"}</p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link to={item.path} key={item.path}>
                <SidebarLink
                  link={{
                    label: item.label,
                    href: "#", // This is ignored since we're using React Router's Link
                    icon: item.icon
                  }}
                  className={cn(
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : ""
                  )}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-2 mb-4">
          <Link to="/dashboard/profile">
            <SidebarLink
              link={{
                label: "Profile",
                href: "#",
                icon: <IconUser className="h-5 w-5 shrink-0 text-neutral-200" />
              }}
            />
          </Link>
          <div onClick={handleLogout} className="cursor-pointer">
            <SidebarLink
              link={{
                label: "Logout",
                href: "#",
                icon: <IconLogout className="h-5 w-5 shrink-0 text-neutral-200" />
              }}
            />
          </div>
        </div>
      </SidebarBody>
    </AceternitySidebar>
  );
};

// Logo component for expanded sidebar
const Logo = () => {
  return (
    <Link
      to="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div className="h-6 w-7 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-primary" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg whitespace-pre text-white"
      >
        CertManager
      </motion.span>
    </Link>
  );
};

// Logo icon for collapsed sidebar
const LogoIcon = () => {
  return (
    <Link
      to="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div className="h-6 w-7 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-primary" />
    </Link>
  );
};

export default Sidebar;
