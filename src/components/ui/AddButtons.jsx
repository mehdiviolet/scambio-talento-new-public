import React from "react";
import { Plus, Star, BookOpen, Users, Camera, Calendar } from "lucide-react";
import styles from "./AddButton.module.css";

// Header Add Button - Piccolo per section headers
export const HeaderAddButton = ({ onClick, className = "", txt }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.headerAddButton} ${styles.sm} ${styles.secondary} ${styles.outline} ${className}`}
    >
      <Plus size={16} />
      ADD {txt}
    </button>
  );
};

// Contextual Add per Skills
// export const AddSkillButton = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className={`${styles.addButton} ${styles.lg} ${styles.secondary} ${styles.solid}`}
//   >
//     <div className={styles.iconWrapper}>
//       <Star size={20} />
//     </div>
//     <div className={styles.textWrapper}>
//       <div className={styles.title}>Aggiungi Skill</div>
//       <div className={styles.subtitle}>Mostra le tue competenze</div>
//     </div>
//   </button>
// );

// 📚 ADD EXPERIENCE BUTTON - Per sezione esperienze
// export const AddExperienceButton = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className={`${styles.addButton} ${styles.lg} ${styles.primary} ${styles.solid}`}
//   >
//     <div className={styles.iconWrapper}>
//       <BookOpen size={20} />
//     </div>
//     <div className={styles.textWrapper}>
//       <div className={styles.title}>Crea Esperienza</div>
//       <div className={styles.subtitle}>Insegna qualcosa di nuovo</div>
//     </div>
//   </button>
// );

// 🎯 ADD SKILL FIRST BUTTON - Per quando servono prima le skills (disabled)
// export const AddSkillFirstButton = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className={`${styles.addButton} ${styles.lg} ${styles.neutral} ${styles.solid}`}
//     disabled={true}
//     data-disabled-message="Aggiungi prima una skill per creare esperienze"
//   >
//     <div className={styles.iconWrapper}>
//       <Star size={20} />
//     </div>
//     <div className={styles.textWrapper}>
//       <div className={styles.title}>Aggiungi prima una skill</div>
//       <div className={styles.subtitle}>
//         Le esperienze si basano sulle tue competenze
//       </div>
//     </div>
//   </button>
// );

// 🎪 ADD EVENT BUTTON - Per sezione eventi
export const AddEventButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`${styles.addButton} ${styles.lg} ${styles.danger} ${styles.solid}`}
  >
    <div className={styles.iconWrapper}>
      <Calendar size={20} />
    </div>
    <div className={styles.textWrapper}>
      <div className={styles.title}>Organizza Evento</div>
      <div className={styles.subtitle}>Riunisci la community</div>
    </div>
  </button>
);

// 📷 ADD PHOTOS BUTTON - Per gallery
export const AddPhotosButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`${styles.addButton} ${styles.xl} ${styles.success} ${styles.solid}`}
  >
    <div className={styles.iconWrapper}>
      <Camera size={24} />
    </div>
    <div className={styles.textWrapper}>
      <div className={styles.title}>Aggiungi Foto</div>
      <div className={styles.subtitle}>Condividi i tuoi lavori creativi</div>
    </div>
  </button>
);
