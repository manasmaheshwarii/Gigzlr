import React, { useState, useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Force the cursor to be visible after a short delay
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    let timeoutId: number;

    const updateCursorPosition = (e: MouseEvent) => {
      // Set state for position
      setPosition({ x: e.clientX, y: e.clientY });

      // Always ensure cursor is visible when mouse moves
      if (!isVisible) {
        setIsVisible(true);
      }

      // Make sure the cursor element is visible through direct DOM manipulation
      if (cursor) {
        cursor.style.opacity = "1";
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Make cursor invisible when it's outside the window
    const handleMouseLeave = () => {
      setIsVisible(false);
      // Set opacity explicitly to ensure it's hidden
      if (cursor) {
        cursor.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      // Show cursor immediately when mouse enters
      setIsVisible(true);
      // Set opacity explicitly to ensure it's visible
      if (cursor) {
        cursor.style.opacity = "1";
      }
    };

    // Add event listeners
    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    // Force update cursor position initially and periodically
    const positionCheckInterval = setInterval(() => {
      if (isVisible && cursor) {
        cursor.style.opacity = "1";
      }
    }, 500);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
      clearInterval(positionCheckInterval);
    };
  }, [isVisible]);

  // Calculate cursor size based on clicking state
  const cursorSize = isClicking ? "24px" : "32px";
  const cursorOpacity = isVisible ? 1 : 0;

  // Apply position directly in style for smoother performance
  const cursorStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
    opacity: cursorOpacity,
    width: cursorSize,
    height: cursorSize,
    transition:
      "opacity 0.2s ease, transform 0.05s linear, width 0.2s ease, height 0.2s ease",
    backgroundColor: "#1EAEDB", // Match the gigzlr-blue color
    position: "fixed",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    mixBlendMode: "difference",
    boxShadow: "0 0 15px 5px rgba(30, 174, 219, 0.5)",
  } as React.CSSProperties;

  console.log(
    "CustomCursor rendering with visible:",
    isVisible,
    "position:",
    position
  );

  return <div ref={cursorRef} className="custom-cursor" style={cursorStyle} />;
};

export default CustomCursor;
