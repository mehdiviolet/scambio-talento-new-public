// components/LayoutModeToggle.jsx
import React from "react";
import styles from "./LayoutModeToggle.module.css";

const LayoutModeToggle = ({ layoutMode, setLayoutMode }) => {
  const handleToggle = () => {
    setLayoutMode(layoutMode === "single" ? "dual" : "single");
  };

  return (
    <div className={styles.toggleContainer}>
      <button
        onClick={handleToggle}
        className={`${styles.toggleButton} ${
          layoutMode === "single" ? styles.singleMode : styles.dualMode
        }`}
      >
        {layoutMode === "single" ? "📱 Single" : "🔄 Dual"}
      </button>
    </div>
  );
};

export default LayoutModeToggle;
