import { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { cn } from "../../lib/utils";
import { IconSearch } from "@tabler/icons-react";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content - with left padding to accommodate the fixed sidebar */}
      <div className={cn(
        "min-h-screen bg-black transition-all duration-300",
        "md:ml-[70px] md:sidebar-expanded:ml-[300px]" // Dynamic margin based on sidebar state
      )}>
        <main className="p-4 md:p-6 bg-black text-white min-h-screen overflow-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6 sticky top-0 z-10 bg-black pt-2 pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IconSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-3 pl-10 text-sm text-white border border-gray-700 rounded-lg bg-neutral-900 focus:ring-primary focus:border-primary"
                placeholder="Search certificates, issuers, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2.5 bottom-2 top-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </form>

          {/* Page Content */}
          <div className="pb-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
