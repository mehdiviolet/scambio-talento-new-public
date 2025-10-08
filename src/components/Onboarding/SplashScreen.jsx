import React from "react";
import { motion } from "motion/react";
import styles from "./SplashScreen.module.css";

const SplashScreen = () => {
  // Variante per il cookie gigante di sfondo (superiore)
  const backgroundCookieVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 0.08,
      scale: 1,
      transition: {
        duration: 2,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Variante per il cookie gigante di sfondo (inferiore)
  const backgroundCookieBottomVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 0.08,
      scale: 1,
      transition: {
        duration: 2,
        delay: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Variante per ogni LETTERA del logo (appaiono una alla volta)
  const letterVariants = {
    hidden: {
      opacity: 0,
    },
    visible: (i) => ({
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 1.2 + i * 0.15, // Ogni lettera appare con 0.15s di ritardo
        ease: "easeOut",
      },
    }),
  };

  // Variante per il contorno del cookie (appare DOPO le lettere)
  const cookieOutlineVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 1.5,
          delay: 2.25, // Inizia dopo "TALENT" (1.2 + 6*0.15 = 2.1)
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.1,
          delay: 2.25,
        },
      },
    },
  };

  // Variante per i puntini DENTRO il cookie
  const cookieDotsVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 0.3,
          delay: 3.75 + i * 0.1, // Dopo il contorno (2.25 + 1.5)
          ease: "easeOut",
        },
        opacity: {
          duration: 0.1,
          delay: 3.75 + i * 0.1,
        },
      },
    }),
  };

  // Variante per lo slogan
  const sloganVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 4.3, // Dopo tutti i puntini del cookie
        ease: "easeOut",
      },
    },
  };

  // Variante per le briciole
  const crumbVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: (i) => ({
      opacity: 0.15,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 5.1 + i * 0.15, // Dopo lo slogan
        ease: "easeOut",
      },
    }),
  };

  // Configurazione delle 10 briciole
  const crumbs = [
    { top: "12%", left: "8%", size: 22, floatDelay: 0 },
    { top: "18%", right: "12%", size: 30, floatDelay: 0.3 },
    { top: "35%", left: "5%", size: 18, floatDelay: 0.6 },
    { top: "50%", right: "7%", size: 26, floatDelay: 0.2 },
    { top: "65%", left: "10%", size: 20, floatDelay: 0.5 },
    { bottom: "28%", right: "15%", size: 28, floatDelay: 0.4 },
    { bottom: "18%", left: "18%", size: 24, floatDelay: 0.1 },
    { bottom: "35%", right: "8%", size: 19, floatDelay: 0.7 },
    { top: "42%", left: "12%", size: 21, floatDelay: 0.3 },
    { bottom: "45%", right: "20%", size: 25, floatDelay: 0.6 },
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        {/* Cookie gigante di sfondo SUPERIORE */}
        <motion.div
          className={styles.backgroundCookie}
          variants={backgroundCookieVariants}
          initial="hidden"
          animate="visible"
        >
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.cookieSvg}
          >
            <path
              d="m10,0c-5.52,0-10,4.48-10,10s4.48,10,10,10,10-4.48,10-10c-2.11.65-4.35-.53-5-2.65-.24-.77-.24-1.59,0-2.35-2.11.65-4.35-.53-5-2.65-.24-.77-.24-1.59,0-2.35"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Cookie gigante di sfondo INFERIORE */}
        <motion.div
          className={styles.backgroundCookieBottom}
          variants={backgroundCookieBottomVariants}
          initial="hidden"
          animate="visible"
        >
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.cookieSvg}
          >
            <path
              d="m10,0c-5.52,0-10,4.48-10,10s4.48,10,10,10,10-4.48,10-10c-2.11.65-4.35-.53-5-2.65-.24-.77-.24-1.59,0-2.35-2.11.65-4.35-.53-5-2.65-.24-.77-.24-1.59,0-2.35"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Briciole di cookie sparse */}
        {crumbs.map((crumb, index) => (
          <motion.div
            key={index}
            className={styles.crumb}
            style={{
              top: crumb.top,
              bottom: crumb.bottom,
              left: crumb.left,
              right: crumb.right,
              width: `${crumb.size}px`,
              height: `${crumb.size}px`,
            }}
            custom={index}
            variants={crumbVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.svg
              viewBox="0 0 10 10"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%" }}
              animate={{
                y: [-5, 5, -5],
                x: [-3, 3, -3],
              }}
              transition={{
                duration: 3 + crumb.floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: crumb.floatDelay,
              }}
            >
              <circle cx="5" cy="5" r="4.5" fill="#ffffff" opacity="0.9" />
            </motion.svg>
          </motion.div>
        ))}

        <div className={styles.cardContent}>
          {/* Container centrale per il logo SVG */}
          <div className={styles.svgCenterContainer}>
            <svg
              className={styles.talentoSvg}
              viewBox="0 0 138.71 23.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <style>
                  {`
                    .cls-1 {
                      stroke-width: 3px;
                      fill: none;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke: #ffffff;
                    }
                    .cls-2 {
                      fill: #ffffff;
                      stroke: #ffffff;
                      stroke-miterlimit: 10;
                      stroke-width: 0.75px;
                    }
                    .cls-3 {
                      stroke-width: 2px;
                      fill: none;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke: #ffffff;
                    }
                  `}
                </style>
              </defs>

              {/* Cookie elemento - appare DOPO le lettere */}
              <g>
                {/* Contorno principale del cookie */}
                <motion.path
                  className="cls-1"
                  d="m127.21,1.78c-5.52,0-10,4.48-10,10s4.48,10,10,10,10-4.48,10-10c-2.11.65-4.35-.53-5-2.65-.24-.77-.24-1.59,0-2.35-2.11.65-4.35-.53-5-2.65-.24-.77-.24-1.59,0-2.35"
                  variants={cookieOutlineVariants}
                  initial="hidden"
                  animate="visible"
                />

                {/* Puntini decorativi DENTRO il cookie */}
                <motion.path
                  className="cls-3"
                  d="m123.71,8.76h0"
                  custom={0}
                  variants={cookieDotsVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  className="cls-3"
                  d="m131.21,15.76h0"
                  custom={1}
                  variants={cookieDotsVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  className="cls-3"
                  d="m127.21,12.26h0"
                  custom={2}
                  variants={cookieDotsVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  className="cls-3"
                  d="m126.21,17.26h0"
                  custom={3}
                  variants={cookieDotsVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path
                  className="cls-3"
                  d="m122.21,14.26h0"
                  custom={4}
                  variants={cookieDotsVariants}
                  initial="hidden"
                  animate="visible"
                />
              </g>

              {/* Testo TALENTO - ogni lettera appare una alla volta */}
              <g>
                {/* T - lettera 0 */}
                <motion.polygon
                  className="cls-2"
                  points=".38 .38 .38 2.8 7.46 2.8 7.46 22.92 10.19 22.92 10.19 2.8 17.28 2.8 17.28 .38 .38 .38"
                  custom={0}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                />
                {/* A - lettera 1 */}
                <motion.path
                  className="cls-2"
                  d="m27.14.38l-8.28,22.55h2.86l2.27-6.38h9.12l2.27,6.38h2.86L29.96.38h-2.82Zm-2.29,13.74l3.61-10.17h.18l3.61,10.17h-7.4Z"
                  custom={1}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                />
                {/* L - lettera 2 */}
                <motion.polygon
                  className="cls-2"
                  points="43.78 .38 41.05 .38 41.05 22.92 54.26 22.92 54.26 20.5 43.78 20.5 43.78 .38"
                  custom={2}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                />
                {/* E - lettera 3 */}
                <motion.polygon
                  className="cls-2"
                  points="60.5 12.84 70.67 12.84 70.67 10.42 60.5 10.42 60.5 2.8 71.38 2.8 71.38 .38 57.77 .38 57.77 22.92 71.55 22.92 71.55 20.5 60.5 20.5 60.5 12.84"
                  custom={3}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                />
                {/* N - lettera 4 */}
                <motion.polygon
                  className="cls-2"
                  points="90.79 18.12 90.57 18.12 78.24 .38 75.6 .38 75.6 22.92 78.33 22.92 78.33 5.22 78.55 5.22 90.83 22.92 93.47 22.92 93.47 .38 90.79 .38 90.79 18.12"
                  custom={4}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                />
                {/* T - lettera 5 */}
                <motion.polygon
                  className="cls-2"
                  points="96.99 .38 96.99 2.8 104.08 2.8 104.08 22.92 106.81 22.92 106.81 2.8 113.9 2.8 113.9 .38 96.99 .38"
                  custom={5}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                />
              </g>
            </svg>

            {/* Slogan */}
            <motion.p
              className={styles.slogan}
              variants={sloganVariants}
              initial="hidden"
              animate="visible"
            >
              Dove le competenze si incontrano
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
