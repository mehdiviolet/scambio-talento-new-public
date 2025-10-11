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
import SkillMockup from "@/components/SkillMockup";
import ExperiencesMockupRedux from "@/components/ExperiencesMockupRedux";
import EventSectionTest from "@/components/EventSectionTest";
import { useSelector } from "react-redux";
import SearchSectionTest from "@/components/SearchSectionTest";
// import AboutMe from "./AboutMe";

const ProfileTabs = ({ selectedPersonData }) => {
  const { profileData } = useQuickSetup();

  const [activeTab, setActiveTab] = useState("about");
  const [experienceMode, setExperienceMode] = useState("offer");
  const [eventMode, setEventMode] = useState("joined");

  const tabs = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skill" },
    { id: "experiences", label: "Esperienze" },
    { id: "events", label: "Eventi" },
  ];

  const skillGemBonus = useSelector(
    (state) => state.experienceSliceTest.skillGemBonus || {}
  );

  // Calcola skills con GEM aggiornati:
  const updatedSkills = selectedPersonData.skills.map((skill) => ({
    ...skill,
    gems: skill.gems + (skillGemBonus[skill.id] || 0),
  }));

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <>
            {/* <div className={styles.content}> */}
            <div className={styles.aboutSection}>
              <p className={styles.aboutText}>
                Passionate about creating beautiful digital experiences. I love
                exploring new design trends and bringing creative visions to
                life. When I'm not designing, you can find me painting or
                exploring the beautiful streets of Torino.
              </p>
            </div>
            {/* <SearchSection /> */}
            <SearchSectionTest isInstructorPanel={true} />
            {/* <GallerySection isOwner={true} /> */}
            {/* </div> */}
          </>
        );
      case "skills":
        return (
          <SkillMockup
            mockSkills={updatedSkills}
            selectedPersonData={selectedPersonData}
            isInstructorPanel={true}
          />
        );
      case "experiences":
        return (
          <>
            {/* <div className={styles.content}> */}
            <div
              className={`${styles.tabsNavigation} ${styles.tabsNavigationBorder}`}
            >
              <button
                className={`${styles.tabButton} ${styles.tabButtonBorder}  ${
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
              // <ExperiencesSectionStudente />

              // <h1>Experience che sta facendo</h1>
              <p>............</p>
            ) : (
              <ExperiencesMockupRedux
                isInstructorPanel={true}
                mockSkills={updatedSkills}
                mockExperiencesNew={selectedPersonData.experiences}
              />
            )}
            {/* </div> */}
            {/* </div> */}
          </>
        );
      case "events":
        return (
          <>
            <div
              className={`${styles.tabsNavigation} ${styles.tabsNavigationBorder}`}
            >
              <button
                className={`${styles.tabButton}  ${styles.tabButtonBorder} ${
                  eventMode === "joined" ? styles.active : ""
                }`}
                onClick={() => setEventMode("joined")}
              >
                Frequento
              </button>
              <button
                className={`${styles.tabButton}  ${styles.tabButtonBorder} ${
                  eventMode === "created" ? styles.active : ""
                }`}
                onClick={() => setEventMode("created")}
              >
                Propongo
              </button>
            </div>

            <div className={styles.experienceContent}>
              {eventMode === "joined" ? (
                // <EventiPartecipati />
                <p>Eventi partecipati</p>
              ) : (
                // <EventsSection />
                <EventSectionTest
                  isInstructorPanel={true}
                  isOwner={true}
                  selectedPersonData={selectedPersonData}
                />
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
