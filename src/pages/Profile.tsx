import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import PageTransition from "../components/common/PageTransition";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconSchool,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandFacebook,
  IconEdit,
  IconUpload,
  IconDownload,
  IconTrash,
  IconPlus,
  IconCheck,
  IconX,
  IconWorld,
  IconCalendar,
  IconBuildingSkyscraper,
  IconCertificate,
  IconAward,
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconShare,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

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

const Profile = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "education" | "experience" | "skills">("overview");
  const [profileCompletion, setProfileCompletion] = useState(75); // Mock completion percentage
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Experienced software engineer with a passion for building innovative solutions. Specialized in web development, machine learning, and cloud computing.",
    title: "Senior Software Engineer",
    company: "Google",
    website: "https://johndoe.dev",
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
      facebook: "https://facebook.com/johndoe"
    },
    isPublic: true
  });

  // Mock data for education, experience, and skills
  const [education, setEducation] = useState(educationData);
  const [experience, setExperience] = useState(experienceData);
  const [skills, setSkills] = useState(skillsData);

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      if (user) {
        setProfileData(prev => ({
          ...prev,
          name: user.name,
          email: user.email
        }));
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        showToast("success", "Profile picture updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to an API
    setIsEditing(false);
    showToast("success", "Profile updated successfully");
  };

  const handleGenerateResume = () => {
    showToast("success", "Resume generated and downloading...");
    // In a real app, this would generate and download a PDF
  };

  const handleTogglePublicProfile = () => {
    setProfileData(prev => ({
      ...prev,
      isPublic: !prev.isPublic
    }));
    showToast("success", `Profile visibility set to ${!profileData.isPublic ? "public" : "private"}`);
  };

  const handleViewPublicProfile = () => {
    // In a real app, this would navigate to the public profile view
    showToast("info", "Viewing public profile");
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            My Profile
          </h1>
          <p className="text-gray-400 mt-1">Manage your personal and professional information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                leftIcon={<IconX className="h-5 w-5" />}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                leftIcon={<IconCheck className="h-5 w-5" />}
                onClick={handleSaveProfile}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                leftIcon={<IconEdit className="h-5 w-5" />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
              <Button
                leftIcon={<IconDownload className="h-5 w-5" />}
                onClick={handleGenerateResume}
              >
                Generate Resume
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Profile Completion */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Profile Completion</h2>
            <p className="text-gray-400 text-sm">Complete your profile to maximize visibility</p>
          </div>
          <div className="text-2xl font-bold text-white">{profileCompletion}%</div>
        </div>
        <div className="w-full bg-neutral-700 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${profileCompletion}%` }}
          ></div>
        </div>
      </Card>

      {/* Profile Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <Card className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="h-32 w-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold overflow-hidden">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt={profileData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  profileData.name.charAt(0).toUpperCase()
                )}
              </div>
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="profile-picture-upload" className="cursor-pointer">
                    <div className="bg-primary text-white p-2 rounded-full">
                      <IconUpload className="h-5 w-5" />
                    </div>
                    <input
                      id="profile-picture-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold text-white mb-1">{profileData.name}</h2>
            <p className="text-gray-300 mb-2">{profileData.title}</p>
            <p className="text-gray-400 text-sm mb-4">{profileData.company}</p>

            <div className="flex gap-3 mb-6">
              {Object.entries(profileData.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
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

            <div className="w-full space-y-4">
              <div className="flex items-center">
                <IconMail className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-300">{profileData.email}</span>
              </div>
              <div className="flex items-center">
                <IconPhone className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-300">{profileData.phone}</span>
              </div>
              <div className="flex items-center">
                <IconMapPin className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-300">{profileData.location}</span>
              </div>
              <div className="flex items-center">
                <IconWorld className="h-5 w-5 text-gray-400 mr-3" />
                <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {profileData.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>

            <div className="w-full mt-6 pt-6 border-t border-neutral-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300 font-medium">Public Profile</span>
                <button
                  onClick={handleTogglePublicProfile}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${profileData.isPublic ? 'bg-primary justify-end' : 'bg-neutral-700 justify-start'}`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"></div>
                </button>
              </div>
              {profileData.isPublic && (
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<IconExternalLink className="h-5 w-5" />}
                  onClick={handleViewPublicProfile}
                >
                  View Public Profile
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Main Content Area */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-neutral-700">
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'overview'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'education'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('education')}
            >
              Education
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'experience'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'skills'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">About Me</h3>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-3 text-white"
                      rows={5}
                    />
                  ) : (
                    <p className="text-gray-300">{profileData.bio}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Certificates & Awards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-4 bg-neutral-800 rounded-md">
                      <IconCertificate className="h-10 w-10 text-primary mr-4" />
                      <div>
                        <p className="text-white font-medium">12 Certificates</p>
                        <p className="text-gray-400 text-sm">View all your certificates</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-neutral-800 rounded-md">
                      <IconAward className="h-10 w-10 text-amber-500 mr-4" />
                      <div>
                        <p className="text-white font-medium">5 Awards</p>
                        <p className="text-gray-400 text-sm">View all your awards</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-start p-3 bg-neutral-800 rounded-md">
                      <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                        <IconCertificate className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white">Added a new certificate</p>
                        <p className="text-gray-400 text-sm">React Advanced - 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-neutral-800 rounded-md">
                      <div className="bg-green-500/20 p-2 rounded-full mr-3">
                        <IconShare className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white">Shared a certificate</p>
                        <p className="text-gray-400 text-sm">Web Development Bootcamp - 5 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Education History</h3>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<IconPlus className="h-4 w-4" />}
                      onClick={() => showToast("info", "Add education functionality would be implemented here")}
                    >
                      Add Education
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-primary pl-4 pb-6">
                      <div className="flex justify-between">
                        <h4 className="text-white font-medium">{edu.institution}</h4>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<IconEdit className="h-4 w-4" />}
                            onClick={() => showToast("info", "Edit education functionality would be implemented here")}
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                      <p className="text-primary">{edu.degree}</p>
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

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Work Experience</h3>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<IconPlus className="h-4 w-4" />}
                      onClick={() => showToast("info", "Add experience functionality would be implemented here")}
                    >
                      Add Experience
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-primary pl-4 pb-6">
                      <div className="flex justify-between">
                        <h4 className="text-white font-medium">{exp.position}</h4>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<IconEdit className="h-4 w-4" />}
                            onClick={() => showToast("info", "Edit experience functionality would be implemented here")}
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center">
                        <IconBuildingSkyscraper className="h-4 w-4 text-primary mr-1" />
                        <p className="text-primary">{exp.company}</p>
                      </div>
                      <div className="flex items-center mt-2 text-gray-400 text-sm">
                        <IconCalendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
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

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Skills & Expertise</h3>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<IconPlus className="h-4 w-4" />}
                      onClick={() => showToast("info", "Add skill functionality would be implemented here")}
                    >
                      Add Skill
                    </Button>
                  )}
                </div>

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
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Profile;
