// services/userService.js - SISTEMA USER UNIFICATO
import { createSlice } from "@reduxjs/toolkit";

// ===== MOCK USER DATA =====
const saraMockData = {
  profile: {
    firstName: "Sara",
    lastName: "Dormand",
    email: "sara@skillhub.com",
    birthDate: "15.03.1992",
    location: "Torino",
    zone: "Centro",
    profilePhoto: null,
    avatar: "👩‍🎨",
    joinedDate: "6 months ago",
    languages: [
      { name: "Italiano", flag: "🇮🇹", level: "Nativo" },
      { name: "Inglese", flag: "🇬🇧", level: "Avanzato" },
      { name: "Francese", flag: "🇫🇷", level: "Intermedio" },
    ],
    skills: [
      {
        id: "photography",
        name: "Fotografia",
        icon: "📸",
        detail: "Street Photography",
        description: "Esperta in fotografia urbana e ritratti",
        gems: 127,
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-25T10:15:00Z",
        source: "demo",
      },
      {
        id: "cooking",
        name: "Cucina",
        icon: "🍳",
        detail: "Cucina Italiana Tradizionale",
        description: "Specializzata in cucina piemontese",
        gems: 89,
        createdAt: "2024-01-02T14:30:00Z",
        updatedAt: "2024-01-23T11:20:00Z",
        source: "demo",
      },
      {
        id: "programming",
        name: "Coding",
        icon: "💻",
        detail: "Frontend Development",
        description: "React, JavaScript, CSS avanzato",
        gems: 156,
        createdAt: "2024-01-03T09:00:00Z",
        updatedAt: "2024-01-22T15:30:00Z",
        source: "demo",
      },
    ],
    aboutMe:
      "Appassionata di insegnamento e condivisione di competenze. Amo aiutare gli altri a crescere attraverso l'apprendimento pratico.",
    level: 18,
    role: "owner",
  },
  preferences: {
    suggestEvents: true,
    notificationsEnabled: true,
    publicProfile: true,
  },
  stats: {
    coursesCompleted: 45,
    studentsHelped: 127,
    totalRating: 4.8,
    gemsEarned: 372,
  },
};

// ===== INITIAL STATE =====
const initialState = {
  // Multi-user storage
  users: {
    sara: saraMockData,
    currentUser: {
      profile: {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        location: "",
        zone: "",
        profilePhoto: null,
        avatar: "👤",
        joinedDate: "Today",
        languages: [],
        skills: [],
        aboutMe: "",
        level: 1,
        role: "viewer",
      },
      preferences: {
        suggestEvents: true,
        notificationsEnabled: true,
        publicProfile: false,
      },
      stats: {
        coursesCompleted: 0,
        studentsHelped: 0,
        totalRating: 0,
        gemsEarned: 0,
      },
    },
  },

  // Current user context
  currentUserId: "currentUser",

  // Demo/presentation state
  demo: {
    selectedPersonId: null, // For search/selection
    isOwnerMode: true, // For role switching
  },

  // User management
  userIdCounter: 2, // sara=0, currentUser=1, next=2
};

