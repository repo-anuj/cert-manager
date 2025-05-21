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
  IconFileText
} from "@tabler/icons-react";
import PageTransition from "../components/common/PageTransition";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { useToast } from "../context/ToastContext";

// Define certificate categories
const CATEGORIES = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "data", label: "Data" },
  { value: "other", label: "Other" }
];

// Define common tags for suggestions
const COMMON_TAGS = [
  "javascript", "react", "web", "html", "css", "python", "design", "ui", "ux",
  "figma", "project management", "agile", "scrum", "data science", "machine learning",
  "statistics", "frontend", "backend", "fullstack", "mobile", "cloud", "aws", "azure"
];

const AddCertificate = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [form, setForm] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expirationDate: "",
    serialNumber: "",
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
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      showToast("error", "Invalid file type. Please upload an image or PDF.");
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "File is too large. Maximum size is 5MB.");
      return;
    }
    
    setFile(file);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs, just show an icon
      setFilePreview(null);
    }
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
    
    if (!form.name.trim()) newErrors.name = "Certificate name is required";
    if (!form.issuer.trim()) newErrors.issuer = "Issuer is required";
    if (!form.issueDate) newErrors.issueDate = "Issue date is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!file) newErrors.file = "Certificate file is required";
    
    // Validate expiration date is after issue date if provided
    if (form.expirationDate && form.issueDate) {
      const issueDate = new Date(form.issueDate);
      const expirationDate = new Date(form.expirationDate);
      
      if (expirationDate <= issueDate) {
        newErrors.expirationDate = "Expiration date must be after issue date";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call to save certificate
      setTimeout(() => {
        showToast("success", "Certificate added successfully");
        setIsSubmitting(false);
        navigate("/dashboard/certificates");
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
          onClick={() => navigate("/dashboard/certificates")}
          className="mr-4"
        >
          <IconArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">Add Certificate</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Certificate details */}
            <div className="space-y-4">
              {/* Certificate name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Certificate Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-neutral-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="e.g. Web Development Bootcamp"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              {/* Issuer */}
              <div>
                <label htmlFor="issuer" className="block text-sm font-medium text-gray-300 mb-1">
                  Issuer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="issuer"
                  name="issuer"
                  value={form.issuer}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-neutral-800 border ${errors.issuer ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="e.g. Udemy, Coursera, University"
                />
                {errors.issuer && <p className="mt-1 text-sm text-red-500">{errors.issuer}</p>}
              </div>
              
              {/* Dates - 2 column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Issue Date */}
                <div>
                  <label htmlFor="issueDate" className="block text-sm font-medium text-gray-300 mb-1">
                    Issue Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="issueDate"
                      name="issueDate"
                      value={form.issueDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-neutral-800 border ${errors.issueDate ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    <IconCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
                  </div>
                  {errors.issueDate && <p className="mt-1 text-sm text-red-500">{errors.issueDate}</p>}
                </div>
                
                {/* Expiration Date */}
                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-300 mb-1">
                    Expiration Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="expirationDate"
                      name="expirationDate"
                      value={form.expirationDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-neutral-800 border ${errors.expirationDate ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    <IconCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
                  </div>
                  {errors.expirationDate && <p className="mt-1 text-sm text-red-500">{errors.expirationDate}</p>}
                </div>
              </div>
              
              {/* Certificate ID/Serial Number */}
              <div>
                <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-300 mb-1">
                  Certificate ID/Serial Number
                </label>
                <input
                  type="text"
                  id="serialNumber"
                  name="serialNumber"
                  value={form.serialNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-neutral-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. WD-12345-BOOT"
                />
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
                  Certificate File <span className="text-red-500">*</span>
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
                    accept="image/jpeg,image/png,image/gif,application/pdf"
                  />
                  
                  {file ? (
                    <div className="space-y-2">
                      {filePreview ? (
                        <div className="relative mx-auto w-full max-w-xs">
                          <img
                            src={filePreview}
                            alt="Certificate preview"
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
                      ) : (
                        <div className="relative mx-auto w-full max-w-xs">
                          <div className="flex items-center justify-center bg-neutral-800 rounded p-4">
                            <IconFileText className="h-12 w-12 text-primary" />
                            <div className="ml-3 text-left">
                              <p className="text-white font-medium truncate">{file.name}</p>
                              <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
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
                      )}
                      <p className="text-sm text-gray-400">Click to change file</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-800">
                        <IconUpload className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-300">Drag and drop your certificate file here</p>
                        <p className="text-sm text-gray-400">or click to browse</p>
                        <p className="text-xs text-gray-500">Supports: JPG, PNG, GIF, PDF (max 5MB)</p>
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
                  placeholder="Describe what this certificate represents..."
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Submit buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/dashboard/certificates")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              leftIcon={!isSubmitting ? <IconCheck className="h-5 w-5" /> : undefined}
            >
              {isSubmitting ? "Adding Certificate..." : "Add Certificate"}
            </Button>
          </div>
        </form>
      </Card>
    </PageTransition>
  );
};

export default AddCertificate;
