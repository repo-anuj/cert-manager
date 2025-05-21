import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import {
  IconEye,
  IconShare,
  IconTrash,
  IconAward,
  IconSearch,
  IconAlertTriangle
} from "@tabler/icons-react";
import PageTransition from "../components/common/PageTransition";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useToast } from "../context/ToastContext";

const Certificates = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const { showToast } = useToast();

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const searchParam = params.get("search");
    const sortParam = params.get("sort");

    if (categoryParam) setFilter(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
    if (sortParam) setSortOption(sortParam);
  }, [location.search]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Only show toast on initial load, not on re-renders
      if (isLoading) {
        showToast("info", "Certificates loaded successfully");
      }
    }, 800);

    return () => clearTimeout(timer);
    // Remove showToast from dependencies to prevent infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mock certificates data with more details
  const certificates = [
    {
      id: 1,
      name: "Web Development Bootcamp",
      issuer: "Udemy",
      issueDate: "2023-05-15",
      expirationDate: "2025-05-15",
      category: "development",
      tags: ["web", "javascript", "html", "css"],
      status: "active",
      description: "A comprehensive bootcamp covering HTML, CSS, JavaScript, and more.",
      thumbnail: "https://via.placeholder.com/300x200?text=Web+Development"
    },
    {
      id: 2,
      name: "React Advanced",
      issuer: "Frontend Masters",
      issueDate: "2023-07-22",
      expirationDate: "2025-07-22",
      category: "development",
      tags: ["react", "javascript", "frontend"],
      status: "active",
      description: "Advanced React patterns, hooks, and performance optimization techniques.",
      thumbnail: "https://via.placeholder.com/300x200?text=React+Advanced"
    },
    {
      id: 3,
      name: "UI/UX Design Fundamentals",
      issuer: "Coursera",
      issueDate: "2023-09-10",
      expirationDate: "2025-09-10",
      category: "design",
      tags: ["ui", "ux", "design", "figma"],
      status: "active",
      description: "Learn the fundamentals of UI/UX design, including user research and prototyping.",
      thumbnail: "https://via.placeholder.com/300x200?text=UI/UX+Design"
    },
    {
      id: 4,
      name: "Project Management Professional",
      issuer: "PMI",
      issueDate: "2023-03-05",
      expirationDate: "2024-03-05",
      category: "business",
      tags: ["project management", "agile", "scrum"],
      status: "expired",
      description: "Professional certification for project managers covering all aspects of project management.",
      thumbnail: "https://via.placeholder.com/300x200?text=Project+Management"
    },
    {
      id: 5,
      name: "Data Science Specialization",
      issuer: "DataCamp",
      issueDate: "2023-08-18",
      expirationDate: "2025-08-18",
      category: "data",
      tags: ["data science", "python", "machine learning", "statistics"],
      status: "active",
      description: "Comprehensive data science program covering statistics, machine learning, and data visualization.",
      thumbnail: "https://via.placeholder.com/300x200?text=Data+Science"
    },
  ];

  // Check for expiring certificates (within 30 days)
  const checkExpiringCertificates = () => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const expiring = certificates.filter(cert => {
      if (cert.status === "expired") return false;
      const expirationDate = new Date(cert.expirationDate);
      return expirationDate > now && expirationDate < thirtyDaysFromNow;
    });

    if (expiring.length > 0) {
      showToast("warning", `You have ${expiring.length} certificate(s) expiring soon`);
    }
  };

  // Call once when component mounts
  useEffect(() => {
    if (!isLoading) {
      checkExpiringCertificates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Search and filter certificates
  const processedCertificates = useMemo(() => {
    // First filter by category
    let result = filter === "all"
      ? [...certificates]
      : certificates.filter(cert => cert.category === filter);

    // Then filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(cert =>
        cert.name.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.description.toLowerCase().includes(query) ||
        cert.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Then sort
    switch (sortOption) {
      case "newest":
        return result.sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
      case "oldest":
        return result.sort((a, b) => new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime());
      case "name-asc":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return result.sort((a, b) => b.name.localeCompare(a.name));
      case "expiring-soon":
        return result.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
      default:
        return result;
    }
  }, [certificates, filter, searchQuery, sortOption]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (filter !== "all") params.set("category", filter);
    if (sortOption !== "newest") params.set("sort", sortOption);

    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  // Handle certificate click to view details
  const handleCertificateClick = (id: number) => {
    navigate(`/dashboard/certificates/${id}`);
  };

  return (
    <PageTransition className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">My Certificates</h1>
          <p className="text-gray-400 mt-1">View and manage all your certificates</p>
        </div>
        <Button
          href="/dashboard/add-certificate"
          leftIcon={<IconAward className="h-5 w-5" />}
          fullWidth={true}
          className="sm:w-auto"
        >
          Add Certificate
        </Button>
      </div>

      {/* Search and sort controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IconSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-3 pl-10 text-sm text-white border border-gray-700 rounded-lg bg-neutral-900 focus:ring-primary focus:border-primary"
                placeholder="Search certificates by name, issuer, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </form>
        </div>
        <div className="relative">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-400 mb-1">
            Sort by
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="block w-full p-3 text-sm text-white border border-gray-700 rounded-lg bg-neutral-900 focus:ring-primary focus:border-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="expiring-soon">Expiring Soon</option>
          </select>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="overflow-x-auto pb-1">
        <div className="flex space-x-1 sm:space-x-2 border-b border-gray-700 min-w-max">
          <Button
            variant={filter === "all" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "all" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "development" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "development" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("development")}
          >
            Development
          </Button>
          <Button
            variant={filter === "design" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "design" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("design")}
          >
            Design
          </Button>
          <Button
            variant={filter === "business" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "business" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("business")}
          >
            Business
          </Button>
          <Button
            variant={filter === "data" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "data" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("data")}
          >
            Data
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-gray-400 text-sm">
        Showing {processedCertificates.length} certificate{processedCertificates.length !== 1 ? 's' : ''}
        {searchQuery && <span> matching "<span className="text-primary">{searchQuery}</span>"</span>}
      </div>

      {/* Certificates grid */}
      {processedCertificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <IconSearch className="h-16 w-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No certificates found</h3>
          <p className="text-gray-400 text-center max-w-md mb-6">
            We couldn't find any certificates matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <Button onClick={() => {
            setSearchQuery("");
            setFilter("all");
            setSortOption("newest");
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {processedCertificates.map((cert) => {
            // Check if certificate is expiring soon (within 30 days)
            const now = new Date();
            const expirationDate = new Date(cert.expirationDate);
            const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            const isExpiringSoon = cert.status !== "expired" && expirationDate > now && expirationDate < thirtyDaysFromNow;

            return (
              <Card key={cert.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => handleCertificateClick(cert.id)}>
                <div className="relative">
                  <img
                    src={cert.thumbnail}
                    alt={cert.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-neutral-900/80 px-2 py-1 rounded text-xs text-white">
                    {cert.category}
                  </div>
                  {cert.status === 'active' ? (
                    isExpiringSoon ? (
                      <div className="absolute top-2 left-2 bg-yellow-500/80 px-2 py-1 rounded-full flex items-center">
                        <IconAlertTriangle className="h-3 w-3 text-white mr-1" />
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    ) : (
                      <div className="absolute top-2 left-2 bg-green-500/80 px-2 py-1 rounded-full">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                    )
                  ) : (
                    <div className="absolute top-2 left-2 bg-red-500/80 px-2 py-1 rounded-full">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white truncate">{cert.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-gray-300">{cert.issuer}</p>
                    <p className="text-xs text-gray-400">Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {cert.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-neutral-800 text-xs px-2 py-0.5 rounded-full text-gray-300">
                        {tag}
                      </span>
                    ))}
                    {cert.tags.length > 3 && (
                      <span className="bg-neutral-800 text-xs px-2 py-0.5 rounded-full text-gray-300">
                        +{cert.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{cert.description}</p>

                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="View certificate"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        handleCertificateClick(cert.id);
                      }}
                    >
                      <IconEye className="h-5 w-5 text-primary" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label="Share certificate"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        showToast("error", `Certificate deleted: ${cert.name}`);
                      }}
                    >
                      <IconTrash className="h-5 w-5 text-red-400" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </PageTransition>
  );
};

export default Certificates;
