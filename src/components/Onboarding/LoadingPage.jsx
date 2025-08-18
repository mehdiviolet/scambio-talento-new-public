import React, { useState, useEffect } from "react";
import "./LoadingPage.css";

const LoadingPage = ({
  message = "Caricamento in corso...",
  duration = 3000, // durata in millisecondi
  onComplete = () => {},
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="loading-screen">
      <div className="loading-card">
        <div className="loading-content">
          <div className="progress-container">
            <div className="progress-ring"></div>
            <div
              className="progress-fill"
              style={{
                "--progress": `${progress}%`,
              }}
            ></div>
            <div className="progress-text">{Math.round(progress)}%</div>
          </div>
          <p className="loading-text">{message}</p>
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
