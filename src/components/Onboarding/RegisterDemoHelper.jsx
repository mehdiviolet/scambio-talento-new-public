import React from "react";
import widgetStyles from "./WidgetPositions.module.css";

const RegisterDemoHelper = ({ onDemoFill }) => {
  return (
    <div
      className={`${widgetStyles.baseWidget} ${widgetStyles.leftOfMobile} ${widgetStyles.emailStyle}`}
      onClick={onDemoFill}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          background: "rgba(251, 191, 36, 0.2)",
          borderRadius: "8px",
          color: "#fbbf24",
          flexShrink: 0,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#fbbf24",
            lineHeight: 1,
          }}
        >
          Register Demo
        </div>
        <div
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "0.75rem",
            lineHeight: 1.3,
          }}
        >
          <small>
            <strong>Quick Fill:</strong> Auto-register
          </small>
        </div>
      </div>
    </div>
  );
};

export default RegisterDemoHelper;
