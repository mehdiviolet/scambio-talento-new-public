// src/store/slices/quickSetupSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Dati statici (come nel Context originale)
const skillsData = [
  { id: "writing", name: "Scrittura", icon: "✍️" },
  { id: "cooking", name: "Cucina", icon: "🍳" },
  { id: "photography", name: "Fotografia", icon: "📸" },
  { id: "history", name: "Storia", icon: "📚" },
  { id: "music", name: "Musica", icon: "🎵" },
  { id: "dance", name: "Danza", icon: "💃" },
  { id: "painting", name: "Pittura", icon: "🎨" },
  { id: "video", name: "Video", icon: "🎬" },
  { id: "architecture", name: "Architettura", icon: "🏛️" },
  { id: "graphics", name: "Grafica", icon: "🎭" },
  { id: "theater", name: "Teatro", icon: "🎪" },
  { id: "psychology", name: "Psicologia", icon: "🧠" },
  { id: "programming", name: "coding", icon: "💻" },
  { id: "fashion", name: "Fashion", icon: "👗" },
  { id: "health", name: "Salute", icon: "💪" },
  { id: "gardening", name: "Giardinaggio", icon: "🌱" },
  { id: "languages", name: "Lingue", icon: "🗣️" },
  { id: "videogames", name: "Videogiochi", icon: "🎮" },
  { id: "podcast", name: "Podcast", icon: "🎙️" },
];

const languagesData = [
  { name: "Italiano", flag: "🇮🇹" },
  { name: "Inglese", flag: "🇬🇧" },
  { name: "Francese", flag: "🇫🇷" },
  { name: "Spagnolo", flag: "🇪🇸" },
  { name: "Tedesco", flag: "🇩🇪" },
  { name: "Portoghese", flag: "🇵🇹" },
  { name: "Russo", flag: "🇷🇺" },
  { name: "Cinese", flag: "🇨🇳" },
  { name: "Giapponese", flag: "🇯🇵" },
  { name: "Arabo", flag: "🇸🇦" },
];

const steps = [
  {
    title: "Chi sei?",
    subtitle: "Partiamo da qui! 😊",
    component: "identity",
    xpReward: 60,
  },
  {
    title: "Le tue abilità",
    subtitle: "Seleziona le tue competenze! 🚀",
    component: "skills",
    xpReward: 40,
  },
  {
    title: "Cosa vuoi imparare?",
    subtitle: "Scopri nuove abilità 🚀",
    component: "learning",
    xpReward: 25,
  },
  {
    title: "Lingua e posizione",
    subtitle: "Che lingue parli? 🌍",
    component: "location",
    xpReward: 25,
  },
  {
    title: "Ultimi ritocchi",
    subtitle: "Ci siamo quasi! 🎉",
    component: "final",
    xpReward: 50,
  },
];

const achievementsList = [
  {
    id: "first_skill",
    name: "Primo Talento",
    description: "Hai aggiunto la tua prima skill!",
    icon: "🎯",
  },
  {
    id: "skill_master",
    name: "Maestro delle Skill",
    description: "3+ competenze aggiunte!",
    icon: "🏆",
  },
  {
    id: "polyglot",
    name: "Poliglotta",
    description: "Parli 3+ lingue!",
    icon: "🤯",
  },
  {
    id: "learner",
    name: "Eterno Studente",
    description: "Vuoi imparare 5+ cose nuove!",
    icon: "📚",
  },
  {
    id: "complete",
    name: "Profilo Completo",
    description: "Hai completato tutto!",
    icon: "👑",
  },
];

const initialState = {
  // Stati del progress
  currentStep: 0,
  // xp: 0,
  level: 1,
  achievements: [],
  showAchievement: null,
  showWelcome: false,
  isExiting: false,
  completedSteps: [],

  // Dati del profilo
  profileData: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    profilePhoto: null,
    skills: [],
    wantedSkills: [],
    languages: [],
    location: "",
    aboutMe: "",
    eventSuggestions: true,
    social: {
      followers: [],
      following: [],
    },
  },

  // Dati statici
  skillsData,
  languagesData,
  steps,
  achievementsList,

  lastXpReward: 0,
  totalDailyRewards: 0,
};

