import React, { useState } from "react";
import {
  Users,
  MessageCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
// import { useOnboarding } from "../Context/OnboardingContext";
import { useOnboarding } from "../../hooks/useOnboardingRedux";

import "./OnboardingSlides.css";

const OnboardingSlides = () => {
  const {
    currentSlide,
    setCurrentSlide,
    setShowOnboarding,
    setShowAuth,
    setShowReadyToStart,
  } = useOnboarding();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      icon: Users,
      title: "Connetti con persone",
      subtitle: "Trova persone con le tue stesse passioni",
      description:
        "Scopri una comunità di persone che condividono i tuoi interessi e le tue competenze. Costruisci relazioni autentiche basate sulla passione comune.",
      colorTheme: "ocean-blue",
      bgPattern: "circles",
    },
    {
      icon: MessageCircle,
      title: "Scambia competenze",
      subtitle: "Impara e insegna allo stesso tempo",
      description:
        "Condividi quello che sai e apprendi nuove competenze. Ogni scambio è un'opportunità di crescita personale e professionale.",
      colorTheme: "sky-indigo",
      bgPattern: "waves",
    },
    {
      icon: Calendar,
      title: "Organizza eventi",
      subtitle: "Crea momenti di condivisione",
      description:
        "Organizza workshop, meetup e eventi per la tua comunità. Trasforma le competenze in esperienze memorabili.",
      colorTheme: "azure-deep",
      bgPattern: "dots",
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleContinue = () => {
    if (currentSlide < slides.length - 1) {
      nextSlide();
    } else {
      setShowOnboarding(false);
      setShowReadyToStart(true);
    }
  };

  const handleSkip = () => {
    setShowOnboarding(false);
    setShowAuth(true);
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="onboarding-slides">
      <div className="onboarding-slides__background">
        <div
          className={`onboarding-slides__gradient onboarding-slides__gradient--${currentSlideData.colorTheme}`}
        ></div>
      </div>

      <div className="onboarding-slides__content">
        <div className="onboarding-slides__skip">
          <button
            onClick={handleSkip}
            className="onboarding-slides__skip-button"
          >
            Salta
          </button>
        </div>

        <div className="onboarding-slides__slide">
          <div className="onboarding-slides__icon-container">
            <div
              className={`onboarding-slides__icon-wrapper ${
                isTransitioning
                  ? "onboarding-slides__icon-wrapper--transitioning"
                  : ""
              }`}
            >
              <div
                className={`onboarding-slides__icon onboarding-slides__icon--${currentSlideData.colorTheme}`}
              >
                <IconComponent className="onboarding-slides__icon-svg" />
              </div>
              <div
                className={`onboarding-slides__icon-animation onboarding-slides__icon-animation--ping onboarding-slides__icon-animation--${currentSlideData.colorTheme}`}
              ></div>
              <div
                className={`onboarding-slides__icon-animation onboarding-slides__icon-animation--pulse onboarding-slides__icon-animation--${currentSlideData.colorTheme}`}
              ></div>
            </div>
          </div>

          <div
            className={`onboarding-slides__text ${
              isTransitioning ? "onboarding-slides__text--transitioning" : ""
            }`}
          >
            <div className="onboarding-slides__titles">
              <h1 className="onboarding-slides__title">
                {currentSlideData.title}
              </h1>
              <p className="onboarding-slides__subtitle">
                {currentSlideData.subtitle}
              </p>
            </div>
            <p className="onboarding-slides__description">
              {currentSlideData.description}
            </p>
          </div>
        </div>

        <div className="onboarding-slides__controls">
          <div className="onboarding-slides__controls-content">
            <div className="onboarding-slides__progress">
              <div className="onboarding-slides__dots">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`onboarding-slides__dot ${
                      index === currentSlide
                        ? `onboarding-slides__dot--active onboarding-slides__dot--${currentSlideData.colorTheme}`
                        : ""
                    }`}
                  />
                ))}
              </div>
              <div className="onboarding-slides__progress-bar">
                <div
                  className={`onboarding-slides__progress-fill onboarding-slides__progress-fill--${currentSlideData.colorTheme}`}
                  style={{
                    width: `${((currentSlide + 1) / slides.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="onboarding-slides__navigation">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`onboarding-slides__nav-button onboarding-slides__nav-button--prev ${
                  currentSlide === 0
                    ? "onboarding-slides__nav-button--disabled"
                    : ""
                }`}
              >
                <ChevronLeft className="onboarding-slides__nav-icon" />
              </button>

              <div className="onboarding-slides__counter">
                <p className="onboarding-slides__counter-text">
                  {currentSlide + 1} di {slides.length}
                </p>
              </div>

              <button
                onClick={handleContinue}
                className={`onboarding-slides__nav-button onboarding-slides__nav-button--next onboarding-slides__nav-button--${currentSlideData.colorTheme}`}
              >
                {currentSlide === slides.length - 1 ? (
                  <ArrowRight className="onboarding-slides__nav-icon" />
                ) : (
                  <ChevronRight className="onboarding-slides__nav-icon" />
                )}
              </button>
            </div>

            <button
              onClick={handleContinue}
              className={`onboarding-slides__continue-button onboarding-slides__continue-button--${currentSlideData.colorTheme}`}
            >
              {currentSlide === slides.length - 1 ? "Inizia ora" : "Continua"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSlides;
