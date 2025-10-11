import React, { useState } from "react";
import styles from "./ProfileTabs.module.css";
import SkillsSection from "@/components/SkillsSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import ExperiencesSectionStudente from "@/components/ExperiencesSectionStudente";
import EventiPartecipati from "./EventiPartecipati";
import EventsSection from "@/components/EventSection";
import SearchSection from "@/components/SearchSection";
import GallerySection from "@/components/GallerySection";
import { useQuickSetup } from "@/hooks/useQuickSetup";
// import AboutMe from "./AboutMe";

const ProfileTabs = () => {
  const { profileData } = useQuickSetup();

  const [activeTab, setActiveTab] = useState("about");
  const [experienceMode, setExperienceMode] = useState("offer");
  const [eventMode, setEventMode] = useState("joined");

  const tabs = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experiences", label: "Experiences" },
    { id: "events", label: "Events" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <>
            {/* <div className={styles.content}> */}
            <div className={styles.aboutSection}>
              <p className={styles.aboutText}>
                {(() => {
                  // Importa useQuickSetup all'inizio del componente
                  const aboutText =
                    profileData.aboutMe || "Nessuna descrizione disponibile";
                  const maxChars = 1500;
                  return aboutText.length > maxChars
                    ? aboutText.substring(0, maxChars).trim() + "..."
                    : aboutText;
                })()}
              </p>
            </div>
            <SearchSection />
            {/* <GallerySection isOwner={true} /> */}
            {/* </div> */}
          </>
        );
      case "skills":
        return <SkillsSection />;
      case "experiences":
        return (
          <>
            {/* <div className={styles.content}> */}
            <div
              className={`${styles.tabsNavigation} ${styles.tabsNavigationBorder}`}
            >
              <button
                className={`${styles.tabButton} ${styles.tabButtonBorder} ${
                  experienceMode === "offer" ? styles.active : ""
                }`}
                onClick={() => setExperienceMode("offer")}
              >
                {/* Offro */}
                Ricevo
              </button>
              <button
                className={`${styles.tabButton} ${styles.tabButtonBorder} ${
                  experienceMode === "seek" ? styles.active : ""
                }`}
                onClick={() => setExperienceMode("seek")}
              >
                Offro
                {/* Cerco */}
              </button>
            </div>{" "}
            {/* <div className={styles.experienceContent}> */}
            {experienceMode === "offer" ? (
              <ExperiencesSectionStudente />
            ) : (
              <ExperiencesSection />
            )}
          </>
        );
      case "events":
        return (
          <>
            <div
              className={`${styles.tabsNavigation} ${styles.tabsNavigationBorder}`}
            >
              <button
                className={`${styles.tabButton} ${styles.tabButtonBorder} ${
                  eventMode === "joined" ? styles.active : ""
                }`}
                onClick={() => setEventMode("joined")}
              >
                Frequento
              </button>
              <button
                className={`${styles.tabButton}  ${styles.tabButtonBorder}  ${
                  eventMode === "created" ? styles.active : ""
                }`}
                onClick={() => setEventMode("created")}
              >
                Propongo
              </button>
            </div>

            <div className={styles.experienceContent}>
              {eventMode === "joined" ? (
                <EventiPartecipati />
              ) : (
                <EventsSection />
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.tabsContainer}>
      {/* Tab Navigation */}
      <div className={styles.tabsNavigation}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>{renderContent()}</div>
    </div>
  );
};

export default ProfileTabs;
