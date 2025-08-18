import React, { useState, useEffect } from "react";
import {
  Users,
  MessageCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
// import { useOnboarding } from "../Context/OnboardingContext";
import { useOnboarding } from "../../hooks/useOnboardingRedux";

import styles from "./ReadyToStartSlide.module.css";

const ReadyToStartSlide = () => {
  const { setShowReadyToStart, setShowQuickSetup } = useOnboarding();
  const [animationStep, setAnimationStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 500);
    const timer2 = setTimeout(() => setAnimationStep(2), 1000);
    const timer3 = setTimeout(() => setAnimationStep(3), 1500);
    const timer4 = setTimeout(() => setAnimationStep(4), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleContinue = () => {
    console.log("Continuing to quick setup...");

    // Suono di transizione

    // Anima l'uscita
    setIsExiting(true);

    // Dopo l'animazione, cambia schermata
    setTimeout(() => {
      setShowReadyToStart(false);
      setShowQuickSetup(true);
    }, 800);
  };

  const features = [
    {
      icon: Users,
      title: "Connetti",
      description: "Persone con le tue passioni",
      color: "bluePurple", // ← Cambia qui direttamente
    },
    {
      icon: MessageCircle,
      title: "Scambia",
      description: "Competenze e conoscenze",
      color: "purplePink", // ← Cambia qui
    },
    {
      icon: Calendar,
      title: "Organizza",
      description: "Eventi e workshop",
      color: "emeraldTeal", // ← Cambia qui
    },
  ];

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          {/* Hero Icon */}
          <div
            className={`${styles.heroIcon} ${
              animationStep >= 1 && !isExiting ? styles.visible : ""
            }`}
          >
            <div className={styles.iconWrapper}>
              <div className={styles.iconCircle}>
                <Sparkles className={styles.sparklesIcon} />
              </div>
              <div className={styles.iconPing}></div>
            </div>
          </div>

          {/* Title */}
          {/* <div
            className={`${styles.titleSection} ${
              animationStep >= 2 && !isExiting ? styles.visible : ""
            }`}
          >
            <h1 className={styles.mainTitle}>Sei pronto a iniziare?</h1>
            <p className={styles.subtitle}>
              Condividi talenti
              <br />
              fai nuove conoscenze
              <br />e impara insieme agli altri
            </p>
          </div> */}

          {/* Features Recap */}
          <div
            className={`${styles.featuresSection} ${
              animationStep >= 3 && !isExiting ? styles.visible : ""
            }`}
          >
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                const colorClass = feature.color.replace("-", "");
                return (
                  <div
                    key={index}
                    className={`${styles.featureCard} ${
                      isExiting ? styles.exiting : ""
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      className={`${styles.featureIcon} ${
                        styles[feature.color]
                      }`}
                    >
                      <IconComponent className="icon" />
                    </div>
                    <div className={styles.featureContent}>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>
                        {feature.description}
                      </p>
                    </div>
                    <CheckCircle className={styles.checkIcon} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div
            className={`${styles.ctaSection} ${
              animationStep >= 4 && !isExiting ? styles.visible : ""
            }`}
          >
            <button
              onClick={handleContinue}
              disabled={isExiting}
              className={`${styles.ctaButton} ${
                isExiting ? styles.disabled : ""
              }`}
            >
              <span className={styles.buttonText}>Inizia la tua avventura</span>
              <ArrowRight className={styles.arrowIcon} />
            </button>

            <p className={styles.ctaSubtitle}>
              Configura il tuo profilo in meno di 2 minuti!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyToStartSlide;
