import React, { useState } from "react";
import styles from "./Button.module.css";

export const Button = ({
  children,
  variant = "primary",
  mode = "solid",
  size = "md",
  disabled = false,
  onClick,
  className = "",
  disabledMessage = "Azione non disponibile", // ✅ NUOVO PROP
  ...props
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[size]} ${styles[mode]} ${styles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      data-disabled-message={disabled ? disabledMessage : ""} // ✅ PASSA IL MESSAGGIO
      {...props}
    >
      {children}
    </button>
  );
};
