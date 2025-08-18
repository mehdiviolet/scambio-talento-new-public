// src/store/slices/onboardingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Stati esistenti dal OnboardingContext
  showReadyToStart: false,
  showQuickSetup: false,
  quickSetupStep: 0,
  isLoading: true,
  showOnboarding: false,
  showAuth: false,
  currentSlide: 0,
  authMode: "login",
  signupStep: 1,
  showPassword: false,

  // Nuovi stati per l'app principale
  showDashboard: false,
  showProfile: false,
  isOnboardingComplete: false,
  userProfile: null,

  // FormData centralizzato  از این داره میگیره
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
    skills: [],
    seekingSkills: [],
    languages: [],
    aboutMe: "",
    location: "",
    gallery: [],
    suggestEvents: true,
    additionalSkills: [],
    xp: 0,
    level: 1,
    achievements: [],
    isOwner: true,
    viewMode: "owner",
  },
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    // Stati semplici
    setShowReadyToStart: (state, action) => {
      state.showReadyToStart = action.payload;
    },
    setShowQuickSetup: (state, action) => {
      state.showQuickSetup = action.payload;
    },
    setQuickSetupStep: (state, action) => {
      state.quickSetupStep = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setShowOnboarding: (state, action) => {
      state.showOnboarding = action.payload;
    },
    setShowAuth: (state, action) => {
      state.showAuth = action.payload;
    },
    setCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
    setSignupStep: (state, action) => {
      state.signupStep = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setShowDashboard: (state, action) => {
      state.showDashboard = action.payload;
    },
    setShowProfile: (state, action) => {
      state.showProfile = action.payload;
    },
    setIsOnboardingComplete: (state, action) => {
      state.isOnboardingComplete = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },

    // FormData updates
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
    // E queste 2 azioni
    toggleViewMode: (state) => {
      state.isOwner = !state.isOwner;
    },
    setViewMode: (state, action) => {
      state.isOwner = action.payload === "owner";
    },

    // Funzione complessa: completeOnboarding
    completeOnboarding: (state, action) => {
      const profileData = action.payload;

      // Converte skills dal formato QuickSetup al formato ProfilePage
      const convertedSkills =
        profileData.skills?.map((skill, index) => ({
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
        })) || [];

      // Prepara dati completi
      const completeProfileData = {
        ...profileData,
        skills: convertedSkills,
      };

      // Aggiorna stati
      state.formData = { ...state.formData, ...completeProfileData };
      state.userProfile = completeProfileData;
      state.isOnboardingComplete = true;
      state.showDashboard = true;

      // Nasconde tutti gli stati di onboarding
      state.showOnboarding = false;
      state.showReadyToStart = false;
      state.showQuickSetup = false;
      state.showAuth = false;
      state.showProfile = false;
    },

    // Reset completo
    resetOnboarding: (state) => {
      return initialState;
    },

    addWantedSkill: (state, action) => {
      if (!state.formData.wantedSkills) {
        state.formData.wantedSkills = [];
      }
      state.formData.wantedSkills.push(action.payload);
    },

    updateWantedSkillDescription: (state, action) => {
      const { skillId, description } = action.payload;
      const skill = state.formData.wantedSkills?.find((s) => s.id === skillId);
      if (skill) {
        skill.description = description;
      }
    },

    removeWantedSkill: (state, action) => {
      const { skillId } = action.payload;
      if (state.formData.wantedSkills) {
        state.formData.wantedSkills = state.formData.wantedSkills.filter(
          (s) => s.id !== skillId
        );
      }
    },
  },
});

export const {
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
  completeOnboarding,
  resetOnboarding,
  setViewMode,
  updateWantedSkillDescription,
  removeWantedSkill,
  addWantedSkill,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
