import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import styles from "./SplashScreen.module.css";

const SplashScreen = () => {
  // Varianti per l'icona principale
  const iconVariants = {
    hidden: {
      scale: 0.3,
      y: "50vh",
      opacity: 0,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  // Varianti per le lettere - Liquid Morph Effect
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scaleY: 3,
      scaleX: 0.3,
      filter: "blur(20px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scaleY: 1,
      scaleX: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        delay: 1.5 + i * 0.08,
        ease: [0.6, 0.01, 0.05, 0.95], // Custom easing per effetto liquido
        opacity: {
          duration: 0.3,
          delay: 1.5 + i * 0.08,
        },
        filter: {
          duration: 0.8,
          delay: 1.5 + i * 0.08,
        },
      },
    }),
  };

  // Varianti per effetto "drip" - goccia che cade dopo la lettera
  const dripVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0,
    },
    visible: (i) => ({
      opacity: [0, 0.6, 0],
      scaleY: [0, 1.5, 0],
      transition: {
        duration: 0.5,
        delay: 1.6 + i * 0.08,
        ease: "easeOut",
      },
    }),
  };

  // Varianti per il sottotitolo
  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 3.5,
        ease: "easeOut",
      },
    },
  };

  const word1 = "Scambio";
  const word2 = "talento";

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          {/* Icon container con animazione */}
          <motion.div
            className={styles.iconContainer}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
          >
            <Sparkles className={styles.mainIcon} aria-hidden="true" />
            {/* <Sparkles className={styles.pingIcon} aria-hidden="true" /> */}
          </motion.div>

          {/* Container per il logo con liquid effect */}
          <div className={styles.iconContainerCenter}>
            <motion.h1
              className={styles.title}
              initial="hidden"
              animate="visible"
            >
              {/* Prima parola: SCAMBIO */}
              <span className={styles.word}>
                {word1.split("").map((char, index) => (
                  <span key={`s-${index}`} className={styles.letterWrapper}>
                    <motion.span
                      custom={index}
                      variants={letterVariants}
                      className={styles.letter}
                    >
                      {char}
                    </motion.span>
                    {/* Effetto goccia sotto la lettera */}
                    <motion.span
                      custom={index}
                      variants={dripVariants}
                      className={styles.drip}
                      aria-hidden="true"
                    />
                  </span>
                ))}
              </span>

              <br />

              {/* Seconda parola: TALENTO */}
              <span className={styles.word}>
                {word2.split("").map((char, index) => (
                  <span key={`t-${index}`} className={styles.letterWrapper}>
                    <motion.span
                      custom={index + word1.length}
                      variants={letterVariants}
                      className={styles.letter}
                    >
                      {char}
                    </motion.span>
                    {/* Effetto goccia sotto la lettera */}
                    <motion.span
                      custom={index + word1.length}
                      variants={dripVariants}
                      className={styles.drip}
                      aria-hidden="true"
                    />
                  </span>
                ))}
              </span>
            </motion.h1>

            {/* Sottotitolo con liquid fade in */}
            {/* <motion.p
              className={styles.subtitleSplash}
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              Dove le competenze si incontrano
            </motion.p> */}
          </div>

          {/* Loading dots */}
          <div
            className={styles.loadingDots}
            role="status"
            aria-label="Caricamento in corso"
          >
            <span className={styles.dot} aria-hidden="true"></span>
            <span className={styles.dot} aria-hidden="true"></span>
            <span className={styles.dot} aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
