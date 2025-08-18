import React from "react";
import TestCard from "@components/MainApp/Shared/Modals/TestCard.jsx";
import styles from "./ExperiencesSection.module.css";

const ExperiencesMockup = () => {
  // Dati fissi delle skills (devono matchare con SkillMockup)
  const mockSkills = [
    {
      id: "photography",
      name: "Fotografia",
      icon: "📸",
      detail: "Street Photography",
      gems: 127,
    },
    {
      id: "cooking",
      name: "Cucina",
      icon: "🍳",
      detail: "Cucina Italiana Tradizionale",
      gems: 89,
    },
    {
      id: "programming",
      name: "Coding",
      icon: "💻",
      detail: "Frontend Development",
      gems: 156,
    },
    {
      id: "painting",
      name: "Pittura",
      icon: "🎨",
      detail: "Acquerello e Tecniche Miste",
      gems: 73,
    },
    {
      id: "languages",
      name: "Lingue",
      icon: "🗣️",
      detail: "Inglese e Francese",
      gems: 94,
    },
  ];

  // Dati fissi delle esperienze (basate sulle skills esistenti)
  const mockExperiences = [
    {
      id: "exp-photography-001",
      skillId: "photography",
      icon: "📸",
      title: "Fotografia di Ritratti",
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
      title: "Cucina Italiana Tradizionale",
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
      title: "Sviluppo Web con React",
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
      title: "Acquerello per Principianti",
      modalita: "presenza",
      lingua: "🇮🇹",
      partecipanti: 3,
      lezioni: 3,
      durataLezione: "2 Ore",
      costo: 30,
      descrizione:
        "Scopri la magia dell'acquerello attraverso tecniche base e avanzate. Imparerai a controllare l'acqua, miscelare i colori e creare effetti unici per paesaggi e nature morte.",
      createdAt: "2024-01-12T18:20:00Z",
      updatedAt: "2024-01-19T14:10:00Z",
    },
  ];

  // Dati utente fissi (Sara Dormand)
  const mockUserData = {
    firstName: "Sara",
    lastName: "Dormand",
    profilePhoto: null,
  };

  // Helper per trovare la skill associata all'esperienza
  const findSkillForExperience = (experience) => {
    const associatedSkill = mockSkills.find(
      (skill) => skill.id === experience.skillId
    );
    return associatedSkill;
  };

  // Helper per ottenere la foto profilo dell'owner
  const getOwnerPhoto = () => {
    return mockUserData.profilePhoto; // null per Sara (usa avatar emoji)
  };

  return (
    <div className={styles.container}>
      {/* Header - NO add button (viewer mode) */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.experiencesIcon}>📚</span>
          Esperienze Offerte ({mockExperiences.length})
        </h3>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.experiencesGrid}>
          {mockExperiences.map((experience) => {
            // Trova la skill associata per ottenere i gems corretti
            const associatedSkill = findSkillForExperience(experience);
            const skillGems = associatedSkill?.gems || 0;

            // Ottieni foto profilo owner
            const ownerPhoto = getOwnerPhoto();

            return (
              <TestCard
                key={experience.id}
                lingua={experience.lingua}
                icon={experience.icon}
                title={experience.title}
                lezioni={experience.lezioni}
                durataLezione={experience.durataLezione}
                costo={experience.costo}
                descrizione={experience.descrizione}
                istruttore={`${mockUserData.firstName} ${mockUserData.lastName}`}
                ownerPhoto={ownerPhoto}
                skillGems={skillGems} // Gems dalla skill associata
                partecipanti={experience.partecipanti}
                experienceData={experience}
                isOwner={false} // Viewer mode
                onEdit={undefined} // No edit in viewer mode
                onDelete={undefined} // No delete in viewer mode
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperiencesMockup;
