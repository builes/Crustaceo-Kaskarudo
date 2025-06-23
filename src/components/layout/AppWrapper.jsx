import { useEffect } from "react";

export const AppWrapper = ({ children }) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Fredoka', sans-serif",
    background: "linear-gradient(to bottom, #0077be, #001f3f)",
    color: "#fff",
    overflowX: "hidden",
    position: "relative",
  };

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
    .bubble {
      position: fixed;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      opacity: 0;
      animation: pop 1.5s ease-in-out forwards;
      pointer-events: none;
      z-index: 9999;
    }

    @keyframes pop {
      0% {
        transform: scale(0.2);
        opacity: 0;
      }
      50% {
        transform: scale(1.3);
        opacity: 1;
      }
      100% {
        transform: scale(0.8);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  return <div style={style}>{children}</div>;
};
