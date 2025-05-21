import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  IconUser,
  IconMail,
  IconMapPin,
  IconBriefcase,
  IconSchool,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandFacebook,
  IconWorld,
  IconCalendar,
  IconBuildingSkyscraper,
  IconCertificate,
  IconAward,
  IconDownload,
  IconShare,
  IconExternalLink,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

// Mock user data
const userData = {
  id: "user-123",
  name: "John Doe",
  title: "Senior Software Engineer",
  company: "Google",
  location: "San Francisco, CA",
  email: "john.doe@example.com",
  website: "https://johndoe.dev",
  bio: "Experienced software engineer with a passion for building innovative solutions. Specialized in web development, machine learning, and cloud computing.",
  profilePicture: null,
  socialLinks: {
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
    facebook: "https://facebook.com/johndoe"
  }
};

// Mock education data
const educationData = [
  {
    id: 1,
    institution: "Stanford University",
    degree: "Master of Science in Computer Science",
    fieldOfStudy: "Artificial Intelligence",
    startDate: "2018-09-01",
    endDate: "2020-06-30",
    description: "Focused on machine learning and artificial intelligence applications.",
    location: "Stanford, CA"
  },
  {
    id: 2,
    institution: "University of California, Berkeley",
    degree: "Bachelor of Science in Computer Science",
    fieldOfStudy: "Software Engineering",
    startDate: "2014-09-01",
    endDate: "2018-05-30",
    description: "Graduated with honors. Participated in various hackathons and coding competitions.",
    location: "Berkeley, CA"
  }
];

// Mock experience data
const experienceData = [
  {
    id: 1,
    company: "Google",
    position: "Senior Software Engineer",
    startDate: "2020-07-01",
    endDate: null, // Current position
    description: "Working on machine learning infrastructure and cloud computing solutions.",
    location: "Mountain View, CA"
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Software Engineer",
    startDate: "2018-06-01",
    endDate: "2020-06-30",
    description: "Developed cloud-based solutions and worked on Azure services.",
    location: "Redmond, WA"
  }
];

// Mock skills data
const skillsData = [
  { id: 1, name: "JavaScript", level: 90 },
  { id: 2, name: "React", level: 85 },
  { id: 3, name: "TypeScript", level: 80 },
  { id: 4, name: "Node.js", level: 75 },
  { id: 5, name: "Python", level: 70 },
  { id: 6, name: "Machine Learning", level: 65 },
  { id: 7, name: "AWS", level: 60 },
  { id: 8, name: "Docker", level: 55 }
];

// Mock certificates data
const certificatesData = [
  {
    id: 1,
    name: "Web Development Bootcamp",
    issuer: "Udemy",
    date: "2023-05-15",
    thumbnail: "https://via.placeholder.com/300x200?text=Web+Development"
  },
  {
    id: 2,
    name: "React Advanced",
    issuer: "Frontend Masters",
    date: "2023-07-22",
    thumbnail: "https://via.placeholder.com/300x200?text=React+Advanced"
  },
  {
    id: 3,
    name: "UI/UX Design Fundamentals",
    issuer: "Coursera",
    date: "2023-09-10",
    thumbnail: "https://via.placeholder.com/300x200?text=UI/UX+Design"
  }
];

