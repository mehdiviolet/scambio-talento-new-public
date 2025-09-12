import React, { useState } from "react";
import TestCardRedux from "@components/MainApp/Shared/Modals/TestCardRedux.jsx";
import StatusFilterButtons from "./StatusFilterButtons.jsx";
import { useStatusFilter } from "./useStatusFilter.js";
import styles from "./ExperiencesSection.module.css";
import { useSelector } from "react-redux";
import { HeaderAddButton } from "./ui/AddButtons.jsx";

const ExperiencesMockupRedux = ({
  isInstructorPanel,
  mockSkills,
  mockExperiencesNew,
}) => {
  const mockExperiences = mockExperiencesNew || [
    {
      id: "exp-photography-001",
      skillId: "photography",
      icon: "📸",
      title: "Fotografia / Ritratti",
      modalita: "presenza",
      lingua: "🇮🇹",
      partecipanti: 3,
      lezioni: 4,
      durataLezione: "2 Ore",
      costo: 50,
      descrizione:
        "Impara i segreti della fotografia ritrattistica con tecniche professionali. Scoprirai come gestire luce naturale e artificiale, come dirigere i soggetti e post-produzione base per creare ritratti memorabili.",
      createdAt: "2024-01-20T14:30:00Z",
      updatedAt: "2024-01-25T10:15:00Z",
    },
    {
      id: "exp-cooking-002",
      skillId: "cooking",
      icon: "🍳",
      title: "cooking / Italiana",
      modalita: "presenza",
      lingua: "🇮🇹",
      partecipanti: 2,
      lezioni: 3,
      durataLezione: "3 Ore",
      costo: 40,
      descrizione:
        "Un viaggio culinario attraverso le ricette della tradizione piemontese. Imparerai a preparare pasta fresca, risotti cremosi e dolci tipici usando tecniche tramandate di generazione in generazione.",
      createdAt: "2024-01-18T16:45:00Z",
      updatedAt: "2024-01-23T11:20:00Z",
    },
    {
      id: "exp-programming-003",
      skillId: "programming",
      icon: "💻",
      title: "programming / Web",
      modalita: "online",
      lingua: "🇬🇧",
      partecipanti: 4,
      lezioni: 4,
      durataLezione: "2 Ore",
      costo: 70,
      descrizione:
        "Corso intensivo per imparare React da zero. Copriamo componenti, hooks, state management e deploy. Perfetto per chi vuole iniziare nel frontend development moderno con progetti pratici.",
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-22T15:30:00Z",
    },
    {
      id: "exp-painting-004",
      skillId: "painting",
      icon: "🎨",
      title: "Pittura / Olio",
      modalita: "presenza",
      lingua: "🇮🇹",
      partecipanti: 3,
      lezioni: 3,
      durataLezione: "2 Ore",
      costo: 10,
      descrizione:
        "Scopri la magia dell'acquerello attraverso tecniche base e avanzate. Imparerai a controllare l'acqua, miscelare i colori e creare effetti unici per paesaggi e nature morte.",
      createdAt: "2024-01-12T18:20:00Z",
      updatedAt: "2024-01-19T14:10:00Z",
    },
  ];

  const expFilterConfig = {
    idle: {
      label: "Idle",
      icon: "BookmarkCheckIcon",
      statuses: ["idle", "requested", "ready"],
    },
    waiting: {
      label: "waiting",
      icon: "BookmarkCheckIcon",
      statuses: ["waiting"],
    },
    inCorso: {
      label: "in corso",
      icon: "BookmarkCheckIcon",
      statuses: ["confirmed", "in svolgimento", "active"],
    },
    pending: {
      label: "pending",
      icon: "BookmarkCheckIcon",
      statuses: ["pending_feedback"],
    },
    completed: {
      label: "Completati",
      icon: "Flame",
      statuses: ["completed", "rejected"],
    },
    // all: {
    //   label: "Tutti",
    //   icon: null,
    //   statuses: null,
    // },
  };
  const [showFilters, setShowFilters] = useState(false);

  // 🎯 USA IL CUSTOM HOOK
  const {
    statusFilter,
    setStatusFilter,
    filteredItems: filteredExperiences,
    filterCounts,
    filterConfig,
  } = useStatusFilter(
    mockExperiences,
    "experienceSliceTest.courseStates",
    expFilterConfig
  );

  const mockUserData = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData.profile
  );

  // Helper per trovare la skill associata all'esperienza
  const findSkillForExperience = (experience) => {
    const associatedSkill = mockSkills?.find(
      (skill) => skill.id === experience.skillId
    );
    return associatedSkill;
  };

  const skillGemBonus = useSelector(
    (state) => state.experienceSliceTest.skillGemBonus || {}
  );

  // Helper per ottenere la foto profilo dell'instructor
  const getInstructorPhoto = () => {
    return mockUserData.profilePhoto;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          {/* Esperienze Offerte ({mockExperiences.length}) */}
          Esperienze Offerte
        </h3>
        <button
          className={styles.toggleFiltersBtn}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filtri {showFilters ? "↑" : "↓"}
        </button>
        {isInstructorPanel && (
          <>
            <HeaderAddButton
              // onClick={handleAddSkill}
              title="Aggiungi nuova skill"
            />
          </>
        )}
      </div>

      <div>
        <div className={styles.filtersContainer}>
          <div
            className={`${styles.filterContent} ${
              showFilters ? styles.open : ""
            }`}
          >
            <StatusFilterButtons
              activeFilter={statusFilter}
              onFilterChange={setStatusFilter}
              filterCounts={filterCounts}
              filterConfig={filterConfig}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.experiencesGrid}>
          {filteredExperiences.map((experience) => {
            // Trova la skill associata per ottenere i gems corretti
            const associatedSkill = findSkillForExperience(experience);
            const skillGems = associatedSkill?.gems || 0;
            const instructorPhoto = getInstructorPhoto();

            return (
              <TestCardRedux
                key={experience.id}
                experienceId={experience.id}
                lingua={experience.lingua}
                modalita={experience.modalita}
                icon={experience.icon}
                title={experience.title}
                lezioni={experience.lezioni}
                durataLezione={experience.durataLezione}
                costo={experience.costo}
                descrizione={experience.descrizione}
                istruttore={`${mockUserData.firstName} ${mockUserData.lastName}`}
                instructorPhoto={instructorPhoto}
                skillGems={skillGems}
                partecipanti={experience.partecipanti}
                experienceData={experience}
                isInstructor={isInstructorPanel}
                onEdit={
                  isInstructorPanel
                    ? (data) => console.log("Edit:", data)
                    : undefined
                }
                onDelete={
                  isInstructorPanel
                    ? (data) => console.log("Delete:", data)
                    : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperiencesMockupRedux;
