import React, { useState } from "react";
import styles from "./ExperiencesSection.module.css";
import { useSelector } from "react-redux";
import TestCardRedux from "./MainApp/Shared/Modals/TestCardRedux";
import { useStatusFilter } from "./useStatusFilter";
import StatusFilterButtons from "./StatusFilterButtons";
import { Flag } from "lucide-react";
import {
  CompactScrollableFilters,
  DropdownFilters,
  MinimalFilters,
  SegmentedFilters,
  WaveFilters,
} from "./ui/SmartFilters";
import { Button } from "./ui/Button";

const ExperiencesSectionStudente = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  // Redux selectors
  const userCompletionCards = useSelector((state) => {
    const userId = state.experienceSliceTest.currentUserId;
    return state.experienceSliceTest.completedCourses[userId] || [];
  });

  const userBookmarks = useSelector((state) => {
    const userId = "currentUser";
    return state.experienceSliceTest.bookmarkedCourses[userId] || [];
  });

  const allCourseStates = useSelector(
    (state) => state.experienceSliceTest.courseStates
  );

  // 🎯 CONFIGURAZIONE FILTRI
  const filterConfig = {
    idle: {
      label: "Salvati",
      icon: "BookmarkCheckIcon",
      statuses: ["idle", "requested", "ready"],
    },
    waiting: {
      label: "In Attesa",
      icon: "Hourglass",
      statuses: ["waiting"],
    },
    active: {
      label: "In Corso",
      icon: "Flag",
      statuses: ["active", "pending_feedback"],
    },
    completed: {
      label: "Completati",
      icon: "Flame",
      statuses: ["completed", "rejected"],
    },
    all: {
      label: "Tutti",
      icon: null,
      statuses: null,
    },
  };

  // 🎯 PREPARA DATI UNIFICATI
  // const allUserExperiences = [
  //   // Bookmark con status da Redux
  //   ...userBookmarks.map((bookmark) => ({
  //     id: bookmark.experienceId,
  //     type: "bookmark",
  //     status: allCourseStates[bookmark.experienceId]?.status || "idle",
  //     data: bookmark,
  //   })),
  //   // Completion cards (sempre completed)
  //   ...userCompletionCards.map((completion) => ({
  //     id: completion.experienceId || `completion-${completion.completionId}`,
  //     type: "completion",
  //     status: "completed",
  //     data: completion,
  //   })),
  // ];
  // ✅ FIX: ID sempre unici
  const allUserExperiences = [
    // Bookmark con status da Redux
    ...userBookmarks.map((bookmark) => ({
      id: `bookmark-${bookmark.experienceId}`, // ← PREFISSO UNICO
      type: "bookmark",
      status: allCourseStates[bookmark.experienceId]?.status || "idle",
      data: bookmark,
    })),
    // Completion cards - ID sempre unici
    ...userCompletionCards.map((completion, index) => ({
      id: `completion-${completion.completionId}-${index}`, // ← SEMPRE UNICO
      type: "completion",
      status: "completed",
      data: completion,
    })),
  ];
  // 🎯 HOOK FILTRI
  const {
    statusFilter,
    setStatusFilter,
    filteredItems: filteredExperiences,
    filterCounts,
  } = useStatusFilter(allUserExperiences, null, filterConfig);

  // 🎯 RENDERING CARD PULITO
  const renderExperienceCard = (item) => {
    if (item.type === "completion") {
      // Completion card - dati dal completamento
      const completion = item.data;
      const lezioniNum = parseInt(completion.duration?.split(" ")[0]) || 4;
      const durataStr = completion.duration?.includes("di ")
        ? completion.duration.split("di ")[1]
        : "1 ora";
      return (
        <TestCardRedux
          key={item.id}
          experienceId={completion.experienceId}
          title={completion.title}
          lezioni={lezioniNum}
          durataLezione={durataStr}
          costo={completion.cost}
          descrizione={`Corso completato il ${new Date(
            completion.completedAt
          ).toLocaleDateString("it-IT")}`}
          istruttore={completion.participant}
          instructorPhoto={completion.instructorPhoto}
          skillGems={
            completion.currentSkillGems || completion.skillGemsAtBookmark || 0
          }
          partecipanti={3}
          icon={completion.skillIcon || "📚"}
          lingua="🇮🇹"
          modalita="presenza"
          experienceData={completion}
          isInstructor={false}
        />
      );
    }

    // Bookmark - dati dall'esperienza originale
    const bookmark = item.data;
    const experience = bookmark.experienceData;

    return (
      <TestCardRedux
        key={item.id}
        experienceId={experience.id}
        lingua={experience.lingua}
        modalita={experience.modalita}
        icon={experience.icon}
        title={experience.title}
        lezioni={experience.lezioni}
        durataLezione={experience.durataLezione}
        costo={experience.costo}
        descrizione={experience.descrizione}
        istruttore={bookmark.istruttore}
        instructorPhoto={bookmark.instructorPhoto}
        skillGems={
          bookmark.skillGemsAtBookmark || bookmark.currentSkillGems || 0
        }
        partecipanti={experience.partecipanti}
        experienceData={experience}
        isInstructor={false}
      />
    );
  };

  // Pagination
  const visibleExperiences = filteredExperiences.slice(0, visibleCount);
  const totalCount = filteredExperiences.length;
  const hasMore = totalCount > visibleCount;
  const remaining = totalCount - visibleCount;

  // 🔍 DEBUG (rimuovi in produzione)
  console.log("🔍 DEBUG FILTRI:");
  console.log("statusFilter attivo:", statusFilter);
  console.log("allUserExperiences:", allUserExperiences);
  console.log("filteredExperiences:", filteredExperiences);
  console.log("filterCounts:", filterCounts);

  const pendingFeedbackItems = allUserExperiences.filter(
    (item) => item.status === "pending_feedback"
  );
  console.log("⏳ Elementi con pending_feedback:", pendingFeedbackItems);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Le Mie Esperienze</h3>
      </div>

      {/* Filtri */}
      {/* <StatusFilterButtons
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        filterCounts={filterCounts}
        filterConfig={filterConfig}
      /> */}

      <DropdownFilters
        filters={Object.entries(filterConfig).map(([key, config]) => ({
          key,
          label: config.label,
          count: filterCounts[key] || 0,
        }))}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />

      {/* Contenuto */}
      <div className={styles.content}>
        <div className={styles.experiencesGrid}>
          {visibleExperiences.length === 0 ? (
            <div className={styles.emptyState}>
              <p>
                {statusFilter === "idle" && "Nessun corso salvato"}
                {statusFilter === "waiting" && "Nessun corso in attesa"}
                {statusFilter === "active" && "Nessun corso in corso"}
                {statusFilter === "completed" && "Nessun corso completato"}
              </p>
            </div>
          ) : (
            visibleExperiences.map(renderExperienceCard)
          )}
        </div>

        {/* Paginazione */}
        {totalCount > 3 && hasMore && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {/* <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              style={{
                padding: "10px 20px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Mostra altre {Math.min(3, remaining)} carte
            </button> */}
            <Button
              variant="secondary"
              onClick={() => setVisibleCount((prev) => prev + 3)}
            >
              Mostra altre {Math.min(3, remaining)} carte
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperiencesSectionStudente;
