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
  IconSortAscending, 
  IconSortDescending,
  IconCalendar,
  IconTrophy
} from "@tabler/icons-react";
import PageTransition from "../components/common/PageTransition";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useToast } from "../context/ToastContext";

const Awards = () => {
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
        showToast("info", "Awards loaded successfully");
      }
    }, 800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mock awards data
  const awards = [
    {
      id: 1,
      name: "Employee of the Month",
      issuer: "ABC Corporation",
      dateReceived: "2023-10-15",
      category: "professional",
      tags: ["achievement", "leadership", "excellence"],
      description: "Awarded for exceptional performance and leadership in the development team.",
      thumbnail: "https://via.placeholder.com/300x200?text=Employee+Award"
    },
    {
      id: 2,
      name: "Best Speaker",
      issuer: "Tech Conference 2023",
      dateReceived: "2023-08-22",
      category: "speaking",
      tags: ["public speaking", "technology", "conference"],
      description: "Recognized as the best speaker at the annual technology conference for the presentation on AI innovations.",
      thumbnail: "https://via.placeholder.com/300x200?text=Speaker+Award"
    },
    {
      id: 3,
      name: "Innovation Award",
      issuer: "Industry Association",
      dateReceived: "2023-06-10",
      category: "innovation",
      tags: ["innovation", "technology", "research"],
      description: "Awarded for developing an innovative solution that significantly improved process efficiency.",
      thumbnail: "https://via.placeholder.com/300x200?text=Innovation+Award"
    },
    {
      id: 4,
      name: "Community Service Recognition",
      issuer: "Local Community Foundation",
      dateReceived: "2023-04-05",
      category: "community",
      tags: ["volunteer", "community", "service"],
      description: "Recognized for outstanding contribution to community development and volunteer work.",
      thumbnail: "https://via.placeholder.com/300x200?text=Community+Award"
    },
    {
      id: 5,
      name: "Academic Excellence",
      issuer: "University of Technology",
      dateReceived: "2023-05-18",
      category: "academic",
      tags: ["education", "research", "scholarship"],
      description: "Awarded for maintaining exceptional academic standards and research contributions.",
      thumbnail: "https://via.placeholder.com/300x200?text=Academic+Award"
    },
  ];

  // Search and filter awards
  const processedAwards = useMemo(() => {
    // First filter by category
    let result = filter === "all" 
      ? [...awards]
      : awards.filter(award => award.category === filter);
    
    // Then filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(award => 
        award.name.toLowerCase().includes(query) ||
        award.issuer.toLowerCase().includes(query) ||
        award.description.toLowerCase().includes(query) ||
        award.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Then sort
    switch (sortOption) {
      case "newest":
        return result.sort((a, b) => new Date(b.dateReceived).getTime() - new Date(a.dateReceived).getTime());
      case "oldest":
        return result.sort((a, b) => new Date(a.dateReceived).getTime() - new Date(b.dateReceived).getTime());
      case "name-asc":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return result.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return result;
    }
  }, [awards, filter, searchQuery, sortOption]);

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

  // Handle award click to view details
  const handleAwardClick = (id: number) => {
    navigate(`/dashboard/awards/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <PageTransition className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">My Awards</h1>
          <p className="text-gray-400 mt-1">View and manage all your awards and recognitions</p>
        </div>
        <Button
          href="/dashboard/add-award"
          leftIcon={<IconTrophy className="h-5 w-5" />}
          fullWidth={true}
          className="sm:w-auto"
        >
          Add Award
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
                placeholder="Search awards by name, issuer, or tags..."
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
            variant={filter === "professional" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "professional" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("professional")}
          >
            Professional
          </Button>
          <Button
            variant={filter === "academic" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "academic" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("academic")}
          >
            Academic
          </Button>
          <Button
            variant={filter === "speaking" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "speaking" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("speaking")}
          >
            Speaking
          </Button>
          <Button
            variant={filter === "innovation" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "innovation" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("innovation")}
          >
            Innovation
          </Button>
          <Button
            variant={filter === "community" ? "ghost" : "ghost"}
            size="sm"
            className={`${filter === "community" ? "border-b-2 border-primary text-primary" : "text-gray-300 hover:text-white border-b-2 border-transparent"}`}
            onClick={() => setFilter("community")}
          >
            Community
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-gray-400 text-sm">
        Showing {processedAwards.length} award{processedAwards.length !== 1 ? 's' : ''}
        {searchQuery && <span> matching "<span className="text-primary">{searchQuery}</span>"</span>}
      </div>

      {/* Awards grid */}
      {processedAwards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <IconSearch className="h-16 w-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No awards found</h3>
          <p className="text-gray-400 text-center max-w-md mb-6">
            We couldn't find any awards matching your search criteria. Try adjusting your filters or search terms.
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
          {processedAwards.map((award) => (
            <Card key={award.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => handleAwardClick(award.id)}>
              <div className="relative">
                <img
                  src={award.thumbnail}
                  alt={award.name}
                  className="w-full h-40 object-cover"
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
                <div className="flex justify-between items-center mt-1">
                  <p className="text-gray-300">{award.issuer}</p>
                  <p className="text-xs text-gray-400">Received: {new Date(award.dateReceived).toLocaleDateString()}</p>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {award.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-neutral-800 text-xs px-2 py-0.5 rounded-full text-gray-300">
                      {tag}
                    </span>
                  ))}
                  {award.tags.length > 3 && (
                    <span className="bg-neutral-800 text-xs px-2 py-0.5 rounded-full text-gray-300">
                      +{award.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">{award.description}</p>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="View award"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleAwardClick(award.id);
                    }}
                  >
                    <IconEye className="h-5 w-5 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Share award"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
      )}
    </PageTransition>
  );
};

export default Awards;