const quickSetupSlice = createSlice({
  name: "quickSetup",
  initialState,
  reducers: {
    // Stati semplici
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setXp: (state, action) => {
      state.xp = action.payload;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setShowAchievement: (state, action) => {
      state.showAchievement = action.payload;
    },
    setShowWelcome: (state, action) => {
      state.showWelcome = action.payload;
    },
    setIsExiting: (state, action) => {
      state.isExiting = action.payload;
    },
    setCompletedSteps: (state, action) => {
      state.completedSteps = action.payload;
    },

    // Aggiorna profilo data
    updateProfileData: (state, action) => {
      state.profileData = { ...state.profileData, ...action.payload };
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },

    // Gestione XP e Achievements
    // addXP: (state, action) => {
    //   state.xp += action.payload;
    // },
    // Reducer
    setLastXpReward: (state, action) => {
      state.lastXpReward = action.payload;
    },
    addDailyReward: (state, action) => {
      state.totalDailyRewards += action.payload;
    },

    addAchievement: (state, action) => {
      const achievement = action.payload;
      const exists = state.achievements.find((a) => a.id === achievement.id);
      if (!exists) {
        state.achievements.push(achievement);
      }
    },

    triggerAchievement: (state, action) => {
      const achievement = action.payload;
      const exists = state.achievements.find((a) => a.id === achievement.id);
      if (!exists) {
        state.achievements.push(achievement);
        state.showAchievement = achievement;
        // Il timeout per nascondere l'achievement sarà gestito nel componente
      }
    },

    // XP Milestones
    checkXPMilestones: (state) => {
      const milestones = [100, 200, 300, 500];
      const currentMilestone = milestones.find(
        (milestone) =>
          state.xp >= milestone &&
          !state.achievements.find((a) => a.id === `xp_${milestone}`)
      );

      if (currentMilestone) {
        const achievement = {
          id: `xp_${currentMilestone}`,
          name: `${currentMilestone} XP!`,
          description: "Continua così!",
          icon: "🚀",
        };
        state.achievements.push(achievement);
        state.showAchievement = achievement;
      }
    },

    // Toggle functions per selezioni
    toggleSkill: (state, action) => {
      const skill = action.payload;
      const exists = state.profileData.skills.find((s) => s.id === skill.id);

      if (exists) {
        state.profileData.skills = state.profileData.skills.filter(
          (s) => s.id !== skill.id
        );
      } else {
        state.profileData.skills.push(skill);
      }
    },

    toggleWantedSkill: (state, action) => {
      const skill = action.payload;
      const exists = state.profileData.wantedSkills.find(
        (s) => s.id === skill.id
      );

      if (exists) {
        state.profileData.wantedSkills = state.profileData.wantedSkills.filter(
          (s) => s.id !== skill.id
        );
      } else {
        state.profileData.wantedSkills.push(skill);
      }
    },

    toggleLanguage: (state, action) => {
      const language = action.payload;
      const exists = state.profileData.languages.find(
        (l) => l.name === language.name
      );

      if (exists) {
        state.profileData.languages = state.profileData.languages.filter(
          (l) => l.name !== language.name
        );
      } else {
        state.profileData.languages.push({ ...language, level: "Intermedio" });
      }
    },

    // Upload immagine profilo
    setProfilePhoto: (state, action) => {
      const file = action.payload;
      if (file && file instanceof File) {
        const imageUrl = URL.createObjectURL(file);
        state.profileData.profilePhoto = imageUrl;
      }
    },

    // Check achievements basato sui dati correnti
    checkAchievements: (state) => {
      const { profileData, achievementsList, achievements } = state;

      // Primo talento
      if (profileData.skills.length === 1) {
        const achievement = achievementsList.find(
          (a) => a.id === "first_skill"
        );
        if (achievement && !achievements.find((a) => a.id === achievement.id)) {
          state.achievements.push(achievement);
          state.showAchievement = achievement;
        }
      }

      // Maestro delle skill
      if (profileData.skills.length >= 3) {
        const achievement = achievementsList.find(
          (a) => a.id === "skill_master"
        );
        if (achievement && !achievements.find((a) => a.id === achievement.id)) {
          state.achievements.push(achievement);
          state.showAchievement = achievement;
        }
      }

      // Poliglotta
      if (profileData.languages.length >= 3) {
        const achievement = achievementsList.find((a) => a.id === "polyglot");
        if (achievement && !achievements.find((a) => a.id === achievement.id)) {
          state.achievements.push(achievement);
          state.showAchievement = achievement;
        }
      }

      // Eterno studente
      if (profileData.wantedSkills.length >= 5) {
        const achievement = achievementsList.find((a) => a.id === "learner");
        if (achievement && !achievements.find((a) => a.id === achievement.id)) {
          state.achievements.push(achievement);
          state.showAchievement = achievement;
        }
      }
    },

    // Validazione per procedere al passo successivo
    // Questa non modifica lo state, ma sarà usata tramite selector

    // Reset per editing
    resetForEdit: (state) => {
      state.currentStep = 0;
      state.showWelcome = false;
      state.isExiting = false;
    },

    // Reset completo
    resetQuickSetup: (state) => {
      return { ...initialState };
    },
  },
});

// Selectors personalizzati per logica complessa
export const selectCanContinue = (state) => {
  const { currentStep, profileData } = state.quickSetup;

  switch (currentStep) {
    case 0:
      return (
        profileData.firstName &&
        profileData.lastName &&
        (profileData.email || profileData.phone)
      );
    case 1:
      return profileData.skills.length > 0;
    case 2:
      return profileData.wantedSkills.length > 0;
    case 3:
      return profileData.languages.length > 0;
    case 4:
      return true;
    default:
      return false;
  }
};

export const {
  setCurrentStep,
  setXp,
  setLevel,
  setShowAchievement,
  setShowWelcome,
  setIsExiting,
  setCompletedSteps,
  updateProfileData,
  setProfileData,
  // addXP,
  addAchievement,
  triggerAchievement,
  checkXPMilestones,
  toggleSkill,
  toggleWantedSkill,
  toggleLanguage,
  setProfilePhoto,
  checkAchievements,
  resetForEdit,
  resetQuickSetup,
  setLastXpReward,
} = quickSetupSlice.actions;

export default quickSetupSlice.reducer;
