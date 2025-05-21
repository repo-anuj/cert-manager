import { useState, useRef, ChangeEvent, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  IconArrowLeft, 
  IconCalendar, 
  IconUpload, 
  IconX, 
  IconPlus,
  IconCheck,
  IconPhoto,
  IconTrophy
} from "@tabler/icons-react";
import PageTransition from "../components/common/PageTransition";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { useToast } from "../context/ToastContext";

// Define award categories
const CATEGORIES = [
  { value: "professional", label: "Professional" },
  { value: "academic", label: "Academic" },
  { value: "speaking", label: "Speaking" },
  { value: "innovation", label: "Innovation" },
  { value: "community", label: "Community" },
  { value: "other", label: "Other" }
];

// Define common tags for suggestions
const COMMON_TAGS = [
  "achievement", "leadership", "excellence", "innovation", "technology", 
  "research", "education", "community", "service", "volunteer", 
  "public speaking", "conference", "recognition", "performance", "teamwork"
];

const AddAward = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [form, setForm] = useState({
    name: "",
    issuer: "",
    dateReceived: "",
    category: "",
    description: "",
  });
  
  // Tags state
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  
  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle tag input
  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };
  
  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags(prev => [...prev, trimmedTag]);
      setTagInput("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };
  
  const addSuggestedTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags(prev => [...prev, tag]);
    }
  };
  
  // File upload handlers
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };
  
  const processFile = (file: File) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      showToast("error", "Invalid file type. Please upload an image (JPG, PNG, or GIF).");
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "File is too large. Maximum size is 5MB.");
      return;
    }
    
    setFile(file);
    
    // Create preview for images
    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.name.trim()) newErrors.name = "Award name is required";
    if (!form.issuer.trim()) newErrors.issuer = "Issuing organization is required";
    if (!form.dateReceived) newErrors.dateReceived = "Date received is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!file) newErrors.file = "Award image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call to save award
      setTimeout(() => {
        showToast("success", "Award added successfully");
        setIsSubmitting(false);
        navigate("/dashboard/awards");
      }, 1500);
    } else {
      showToast("error", "Please fix the errors in the form");
    }
  };
  
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
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">Add Award</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Award details */}
            <div className="space-y-4">
              {/* Award name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Award Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-neutral-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="e.g. Employee of the Month"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              {/* Issuer */}
              <div>
                <label htmlFor="issuer" className="block text-sm font-medium text-gray-300 mb-1">
                  Issuing Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="issuer"
                  name="issuer"
                  value={form.issuer}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-neutral-800 border ${errors.issuer ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="e.g. ABC Corporation, University"
                />
                {errors.issuer && <p className="mt-1 text-sm text-red-500">{errors.issuer}</p>}
              </div>
              
              {/* Date Received */}
              <div>
                <label htmlFor="dateReceived" className="block text-sm font-medium text-gray-300 mb-1">
                  Date Received <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="dateReceived"
                    name="dateReceived"
                    value={form.dateReceived}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-neutral-800 border ${errors.dateReceived ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  <IconCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
                </div>
                {errors.dateReceived && <p className="mt-1 text-sm text-red-500">{errors.dateReceived}</p>}
              </div>
              
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-neutral-800 border ${errors.category ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>
              
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <div key={tag} className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm flex items-center">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-primary hover:text-white"
                      >
                        <IconX className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <div className="relative">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagInputKeyDown}
                      onBlur={addTag}
                      placeholder="Add a tag..."
                      className="px-3 py-1 bg-neutral-800 border border-gray-700 rounded-full text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <IconPlus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-2">Press Enter or comma to add a tag</div>
                
                {/* Tag suggestions */}
                <div className="flex flex-wrap gap-1">
                  {COMMON_TAGS.filter(tag => !tags.includes(tag)).slice(0, 8).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addSuggestedTag(tag)}
                      className="bg-neutral-800 hover:bg-neutral-700 text-gray-300 px-2 py-0.5 rounded-full text-xs"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - File upload and description */}
            <div className="space-y-4">
              {/* File upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Award Image <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    isDragging ? 'border-primary bg-primary/10' : errors.file ? 'border-red-500 bg-red-500/10' : 'border-gray-700 hover:border-primary'
                  } transition-colors duration-200`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/jpeg,image/png,image/gif"
                  />
                  
                  {file ? (
                    <div className="space-y-2">
                      <div className="relative mx-auto w-full max-w-xs">
                        <img
                          src={filePreview || ""}
                          alt="Award preview"
                          className="max-h-40 mx-auto object-contain rounded"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <IconX className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-400">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-800">
                        <IconUpload className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-300">Drag and drop your award image here</p>
                        <p className="text-sm text-gray-400">or click to browse</p>
                        <p className="text-xs text-gray-500">Supports: JPG, PNG, GIF (max 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>
                {errors.file && <p className="mt-1 text-sm text-red-500">{errors.file}</p>}
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe what this award represents and why you received it..."
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Submit buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/dashboard/awards")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              leftIcon={!isSubmitting ? <IconCheck className="h-5 w-5" /> : undefined}
            >
              {isSubmitting ? "Adding Award..." : "Add Award"}
            </Button>
          </div>
        </form>
      </Card>
    </PageTransition>
  );
};

export default AddAward;
