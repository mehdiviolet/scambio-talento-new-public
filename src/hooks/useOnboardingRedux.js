// src/hooks/useOnboardingRedux.js
import { useAppDispatch, useAppSelector } from "./redux";
import {
  setShowReadyToStart,
  setShowQuickSetup,
  setQuickSetupStep,
  setIsLoading,
  setShowOnboarding,
  setShowAuth,
  setCurrentSlide,
  setAuthMode,
  setSignupStep,
  setShowPassword,
  setShowDashboard,
  setShowProfile,
  setIsOnboardingComplete,
  setUserProfile,
  updateFormData,
  resetFormData,
  completeOnboarding as completeOnboardingAction,
  resetOnboarding,
} from "../store/slices/onboardingSlice";
import { completeUserOnboarding } from "../services/userService";

export const useOnboarding = () => {
  const dispatch = useAppDispatch();
  const onboardingState = useAppSelector((state) => state.onboarding);

  // Funzione per convertire skills (come nel Context originale)
  const convertSkillsToProfileFormat = (quickSetupSkills) => {
    if (!quickSetupSkills || quickSetupSkills.length === 0) {
      return [];
    }

    // return quickSetupSkills.map((skill, index) => ({
    //   id: skill.id,
    //   name: skill.name,
    //   icon: skill.icon,
    //   detail: skill.name,
    //   description: "",
    //   gems: 0,
    //   createdAt: new Date(Date.now() + index).toISOString(),
    //   updatedAt: new Date(Date.now() + index).toISOString(),
    //   source: "onboarding",
    //   isFromOnboarding: true,
    // }));

    return quickSetupSkills.map((skill, index) => ({
      id: skill.id,
      name: skill.name,
      icon: skill.icon,
      detail: skill.name,
      description: "",
      gems: 0,
      createdAt: new Date(Date.now() + index).toISOString(),
      updatedAt: new Date(Date.now() + index).toISOString(),
      source: "onboarding",
      isFromOnboarding: true,
    }));
  };

  // const onboardingActions = {
  //   // Stati semplici
  //   setIsLoading: (loading) => dispatch(setIsLoading(loading)),
  //   setShowOnboarding: (show) => dispatch(setShowOnboarding(show)),
  //   setShowAuth: (show) => dispatch(setShowAuth(show)),
  //   setCurrentSlide: (slide) => dispatch(setCurrentSlide(slide)),
  //   setAuthMode: (mode) => dispatch(setAuthMode(mode)),
  //   setSignupStep: (step) => dispatch(setSignupStep(step)),
  //   setShowPassword: (show) => dispatch(setShowPassword(show)),
  //   setShowReadyToStart: (show) => dispatch(setShowReadyToStart(show)),
  //   setShowQuickSetup: (show) => dispatch(setShowQuickSetup(show)),
  //   setQuickSetupStep: (step) => dispatch(setQuickSetupStep(step)),
  //   setShowDashboard: (show) => dispatch(setShowDashboard(show)),
  //   setShowProfile: (show) => dispatch(setShowProfile(show)),
  //   setIsOnboardingComplete: (complete) =>
  //     dispatch(setIsOnboardingComplete(complete)),
  //   setUserProfile: (profile) => dispatch(setUserProfile(profile)),

  //   // FormData management
  //   setFormData: (data) => dispatch(updateFormData(data)),
  //   updateFormData: (data) => dispatch(updateFormData(data)),
  //   resetFormData: () => dispatch(resetFormData()),

  //   // Funzione complessa completeOnboarding
  //   completeOnboarding: (profileData) =>
  //     dispatch(completeOnboarding(profileData)),

  //   // Utility function
  //   convertSkillsToProfileFormat,

  //   // Reset completo
  //   resetOnboarding: () => dispatch(resetOnboarding()),
  // };

  const onboardingActions = {
    // Stati semplici
    setIsLoading: (loading) => dispatch(setIsLoading(loading)),
    setShowOnboarding: (show) => dispatch(setShowOnboarding(show)),
    setShowAuth: (show) => dispatch(setShowAuth(show)),
    setCurrentSlide: (slide) => dispatch(setCurrentSlide(slide)),
    setAuthMode: (mode) => dispatch(setAuthMode(mode)),
    setSignupStep: (step) => dispatch(setSignupStep(step)),
    setShowPassword: (show) => dispatch(setShowPassword(show)),
    setShowReadyToStart: (show) => dispatch(setShowReadyToStart(show)),
    setShowQuickSetup: (show) => dispatch(setShowQuickSetup(show)),
    setQuickSetupStep: (step) => dispatch(setQuickSetupStep(step)),
    setShowDashboard: (show) => dispatch(setShowDashboard(show)),
    setShowProfile: (show) => dispatch(setShowProfile(show)),
    setIsOnboardingComplete: (complete) =>
      dispatch(setIsOnboardingComplete(complete)),
    setUserProfile: (profile) => dispatch(setUserProfile(profile)),

    // FormData management
    setFormData: (data) => dispatch(updateFormData(data)),
    updateFormData: (data) => dispatch(updateFormData(data)),
    resetFormData: () => dispatch(resetFormData()),

    // ✅ FUNZIONE COMPLESSA FIXED: completeOnboarding
    completeOnboarding: (profileData) => {
      console.log(
        "🚀 useOnboarding.completeOnboarding chiamato con:",
        profileData
      );

      // 1. ✅ Aggiorna onboardingSlice (come prima)
      dispatch(completeOnboardingAction(profileData));

      // 2. ✅ NUOVO: Aggiorna anche userService!
      dispatch(
        completeUserOnboarding({
          userId: "currentUser",
          onboardingData: profileData,
        })
      );

      console.log("✅ Pipeline completa: onboarding → userService");
    },

    // Utility function
    convertSkillsToProfileFormat,

    // Reset completo
    resetOnboarding: () => dispatch(resetOnboarding()),
  };
  return {
    // Tutti gli stati
    ...onboardingState,

    // Tutte le funzioni
    ...onboardingActions,
  };
};
