import React from "react";

const CompanyCarousel: React.FC = () => {
  const companyLogos = [
    { id: 1, logo: "https://placehold.co/160x80/1A1F2C/1EAEDB?text=Microsoft" },
    { id: 2, logo: "https://placehold.co/160x80/1A1F2C/33C3F0?text=TCS" },
    {
      id: 3,
      logo: "https://placehold.co/160x80/1A1F2C/1EAEDB?text=MediaGroup",
    },
    { id: 4, logo: "https://placehold.co/160x80/1A1F2C/33C3F0?text=Google" },
    { id: 5, logo: "https://placehold.co/160x80/1A1F2C/1EAEDB?text=Adobe" },
    { id: 6, logo: "https://placehold.co/160x80/1A1F2C/33C3F0?text=Amazon" },
    { id: 7, logo: "https://placehold.co/160x80/1A1F2C/1EAEDB?text=Media.net" },
    {
      id: 8,
      logo: "https://placehold.co/160x80/1A1F2C/33C3F0?text=Appcrave",
    },
  ];

  return (
    <section id="companies" className="py-16 bg-gigzlr-charcoal">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center animate-on-scroll">
          Trusted by Leading <span className="text-gigzlr-blue">Companies</span>
        </h2>
        <p className="text-lg md:text-xl text-gigzlr-gray text-center mb-12 animate-on-scroll">
          Join thousands of employers finding top talent on Gigzlr
        </p>

        <div className="overflow-hidden relative animate-on-scroll">
          {/* Gradient overlays for infinite scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gigzlr-charcoal to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gigzlr-charcoal to-transparent z-10"></div>

          <div className="flex items-center space-x-8 animate-logo-scroll">
            {[...companyLogos, ...companyLogos].map((company, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={company.logo}
                  alt="Company Logo"
                  className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyCarousel;
