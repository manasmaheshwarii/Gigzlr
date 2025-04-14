import React from "react";
import { Search, FileText, Send } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search size={36} className="text-gigzlr-blue mb-4" />,
      title: "Search Jobs",
      description:
        "Browse through thousands of job listings filtered by your preferences and skills.",
    },
    {
      icon: <FileText size={36} className="text-gigzlr-blue mb-4" />,
      title: "Create Your Profile",
      description:
        "Build your professional profile and upload your resume to showcase your skills.",
    },
    {
      icon: <Send size={36} className="text-gigzlr-blue mb-4" />,
      title: "Apply With One Click",
      description:
        "Easily apply to multiple positions with our streamlined application process.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gigzlr-dark">
      <div className="container">
        <h2 className="text-4xl font-bold mb-2 text-center animate-on-scroll">
          How <span className="text-gigzlr-blue">Gigzlr</span> Works
        </h2>
        <p className="text-xl text-gigzlr-gray text-center mb-12 animate-on-scroll">
          Simple steps to finding your next career opportunity
        </p>

        <div className="row">
          {steps.map((step, index) => (
            <div
              key={index}
              className="col-md-4 mb-8 mb-md-0 animate-on-scroll"
            >
              <div className="text-center p-6 h-100 bg-gigzlr-charcoal rounded-xl hover:bg-gigzlr-charcoal-light transition-colors duration-300">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gigzlr-gray">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-on-scroll">
          <button className="btn-gigzlr">Get Started Today</button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
