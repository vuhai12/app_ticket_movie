"use client";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        backgroundColor: hover ? "#7b2cbf" : "#5f1a89",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "55px",
        height: "55px",
        cursor: "pointer",
        fontSize: "22px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
        zIndex: 1000,
        transition: "all 0.3s ease",
      }}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
