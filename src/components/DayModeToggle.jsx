// components/DayModeToggle.jsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setDemoDay } from "@/services/xpService";
import styles from "./DayModeToggle.module.css";

const DayModeToggle = () => {
  const dispatch = useAppDispatch();
  const demoState = useAppSelector((state) => state.xp.demo);
  const { currentDay, viewMode } = demoState;

  const handleSetDay1 = () => {
    dispatch(setDemoDay("day1"));
  };

  const handleSetDay8 = () => {
    dispatch(setDemoDay("day8"));
  };

  const handleSetDay19 = () => {
    dispatch(setDemoDay("day19"));
  };

  return (
    <div className={styles.toggleContainer}>
      <div className={styles.statusIndicator}>Current: Giorno {currentDay}</div>

      <button
        onClick={handleSetDay1}
        className={`${styles.toggleButton} ${styles.day1Button} ${
          viewMode === "day1" ? styles.active : styles.inactive
        }`}
      >
        📅 Giorno 1
      </button>

      <button
        onClick={handleSetDay8}
        className={`${styles.toggleButton} ${styles.day8Button} ${
          viewMode === "day8" ? styles.active : styles.inactive
        }`}
      >
        🔔 Giorno 8
      </button>

      <button
        onClick={handleSetDay19}
        className={`${styles.toggleButton} ${styles.day19Button} ${
          viewMode === "day19" ? styles.active : styles.inactive
        }`}
      >
        👑 Giorno 19
      </button>
    </div>
  );
};

export default DayModeToggle;
