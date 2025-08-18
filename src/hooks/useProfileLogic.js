// hooks/useProfileLogic.js - UPDATED con eventi
import { useEffect, useCallback, useMemo } from "react";
// import { useOnboarding } from "./useOnboardingRedux";
// import { useQuickSetup } from "./useQuickSetup";
import { useExperiences } from "./useExperiences";
import { useEvents } from "./useEvents"; // ✨ NUOVO HOOK
import { useAppSelector, useAppDispatch } from "./redux";

import {
  selectCurrentUserProfile,
  selectCurrentUserSkills,
  // updateCurrentUserProfile,
  addUserSkill,
  // updateUserSkill,
  // removeUserSkill,
} from "../services/userService";
import { updateFormData } from "@/store/slices/onboardingSlice";

export const useProfileLogic = () => {
  // const { formData, updateFormData } = useOnboarding();
  // const { profileData, skillsData } = useQuickSetup();
  // ✅ CON:
  const currentProfile = useAppSelector(selectCurrentUserProfile);
  const currentSkills = useAppSelector(selectCurrentUserSkills);
  const dispatch = useAppDispatch();
  const {
    experiences,
    addExperience,
    removeExperience,
    updateExperience,
    removeExperiencesBySkill,
    cleanupExperiencesIfNoSkills,
    validateExperiencesAgainstSkills,
  } = useExperiences();

  // ✨ NUOVO: Hook per eventi
  const { events, addEvent, removeEvent, updateEvent } = useEvents();

  // ✅ Memoize per evitare re-calculations
  const skills = useMemo(() => currentSkills || [], [currentSkills]);
  const skillsLength = useMemo(() => skills.length, [skills.length]);

  // ✅ Debug migliorato
  console.log("🔍 DEBUG useProfileLogic:", {
    // hasFormData: !!formData,
    skillsCount: skillsLength,
    experiencesLength: experiences?.length || 0,
    eventsLength: events?.length || 0, // ✨ NUOVO
  });

  // ✅ FIXED: useEffect con dependency precise e controllo per evitare loop
  useEffect(() => {
    // Solo se abbiamo effettivamente dei cambiamenti nelle skills
    if (skillsLength > 0) {
      validateExperiencesAgainstSkills(skills);
    } else if (skillsLength === 0 && experiences.length > 0) {
      // Solo pulisci se ci sono esperienze da pulire
      cleanupExperiencesIfNoSkills([]);
    }
  }, [skillsLength]); // ✅ Dependency solo sulla lunghezza, non sull'array

  // ===== SKILLS LOGIC (esistente) =====
  const handleSaveSkill = useCallback(
    (newSkill) => {
      console.log("💾 Salvando nuova skill:", newSkill);
      dispatch(
        addUserSkill({
          userId: "currentUser", // TODO: get from selector
          skill: newSkill,
        })
      );
    },
    [dispatch]
  );

  const handleUpdateSkill = useCallback(
    (updatedSkill) => {
      console.log("🔄 Aggiornando skill:", updatedSkill);

      const updatedSkills = skills.map((skill) => {
        const shouldUpdate =
          skill.id === updatedSkill.id ||
          (skill.createdAt === updatedSkill.createdAt &&
            skill.name === updatedSkill.name);

        console.log(
          `🔄 Checking skill "${skill.name}" (id: ${skill.id}):`,
          shouldUpdate
        );

        return shouldUpdate ? updatedSkill : skill;
      });

      updateFormData({
        skills: updatedSkills,
      });
    },
    [dispatch]
  );

  const handleDeleteSkill = useCallback(
    (skillToDelete) => {
      console.log("🗑️ Eliminando skill:", skillToDelete);

      const associatedExperiences =
        experiences?.filter(
          (exp) =>
            exp.skillId === skillToDelete.id ||
            exp.skillDetail === skillToDelete.detail ||
            exp.skillName === skillToDelete.name
        ) || [];

      const confirmMessage =
        associatedExperiences.length > 0
          ? `Sei sicuro di voler eliminare la skill "${
              skillToDelete.detail || skillToDelete.name
            }"?\n\n⚠️ Verranno eliminate anche ${
              associatedExperiences.length
            } esperienza/e associate:\n${associatedExperiences
              .map((exp) => `• ${exp.title}`)
              .join("\n")}`
          : `Sei sicuro di voler eliminare la skill "${
              skillToDelete.detail || skillToDelete.name
            }"?`;

      if (window.confirm(confirmMessage)) {
        // Prima rimuovi le esperienze associate
        removeExperiencesBySkill(skillToDelete);

        // Poi rimuovi la skill
        const filteredSkills = skills.filter(
          (skill) => skill.createdAt !== skillToDelete.createdAt
        );

        updateFormData({
          skills: filteredSkills,
        });

        console.log("✅ Skill e esperienze associate rimosse");
      }
    },
    [experiences, removeExperiencesBySkill, dispatch]
  );

  const handleDeleteSingleSkill = useCallback(
    (skillToDelete, event) => {
      event?.stopPropagation();
      handleDeleteSkill(skillToDelete);
    },
    [handleDeleteSkill]
  );

  // ===== EXPERIENCES LOGIC (esistente) =====
  const handleSaveExperience = useCallback(
    (newExperience) => {
      console.log("💾 Salvando nuova esperienza:", newExperience);
      const savedExperience = addExperience(newExperience);
      console.log("✅ Esperienza salvata nel Context:", savedExperience);
      return savedExperience;
    },
    [addExperience]
  );

  const handleUpdateExperience = useCallback(
    (updatedExperience) => {
      console.log("🔄 Aggiornando esperienza:", updatedExperience);
      updateExperience(updatedExperience.id, updatedExperience);
    },
    [updateExperience]
  );

  const handleDeleteExperience = useCallback(
    (experienceToDelete) => {
      console.log("🗑️ Eliminando esperienza:", experienceToDelete);

      if (
        window.confirm(
          `Sei sicuro di voler eliminare l'esperienza "${
            experienceToDelete.title || experienceToDelete.detail
          }"?`
        )
      ) {
        removeExperience(experienceToDelete.id);
      }
    },
    [removeExperience]
  );

  const handleEditExperience = useCallback((experienceData) => {
    console.log("🔧 Modifica esperienza:", experienceData);
    return experienceData;
  }, []);

  const handleSaveEditedExperience = useCallback(
    (experienceToEdit, updatedExperienceData) => {
      console.log("💾 Salvando modifiche esperienza:", updatedExperienceData);

      const updatedExperience = {
        title: updatedExperienceData.detail,
        lezioni: parseInt(updatedExperienceData.config.lezioni),
        durataLezione: `${updatedExperienceData.config.durata} or${
          parseInt(updatedExperienceData.config.durata) > 1 ? "e" : "a"
        }`,
        costo: parseInt(updatedExperienceData.config.costo),
        descrizione: updatedExperienceData.description,
        partecipanti: parseInt(updatedExperienceData.config.partecipanti),
        gemDisponibili: parseInt(updatedExperienceData.config.costo),
        modalita: updatedExperienceData.config.modalita,
        lingua: updatedExperienceData.config.lingua,
        skillId: updatedExperienceData.id,
        skillName: updatedExperienceData.name,
        skillDetail: updatedExperienceData.detail,
        icon: updatedExperienceData.icon,
        updatedAt: new Date().toISOString(),
      };

      updateExperience(experienceToEdit.id, updatedExperience);
      console.log("✅ Esperienza modificata con successo");
    },
    [updateExperience]
  );

  // ===== ✨ NUOVO: EVENTS LOGIC =====
  const handleSaveEvent = useCallback(
    (newEvent) => {
      console.log("🎉 Salvando nuovo evento:", newEvent);
      const savedEvent = addEvent(newEvent);
      console.log("✅ Evento salvato:", savedEvent);
      return savedEvent;
    },
    [addEvent]
  );

  const handleUpdateEvent = useCallback(
    (eventId, updatedEventData) => {
      console.log("🔄 Aggiornando evento:", eventId, updatedEventData);
      updateEvent({ eventId, updates: updatedEventData });
    },
    [updateEvent]
  );

  const handleDeleteEvent = useCallback(
    (eventId) => {
      console.log("🗑️ Eliminando evento:", eventId);

      const eventToDelete = events.find((e) => e.id === eventId);

      if (
        window.confirm(
          `Sei sicuro di voler eliminare l'evento "${
            eventToDelete?.title || "questo evento"
          }"?`
        )
      ) {
        removeEvent(eventId);
        console.log("✅ Evento eliminato");
      }
    },
    [events, removeEvent]
  );

  // ===== HELPER FUNCTION PER PROFILE PHOTO =====
  // ✅ SOSTITUISCI CON:
  const getProfilePhotoUrl = useCallback(() => {
    const photo = currentProfile?.profilePhoto;

    if (!photo) return null;

    if (typeof photo === "string") return photo;

    if (photo instanceof File) {
      try {
        return URL.createObjectURL(photo);
      } catch (error) {
        console.warn("Errore nella conversione del file:", error);
        return null;
      }
    }
    return null;
  }, [currentProfile?.profilePhoto]);
  // ===== USER DATA - aggiornato con fallback più specifici =====
  const userData = useMemo(
    () => ({
      firstName: currentProfile?.firstName || "User",
      lastName: currentProfile?.lastName || "",
      email: currentProfile?.email || "",
      birthDate: currentProfile?.birthDate || "",
      location: currentProfile?.location || "",
      zone: "Vanchiglia",
      joinedDate: "Today",
      languages: currentProfile?.languages || [],
      level: currentProfile?.level || 1,
      profilePhoto: getProfilePhotoUrl(),
      avatar: currentProfile?.avatar || "👤",
    }),
    [currentProfile, getProfilePhotoUrl]
  );

  return {
    // ✅ Data con controlli specifici
    // formData: formData || { skills: [], languages: [] },
    formData: currentProfile
      ? {
          ...currentProfile,
          skills: currentSkills || [],
        }
      : { skills: [], languages: [] },
    experiences: experiences || [],
    events: events || [], // ✨ NUOVO
    userData,

    // Skills actions
    handleSaveSkill,
    handleUpdateSkill,
    handleDeleteSkill,
    handleDeleteSingleSkill,

    // Experiences actions
    handleSaveExperience,
    handleUpdateExperience,
    handleDeleteExperience,
    handleEditExperience,
    handleSaveEditedExperience,

    // ✨ NUOVO: Events actions
    handleSaveEvent,
    handleUpdateEvent,
    handleDeleteEvent,
  };
};
