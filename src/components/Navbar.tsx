import React, { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";

interface NavbarProps {
  onLogin: () => void;
  onSignup: () => void;
  isAuthenticated?: boolean;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  onLogin,
  onSignup,
  isAuthenticated = false,
  userName,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar-gigzlr ${isScrolled ? "scrolled" : ""}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center z-10">
          <span className="text-2xl font-bold bg-gradient-to-r from-gigzlr-blue to-gigzlr-skyblue text-transparent bg-clip-text">
            Gigzlr
          </span>
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-20 p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6">
            <a
              href="#home"
              className="text-gigzlr-lightgray hover:text-gigzlr-blue transition-colors"
            >
              Home
            </a>
            <a
              href="#jobs"
              className="text-gigzlr-lightgray hover:text-gigzlr-blue transition-colors"
            >
              Jobs
            </a>
            <a
              href="#companies"
              className="text-gigzlr-lightgray hover:text-gigzlr-blue transition-colors"
            >
              Companies
            </a>
            <a
              href="#how-it-works"
              className="text-gigzlr-lightgray hover:text-gigzlr-blue transition-colors"
            >
              How It Works
            </a>
          </div>
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <button
                onClick={onLogin}
                className="flex items-center px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                <User size={16} className="mr-2" />
                {userName || "Dashboard"}
              </button>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Login
                </button>
                <button onClick={onSignup} className="btn-gigzlr">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          className={`fixed inset-0 bg-gigzlr-dark bg-opacity-95 z-10 flex flex-col items-center justify-center space-y-8 transform transition-all duration-300 ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
        >
          <a
            href="#home"
            className="text-xl text-gigzlr-lightgray hover:text-gigzlr-blue"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a
            href="#jobs"
            className="text-xl text-gigzlr-lightgray hover:text-gigzlr-blue"
            onClick={toggleMenu}
          >
            Jobs
          </a>
          <a
            href="#companies"
            className="text-xl text-gigzlr-lightgray hover:text-gigzlr-blue"
            onClick={toggleMenu}
          >
            Companies
          </a>
          <a
            href="#how-it-works"
            className="text-xl text-gigzlr-lightgray hover:text-gigzlr-blue"
            onClick={toggleMenu}
          >
            How It Works
          </a>
          <div className="flex flex-col space-y-4 mt-6">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  onLogin();
                  toggleMenu();
                }}
                className="flex items-center justify-center px-8 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
              >
                <User size={16} className="mr-2" />
                {userName || "Dashboard"}
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onLogin();
                    toggleMenu();
                  }}
                  className="px-8 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onSignup();
                    toggleMenu();
                  }}
                  className="btn-gigzlr"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
