import React, { useEffect } from "react";

const AnimationObserver: React.FC = () => {
  useEffect(() => {
    // Bootstrap JavaScript
    const loadBootstrapJS = async () => {
      try {
        const bootstrap = await import("bootstrap");

        // Initialize tooltips and popovers
        const tooltipTriggerList = document.querySelectorAll(
          '[data-bs-toggle="tooltip"]'
        );
        [...tooltipTriggerList].map(
          (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
        );

        const popoverTriggerList = document.querySelectorAll(
          '[data-bs-toggle="popover"]'
        );
        [...popoverTriggerList].map(
          (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
        );
      } catch (error) {
        console.error("Error loading Bootstrap:", error);
      }
    };

    loadBootstrapJS();

    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      elements.forEach((element) => {
        observer.observe(element);
      });
    };

    animateOnScroll();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};

export default AnimationObserver;
