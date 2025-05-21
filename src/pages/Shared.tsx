import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import PageTransition from "../components/common/PageTransition";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  IconEye,
  IconShare,
  IconTrash,
  IconDownload,
  IconQrcode,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconMail,
  IconLink,
  IconWorld,
  IconClock,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconFilter,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

// Mock data for shared certificates
const sharedCertificates = [
  {
    id: 1,
    name: "Web Development Bootcamp",
    issuer: "Udemy",
    date: "2023-05-15",
    thumbnail: "https://via.placeholder.com/300x200?text=Web+Development",
    category: "development",
    status: "active",
    shareDate: "2023-10-15",
    views: 45,
    analytics: {
      viewsOverTime: [5, 10, 15, 8, 7],
      countries: [
        { name: "United States", count: 20 },
        { name: "India", count: 12 },
        { name: "Germany", count: 8 },
        { name: "Canada", count: 5 },
      ],
      devices: [
        { name: "Desktop", count: 25, icon: <IconDeviceDesktop className="h-4 w-4" /> },
        { name: "Mobile", count: 15, icon: <IconDeviceMobile className="h-4 w-4" /> },
        { name: "Tablet", count: 5, icon: <IconDeviceTablet className="h-4 w-4" /> },
      ],
      referrers: [
        { name: "Direct", count: 20 },
        { name: "LinkedIn", count: 15 },
        { name: "Email", count: 10 },
      ],
    },
  },
  {
    id: 2,
    name: "React Advanced",
    issuer: "Frontend Masters",
    date: "2023-07-22",
    thumbnail: "https://via.placeholder.com/300x200?text=React+Advanced",
    category: "development",
    status: "active",
    shareDate: "2023-09-22",
    views: 32,
    analytics: {
      viewsOverTime: [3, 7, 12, 6, 4],
      countries: [
        { name: "United States", count: 15 },
        { name: "United Kingdom", count: 8 },
        { name: "Australia", count: 5 },
        { name: "Germany", count: 4 },
      ],
      devices: [
        { name: "Desktop", count: 20, icon: <IconDeviceDesktop className="h-4 w-4" /> },
        { name: "Mobile", count: 10, icon: <IconDeviceMobile className="h-4 w-4" /> },
        { name: "Tablet", count: 2, icon: <IconDeviceTablet className="h-4 w-4" /> },
      ],
      referrers: [
        { name: "Direct", count: 15 },
        { name: "Twitter", count: 10 },
        { name: "Email", count: 7 },
      ],
    },
  },
  {
    id: 3,
    name: "UI/UX Design Fundamentals",
    issuer: "Coursera",
    date: "2023-09-10",
    thumbnail: "https://via.placeholder.com/300x200?text=UI/UX+Design",
    category: "design",
    status: "active",
    shareDate: "2023-10-05",
    views: 28,
    analytics: {
      viewsOverTime: [2, 5, 8, 7, 6],
      countries: [
        { name: "United States", count: 10 },
        { name: "France", count: 7 },
        { name: "Brazil", count: 6 },
        { name: "Japan", count: 5 },
      ],
      devices: [
        { name: "Desktop", count: 15, icon: <IconDeviceDesktop className="h-4 w-4" /> },
        { name: "Mobile", count: 8, icon: <IconDeviceMobile className="h-4 w-4" /> },
        { name: "Tablet", count: 5, icon: <IconDeviceTablet className="h-4 w-4" /> },
      ],
      referrers: [
        { name: "Direct", count: 12 },
        { name: "Facebook", count: 8 },
        { name: "Email", count: 8 },
      ],
    },
  },
];

// Mock data for shared awards
const sharedAwards = [
  {
    id: 1,
    name: "Employee of the Month",
    issuer: "ABC Corporation",
    date: "2023-10-15",
    thumbnail: "https://via.placeholder.com/300x200?text=Employee+Award",
    category: "professional",
    shareDate: "2023-10-20",
    views: 22,
    analytics: {
      viewsOverTime: [4, 8, 6, 4],
      countries: [
        { name: "United States", count: 12 },
        { name: "Canada", count: 6 },
        { name: "Mexico", count: 4 },
      ],
      devices: [
        { name: "Desktop", count: 14, icon: <IconDeviceDesktop className="h-4 w-4" /> },
        { name: "Mobile", count: 6, icon: <IconDeviceMobile className="h-4 w-4" /> },
        { name: "Tablet", count: 2, icon: <IconDeviceTablet className="h-4 w-4" /> },
      ],
      referrers: [
        { name: "Direct", count: 10 },
        { name: "LinkedIn", count: 8 },
        { name: "Email", count: 4 },
      ],
    },
  },
];

