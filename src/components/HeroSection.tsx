import React, { useState } from "react";
import { Search } from "lucide-react";

const HeroSection: React.FC = () => {
  const [jobQuery, setJobQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Scroll to jobs section
    const jobsSection = document.getElementById("jobs");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });

      // Dispatch a custom event that JobListings can listen for
      const searchEvent = new CustomEvent("jobsearch", {
        detail: { jobQuery, location },
      });
      window.dispatchEvent(searchEvent);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 animate-on-scroll" data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gigzlr-blue to-gigzlr-skyblue text-transparent bg-clip-text">
              Find Your Next Dream Job
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gigzlr-gray">
              Connect with thousands of employers and find the perfect role for
              your skills and experience.
            </p>
            <form onSubmit={handleSearch} className="w-full">
              <div className="bg-gigzlr-charcoal p-2 rounded-full flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full bg-transparent border-0 px-4 py-2 focus:outline-none text-white"
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                />
                <div className="hidden sm:block border-l border-gigzlr-gray-light h-6 mx-2"></div>
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent border-0 px-4 py-2 focus:outline-none text-white"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto btn-gigzlr flex items-center justify-center whitespace-nowrap"
                >
                  <Search size={18} className="mr-2" />
                  Search Jobs
                </button>
              </div>
            </form>
            <div className="mt-4 text-gigzlr-gray">
              <p>Popular: Software Engineer, Marketing, Remote, Full-time</p>
            </div>
          </div>
          <div
            className="md:w-1/2 flex justify-center mt-12 md:mt-0 animate-on-scroll"
            data-aos="fade-left"
          >
            <img
              src="/image.jpg"
              alt="Job Search"
              className="w-full max-w-md rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
