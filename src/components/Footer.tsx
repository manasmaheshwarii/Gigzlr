import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gigzlr-charcoal py-16">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-8 mb-lg-0">
            <a href="#home" className="d-flex align-items-center mb-4">
              <span className="text-3xl font-bold bg-gradient-to-r from-gigzlr-blue to-gigzlr-skyblue text-transparent bg-clip-text">
                Gigzlr
              </span>
            </a>
            <p className="text-gigzlr-gray mb-4">
              Connecting talent with opportunity. Find your dream job or the
              perfect candidate with our innovative job marketplace.
            </p>
            <div className="d-flex space-x-4">
              <a
                href="#"
                className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 mb-8 mb-md-0">
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#home"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#jobs"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  Browse Jobs
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#companies"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  Companies
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 mb-8 mb-md-0">
            <h5 className="text-white font-semibold mb-4">For Employers</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  Post a Job
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  Employer Login
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4">
            <h5 className="text-white font-semibold mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="d-flex mb-3">
                <MapPin
                  size={20}
                  className="text-gigzlr-blue me-3 flex-shrink-0"
                />
                <span className="text-gigzlr-gray">
                  315, GB Nen, Jaipur, Rajasthan, India
                </span>
              </li>
              <li className="d-flex mb-3">
                <Phone
                  size={20}
                  className="text-gigzlr-blue me-3 flex-shrink-0"
                />
                <a
                  href="tel:+15551234567"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  +91 9414574XXX
                </a>
              </li>
              <li className="d-flex">
                <Mail
                  size={20}
                  className="text-gigzlr-blue me-3 flex-shrink-0"
                />
                <a
                  href="mailto:info@gigzlr.com"
                  className="text-gigzlr-gray hover:text-gigzlr-blue transition-colors"
                >
                  radhikapaliwal6@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gigzlr-charcoal-light mt-12 pt-8 text-center">
          <p className="text-gigzlr-gray">
            © {new Date().getFullYear()} Gigzlr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