const Shared = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"certificates" | "awards">("certificates");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewAnalytics = (item: any) => {
    setSelectedItem(item);
    setShowAnalytics(true);
  };

  const handleCloseAnalytics = () => {
    setShowAnalytics(false);
    setSelectedItem(null);
  };

  const handleOpenShareModal = (item: any) => {
    setSelectedItem(item);
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
    setSelectedItem(null);
  };

  const handleCopyLink = () => {
    // In a real app, this would copy a link to the clipboard
    showToast("success", "Link copied to clipboard");
  };

  const handleGenerateQR = () => {
    showToast("success", "QR code generated");
  };

  const handleShareSocial = (platform: string) => {
    showToast("success", `Shared on ${platform}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <PageTransition className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">
          Shared Items
        </h1>
        <p className="text-gray-400 mt-1">
          Manage and track your shared certificates and awards
        </p>
      </div>

      {/* Tabs for Certificates and Awards */}
      <div className="space-y-6">
        <div className="flex border-b border-gray-700">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "certificates"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("certificates")}
          >
            Shared Certificates
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "awards"
                ? "text-amber-500 border-b-2 border-amber-500"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("awards")}
          >
            Shared Awards
          </button>
        </div>

        {/* Shared Certificates */}
        {activeTab === "certificates" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-bold text-white">
                Shared Certificates
              </h2>
              <Button
                leftIcon={<IconFilter className="h-4 w-4" />}
                variant="outline"
                size="sm"
              >
                Filter
              </Button>
            </div>

            {sharedCertificates.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-gray-300 mb-4">
                  You haven't shared any certificates yet.
                </p>
                <Button
                  href="/dashboard/certificates"
                  variant="primary"
                >
                  Go to My Certificates
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sharedCertificates.map((cert) => (
                  <Card key={cert.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={cert.thumbnail}
                          alt={cert.name}
                          className="w-full h-40 md:h-full object-cover"
                        />
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{cert.name}</h3>
                            <p className="text-gray-300 text-sm">{cert.issuer}</p>
                          </div>
                          <div className="flex items-center bg-blue-500/20 px-2 py-1 rounded-full">
                            <IconEye className="h-4 w-4 text-blue-400 mr-1" />
                            <span className="text-xs text-blue-400">{cert.views} views</span>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-xs text-gray-400">Shared on: {cert.shareDate}</p>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<IconChartBar className="h-4 w-4" />}
                            onClick={() => handleViewAnalytics(cert)}
                          >
                            Analytics
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<IconShare className="h-4 w-4" />}
                            onClick={() => handleOpenShareModal(cert)}
                          >
                            Share
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<IconQrcode className="h-4 w-4" />}
                            onClick={handleGenerateQR}
                          >
                            QR Code
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            leftIcon={<IconTrash className="h-4 w-4" />}
                            onClick={() => showToast("error", "Sharing link removed")}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Shared Awards */}
        {activeTab === "awards" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-bold text-white">
                Shared Awards
              </h2>
              <Button
                leftIcon={<IconFilter className="h-4 w-4" />}
                variant="outline"
                size="sm"
              >
                Filter
              </Button>
            </div>

            {sharedAwards.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-gray-300 mb-4">
                  You haven't shared any awards yet.
                </p>
                <Button
                  href="/dashboard/awards"
                  variant="primary"
                >
                  Go to My Awards
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sharedAwards.map((award) => (
                  <Card key={award.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={award.thumbnail}
                          alt={award.name}
                          className="w-full h-40 md:h-full object-cover"
                        />
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{award.name}</h3>
                            <p className="text-gray-300 text-sm">{award.issuer}</p>
                          </div>
                          <div className="flex items-center bg-blue-500/20 px-2 py-1 rounded-full">
                            <IconEye className="h-4 w-4 text-blue-400 mr-1" />
                            <span className="text-xs text-blue-400">{award.views} views</span>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-xs text-gray-400">Shared on: {award.shareDate}</p>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<IconChartBar className="h-4 w-4" />}
                            onClick={() => handleViewAnalytics(award)}
                          >
                            Analytics
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<IconShare className="h-4 w-4" />}
                            onClick={() => handleOpenShareModal(award)}
                          >
                            Share
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<IconQrcode className="h-4 w-4" />}
                            onClick={handleGenerateQR}
                          >
                            QR Code
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            leftIcon={<IconTrash className="h-4 w-4" />}
                            onClick={() => showToast("error", "Sharing link removed")}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Analytics Modal */}
      {showAnalytics && selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Analytics for {selectedItem.name}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseAnalytics}
                >
                  Close
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Views Over Time */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <IconChartLine className="h-5 w-5 mr-2 text-blue-400" />
                    Views Over Time
                  </h3>
                  <div className="h-40 flex items-end justify-between gap-2">
                    {selectedItem.analytics.viewsOverTime.map((view: number, index: number) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-blue-500 w-8 rounded-t"
                          style={{ height: `${(view / Math.max(...selectedItem.analytics.viewsOverTime)) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-400 mt-1">Day {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Geographic Data */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <IconWorld className="h-5 w-5 mr-2 text-green-400" />
                    Geographic Data
                  </h3>
                  <div className="space-y-3">
                    {selectedItem.analytics.countries.map((country: any) => (
                      <div key={country.name} className="flex items-center justify-between">
                        <span className="text-gray-300">{country.name}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-neutral-700 h-2 rounded-full mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(country.count / selectedItem.analytics.countries[0].count) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{country.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Device Types */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <IconDeviceDesktop className="h-5 w-5 mr-2 text-purple-400" />
                    Device Types
                  </h3>
                  <div className="space-y-4">
                    {selectedItem.analytics.devices.map((device: any) => (
                      <div key={device.name} className="flex items-center">
                        <div className="mr-3 text-purple-400">
                          {device.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-300">{device.name}</span>
                            <span className="text-xs text-gray-400">{device.count} views</span>
                          </div>
                          <div className="w-full bg-neutral-700 h-2 rounded-full">
                            <div 
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${(device.count / selectedItem.analytics.devices.reduce((a: number, b: any) => a + b.count, 0)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Referral Sources */}
                <Card className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <IconChartPie className="h-5 w-5 mr-2 text-amber-400" />
                    Referral Sources
                  </h3>
                  <div className="space-y-3">
                    {selectedItem.analytics.referrers.map((referrer: any) => (
                      <div key={referrer.name} className="flex items-center justify-between">
                        <span className="text-gray-300">{referrer.name}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-neutral-700 h-2 rounded-full mr-2">
                            <div 
                              className="bg-amber-500 h-2 rounded-full"
                              style={{ width: `${(referrer.count / selectedItem.analytics.referrers[0].count) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{referrer.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  leftIcon={<IconDownload className="h-5 w-5" />}
                  onClick={() => showToast("success", "Analytics report downloaded")}
                >
                  Download Report
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-800 rounded-lg w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Share {selectedItem.name}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseShareModal}
                >
                  Close
                </Button>
              </div>

              <div className="space-y-6">
                {/* Shareable Link */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Shareable Link</h3>
                  <div className="flex">
                    <input
                      type="text"
                      value={`https://certmanager.com/share/${selectedItem.id}`}
                      readOnly
                      className="flex-1 bg-neutral-900 border border-neutral-700 rounded-l px-3 py-2 text-sm text-white"
                    />
                    <Button
                      className="rounded-l-none"
                      onClick={handleCopyLink}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                {/* Social Media Sharing */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Share on Social Media</h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      leftIcon={<IconBrandLinkedin className="h-5 w-5 text-blue-500" />}
                      onClick={() => handleShareSocial("LinkedIn")}
                    >
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      leftIcon={<IconBrandTwitter className="h-5 w-5 text-blue-400" />}
                      onClick={() => handleShareSocial("Twitter")}
                    >
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      leftIcon={<IconBrandFacebook className="h-5 w-5 text-blue-600" />}
                      onClick={() => handleShareSocial("Facebook")}
                    >
                      Facebook
                    </Button>
                  </div>
                </div>

                {/* Email Sharing */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Share via Email</h3>
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<IconMail className="h-5 w-5" />}
                    onClick={() => handleShareSocial("Email")}
                  >
                    Send Email
                  </Button>
                </div>

                {/* QR Code */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">QR Code</h3>
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<IconQrcode className="h-5 w-5" />}
                    onClick={handleGenerateQR}
                  >
                    Generate QR Code
                  </Button>
                </div>

                {/* Embed Code */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Embed Code</h3>
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<IconLink className="h-5 w-5" />}
                    onClick={() => showToast("success", "Embed code copied to clipboard")}
                  >
                    Get Embed Code
                  </Button>
                </div>

                {/* Privacy Settings */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Privacy Settings</h3>
                  <select
                    className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm text-white"
                    defaultValue="public"
                  >
                    <option value="public">Public - Anyone with the link can view</option>
                    <option value="limited">Limited - Only specific emails can view</option>
                    <option value="private">Private - Only you can view</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </PageTransition>
  );
};

export default Shared;
