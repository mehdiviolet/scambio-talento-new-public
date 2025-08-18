import React, { useState } from "react";
import styles from "./ExperiencesSection.module.css";
import CompletionCardsTest from "./CompletionCardsTest";
import { useSelector } from "react-redux";
import TestCardRedux from "./MainApp/Shared/Modals/TestCardRedux";
import { BookmarkCheckIcon, Flag, Flame, Hourglass } from "lucide-react";

const ExperiencesSectionStudenteTest = () => {
  // 🆕 STATO FILTRO
  const [activeFilter, setActiveFilter] = useState("bookmarked");
  const [visibleCount, setVisibleCount] = useState(3);
  const CARDS_PER_PAGE = 3;

  // 🆕 SELECTOR PER DATI PERSONA SELEZIONATA
  // const selectedPersonData = useSelector(
  //   (state) => state.experienceSliceTest.selectedPersonData
  // );

  const userCompletionCards = useSelector((state) => {
    const userId = state.experienceSliceTest.currentUserId;
    return state.experienceSliceTest.completedCourses[userId] || [];
  });

  const selectedPersonSkills = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData.skills
  );

  const userBookmarks = useSelector((state) => {
    const userId = "currentUser";
    return state.experienceSliceTest.bookmarkedCourses[userId] || [];
  });

  // 🆕 SELECTOR PER STATI CORSI
  const allCourseStates = useSelector(
    (state) => state.experienceSliceTest.courseStates
  );

  const getAllFilteredCards = () => {
    switch (activeFilter) {
      case "bookmarked":
        // Bookmark che sono idle, requested, ready
        return userBookmarks.filter((bookmark) => {
          const status =
            allCourseStates[bookmark.experienceId]?.status || "idle";
          return ["idle", "requested", "ready"].includes(status);
        });

      case "waiting":
        // 🆕 NUOVO FILTRO - Waiting status
        return userBookmarks.filter((bookmark) => {
          const status =
            allCourseStates[bookmark.experienceId]?.status || "idle";
          return status === "waiting";
        });

      case "active":
        // Bookmark che sono active
        return userBookmarks.filter((bookmark) => {
          const status =
            allCourseStates[bookmark.experienceId]?.status || "idle";
          return ![
            "idle",
            "requested",
            "ready",
            "waiting",
            "rejected",
          ].includes(status);
        });
      case "completed": {
        // 🆕 AGGIUNGI SKILLGEMS ANCHE AI COMPLETION CARDS
        const enrichedCompletionCards = userCompletionCards; // Non serve più modificare

        const rejectedBookmarks = userBookmarks
          .filter((bookmark) => {
            const status =
              allCourseStates[bookmark.experienceId]?.status || "idle";
            return status === "completed" || status === "rejected";
          })
          .map((bookmark) => {
            const courseState = allCourseStates[bookmark.experienceId] || {};

            // 🆕 TROVA LA SKILL CORRISPONDENTE
            const skillId = bookmark.experienceData?.skillId;
            const matchingSkill = selectedPersonSkills?.find(
              (skill) => skill.id === skillId
            );
            const skillGems = matchingSkill?.gems || 0; // ← I gems della skill!

            return {
              ...bookmark,
              status: courseState.status || "idle",
              rejectComments: courseState.rejectComments || [],
              rejectData: courseState.rejectData || null,
              skillGems,
              instructorPhoto: bookmark.instructorPhoto,
              istruttore: bookmark.istruttore || "Istruttore",
              // selectedPersonaPhoto: selectedPersonData.profile.profilePhoto,
            };
          });

        return [...enrichedCompletionCards, ...rejectedBookmarks];
      }
      default:
        return [];
    }
  };
  const allFilteredCards = getAllFilteredCards();
  const visibleCards = allFilteredCards.slice(0, visibleCount);
  const totalCards = allFilteredCards.length;
  const hasMoreCards = totalCards > visibleCount;
  const remainingCards = totalCards - visibleCount;

  // 🆕 CONTATORI PER I FILTRI

  const waitingCount = userBookmarks.filter((bookmark) => {
    const status = allCourseStates[bookmark.experienceId]?.status || "idle";
    return status === "waiting";
  }).length;

  // 🔧 AGGIORNA gli altri contatori
  const bookmarkedCount = userBookmarks.filter((bookmark) => {
    const status = allCourseStates[bookmark.experienceId]?.status || "idle";
    return ["idle", "requested", "ready"].includes(status);
  }).length;

  const activeCount = userBookmarks.filter((bookmark) => {
    const status = allCourseStates[bookmark.experienceId]?.status || "idle";
    return !["idle", "requested", "ready", "waiting", "rejected"].includes(
      status
    ); // 👈 STESSO FILTRO
  }).length;

  const completedCount =
    userCompletionCards.length +
    userBookmarks.filter((bookmark) => {
      const status = allCourseStates[bookmark.experienceId]?.status || "idle";
      return status === "completed" || status === "rejected";
    }).length;

  return (
    <div className={styles.container}>
      {/* 🆕 HEADER CON FILTRI */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          {/* <span className={styles.experiencesIcon}>🌊</span> */}
          Le Mie Esperienze: (simile all'altro profilo)
        </h3>
        <div style={{ marginBottom: "75px" }}></div>
      </div>
    </div>
  );
};

export default ExperiencesSectionStudenteTest;
