// components/ViewModeToggle.jsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setViewMode } from "../store/slices/onboardingSlice";
import styles from "./ViewModeToggle.module.css";

const ViewModeToggle = () => {
  const dispatch = useAppDispatch();
  const { isOwner, viewMode } = useAppSelector((state) => state.onboarding);

  const handleSetOwner = () => {
    dispatch(setViewMode("owner"));
  };

  const handleSetViewer = () => {
    dispatch(setViewMode("viewer"));
  };

  return (
    <div className={styles.toggleContainer}>
      <button
        onClick={handleSetOwner}
        className={`${styles.toggleButton} ${styles.ownerButton} ${
          isOwner ? styles.active : styles.inactive
        }`}
      >
        👑 Owner
      </button>

      <button
        onClick={handleSetViewer}
        className={`${styles.toggleButton} ${styles.viewerButton} ${
          !isOwner ? styles.active : styles.inactive
        }`}
      >
        👁️ Viewer
      </button>
    </div>
  );
};

export default ViewModeToggle;
