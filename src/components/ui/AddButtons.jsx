import React from "react";
import { Plus, Star, BookOpen, Users, Camera, Calendar } from "lucide-react";
import styles from "../../components/GallerySection.module.css";

// Header Add Button - Piccolo per section headers
export const HeaderAddButton = ({ onClick, className = "", txt }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.headerAddButton} ${className}`}
    >
      <Plus size={18} className={styles.headerAddButtonIcon} />
      ADD {txt}
    </button>
  );
};

// Contextual Add per Skills
export const AddSkillButton = ({ onClick }) => (
  <button onClick={onClick} className={styles.addSkillButton}>
    <div className={styles.addSkillButtonContent}>
      <div className={styles.addSkillIcon}>
        <Star size={20} className="text-white" />
      </div>
      <div className={styles.addSkillTextContent}>
        <div className={styles.addSkillTitle}>Aggiungi Skill</div>
        <div className={styles.addSkillSubtitle}>Mostra le tue competenze</div>
      </div>
    </div>
  </button>
);

// 📚 ADD EXPERIENCE BUTTON - Per sezione esperienze
export const AddExperienceButton = ({ onClick }) => (
  <button onClick={onClick} className={styles.addExperienceButton}>
    <div className={styles.addExperienceButtonContent}>
      <div className={styles.addExperienceIcon}>
        <BookOpen size={20} className="text-white" />
      </div>
      <div className={styles.addExperienceTextContent}>
        <div className={styles.addExperienceTitle}>Crea Esperienza</div>
        <div className={styles.addExperienceSubtitle}>
          Insegna qualcosa di nuovo
        </div>
      </div>
    </div>
  </button>
);

// 🎯 ADD SKILL FIRST BUTTON - Per quando servono prima le skills
export const AddSkillFirstButton = ({ onClick }) => (
  <button onClick={onClick} className={styles.addSkillFirstButton}>
    <div className={styles.addSkillFirstButtonContent}>
      <div className={styles.addSkillFirstIcon}>
        <Star size={20} className="text-white" />
      </div>
      <div className={styles.addSkillFirstTextContent}>
        <div className={styles.addSkillFirstTitle}>
          Aggiungi prima una skill
        </div>
        <div className={styles.addSkillFirstSubtitle}>
          Le esperienze si basano sulle tue competenze
        </div>
      </div>
    </div>
  </button>
);

// 🎪 ADD EVENT BUTTON - Per sezione eventi
export const AddEventButton = ({ onClick }) => (
  <button onClick={onClick} className={styles.addEventButton}>
    <div className={styles.addEventButtonContent}>
      <div className={styles.addEventIcon}>
        <Calendar size={20} className="text-white" />
      </div>
      <div className={styles.addEventTextContent}>
        <div className={styles.addEventTitle}>Organizza Evento</div>
        <div className={styles.addEventSubtitle}>Riunisci la community</div>
      </div>
    </div>
  </button>
);

// 📷 ADD PHOTOS BUTTON - Per gallery
export const AddPhotosButton = ({ onClick }) => (
  <button onClick={onClick} className={styles.addPhotosButton}>
    <div className={styles.addPhotosButtonContent}>
      <div className={styles.addPhotosIcon}>
        <Camera size={24} className="text-white" />
      </div>
      <div className={styles.addPhotosTextContent}>
        <div className={styles.addPhotosTitle}>Aggiungi Foto</div>
        <div className={styles.addPhotosSubtitle}>
          Condividi i tuoi lavori creativi
        </div>
      </div>
    </div>
  </button>
);