// ===== USER SLICE =====
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // === USER SWITCHING ===
    setCurrentUser: (state, action) => {
      const { userId } = action.payload;
      if (state.users[userId]) {
        state.currentUserId = userId;
      }
    },

    createUser: (state, action) => {
      const { userId, userData } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          profile: {
            firstName: "",
            lastName: "",
            email: "",
            birthDate: "",
            location: "",
            zone: "",
            profilePhoto: null,
            avatar: "👤",
            joinedDate: new Date().toLocaleDateString(),
            languages: [],
            skills: [],
            aboutMe: "",
            level: 1,
            role: "viewer",
            ...userData,
          },
          preferences: {
            suggestEvents: true,
            notificationsEnabled: true,
            publicProfile: false,
          },
          stats: {
            coursesCompleted: 0,
            studentsHelped: 0,
            totalRating: 0,
            gemsEarned: 0,
          },
        };
      }
    },

    // === PROFILE MANAGEMENT ===
    updateUserProfile: (state, action) => {
      const { userId, updates } = action.payload;
      const user = state.users[userId];

      if (user) {
        user.profile = { ...user.profile, ...updates };
      }
    },

    updateCurrentUserProfile: (state, action) => {
      const updates = action.payload;
      const currentUser = state.users[state.currentUserId];

      if (currentUser) {
        currentUser.profile = { ...currentUser.profile, ...updates };
      }
    },

    // === SKILLS MANAGEMENT ===
    addUserSkill: (state, action) => {
      const { userId, skill } = action.payload;
      const user = state.users[userId];

      if (user) {
        const exists = user.profile.skills.find((s) => s.id === skill.id);
        if (!exists) {
          user.profile.skills.push({
            ...skill,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      }
    },

    updateUserSkill: (state, action) => {
      const { userId, skill, updates } = action.payload;
      const user = state.users[userId];

      if (user) {
        const skillIndex = user.profile.skills.findIndex(
          // (s) => s.id === skillId
          (s) => s.createdAt === skill.createdAt || s.id === skill.id // ← Doppio check
        );
        if (skillIndex !== -1) {
          user.profile.skills[skillIndex] = {
            ...user.profile.skills[skillIndex],
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          console.log("✅ Skill aggiornata:", user.profile.skills[skillIndex]);
        } else {
          console.log("❌ Skill non trovata per update:", skill);
        }
      }
    },

    removeUserSkill: (state, action) => {
      const { userId, skillId } = action.payload;
      const user = state.users[userId];

      if (user) {
        user.profile.skills = user.profile.skills.filter(
          (s) => s.id !== skillId
        );
      }
    },

    // === BULK PROFILE UPDATE (from onboarding) ===
    completeUserOnboarding: (state, action) => {
      const { userId, onboardingData } = action.payload;
      const user = state.users[userId];

      if (user) {
        // Convert skills from onboarding format
        const convertedSkills =
          onboardingData.skills?.map((skill, index) => ({
            id: skill.id || `skill_${Date.now()}_${index}`,
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

        // Update profile with onboarding data
        user.profile = {
          ...user.profile,
          firstName: onboardingData.firstName || "",
          lastName: onboardingData.lastName || "",
          email: onboardingData.email || "",
          birthDate: onboardingData.birthDate || "",
          location: onboardingData.location || "",
          profilePhoto: onboardingData.profilePhoto || null,
          languages: onboardingData.languages || [],
          skills: convertedSkills,
          aboutMe: onboardingData.aboutMe || "",
        };
      }
    },

    // === DEMO MANAGEMENT ===
    setSelectedPerson: (state, action) => {
      state.demo.selectedPersonId = action.payload;
    },

    toggleUserRole: (state, action) => {
      const userId = action.payload || state.currentUserId;
      const user = state.users[userId];

      if (user) {
        user.profile.role = user.profile.role === "owner" ? "viewer" : "owner";
        state.demo.isOwnerMode = user.profile.role === "owner";
      }
    },

    setUserRole: (state, action) => {
      const { userId, role } = action.payload;
      const user = state.users[userId || state.currentUserId];

      if (user) {
        user.profile.role = role;
        if (userId === state.currentUserId) {
          state.demo.isOwnerMode = role === "owner";
        }
      }
    },

    // === STATS MANAGEMENT ===
    updateUserStats: (state, action) => {
      const { userId, stats } = action.payload;
      const user = state.users[userId];

      if (user) {
        user.stats = { ...user.stats, ...stats };
      }
    },

    incrementUserStat: (state, action) => {
      const { userId, statName, amount = 1 } = action.payload;
      const user = state.users[userId];

      if (user && user.stats[statName] !== undefined) {
        user.stats[statName] += amount;
      }
    },
  },
});

// ===== SELECTORS =====

// Basic user selectors
export const selectCurrentUserId = (state) => state.users.currentUserId;
export const selectCurrentUser = (state) =>
  state.users.users[state.users.currentUserId];
export const selectUserById = (userId) => (state) => state.users.users[userId];

// Profile selectors
export const selectCurrentUserProfile = (state) =>
  state.users.users[state.users.currentUserId]?.profile;

export const selectUserProfile = (userId) => (state) =>
  state.users.users[userId]?.profile;

// Skills selectors
export const selectCurrentUserSkills = (state) =>
  state.users.users[state.users.currentUserId]?.profile?.skills || [];

export const selectUserSkills = (userId) => (state) =>
  state.users.users[userId]?.profile?.skills || [];

// Demo selectors
export const selectSelectedPersonId = (state) =>
  state.users.demo.selectedPersonId;
export const selectIsOwnerMode = (state) => state.users.demo.isOwnerMode;
export const selectSelectedPerson = (state) => {
  const personId = state.users.demo.selectedPersonId;
  return personId ? state.users.users[personId] : null;
};

// Stats selectors
export const selectUserStats = (userId) => (state) =>
  state.users.users[userId]?.stats;

export const selectCurrentUserStats = (state) =>
  state.users.users[state.users.currentUserId]?.stats;

// ===== UTILITY FUNCTIONS =====

// Profile helpers
export const getUserDisplayName = (user) => {
  if (!user?.profile) return "Unknown User";
  return (
    `${user.profile.firstName} ${user.profile.lastName}`.trim() || "Anonymous"
  );
};

export const getUserAvatar = (user) => {
  return user?.profile?.profilePhoto || user?.profile?.avatar || "👤";
};

// Skill helpers
export const getUserSkillById = (user, skillId) => {
  return user?.profile?.skills?.find((skill) => skill.id === skillId);
};

export const getUserSkillsCount = (user) => {
  return user?.profile?.skills?.length || 0;
};

// ===== EXPORTS =====
export const {
  setCurrentUser,
  createUser,
  updateUserProfile,
  updateCurrentUserProfile,
  addUserSkill,
  updateUserSkill,
  removeUserSkill,
  completeUserOnboarding,
  setSelectedPerson,
  toggleUserRole,
  setUserRole,
  updateUserStats,
  incrementUserStat,
} = userSlice.actions;

export default userSlice.reducer;
