import React, { useState, useEffect } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  MapPin,
  Clock,
  Filter,
  ChevronDown,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  logo: string;
  salary: string;
  category: string;
  isBookmarked: boolean;
}

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    posted: "2 days ago",
    logo: "https://placehold.co/100/1A1F2C/1EAEDB?text=TC",
    salary: "$120k - $150k",
    category: "Development",
    isBookmarked: false,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Designs",
    location: "New York, NY",
    type: "Contract",
    posted: "1 day ago",
    logo: "https://placehold.co/100/1A1F2C/33C3F0?text=CD",
    salary: "$95k - $110k",
    category: "Design",
    isBookmarked: false,
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "GrowthX",
    location: "Austin, TX (Hybrid)",
    type: "Full-time",
    posted: "3 days ago",
    logo: "https://placehold.co/100/1A1F2C/1EAEDB?text=GX",
    salary: "$90k - $120k",
    category: "Marketing",
    isBookmarked: true,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Remote",
    type: "Full-time",
    posted: "Just now",
    logo: "https://placehold.co/100/1A1F2C/33C3F0?text=CTS",
    salary: "$130k - $160k",
    category: "Development",
    isBookmarked: false,
  },
  {
    id: 5,
    title: "Product Manager",
    company: "Innovate Inc.",
    location: "Boston, MA",
    type: "Full-time",
    posted: "5 days ago",
    logo: "https://placehold.co/100/1A1F2C/1EAEDB?text=IN",
    salary: "$110k - $140k",
    category: "Management",
    isBookmarked: false,
  },
  {
    id: 6,
    title: "Content Writer",
    company: "Media Group",
    location: "Chicago, IL (Remote)",
    type: "Part-time",
    posted: "2 days ago",
    logo: "https://placehold.co/100/1A1F2C/33C3F0?text=MG",
    salary: "$60k - $75k",
    category: "Marketing",
    isBookmarked: false,
  },
];

const categories = [
  "All Categories",
  "Development",
  "Design",
  "Marketing",
  "Management",
  "Sales",
  "Customer Service",
];

const JobListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    // Check if we have jobs in localStorage
    const savedJobs = localStorage.getItem("gigzlrJobs");
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const { toast } = useToast();

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("gigzlrJobs", JSON.stringify(jobs));
  }, [jobs]);

  // Listen for search events from the hero section
  useEffect(() => {
    const handleSearchEvent = (e: CustomEvent) => {
      setSearchTerm(e.detail.jobQuery || "");
      setSearchLocation(e.detail.location || "");
    };

    window.addEventListener("jobsearch", handleSearchEvent as EventListener);
    return () => {
      window.removeEventListener(
        "jobsearch",
        handleSearchEvent as EventListener
      );
    };
  }, []);

  const toggleBookmark = (id: number) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );

    // Show toast notification
    toast({
      title: jobs.find((job) => job.id === id)?.isBookmarked
        ? "Job removed from bookmarks"
        : "Job added to bookmarks",
      description: jobs.find((job) => job.id === id)?.title,
    });
  };

  const filterJobs = (category: string) => {
    setSelectedCategory(category);
  };

  const openJobDetails = (job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleApplyNow = () => {
    setShowModal(false);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowApplicationModal(false);

    toast({
      title: "Application Submitted",
      description: `Your application for ${selectedJob?.title} at ${selectedJob?.company} has been submitted successfully.`,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied through the filteredJobs logic
  };

  // Filter jobs based on search terms, location, and category
  const filteredJobs = jobs.filter((job) => {
    // Category filter
    const matchesCategory =
      selectedCategory === "All Categories" ||
      job.category === selectedCategory;

    // Search term filter
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Location filter
    const matchesLocation =
      searchLocation === "" ||
      job.location.toLowerCase().includes(searchLocation.toLowerCase());

    return matchesCategory && matchesSearch && matchesLocation;
  });

  return (
    <section id="jobs" className="py-20 bg-gigzlr-dark">
      <div className="container">
        <h2 className="text-4xl font-bold mb-2 text-center animate-on-scroll">
          Latest <span className="text-gigzlr-blue">Job Openings</span>
        </h2>
        <p className="text-xl text-gigzlr-gray text-center mb-12 animate-on-scroll">
          Find the perfect role for your next career move
        </p>

        <div className="row mb-8 animate-on-scroll">
          <div className="col-md-6 mb-4 mb-md-0">
            <form onSubmit={handleSearch}>
              <div className="bg-gigzlr-charcoal p-2 rounded-lg flex items-center">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="flex-grow bg-transparent border-0 px-4 py-2 focus:outline-none text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn-gigzlr">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="dropdown">
              <button
                className="btn bg-gigzlr-charcoal text-white w-full d-flex justify-content-between align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <Filter size={16} className="mr-2" />
                  {selectedCategory}
                </span>
                <ChevronDown size={16} />
              </button>
              <ul className="dropdown-menu bg-gigzlr-charcoal w-100">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      className={`dropdown-item text-white hover:bg-gigzlr-charcoal-light ${
                        selectedCategory === category
                          ? "bg-gigzlr-blue bg-opacity-30"
                          : ""
                      }`}
                      onClick={() => filterJobs(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gigzlr-gray">
              No jobs found matching your criteria. Try adjusting your search.
            </p>
          </div>
        ) : (
          <div className="row">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="col-md-6 col-lg-4 mb-4 animate-on-scroll"
              >
                <div className="job-card h-100">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-12 h-12 rounded-lg mr-3"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {job.title}
                        </h3>
                        <p className="text-gigzlr-gray">{job.company}</p>
                      </div>
                    </div>
                    <button
                      className="text-gigzlr-blue bg-transparent border-0"
                      onClick={() => toggleBookmark(job.id)}
                      aria-label={
                        job.isBookmarked ? "Remove bookmark" : "Add bookmark"
                      }
                    >
                      {job.isBookmarked ? (
                        <BookmarkCheck size={20} className="fill-gigzlr-blue" />
                      ) : (
                        <Bookmark size={20} />
                      )}
                    </button>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <MapPin size={16} className="text-gigzlr-gray mr-2" />
                      <span className="text-gigzlr-gray">{job.location}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <Briefcase size={16} className="text-gigzlr-gray mr-2" />
                      <span className="text-gigzlr-gray">{job.type}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Clock size={16} className="text-gigzlr-gray mr-2" />
                      <span className="text-gigzlr-gray">{job.posted}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gigzlr-blue font-medium">
                      {job.salary}
                    </span>
                    <button
                      className="btn-gigzlr py-2 px-4"
                      onClick={() => openJobDetails(job)}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      {showModal && selectedJob && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-gigzlr-dark">
              <div className="modal-header border-gigzlr-charcoal-light">
                <h5 className="modal-title text-white">{selectedJob.title}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex align-items-center mb-4">
                  <img
                    src={selectedJob.logo}
                    alt={selectedJob.company}
                    className="w-16 h-16 rounded-lg mr-4"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedJob.title}
                    </h2>
                    <p className="text-gigzlr-gray">{selectedJob.company}</p>
                  </div>
                </div>

                <div className="bg-gigzlr-charcoal-light p-3 rounded-lg mb-4">
                  <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="d-flex align-items-center">
                        <MapPin size={18} className="text-gigzlr-blue mr-2" />
                        <div>
                          <p className="text-gigzlr-gray mb-0">Location</p>
                          <p className="text-white mb-0">
                            {selectedJob.location}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="d-flex align-items-center">
                        <Briefcase
                          size={18}
                          className="text-gigzlr-blue mr-2"
                        />
                        <div>
                          <p className="text-gigzlr-gray mb-0">Job Type</p>
                          <p className="text-white mb-0">{selectedJob.type}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <Clock size={18} className="text-gigzlr-blue mr-2" />
                        <div>
                          <p className="text-gigzlr-gray mb-0">Posted</p>
                          <p className="text-white mb-0">
                            {selectedJob.posted}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Job Description
                  </h3>
                  <p className="text-gigzlr-gray">
                    We are seeking a {selectedJob.title} to join our team at{" "}
                    {selectedJob.company}. This is an exciting opportunity to
                    work on cutting-edge projects in a dynamic environment. The
                    ideal candidate will have strong experience in their field
                    and a passion for innovation.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Requirements
                  </h3>
                  <ul className="text-gigzlr-gray">
                    <li className="mb-2">3+ years of relevant experience</li>
                    <li className="mb-2">Strong problem-solving skills</li>
                    <li className="mb-2">Excellent communication abilities</li>
                    <li className="mb-2">
                      Bachelor's degree or equivalent experience
                    </li>
                    <li>Ability to work in a fast-paced environment</li>
                  </ul>
                </div>
              </div>
              <div className="modal-footer border-gigzlr-charcoal-light">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn-gigzlr"
                  onClick={handleApplyNow}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex={-1}
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-gigzlr-dark">
              <div className="modal-header border-gigzlr-charcoal-light">
                <h5 className="modal-title text-white">
                  Apply for {selectedJob.title}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowApplicationModal(false)}
                ></button>
              </div>
              <form onSubmit={handleApplicationSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 mt-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="fullName"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 mt-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label text-white">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 mt-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="phone"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="resume" className="form-label text-white">
                      Upload Resume
                    </label>
                    <input
                      type="file"
                      className="w-full px-4 py-2 mt-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="resume"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="coverLetter"
                      className="form-label text-white"
                    >
                      Cover Letter
                    </label>
                    <textarea
                      className="w-full px-4 py-2 mt-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="coverLetter"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-gigzlr-charcoal-light">
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={() => setShowApplicationModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-gigzlr">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {(showModal || showApplicationModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </section>
  );
};

export default JobListings;
