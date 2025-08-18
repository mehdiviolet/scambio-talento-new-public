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
import ProfileHeaderTest from "./ProfileHeaderTest";
import SkillsSectionTest from "@/components/SkillsSectionTest";
import ExperiencesSectionTest from "@/components/ExperiencesSectionTest";
import ExperiencesMockup from "@/components/ExperiencesMockup";
import SkillMockup from "@/components/SkillMockup";
import ProfileHeaderMockup from "@/components/ProfileHeaderMockup";
import { useSelector } from "react-redux";
import TestCard from "../Shared/Modals/TestCard";
import ExperiencesMockupRedux from "@/components/ExperiencesMockupRedux";
import { setSelectedPersonData } from "@/store/slices/experienceSliceTest";
import ExperiencesSectionStudente from "@/components/ExperiencesSectionStudente";
import ExperiencesSectionStudenteTest from "@/components/ExperiencesSectionStudenteTest";
import EventSectionTest from "@/components/EventSectionTest";

const ProfilePageTest = () => {
  // const selectedPerson = useSelector((state) => state.person.selectedPerson);
  // const selectedPerson = useSelector((state) => {
  //   const personId = state.users.demo.selectedPersonId;
  //   return personId ? state.users.users[personId]?.profile : null;
  // });

  const selectedPersonData = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData
  );
  // const saraData = useSelector(
  //   (state) => state.experienceSliceTest.saraProfileData
  // );

  const skillGemBonus = useSelector(
    (state) => state.experienceSliceTest.skillGemBonus || {}
  );

  // Calcola skills con GEM aggiornati:
  const updatedSkills = selectedPersonData.skills.map((skill) => ({
    ...skill,
    gems: skill.gems + (skillGemBonus[skill.id] || 0),
  }));

  // ===== RENDER - SOLO COMPOSIZIONE UI =====
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        {/* Header del profilo */}
        {/* <ProfileHeaderTest userData={userData} /> */}
        {selectedPersonData.profile.firstName ? (
          <>
            <ProfileHeaderMockup
              selectedPerson={selectedPersonData.profile}
              isInstructorPanel={true}
            />
            <SkillMockup
              mockSkills={updatedSkills}
              selectedPersonData={selectedPersonData}
            />
            {/* <ExperiencesMockup /> */}
            {/* <TestCard isOwner={true} /> */}
            <ExperiencesMockupRedux
              isInstructorPanel={true}
              mockSkills={updatedSkills}
              mockExperiencesNew={selectedPersonData.experiences}
            />
            <EventSectionTest
              isOwner={true}
              selectedPersonData={selectedPersonData}
            />
            <ExperiencesSectionStudenteTest />
          </>
        ) : (
          <div>
            <h1>Nel panello destro cerca un utente...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePageTest;
