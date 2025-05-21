import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  IconDownload,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconMail,
  IconCalendar,
  IconBuilding,
  IconCertificate,
  IconUser,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

// Mock certificate data
const certificateData = {
  id: "cert123",
  name: "Web Development Bootcamp",
  issuer: "Udemy",
  issueDate: "2023-05-15",
  expirationDate: "2025-05-15",
  recipientName: "John Doe",
  description: "A comprehensive bootcamp covering HTML, CSS, JavaScript, and more. This certificate validates proficiency in modern web development technologies and best practices.",
  skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
  image: "https://via.placeholder.com/800x600?text=Certificate",
  issuerLogo: "https://via.placeholder.com/100x100?text=Udemy",
};

const PublicCertificateView = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [certificate, setCertificate] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would fetch the certificate data from an API
    const timer = setTimeout(() => {
      setCertificate(certificateData);
      setIsLoading(false);
      
      // In a real app, this would record a view
      // recordView(id);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-900">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Certificate Not Found</h1>
          <p className="text-gray-300 mb-6">
            The certificate you're looking for doesn't exist or has been removed.
          </p>
          <Button href="/">Return Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <Card className="overflow-hidden">
          {/* Certificate Header */}
          <div className="bg-neutral-800 p-6 border-b border-neutral-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-neutral-700 flex items-center justify-center mr-4">
                  <IconCertificate className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-white">{certificate.name}</h1>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    <IconBuilding className="h-4 w-4 mr-1" />
                    <span>{certificate.issuer}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<IconDownload className="h-4 w-4" />}
                >
                  Download
                </Button>
                <Button
                  size="sm"
                  leftIcon={<IconBrandLinkedin className="h-4 w-4" />}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Certificate Image */}
          <div className="p-6 flex justify-center bg-neutral-900">
            <img
              src={certificate.image}
              alt={certificate.name}
              className="max-w-full h-auto border border-neutral-700 rounded shadow-lg"
            />
          </div>

          {/* Certificate Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Certificate Details</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <IconUser className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Recipient</p>
                      <p className="text-white">{certificate.recipientName}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <IconCalendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Issue Date</p>
                      <p className="text-white">{certificate.issueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <IconCalendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-400">Expiration Date</p>
                      <p className="text-white">{certificate.expirationDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Description</h2>
                <p className="text-gray-300">{certificate.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card className="p-4 bg-neutral-800">
                <h2 className="text-lg font-semibold text-white mb-4">Issuer Information</h2>
                <div className="flex justify-center mb-4">
                  <img
                    src={certificate.issuerLogo}
                    alt={certificate.issuer}
                    className="h-20 w-20 object-contain"
                  />
                </div>
                <p className="text-center text-white font-medium mb-1">{certificate.issuer}</p>
                <p className="text-center text-gray-400 text-sm mb-4">Verified Issuer</p>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Share this Certificate</h3>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2"
                      aria-label="Share on LinkedIn"
                    >
                      <IconBrandLinkedin className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2"
                      aria-label="Share on Twitter"
                    >
                      <IconBrandTwitter className="h-5 w-5 text-blue-400" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2"
                      aria-label="Share on Facebook"
                    >
                      <IconBrandFacebook className="h-5 w-5 text-blue-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-2"
                      aria-label="Share via Email"
                    >
                      <IconMail className="h-5 w-5 text-gray-400" />
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  This certificate was shared via CertManager.
                  <br />
                  <a href="/" className="text-primary hover:underline">
                    Create your own certificate portfolio
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PublicCertificateView;
