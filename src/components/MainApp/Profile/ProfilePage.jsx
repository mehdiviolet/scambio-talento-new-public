// ProfilePage.jsx - VERSIONE FINALE PULITA
import React from "react";
import { useProfileLogic } from "@/hooks/useProfileLogic";
import { useModals } from "@/hooks/useModals";
import ProfileHeader from "./ProfileHeader";
import SkillsSection from "@/components/SkillsSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import SearchSection from "@/components/SearchSection";
import ProfileModals from "@/components/ProfileModals";
import styles from "./ProfilePage.module.css";
import EventsSection from "@/components/EventSection";
import ExperiencesSectionStudente from "@/components/ExperiencesSectionStudente";
import GallerySection from "@/components/GallerySection";
import EventiPartecipati from "./EventiPartecipati";

const ProfilePage = () => {
  // ===== RENDER - SOLO COMPOSIZIONE UI =====
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        {/* Header del profilo */}
        <ProfileHeader />

        {/* Sezione Skills */}
        <SkillsSection />

        {/* Sezione Esperienze */}
        <ExperiencesSection />
        <EventsSection />
        <ExperiencesSectionStudente />

        {/* Sezione Esperienze */}
        <EventiPartecipati />

        {/* Sezione Ricerca */}

        <SearchSection />
        <GallerySection isOwner={true} />
      </div>
    </div>
  );
};

export default ProfilePage;
