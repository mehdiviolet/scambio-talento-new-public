import React, { useEffect, useState } from "react";
import SplashScreen from "./Onboarding/SplashScreen";
import Login from "./Onboarding/Login";
import RegisterMinimal from "./Onboarding/RegisterMinimal";
import ForgotPassword from "./Onboarding/ForgotPassword";
import ReadyToStartSlide from "./Onboarding/ReadyToStartSlide";
import QuickSetupSlides from "./Onboarding/QuickSetupSlides";
import MainAppRouter from "./MainAppRouter";
import styles from "./OnboardingApp.module.css";
import { useOnboarding } from "../hooks/useOnboardingRedux"; // ✅ Usa hook Redux
import ResetPassword from "./Onboarding/ResetPassword";

const OnboardingApp = () => {
  // ✅ Usa hook Redux per stati globali
  const { showReadyToStart, showQuickSetup, setShowReadyToStart } =
    useOnboarding();

  // ✅ Stati locali solo per flusso lineare
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState("login");
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("login");
    }, 5000); // ✅ Torna a 3 secondi

    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = (userData) => {
    console.log("Login successful:", userData);
    setUserType("existing");
    setCurrentStep("main");
  };

  const handleRegister = () => {
    console.log("User wants to register");
    setCurrentStep("register");
  };

  const handleRegisterSuccess = (userData) => {
    console.log("Registration successful:", userData);
    setUserType("new");
    // ✅ Usa Redux hook correttamente
    setShowReadyToStart(true);
    setCurrentStep("readyToStart");
  };

  const handleForgotPassword = () => {
    console.log("User forgot password");
    setCurrentStep("forgotPassword");
  };

  const handleBackToLogin = () => {
    console.log("Back to login");
    setCurrentStep("login");
  };

  const handleQuickSetupComplete = (profileData) => {
    console.log("Quick setup completed:", profileData);
    setCurrentStep("main");
  };

  return (
    <div className={styles.screenBg}>
      {/* SPLASH SCREEN - Sempre mostrato all'avvio */}
      {isLoading && <SplashScreen />}

      {/* LOGIN PAGE - Prima pagina dopo splash */}
      {currentStep === "login" && !isLoading && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onRegister={handleRegister}
          onForgotPassword={handleForgotPassword}
        />
      )}

      {/* REGISTER PAGE - Per nuovi utenti */}
      {currentStep === "register" && !isLoading && (
        <RegisterMinimal
          onRegisterSuccess={handleRegisterSuccess}
          onBackToLogin={handleBackToLogin}
        />
      )}

      {/* FORGOT PASSWORD PAGE */}
      {currentStep === "forgotPassword" && !isLoading && (
        <ForgotPassword
          onBackToLogin={handleBackToLogin}
          onResetPassword={() => setCurrentStep("resetPassword")} // ✅ Nuovo
        />
      )}

      {/* RESET PASSWORD PAGE */}
      {currentStep === "resetPassword" && !isLoading && (
        <ResetPassword onBackToLogin={handleBackToLogin} />
      )}

      {/* READY TO START - Solo per nuovi utenti */}
      {showReadyToStart && !isLoading && userType === "new" && (
        <ReadyToStartSlide />
      )}

      {/* QUICK SETUP - Solo per nuovi utenti */}
      {showQuickSetup && !isLoading && userType === "new" && (
        <QuickSetupSlides onComplete={handleQuickSetupComplete} />
      )}

      {/* MAIN APP - Destinazione finale per tutti */}
      {currentStep === "main" && !isLoading && (
        <MainAppRouter
          role="owner"
          userType={userType}
          isFirstTime={userType === "new"}
        />
      )}
    </div>
  );
};

export default OnboardingApp;
