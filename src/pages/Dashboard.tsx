import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { motion } from "framer-motion";
import {
  IconEye,
  IconShare,
  IconTrash,
  IconArrowRight,
  IconCertificate,
  IconTrophy,
  IconPlus
} from "@tabler/icons-react";
import PageTransition from "../components/common/PageTransition";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Dashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'certificates' | 'awards'>('certificates');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Only show toast on initial load, not on re-renders
      if (isLoading) {
        showToast("success", "Dashboard loaded successfully");
      }
    }, 1000);

    return () => clearTimeout(timer);
    // Remove showToast from dependencies to prevent infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mock data for dashboard
  const stats = [
    { label: "Total Certificates", value: 12, icon: <IconCertificate className="h-6 w-6 text-primary" /> },
    { label: "Total Awards", value: 5, icon: <IconTrophy className="h-6 w-6 text-amber-500" /> },
    { label: "Views", value: 142, icon: <IconEye className="h-6 w-6 text-blue-400" /> },
    { label: "Shared", value: 38, icon: <IconShare className="h-6 w-6 text-green-400" /> },
  ];

  // Mock recent certificates with more details
  const recentCertificates = [
    {
      id: 1,
      name: "Web Development Bootcamp",
      issuer: "Udemy",
      date: "2023-05-15",
      thumbnail: "https://via.placeholder.com/300x200?text=Web+Development",
      category: "development",
      status: "active",
      description: "A comprehensive bootcamp covering HTML, CSS, JavaScript, and more."
    },
    {
      id: 2,
      name: "React Advanced",
      issuer: "Frontend Masters",
      date: "2023-07-22",
      thumbnail: "https://via.placeholder.com/300x200?text=React+Advanced",
      category: "development",
      status: "active",
      description: "Advanced React patterns, hooks, and performance optimization techniques."
    },
    {
      id: 3,
      name: "UI/UX Design Fundamentals",
      issuer: "Coursera",
      date: "2023-09-10",
      thumbnail: "https://via.placeholder.com/300x200?text=UI/UX+Design",
      category: "design",
      status: "active",
      description: "Learn the fundamentals of UI/UX design, including user research and prototyping."
    },
  ];

  // Mock recent awards
  const recentAwards = [
    {
      id: 1,
      name: "Employee of the Month",
      issuer: "ABC Corporation",
      date: "2023-10-15",
      thumbnail: "https://via.placeholder.com/300x200?text=Employee+Award",
      category: "professional",
      description: "Awarded for exceptional performance and leadership in the development team."
    },
    {
      id: 2,
      name: "Best Speaker",
      issuer: "Tech Conference 2023",
      date: "2023-08-22",
      thumbnail: "https://via.placeholder.com/300x200?text=Speaker+Award",
      category: "speaking",
      description: "Recognized as the best speaker at the annual technology conference for the presentation on AI innovations."
    },
    {
      id: 3,
      name: "Innovation Award",
      issuer: "Industry Association",
      date: "2023-06-10",
      thumbnail: "https://via.placeholder.com/300x200?text=Innovation+Award",
      category: "innovation",
      description: "Awarded for developing an innovative solution that significantly improved process efficiency."
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <PageTransition className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-400 mt-1">Manage all your certificates and awards in one place</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            href="/dashboard/add-certificate"
            leftIcon={<IconCertificate className="h-5 w-5" />}
            fullWidth={true}
            className="sm:w-auto"
          >
            Add Certificate
          </Button>
          <Button
            href="/dashboard/add-award"
            leftIcon={<IconTrophy className="h-5 w-5" />}
            variant="outline"
            fullWidth={true}
            className="sm:w-auto"
          >
            Add Award
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="flex items-center space-x-3 p-3 sm:p-6">
              <div className="flex-shrink-0">{stat.icon}</div>
              <div>
                <p className="text-gray-300 text-xs sm:text-sm">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs for Certificates and Awards */}
      <div className="space-y-6">
        <div className="flex border-b border-gray-700">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'certificates'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('certificates')}
          >
            <div className="flex items-center">
              <IconCertificate className="h-5 w-5 mr-2" />
              Certificates
            </div>
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'awards'
                ? 'text-amber-500 border-b-2 border-amber-500'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('awards')}
          >
            <div className="flex items-center">
              <IconTrophy className="h-5 w-5 mr-2" />
              Awards
            </div>
          </button>
        </div>

        {/* Recent Certificates */}
        {activeTab === 'certificates' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-heading font-bold text-white">
                Recent Certificates
              </h2>
              <Button
                href="/dashboard/certificates"
                variant="ghost"
                size="sm"
                rightIcon={<IconArrowRight className="h-4 w-4" />}
              >
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recentCertificates.map((cert) => (
                <Card
                  key={cert.id}
                  className="overflow-hidden group transition-transform duration-300 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary"
                  onClick={() => navigate(`/dashboard/certificates/${cert.id}`)}
                >
                  <div className="relative">
                    <img
                      src={cert.thumbnail}
                      alt={cert.name}
                      className="w-full h-32 sm:h-40 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-neutral-900/80 px-2 py-1 rounded text-xs text-white">
                      {cert.category}
                    </div>
                    {cert.status === 'active' ? (
                      <div className="absolute top-2 left-2 bg-green-500/80 px-2 py-1 rounded-full">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    ) : (
                      <div className="absolute top-2 left-2 bg-red-500/80 px-2 py-1 rounded-full">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white truncate">{cert.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 gap-1">
                      <p className="text-gray-300 text-sm">{cert.issuer}</p>
                      <p className="text-xs text-gray-400">Issued: {cert.date}</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">{cert.description}</p>

                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="View certificate"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/certificates/${cert.id}`);
                        }}
                      >
                        <IconEye className="h-5 w-5 text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Share certificate"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast("success", `Certificate shared: ${cert.name}`);
                        }}
                      >
                        <IconShare className="h-5 w-5 text-green-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Delete certificate"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast("error", `Certificate deleted: ${cert.name}`);
                        }}
                      >
                        <IconTrash className="h-5 w-5 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recent Awards */}
        {activeTab === 'awards' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-heading font-bold text-white">
                Recent Awards
              </h2>
              <Button
                href="/dashboard/awards"
                variant="ghost"
                size="sm"
                rightIcon={<IconArrowRight className="h-4 w-4" />}
              >
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recentAwards.map((award) => (
                <Card
                  key={award.id}
                  className="overflow-hidden group transition-transform duration-300 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-amber-500"
                  onClick={() => navigate(`/dashboard/awards/${award.id}`)}
                >
                  <div className="relative">
                    <img
                      src={award.thumbnail}
                      alt={award.name}
                      className="w-full h-32 sm:h-40 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-neutral-900/80 px-2 py-1 rounded text-xs text-white">
                      {award.category}
                    </div>
                    <div className="absolute top-2 left-2 bg-amber-500/80 px-2 py-1 rounded-full">
                      <IconTrophy className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white truncate">{award.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 gap-1">
                      <p className="text-gray-300 text-sm">{award.issuer}</p>
                      <p className="text-xs text-gray-400">Received: {award.date}</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">{award.description}</p>

                    <div className="mt-4 flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="View award"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/awards/${award.id}`);
                        }}
                      >
                        <IconEye className="h-5 w-5 text-amber-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Share award"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast("success", `Award shared: ${award.name}`);
                        }}
                      >
                        <IconShare className="h-5 w-5 text-green-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Delete award"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast("error", `Award deleted: ${award.name}`);
                        }}
                      >
                        <IconTrash className="h-5 w-5 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Dashboard;
