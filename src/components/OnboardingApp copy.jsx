import React, { useEffect } from "react";
// import { useOnboarding } from "./Context/OnboardingContext"; // IMPORTA CONTEXTO
import SplashScreen from "./Onboarding/SplashScreen"; // IMPORTA SCHERMATA DI CARICAMENTO
import OnboardingSlides from "./Onboarding/OnboardingSlides"; // IMPORTA SLIDE DI ONBOARDING
import AuthScreen from "./Onboarding/AuthScreen"; // IMPORTA SCHERMATA DI AUTENTICAZIONE
import ReadyToStartSlide from "./Onboarding/ReadyToStartSlide";
import QuickSetupSlides from "./Onboarding/QuickSetupSlides";
import { ProfilePage } from "./MainApp/Profile";
import MainAppRouter from "./MainAppRouter";
import styles from "./OnboardingApp.module.css";
//import Dashboard from "./Dashboard";

// import { useQuickSetup } from "../../hooks/useQuickSetup";
import { useOnboarding } from "../hooks/useOnboardingRedux";
import Login from "./Onboarding/Login";

const OnboardingApp = () => {
  const {
    isLoading,
    setIsLoading,
    showOnboarding,
    setShowOnboarding,
    setShowReadyToStart,
    showAuth,
    showReadyToStart,
    showQuickSetup,
    showDashboard,
    setShowDashboard,
  } = useOnboarding();

  useEffect(() => {
    // Inizializza sistema audio

    const timer = setTimeout(() => {
      setIsLoading(false);
      // setShowDashboard(true);
      setShowReadyToStart(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.screenBg}>
      {/* {isLoading && <SplashScreen />} */}
      {isLoading && <Login />}
      {/* {showOnboarding && <OnboardingSlides />} */}
      {showReadyToStart && <ReadyToStartSlide />}
      {showQuickSetup && <QuickSetupSlides />}
      {showAuth && <AuthScreen />}
      {/* {showDashboard && <ProfilePage />}  */}
      {/* {showDashboard && <MainAppRouter userId="sara" role="owner" />}{" "} */}
      {showDashboard && <MainAppRouter role="owner" />} {/* NUOVO COMPONENTE */}
    </div>
  );
};

export default OnboardingApp;
