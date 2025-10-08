import React, { useEffect, useRef, useState } from "react";
import SplashScreen from "./Onboarding/SplashScreen";
import Login from "./Onboarding/Login";
import RegisterMinimal from "./Onboarding/RegisterMinimal";
import ForgotPassword from "./Onboarding/ForgotPassword";
import ReadyToStartSlide from "./Onboarding/ReadyToStartSlide";
import QuickSetupSlides from "./Onboarding/QuickSetupSlides";
import MainAppRouter from "./MainAppRouter";
import styles from "./OnboardingApp.module.css";
import { useOnboarding } from "../hooks/useOnboardingRedux";
import ResetPassword from "./Onboarding/ResetPassword";
import DemoHelper from "./Onboarding/DemoHelper";
import EmailHelper from "./Onboarding/EmailHelper";
import EmailNotification from "./Onboarding/EmailNotification";
import ResetDemoHelper from "./Onboarding/ResetDemoHelper";
import RegisterDemoHelper from "./Onboarding/RegisterDemoHelper";

const OnboardingApp = () => {
  const {
    showReadyToStart,
    showQuickSetup,
    setShowReadyToStart,
    setShowQuickSetup,
  } = useOnboarding();

  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState("login");
  const [userType, setUserType] = useState(null);
  const [showEmailNotification, setShowEmailNotification] = useState(false);

  // ✅ Ref per accedere al componente Login
  const loginRef = useRef(null);
  const emailHelperRef = useRef(null); // ✅ AGGIUNGI questa riga
  const resetPasswordRef = useRef(null); // ✅ AGGIUNGI questa riga
  const registerRef = useRef(null); // ✅ AGGIUNGI questa riga

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("login");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleGoToQuickSetup = () => {
      setCurrentStep("quickSetup");
    };

    window.addEventListener("goToQuickSetup", handleGoToQuickSetup);

    return () => {
      window.removeEventListener("goToQuickSetup", handleGoToQuickSetup);
    };
  }, []);

  // ✅ Funzione che chiama il metodo del Login tramite ref
  const handleDemoFill = () => {
    console.log("Demo fill clicked!");

    if (loginRef.current && loginRef.current.fillDemoData) {
      loginRef.current.fillDemoData();
      console.log("Demo data filled via ref!");
    } else {
      console.log("Login ref not available");
    }
  };

  const handleResetDemoFill = () => {
    console.log("Reset demo fill clicked!");

    if (resetPasswordRef.current && resetPasswordRef.current.fillDemoData) {
      resetPasswordRef.current.fillDemoData();
      console.log("Reset demo data filled via ref!");
    } else {
      console.log("ResetPassword ref not available");
    }
  };

  const handleRegisterDemoFill = () => {
    console.log("Register demo fill clicked!");

    if (registerRef.current && registerRef.current.fillDemoData) {
      registerRef.current.fillDemoData();
      console.log("Register demo data filled via ref!");
    } else {
      console.log("Register ref not available");
    }
  };

  // ✅ AGGIUNGI questa funzione dopo handleDemoFill
  const handleSimulateEmailClick = () => {
    console.log("Simulating email link click!");

    // Vai direttamente al reset password
    setCurrentStep("resetPassword");
  };

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

    setShowQuickSetup(true);
    setCurrentStep("quickSetup"); // ✅ AGGIUNGI questa riga
  };

  const handleForgotPassword = () => {
    console.log("User forgot password");
    setCurrentStep("forgotPassword");
    // setShowEmailNotification(true); // ✅ AGGIUNGI questa riga
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
      {/* SPLASH SCREEN */}
      {isLoading && <SplashScreen />}

      {/* ✅ WIDGET DEMO - Sempre visibile quando siamo nel login */}
      {currentStep === "login" && !isLoading && (
        <div className={styles.widgetsArea}>
          <DemoHelper onDemoFill={handleDemoFill} />
        </div>
      )}

      {/* LOGIN PAGE con ref */}
      {currentStep === "login" && !isLoading && (
        <Login
          ref={loginRef}
          onLoginSuccess={handleLoginSuccess}
          onRegister={handleRegister}
          onForgotPassword={handleForgotPassword}
        />
      )}

      {/* REGISTER PAGE */}
      {currentStep === "register" && !isLoading && (
        <>
          <RegisterDemoHelper onDemoFill={handleRegisterDemoFill} />
          <RegisterMinimal
            ref={registerRef}
            onRegisterSuccess={handleRegisterSuccess}
            onBackToLogin={handleBackToLogin}
          />
        </>
      )}

      {/* FORGOT PASSWORD PAGE */}
      {currentStep === "forgotPassword" && !isLoading && (
        <ForgotPassword
          onBackToLogin={handleBackToLogin}
          onResetPassword={() => setCurrentStep("resetPassword")}
          onEmailSent={() => setShowEmailNotification(true)} // ✅ AGGIUNGI questa riga
        />
      )}

      {/* WIDGET EMAIL - Solo durante forgot password */}
      {/* {currentStep === "forgotPassword" && !isLoading && (
        <div className={styles.widgetsArea}>
          <EmailHelper
            ref={emailHelperRef}
            onSimulateEmailClick={handleSimulateEmailClick}
          />
        </div>
      )} */}
      {/* EmailHelper invisibile - solo funzionalità modal */}
      <EmailHelper
        ref={emailHelperRef}
        onSimulateEmailClick={handleSimulateEmailClick}
        hidden={true}
      />
      {/* RESET PASSWORD PAGE */}
      {/* RESET PASSWORD PAGE */}
      {currentStep === "resetPassword" && !isLoading && (
        <>
          <div className={styles.widgetsArea}>
            <ResetDemoHelper onDemoFill={handleResetDemoFill} />
          </div>
          <ResetPassword
            ref={resetPasswordRef}
            onBackToLogin={handleBackToLogin}
          />
        </>
      )}

      {/* READY TO START */}
      {showReadyToStart && !isLoading && userType === "new" && (
        <ReadyToStartSlide />
      )}

      {/* QUICK SETUP */}
      {/* {showQuickSetup && !isLoading && userType === "new" && (
        <QuickSetupSlides onComplete={handleQuickSetupComplete} />
      )} */}
      {currentStep === "quickSetup" && !isLoading && (
        <QuickSetupSlides onComplete={handleQuickSetupComplete} />
      )}

      {/* MAIN APP */}
      {currentStep === "main" && !isLoading && (
        <MainAppRouter
          role="owner"
          userType={userType}
          isFirstTime={userType === "new"}
        />
      )}

      {/* Notifica Email */}
      <EmailNotification
        show={showEmailNotification && currentStep === "forgotPassword"}
        onNotificationClick={() => {
          setShowEmailNotification(false);
          // Apre automaticamente il modal EmailHelper
          if (emailHelperRef.current && emailHelperRef.current.openModal) {
            emailHelperRef.current.openModal();
          }
        }}
      />
    </div>
  );
};

export default OnboardingApp;
