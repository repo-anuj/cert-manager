import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  IconArrowLeft, 
  IconCalendar, 
  IconCertificate, 
  IconDownload, 
  IconEdit, 
  IconShare, 
  IconTrash,
  IconTag,
  IconBuilding,
  IconId
} from "@tabler/icons-react";
import PageTransition from "../components/common/PageTransition";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useToast } from "../context/ToastContext";

// Mock certificate data - would be replaced with actual data fetching
const certificates = [
  {
    id: 1,
    name: "Web Development Bootcamp",
    issuer: "Udemy",
    issueDate: "2023-05-15",
    expirationDate: "2025-05-15",
    serialNumber: "WD-12345-BOOT",
    category: "development",
    tags: ["web", "javascript", "html", "css"],
    status: "active",
    description: "A comprehensive bootcamp covering HTML, CSS, JavaScript, and more. This certification validates proficiency in modern web development techniques and best practices.",
    thumbnail: "https://via.placeholder.com/800x600?text=Web+Development",
    pdfUrl: "#"
  },
  {
    id: 2,
    name: "React Advanced",
    issuer: "Frontend Masters",
    issueDate: "2023-07-22",
    expirationDate: "2025-07-22",
    serialNumber: "FM-REACT-ADV-789",
    category: "development",
    tags: ["react", "javascript", "frontend"],
    status: "active",
    description: "Advanced React patterns, hooks, and performance optimization techniques. This certification demonstrates expertise in building complex React applications with advanced state management and optimization strategies.",
    thumbnail: "https://via.placeholder.com/800x600?text=React+Advanced",
    pdfUrl: "#"
  },
  {
    id: 3,
    name: "UI/UX Design Fundamentals",
    issuer: "Coursera",
    issueDate: "2023-09-10",
    expirationDate: "2025-09-10",
    serialNumber: "COUR-UIUX-456",
    category: "design",
    tags: ["ui", "ux", "design", "figma"],
    status: "active",
    description: "Learn the fundamentals of UI/UX design, including user research and prototyping. This certification validates skills in creating user-centered designs and conducting effective user research.",
    thumbnail: "https://via.placeholder.com/800x600?text=UI/UX+Design",
    pdfUrl: "#"
  },
  {
    id: 4,
    name: "Project Management Professional",
    issuer: "PMI",
    issueDate: "2023-03-05",
    expirationDate: "2024-03-05",
    serialNumber: "PMI-PMP-98765",
    category: "business",
    tags: ["project management", "agile", "scrum"],
    status: "expired",
    description: "Professional certification for project managers covering all aspects of project management. This globally recognized certification demonstrates knowledge of project management methodologies and best practices.",
    thumbnail: "https://via.placeholder.com/800x600?text=Project+Management",
    pdfUrl: "#"
  },
  {
    id: 5,
    name: "Data Science Specialization",
    issuer: "DataCamp",
    issueDate: "2023-08-18",
    expirationDate: "2025-08-18",
    serialNumber: "DC-DATA-SCI-321",
    category: "data",
    tags: ["data science", "python", "machine learning", "statistics"],
    status: "active",
    description: "Comprehensive data science program covering statistics, machine learning, and data visualization. This certification validates proficiency in data analysis, visualization, and machine learning techniques.",
    thumbnail: "https://via.placeholder.com/800x600?text=Data+Science",
    pdfUrl: "#"
  },
];

const CertificateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [certificate, setCertificate] = useState<any>(null);

  useEffect(() => {
    // Simulate API call to fetch certificate details
    const timer = setTimeout(() => {
      const foundCertificate = certificates.find(cert => cert.id === Number(id));
      
      if (foundCertificate) {
        setCertificate(foundCertificate);
      } else {
        showToast("error", "Certificate not found");
        navigate("/dashboard/certificates");
      }
      
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);

  const handleDelete = () => {
    // In a real app, this would call an API to delete the certificate
    showToast("success", "Certificate deleted successfully");
    navigate("/dashboard/certificates");
  };

  const handleShare = () => {
    showToast("success", "Certificate sharing link copied to clipboard");
  };

  const handleDownload = () => {
    showToast("info", "Certificate PDF downloading...");
    // In a real app, this would trigger a file download
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold text-white mb-4">Certificate not found</h2>
        <Button onClick={() => navigate("/dashboard/certificates")}>
          Back to Certificates
        </Button>
      </div>
    );
  }

  const isExpired = certificate.status === "expired";
  const isExpiringSoon = !isExpired && new Date(certificate.expirationDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <PageTransition className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard/certificates")}
          className="mr-4"
        >
          <IconArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">Certificate Details</h1>
      </div>

      {/* Certificate preview and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Certificate image preview */}
        <Card className="lg:col-span-2 overflow-hidden p-0">
          <div className="relative">
            <img 
              src={certificate.thumbnail} 
              alt={certificate.name} 
              className="w-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-neutral-900/80 px-3 py-2 rounded-lg text-sm text-white">
              {certificate.category}
            </div>
            {isExpired ? (
              <div className="absolute top-4 left-4 bg-red-500/90 px-3 py-2 rounded-lg text-sm text-white">
                Expired
              </div>
            ) : isExpiringSoon ? (
              <div className="absolute top-4 left-4 bg-yellow-500/90 px-3 py-2 rounded-lg text-sm text-white">
                Expires Soon
              </div>
            ) : (
              <div className="absolute top-4 left-4 bg-green-500/90 px-3 py-2 rounded-lg text-sm text-white">
                Active
              </div>
            )}
          </div>
        </Card>

        {/* Certificate details */}
        <Card className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{certificate.name}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <IconBuilding className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Issuer</p>
                  <p className="text-white">{certificate.issuer}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <IconCalendar className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Issue Date</p>
                  <p className="text-white">{new Date(certificate.issueDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <IconCalendar className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Expiration Date</p>
                  <p className={`${isExpired ? 'text-red-400' : isExpiringSoon ? 'text-yellow-400' : 'text-white'}`}>
                    {new Date(certificate.expirationDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <IconId className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Certificate ID</p>
                  <p className="text-white font-mono">{certificate.serialNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <IconTag className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Tags</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {certificate.tags.map((tag: string) => (
                      <span key={tag} className="bg-neutral-800 text-xs px-2 py-1 rounded-full text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              leftIcon={<IconDownload className="h-5 w-5" />}
              onClick={handleDownload}
              fullWidth
            >
              Download Certificate
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                leftIcon={<IconShare className="h-5 w-5" />}
                onClick={handleShare}
              >
                Share
              </Button>
              <Button 
                variant="danger"
                leftIcon={<IconTrash className="h-5 w-5" />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Certificate description */}
      <Card>
        <h3 className="text-xl font-bold text-white mb-4">Description</h3>
        <p className="text-gray-300">{certificate.description}</p>
      </Card>
    </PageTransition>
  );
};

export default CertificateDetail;
