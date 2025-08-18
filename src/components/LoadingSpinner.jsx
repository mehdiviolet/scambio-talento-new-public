import React from "react";

const LoadingSpinner = ({
  size = 24,
  color = "#007bff",
  text = "Caricamento...",
  showText = true,
  className = "",
}) => {
  return (
    <div
      className={`loading-spinner ${className}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      {/* Logo/Icona che gira */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Puoi sostituire con il tuo logo */}
        <span style={{ fontSize: `${size * 0.4}px` }}>🎲</span>
      </div>

      {showText && (
        <span
          style={{
            fontSize: "14px",
            color: color,
            fontWeight: "500",
          }}
        >
          {text}
        </span>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
