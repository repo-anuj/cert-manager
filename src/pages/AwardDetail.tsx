import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  IconArrowLeft, 
  IconCalendar, 
  IconTrophy, 
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

// Mock award data - would be replaced with actual data fetching
const awards = [
  {
    id: 1,
    name: "Employee of the Month",
    issuer: "ABC Corporation",
    dateReceived: "2023-10-15",
    category: "professional",
    tags: ["achievement", "leadership", "excellence"],
    description: "Awarded for exceptional performance and leadership in the development team. This recognition highlights outstanding contributions to project success and team collaboration. The award acknowledges consistent high-quality work, meeting deadlines, and going above and beyond expectations.",
    thumbnail: "https://via.placeholder.com/800x600?text=Employee+Award",
    imageUrl: "https://via.placeholder.com/800x600?text=Employee+Award"
  },
  {
    id: 2,
    name: "Best Speaker",
    issuer: "Tech Conference 2023",
    dateReceived: "2023-08-22",
    category: "speaking",
    tags: ["public speaking", "technology", "conference"],
    description: "Recognized as the best speaker at the annual technology conference for the presentation on AI innovations. This award is given to the presenter who demonstrates exceptional communication skills, deep subject knowledge, and audience engagement. The selection is based on attendee feedback and expert panel evaluation.",
    thumbnail: "https://via.placeholder.com/800x600?text=Speaker+Award",
    imageUrl: "https://via.placeholder.com/800x600?text=Speaker+Award"
  },
  {
    id: 3,
    name: "Innovation Award",
    issuer: "Industry Association",
    dateReceived: "2023-06-10",
    category: "innovation",
    tags: ["innovation", "technology", "research"],
    description: "Awarded for developing an innovative solution that significantly improved process efficiency. This prestigious recognition is given to individuals or teams who demonstrate exceptional creativity and problem-solving skills. The award acknowledges the practical application of innovative ideas that create measurable business value.",
    thumbnail: "https://via.placeholder.com/800x600?text=Innovation+Award",
    imageUrl: "https://via.placeholder.com/800x600?text=Innovation+Award"
  },
  {
    id: 4,
    name: "Community Service Recognition",
    issuer: "Local Community Foundation",
    dateReceived: "2023-04-05",
    category: "community",
    tags: ["volunteer", "community", "service"],
    description: "Recognized for outstanding contribution to community development and volunteer work. This award celebrates individuals who dedicate their time and skills to improve the lives of others in the community. The recognition highlights the importance of social responsibility and giving back to society through meaningful volunteer activities.",
    thumbnail: "https://via.placeholder.com/800x600?text=Community+Award",
    imageUrl: "https://via.placeholder.com/800x600?text=Community+Award"
  },
  {
    id: 5,
    name: "Academic Excellence",
    issuer: "University of Technology",
    dateReceived: "2023-05-18",
    category: "academic",
    tags: ["education", "research", "scholarship"],
    description: "Awarded for maintaining exceptional academic standards and research contributions. This honor recognizes students who demonstrate outstanding scholastic achievement, intellectual curiosity, and commitment to academic growth. Recipients of this award consistently perform at the highest levels across all academic disciplines and contribute to the advancement of knowledge through research.",
    thumbnail: "https://via.placeholder.com/800x600?text=Academic+Award",
    imageUrl: "https://via.placeholder.com/800x600?text=Academic+Award"
  },
];

const AwardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [award, setAward] = useState<any>(null);

  useEffect(() => {
    // Simulate API call to fetch award details
    const timer = setTimeout(() => {
      const foundAward = awards.find(award => award.id === Number(id));
      
      if (foundAward) {
        setAward(foundAward);
      } else {
        showToast("error", "Award not found");
        navigate("/dashboard/awards");
      }
      
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);

  const handleDelete = () => {
    // In a real app, this would call an API to delete the award
    showToast("success", "Award deleted successfully");
    navigate("/dashboard/awards");
  };

  const handleShare = () => {
    showToast("success", "Award sharing link copied to clipboard");
  };

  const handleDownload = () => {
    showToast("info", "Award image downloading...");
    // In a real app, this would trigger a file download
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!award) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold text-white mb-4">Award not found</h2>
        <Button onClick={() => navigate("/dashboard/awards")}>
          Back to Awards
        </Button>
      </div>
    );
  }

  return (
    <PageTransition className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard/awards")}
          className="mr-4"
        >
          <IconArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">Award Details</h1>
      </div>

      {/* Award preview and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Award image preview */}
        <Card className="lg:col-span-2 overflow-hidden p-0">
          <div className="relative">
            <img 
              src={award.imageUrl} 
              alt={award.name} 
              className="w-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-neutral-900/80 px-3 py-2 rounded-lg text-sm text-white">
              {award.category}
            </div>
            <div className="absolute top-4 left-4 bg-amber-500/90 px-3 py-2 rounded-lg text-sm text-white flex items-center">
              <IconTrophy className="h-4 w-4 mr-1" />
              Award
            </div>
          </div>
        </Card>

        {/* Award details */}
        <Card className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">{award.name}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <IconBuilding className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Issuing Organization</p>
                  <p className="text-white">{award.issuer}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <IconCalendar className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Date Received</p>
                  <p className="text-white">{new Date(award.dateReceived).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <IconTag className="h-5 w-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Tags</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {award.tags.map((tag: string) => (
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
              Download Award Image
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

      {/* Award description */}
      <Card>
        <h3 className="text-xl font-bold text-white mb-4">Description</h3>
        <p className="text-gray-300">{award.description}</p>
      </Card>
    </PageTransition>
  );
};

export default AwardDetail;
