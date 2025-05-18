import { useState } from "react";
import Card from "../components/common/Card";

const Certificates = () => {
  const [filter, setFilter] = useState("all");

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      name: "Web Development Bootcamp",
      issuer: "Udemy",
      date: "2023-05-15",
      category: "development",
      thumbnail: "https://via.placeholder.com/300x200?text=Web+Development"
    },
    {
      id: 2,
      name: "React Advanced",
      issuer: "Frontend Masters",
      date: "2023-07-22",
      category: "development",
      thumbnail: "https://via.placeholder.com/300x200?text=React+Advanced"
    },
    {
      id: 3,
      name: "UI/UX Design Fundamentals",
      issuer: "Coursera",
      date: "2023-09-10",
      category: "design",
      thumbnail: "https://via.placeholder.com/300x200?text=UI/UX+Design"
    },
    {
      id: 4,
      name: "Project Management Professional",
      issuer: "PMI",
      date: "2023-03-05",
      category: "business",
      thumbnail: "https://via.placeholder.com/300x200?text=Project+Management"
    },
    {
      id: 5,
      name: "Data Science Specialization",
      issuer: "DataCamp",
      date: "2023-08-18",
      category: "data",
      thumbnail: "https://via.placeholder.com/300x200?text=Data+Science"
    },
  ];

  // Filter certificates based on selected category
  const filteredCertificates = filter === "all"
    ? certificates
    : certificates.filter(cert => cert.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">My Certificates</h1>
          <p className="text-gray-400 mt-1">View and manage all your certificates</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          + Add Certificate
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-2 border-b border-gray-700">
        <button
          className={`px-4 py-2 ${filter === "all" ? "border-b-2 border-primary text-primary" : "text-gray-300"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 ${filter === "development" ? "border-b-2 border-primary text-primary" : "text-gray-300"}`}
          onClick={() => setFilter("development")}
        >
          Development
        </button>
        <button
          className={`px-4 py-2 ${filter === "design" ? "border-b-2 border-primary text-primary" : "text-gray-300"}`}
          onClick={() => setFilter("design")}
        >
          Design
        </button>
        <button
          className={`px-4 py-2 ${filter === "business" ? "border-b-2 border-primary text-primary" : "text-gray-300"}`}
          onClick={() => setFilter("business")}
        >
          Business
        </button>
        <button
          className={`px-4 py-2 ${filter === "data" ? "border-b-2 border-primary text-primary" : "text-gray-300"}`}
          onClick={() => setFilter("data")}
        >
          Data
        </button>
      </div>

      {/* Certificates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden">
            <img
              src={cert.thumbnail}
              alt={cert.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{cert.name}</h3>
              <p className="text-gray-300">{cert.issuer}</p>
              <p className="text-sm text-gray-400 mt-1">Issued: {cert.date}</p>
              <div className="mt-4 flex justify-between">
                <button className="text-primary hover:underline">View</button>
                <button className="text-secondary hover:underline">Share</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
