import React from "react";
import styles from "./ResetDemoHelper.module.css";
import widgetStyles from "./WidgetPositions.module.css";

const ResetDemoHelper = ({ onDemoFill }) => {
  return (
    <div
      // className={styles.resetDemo}

      className={`${widgetStyles.baseWidget} ${widgetStyles.rightOfMobile} ${widgetStyles.demoStyle}`}
      onClick={onDemoFill}
    >
      {/* <div className={styles.demoIcon}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div> */}
      <div className={styles.demoContent}>
        {/* <div className={styles.demoTitle}>Reset Demo</div> */}
        <div className={styles.demoText}>
          <small>
            <strong>Quick Fill:</strong> Auto-complete
          </small>
        </div>
      </div>
    </div>
  );
};

export default ResetDemoHelper;
