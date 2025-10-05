import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import styles from "./SplashScreen.module.css";

const SplashScreen = () => (
  <div className={styles.screen}>
    <div className={styles.card}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="20 80 110 10"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        className={styles.backgroundMole}
      >
        {/* SVG content */}
        <motion.path
          d="m71.87,102.45c-.15,2.13-.92,6.37-2.16,8.27l.62,1.19c.1.32.43.59.7.84,3.31,3.03,6.09,6.51,8.64,10.19,5.68,8.22,9.61,17.28,12.94,26.63,1.37,3.86,2.56,7.79,3.59,11.75,1.23,4.75,2.55,9.49,3.14,14.39.06.5.23.9.8,1.24,1.23.74,2.53,1.49,3.26,2.83,0,0-1.55,14.92-.36,15.72,1.28.86,3.72,2.76,3.72,2.76l.45,2.43s-.38,17.11-.56,18.8c-.06.57-.02,1.07.58,1.46.59.38,1.17.78,1.82,1.05,1.46.61,3.23,3.01,3.23,3.01l-.58.55s-3.65,1.03-5.54,1.11c-5,.22-10,.37-14.99.72-1.71.12-3.44.16-5.16.2-2.72.06-5.44.21-8.15.35-4.16.22-8.32.44-12.48.61-5.59.23-11.19.7-16.79.06-.12-.01-.24,0-.36,0-3.52.16-7.04-.14-10.55-.3-5.12-.22-10.24-.23-15.35-.64-2.31-.18-4.64-.16-6.95-.2-3.44-.07-10.31-.3-10.31-.3l-3.24-.84-.84-.6s.93-1.79,1.8-2.4c1.09-.78,2.13-1.65,3.26-2.37.61-.39.7-.83.72-1.46.07-1.76-.91-21.19-.91-21.19,0,0,2-2.79,3.43-3.72,1.13-.73,1.65-1.52,1.57-2.91-.13-2.27-1.19-9.61-1.35-11.27-.14-1.43,2.24-4.22,2.27-5.28.15-5.66,1.23-11.17,2.92-16.54,2.73-8.72,6.79-16.84,11.61-24.59,3.84-6.16,8.01-12.08,12.68-17.65,1.28-1.52,2.78-2.9,3.7-4.68l.28-.7c-1.42-1.93-2.27-4.14-3.1-6.36-.2-.55-.54-1.39.01-1.75l2.49-1.36c-.04-.88-.11-1.76-.11-2.64-.01-5.68-.02-11.35,0-17.03,0-1.32.34-2.63,0-3.96-.15-.59.06-1.14.58-1.56.66-.53,1.3-1.12,1.89-1.71,1.27-1.26,3.24-2.26,2.44-4.64,0-.02.11-.08.11-.12.03-2.15.88-4.14,1.21-6.23.3-1.87,1.05-3.62.76-5.64-.57-4.09-.85-8.23-1.25-12.34-.1-1.01.21-1.74,1.2-2.17.64-.28,1.3-.55,1.81-1.06.15-.15.35-.19.37-.49.04-.96,3.94-40.89,3.94-40.89,1.35,1.27,3.8,36.73,3.71,40.53,0,.42,0,.79.48.97.18.07.31.29.49.34,2.57.72,2.61,2.69,2.4,4.81-.29,2.92-.51,5.84-.87,8.75-.12,1-.16,2.01-.46,3.03-.26.88.49,2.04.72,3.09.51,2.27.97,4.55,1.44,6.83.04.17,0,.44-.04.6-.37,1.25.53,1.99,1.26,2.75,1.41,1.47,2.87,2.88,4.31,4.33.6.6,1.08,1.23.73,2.16-.05.14-.07.35,0,.47.86,1.44.58,3.03.58,4.56.02,5.72,0,11.43,0,17.15l1.8,1.08"
          fill="rgba(187, 235, 15, 0.01)"
          stroke="rgba(83, 25, 31, 1)"
          strokeWidth="0.2"
          initial={{ opacity: 0.5, fillOpacity: 1 }}
          animate={{
            strokeDasharray: ["2px", "60px"],
            fillOpacity: 1,
            opacity: 1,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
      </motion.svg>

      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          <Sparkles className={styles.mainIcon} />
          <Sparkles className={styles.pingIcon} />
        </div>

        <div className={styles.iconContainerCenter}>
          <h1 className={styles.title}>Scambio Talento</h1>
          <p className={styles.subtitleSplash}>
            Dove le competenze si incontrano
          </p>
        </div>

        <div className={styles.loadingDots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  </div>
);

export default SplashScreen;
