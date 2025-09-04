import React from "react";
import styles from "./DemoHelper.module.css";
import widgetStyles from "./WidgetPositions.module.css";

const DemoHelper = ({ onDemoFill }) => {
  return (
    <div
      className={`${widgetStyles.baseWidget} ${widgetStyles.leftOfMobile} ${widgetStyles.demoStyle}`}
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
          <path d="M9 11l3 3l8-8" />
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9c1.59 0 3.08.41 4.38 1.13" />
        </svg>
      </div> */}
      <div className={styles.demoContent}>
        {/* <div className={styles.demoTitle}>Demo</div> */}
        <div className={styles.demoText}>
          <small>
            <strong>Quick Fill:</strong> demo@app.com / 123456
          </small>
        </div>
      </div>
    </div>
  );
};

export default DemoHelper;
