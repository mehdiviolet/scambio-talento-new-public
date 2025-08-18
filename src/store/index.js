// src/store/index.js - AGGIORNATO con xpService
import { configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "./slices/onboardingSlice";
import quickSetupReducer from "./slices/quickSetupSlice";
import experiencesReducer from "./slices/experiencesSlice";
import eventsReducer from "./slices/eventsSlice";
// import demoSlice from "../store/slices/demoSlice";
// import personReducer from "../store/slices/personSlice";
import experienceSliceTest from "../store/slices/experienceSliceTest";
import chatReducer from "../store/slices/chatSlice";
import notificationReducer from "../store/slices/notificationSlice";
import searchReducer from "../store/slices/searchSlice";
import userReducer from "../services/userService";
import sharedEventReducer from "./slices/sharedEventSlice";
import galleryReducer from "./slices/gallerySlice";

// ✨ NUOVO: XP Service unificato
import xpReducer from "../services/xpService";

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    quickSetup: quickSetupReducer,
    experiences: experiencesReducer,
    events: eventsReducer,
    // demo: demoSlice, // 🚨 MANTERREMO per ora, poi migreremo
    // person: personReducer,
    experienceSliceTest: experienceSliceTest,
    chat: chatReducer,
    notifications: notificationReducer,
    search: searchReducer,
    users: userReducer,
    sharedEvent: sharedEventReducer, // 👈 AGGIUNGERE QUESTA RIGA

    // ✨ NUOVO REDUCER
    xp: xpReducer, // 👈 XP system unificato
    gallery: galleryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["quickSetup/setProfilePhoto", "events/addEvent"],
        ignoredPaths: [
          "quickSetup.profileData.profilePhoto",
          "events.events.coverImage",
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});
