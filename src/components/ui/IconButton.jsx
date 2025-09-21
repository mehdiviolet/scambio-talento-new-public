import React from "react";
import { X } from "lucide-react";
import styles from "./IconButton.module.css";

const IconButton = ({
  onClick,
  icon: Icon = X,
  size = 20,
  className = "",
  position = "absolute",
}) => {
  return (
    <button
      className={`${styles.iconButton} ${
        position === "relative" ? styles.relative : ""
      } ${className}`}
      onClick={onClick}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconButton;
