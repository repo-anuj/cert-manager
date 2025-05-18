import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for dashboard
  const stats = [
    { label: "Total Certificates", value: 12, icon: "📜" },
    { label: "Shared", value: 5, icon: "🔗" },
    { label: "Views", value: 142, icon: "👁️" },
    { label: "Downloads", value: 38, icon: "⬇️" },
  ];

  // Mock recent certificates
  const recentCertificates = [
    { id: 1, name: "Web Development Bootcamp", issuer: "Udemy", date: "2023-05-15" },
    { id: 2, name: "React Advanced", issuer: "Frontend Masters", date: "2023-07-22" },
    { id: 3, name: "UI/UX Design Fundamentals", issuer: "Coursera", date: "2023-09-10" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-400 mt-1">Manage all your certificates in one place</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          + Add Certificate
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="flex items-center space-x-4">
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <p className="text-gray-300">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Certificates */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-white mb-4">
          Recent Certificates
        </h2>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Issuer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-neutral-900 divide-y divide-gray-700">
                {recentCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-neutral-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{cert.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{cert.issuer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{cert.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-blue-400 mr-3">View</button>
                      <button className="text-green-400 hover:text-green-300 mr-3">Share</button>
                      <button className="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