// Mock awards data
const awardsData = [
  {
    id: 1,
    name: "Employee of the Month",
    issuer: "ABC Corporation",
    date: "2023-10-15",
    thumbnail: "https://via.placeholder.com/300x200?text=Employee+Award"
  },
  {
    id: 2,
    name: "Best Speaker",
    issuer: "Tech Conference 2023",
    date: "2023-08-22",
    thumbnail: "https://via.placeholder.com/300x200?text=Speaker+Award"
  }
];

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "education" | "experience" | "skills" | "certificates" | "awards">("overview");

  useEffect(() => {
    // In a real app, this would fetch the user data from an API
    const timer = setTimeout(() => {
      setUser(userData);
      setEducation(educationData);
      setExperience(experienceData);
      setSkills(skillsData);
      setCertificates(certificatesData);
      setAwards(awardsData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-900">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-gray-300 mb-6">
            The profile you're looking for doesn't exist or has been set to private.
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
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mr-4">
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={user.name} 
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-400">{user.title} at {user.company}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              leftIcon={<IconDownload className="h-5 w-5" />}
            >
              Download Resume
            </Button>
            <Button
              leftIcon={<IconShare className="h-5 w-5" />}
            >
              Share Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <IconMail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-300">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <IconMapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-300">{user.location}</span>
                </div>
                <div className="flex items-center">
                  <IconWorld className="h-5 w-5 text-gray-400 mr-3" />
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {user.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-700">
                <h3 className="text-sm font-medium text-white mb-3">Connect</h3>
                <div className="flex gap-3">
                  {Object.entries(user.socialLinks).map(([platform, url]) => (
                    <a 
                      key={platform} 
                      href={url as string} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {platform === 'linkedin' && <IconBrandLinkedin className="h-5 w-5" />}
                      {platform === 'twitter' && <IconBrandTwitter className="h-5 w-5" />}
                      {platform === 'github' && <IconBrandGithub className="h-5 w-5" />}
                      {platform === 'facebook' && <IconBrandFacebook className="h-5 w-5" />}
                    </a>
                  ))}
                </div>
              </div>
            </Card>

            {/* Skills Card */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Top Skills</h2>
              <div className="space-y-3">
                {skills.slice(0, 5).map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-xs text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-neutral-700 h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => setActiveTab("skills")}
                >
                  View All Skills
                </Button>
              </div>
            </Card>

            {/* Certificates & Awards Summary */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Credentials</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IconCertificate className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-300">Certificates</span>
                  </div>
                  <span className="text-white font-medium">{certificates.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IconAward className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="text-gray-300">Awards</span>
                  </div>
                  <span className="text-white font-medium">{awards.length}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setActiveTab("certificates")}
                  >
                    Certificates
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setActiveTab("awards")}
                  >
                    Awards
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="lg:col-span-2 p-0 overflow-hidden">
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-neutral-700">
              <button
                className={`py-4 px-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`py-4 px-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'experience'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </button>
              <button
                className={`py-4 px-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'education'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
              <button
                className={`py-4 px-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'skills'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </button>
              <button
                className={`py-4 px-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'certificates'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('certificates')}
              >
                Certificates
              </button>
              <button
                className={`py-4 px-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'awards'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('awards')}
              >
                Awards
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                    <p className="text-gray-300">{user.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Current Position</h3>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-md mr-4">
                        <IconBriefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{experience[0].position}</h4>
                        <p className="text-primary">{experience[0].company}</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {new Date(experience[0].startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} - Present
                        </p>
                        <p className="text-gray-300 mt-2">{experience[0].description}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Education</h3>
                    <div className="flex items-start">
                      <div className="bg-blue-500/10 p-3 rounded-md mr-4">
                        <IconSchool className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{education[0].institution}</h4>
                        <p className="text-blue-400">{education[0].degree}</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {new Date(education[0].startDate).getFullYear()} - {new Date(education[0].endDate).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Featured Certificates</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {certificates.slice(0, 2).map((cert) => (
                        <div key={cert.id} className="bg-neutral-800 rounded-md overflow-hidden">
                          <img 
                            src={cert.thumbnail} 
                            alt={cert.name} 
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-3">
                            <h4 className="text-white font-medium">{cert.name}</h4>
                            <p className="text-gray-400 text-sm">{cert.issuer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Work Experience</h3>
                  <div className="space-y-8">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-primary pl-4">
                        <h4 className="text-white font-medium">{exp.position}</h4>
                        <div className="flex items-center">
                          <IconBuildingSkyscraper className="h-4 w-4 text-primary mr-1" />
                          <p className="text-primary">{exp.company}</p>
                        </div>
                        <div className="flex items-center mt-2 text-gray-400 text-sm">
                          <IconCalendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                            {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ' Present'}
                          </span>
                          <IconMapPin className="h-4 w-4 ml-3 mr-1" />
                          <span>{exp.location}</span>
                        </div>
                        <p className="text-gray-300 mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
                  <div className="space-y-8">
                    {education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-blue-400 pl-4">
                        <h4 className="text-white font-medium">{edu.institution}</h4>
                        <p className="text-blue-400">{edu.degree}</p>
                        <p className="text-gray-400 text-sm">{edu.fieldOfStudy}</p>
                        <div className="flex items-center mt-2 text-gray-400 text-sm">
                          <IconCalendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                          </span>
                          <IconMapPin className="h-4 w-4 ml-3 mr-1" />
                          <span>{edu.location}</span>
                        </div>
                        <p className="text-gray-300 mt-2">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Skills & Expertise</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((skill) => (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-gray-400 text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-neutral-700 h-2 rounded-full">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Certificates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="bg-neutral-800 rounded-md overflow-hidden">
                        <img 
                          src={cert.thumbnail} 
                          alt={cert.name} 
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="text-white font-medium">{cert.name}</h4>
                          <p className="text-gray-400 text-sm">{cert.issuer}</p>
                          <p className="text-gray-400 text-xs mt-1">Issued: {new Date(cert.date).toLocaleDateString()}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full"
                            leftIcon={<IconExternalLink className="h-4 w-4" />}
                          >
                            View Certificate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards Tab */}
              {activeTab === 'awards' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Awards & Recognition</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {awards.map((award) => (
                      <div key={award.id} className="bg-neutral-800 rounded-md overflow-hidden">
                        <img 
                          src={award.thumbnail} 
                          alt={award.name} 
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="text-white font-medium">{award.name}</h4>
                          <p className="text-gray-400 text-sm">{award.issuer}</p>
                          <p className="text-gray-400 text-xs mt-1">Received: {new Date(award.date).toLocaleDateString()}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full"
                            leftIcon={<IconExternalLink className="h-4 w-4" />}
                          >
                            View Award
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            This profile is powered by CertManager.
            <a href="/" className="text-primary ml-1 hover:underline">
              Create your own professional profile
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PublicProfile;
