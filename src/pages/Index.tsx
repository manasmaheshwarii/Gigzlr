import React, { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JobListings from "@/components/JobListings";
import CompanyCarousel from "@/components/CompanyCarousel";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";
import AnimationObserver from "@/components/AnimationObserver";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const Index: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [showDashboard, setShowDashboard] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("gigzlrUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUserData(user);
    }

    // Listen for authentication events
    const handleAuthentication = () => {
      const user = localStorage.getItem("gigzlrUser");
      if (user) {
        setIsAuthenticated(true);
        setUserData(JSON.parse(user));
      }
    };

    const handleLogout = () => {
      setIsAuthenticated(false);
      setUserData(null);
    };

    window.addEventListener("userAuthenticated", handleAuthentication);
    window.addEventListener("userLoggedOut", handleLogout);

    return () => {
      window.removeEventListener("userAuthenticated", handleAuthentication);
      window.removeEventListener("userLoggedOut", handleLogout);
    };
  }, []);

  const handleLogin = () => {
    if (isAuthenticated) {
      setShowDashboard(true);
    } else {
      setAuthType("login");
      setShowAuth(true);
    }
  };

  const handleSignup = () => {
    if (isAuthenticated) {
      setShowDashboard(true);
    } else {
      setAuthType("signup");
      setShowAuth(true);
    }
  };

  const handleAuthClose = () => {
    setShowAuth(false);

    // Check if authentication succeeded
    const user = localStorage.getItem("gigzlrUser");
    if (user) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(user));
      setShowDashboard(true);
    }
  };

  return (
    <div className="relative">
      {/* Always render the custom cursor, its visibility is handled internally */}
      <CustomCursor />

      <Navbar
        onLogin={handleLogin}
        onSignup={handleSignup}
        isAuthenticated={isAuthenticated}
        userName={userData?.name}
      />
      <HeroSection />
      <JobListings />
      <CompanyCarousel />
      <HowItWorks />
      <Footer />

      {/* Authentication Modal */}
      <Auth isOpen={showAuth} onClose={handleAuthClose} authType={authType} />

      {/* Dashboard Modal */}
      <Dashboard
        isOpen={showDashboard}
        onClose={() => setShowDashboard(false)}
      />

      <AnimationObserver />
    </div>
  );
};

export default Index;
