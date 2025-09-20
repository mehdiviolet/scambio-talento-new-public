import React, { useState } from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  mode = "solid",
  size = "md",
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[size]} ${styles[mode]} ${styles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
