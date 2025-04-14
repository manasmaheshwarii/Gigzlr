import React, { useState, useEffect } from "react";
import {
  Home,
  Briefcase,
  Bell,
  BookmarkCheck,
  User,
  LogOut,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  name: string;
  email: string;
  position?: string;
  location?: string;
  phone?: string;
  skills?: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("applications");
  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load user data
    const storedUser = localStorage.getItem("gigzlrUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        ...parsedUser,
        position: parsedUser.position || "Job Seeker",
        location: parsedUser.location || "Location not set",
        skills: parsedUser.skills || ["Add your skills"],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = () => {
    setIsLoading(true);

    // Simulate logout process
    setTimeout(() => {
      localStorage.removeItem("gigzlrUser");

      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });

      setIsLoading(false);
      onClose();

      // Dispatch logout event
      window.dispatchEvent(new Event("userLoggedOut"));
    }, 500);
  };

  const saveProfile = () => {
    setIsLoading(true);

    // Save to localStorage
    localStorage.setItem("gigzlrUser", JSON.stringify(userData));

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsLoading(false);
    }, 500);
  };

  const handleProfileChange = (field: keyof UserData, value: any) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkill = (skill: string) => {
    if (!skill.trim()) return;
    setUserData((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), skill.trim()],
    }));
  };

  const removeSkill = (skillToRemove: string) => {
    setUserData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((skill) => skill !== skillToRemove),
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "applications":
        return <ApplicationsTab />;
      case "saved":
        return <SavedJobsTab />;
      case "profile":
        return (
          <ProfileTab
            userData={userData}
            onChange={handleProfileChange}
            onSave={saveProfile}
            isLoading={isLoading}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
          />
        );
      default:
        return <ApplicationsTab />;
    }
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered modal-fullscreen">
          <div className="modal-content bg-gigzlr-dark">
            <div className="modal-header border-gigzlr-charcoal-light">
              <h5 className="modal-title text-white">Applicant Dashboard</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body p-0">
              <div className="row g-0 h-100">
                {/* Sidebar */}
                <div className="col-md-3 col-lg-2 bg-gigzlr-charcoal border-end border-gigzlr-charcoal-light">
                  <div className="p-4 text-center">
                    <div className="w-24 h-24 rounded-full bg-gigzlr-blue mx-auto mb-3 flex items-center justify-center">
                      <User size={40} className="text-white" />
                    </div>
                    <h5 className="text-white mb-1">{userData.name}</h5>
                    <p className="text-gigzlr-gray">{userData.position}</p>
                  </div>
                  <nav className="nav flex-column mt-4">
                    <button
                      className={`nav-link py-3 px-4 d-flex align-items-center ${
                        activeTab === "applications"
                          ? "bg-gigzlr-blue bg-opacity-20 text-gigzlr-blue"
                          : "text-white"
                      }`}
                      onClick={() => setActiveTab("applications")}
                    >
                      <Briefcase size={20} className="me-3" />
                      My Applications
                    </button>
                    <button
                      className={`nav-link py-3 px-4 d-flex align-items-center ${
                        activeTab === "saved"
                          ? "bg-gigzlr-blue bg-opacity-20 text-gigzlr-blue"
                          : "text-white"
                      }`}
                      onClick={() => setActiveTab("saved")}
                    >
                      <BookmarkCheck size={20} className="me-3" />
                      Saved Jobs
                    </button>
                    <button
                      className={`nav-link py-3 px-4 d-flex align-items-center ${
                        activeTab === "profile"
                          ? "bg-gigzlr-blue bg-opacity-20 text-gigzlr-blue"
                          : "text-white"
                      }`}
                      onClick={() => setActiveTab("profile")}
                    >
                      <User size={20} className="me-3" />
                      My Profile
                    </button>
                    <button
                      className="nav-link py-3 px-4 d-flex align-items-center text-white mt-auto"
                      onClick={handleLogout}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm me-3"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        <LogOut size={20} className="me-3" />
                      )}
                      Logout
                    </button>
                  </nav>
                </div>

                {/* Main Content */}
                <div className="col-md-9 col-lg-10 p-4">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

const ApplicationsTab = () => {
  const applications = [
    {
      id: 1,
      position: "Senior UX Designer",
      company: "TechCorp Inc.",
      date: "April 5, 2023",
      status: "In Review",
      statusColor: "text-yellow-500",
    },
    {
      id: 2,
      position: "UI Designer",
      company: "Creative Designs",
      date: "March 28, 2023",
      status: "Interview",
      statusColor: "text-gigzlr-blue",
    },
    {
      id: 3,
      position: "Product Designer",
      company: "Innovate Inc.",
      date: "March 20, 2023",
      status: "Rejected",
      statusColor: "text-red-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Company</th>
              <th scope="col">Date Applied</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="text-white">{app.position}</td>
                <td>{app.company}</td>
                <td>{app.date}</td>
                <td className={app.statusColor}>{app.status}</td>
                <td>
                  <button className="btn btn-outline-light btn-sm">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SavedJobsTab = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get saved jobs from localStorage
    const storedJobs = localStorage.getItem("gigzlrJobs");
    if (storedJobs) {
      const jobs = JSON.parse(storedJobs);
      const bookmarked = jobs.filter((job: any) => job.isBookmarked);
      setSavedJobs(bookmarked);
    }
  }, []);

  const handleApply = (jobId: number) => {
    toast({
      title: "Application Started",
      description: "You can now complete your application",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <div className="text-center py-8 bg-gigzlr-charcoal rounded-lg">
          <p className="text-xl text-gigzlr-gray">
            You haven't saved any jobs yet. Browse jobs and bookmark the ones
            you're interested in.
          </p>
        </div>
      ) : (
        <div className="row">
          {savedJobs.map((job: any) => (
            <div key={job.id} className="col-md-6 mb-4">
              <div className="job-card">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {job.title}
                </h3>
                <p className="text-gigzlr-gray mb-3">{job.company}</p>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-gigzlr-gray">{job.location}</span>
                  <span className="text-gigzlr-blue">{job.salary}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-gigzlr-gray">Posted {job.posted}</span>
                  <button
                    className="btn-gigzlr py-1 px-3"
                    onClick={() => handleApply(job.id)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface ProfileTabProps {
  userData: UserData;
  onChange: (field: keyof UserData, value: any) => void;
  onSave: () => void;
  isLoading: boolean;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  userData,
  onChange,
  onSave,
  isLoading,
  onAddSkill,
  onRemoveSkill,
}) => {
  const [newSkill, setNewSkill] = useState("");

  const handleSkillAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      onAddSkill(newSkill);
      setNewSkill("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="bg-gigzlr-charcoal rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <div className="mb-3">
              <label className="form-label text-white">Full Name</label>
              <input
                type="text"
                className="form-control bg-gigzlr-dark text-white"
                value={userData.name}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label text-white">Email</label>
                <input
                  type="email"
                  className="form-control bg-gigzlr-dark text-white"
                  value={userData.email}
                  onChange={(e) => onChange("email", e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label text-white">Phone</label>
                <input
                  type="tel"
                  className="form-control bg-gigzlr-dark text-white"
                  value={userData.phone || ""}
                  onChange={(e) => onChange("phone", e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Location</label>
              <input
                type="text"
                className="form-control bg-gigzlr-dark text-white"
                value={userData.location || ""}
                onChange={(e) => onChange("location", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Position</label>
              <input
                type="text"
                className="form-control bg-gigzlr-dark text-white"
                value={userData.position || ""}
                onChange={(e) => onChange("position", e.target.value)}
              />
            </div>
          </div>

          <div className="bg-gigzlr-charcoal rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold mb-3">Skills</h3>
            <form onSubmit={handleSkillAdd} className="mb-3">
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control bg-gigzlr-dark text-white me-2"
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button type="submit" className="btn-gigzlr">
                  Add
                </button>
              </div>
            </form>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {userData.skills &&
                userData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="badge bg-gigzlr-blue d-flex align-items-center"
                  >
                    {skill}
                    <button
                      className="bg-transparent border-0 text-white ms-2 p-0"
                      onClick={() => onRemoveSkill(skill)}
                      aria-label={`Remove ${skill} skill`}
                    >
                      &times;
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="bg-gigzlr-charcoal rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold mb-3">Resume</h3>
            <div className="mb-3">
              <label className="form-label text-white">Upload Resume</label>
              <input
                type="file"
                className="form-control bg-gigzlr-dark text-white"
              />
            </div>
            <div className="bg-gigzlr-dark rounded p-3 mb-2">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-white">resume_john_doe.pdf</span>
                <button className="btn btn-sm btn-outline-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gigzlr-charcoal rounded-lg p-4">
            <button
              className="btn-gigzlr w-100"
              onClick={onSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
