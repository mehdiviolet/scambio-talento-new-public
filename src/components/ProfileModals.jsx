// components/ProfileModals.jsx
import React from "react";
import AddSkillModal from "@/components/MainApp/Shared/Modals/AddSkillModal";
import ViewSkillModal from "@/components/MainApp/Shared/Modals/ViewSkillModal";
import AddExperienceModal from "@/components/MainApp/Shared/Modals/AddExperienceModal";
import ViewExperienceModal from "@/components/MainApp/Shared/Modals/ViewExperienceModal";

const ProfileModals = ({
  // Skills modals
  isAddSkillModalOpen,
  isViewSkillModalOpen,
  selectedSkill,
  onCloseAddSkill,
  onCloseViewSkill,
  onSaveSkill,
  onUpdateSkill,
  onDeleteSkill,

  // Experience modals
  isAddExperienceModalOpen,
  onCloseAddExperience,
  isViewExperienceModalOpen,
  selectedExperience,
  onCloseViewExperience,
  isEditExperienceModalOpen,
  experienceToEdit,
  onCloseEditExperience,
  onSaveExperience,
  onSaveEditedExperience,
  onUpdateExperience,
  onDeleteExperience,

  formData,
}) => {
  return (
    <>
      {/* ===== SKILLS MODALS ===== */}
      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={onCloseAddSkill}
        onSave={onSaveSkill}
        formData={formData}
      />

      <ViewSkillModal
        isOpen={isViewSkillModalOpen}
        onClose={onCloseViewSkill}
        skill={selectedSkill}
        onUpdate={onUpdateSkill}
        onDelete={onDeleteSkill}
        formData={formData}
      />

      {/* ===== EXPERIENCE MODALS ===== */}
      {/* Modal per creare nuova esperienza */}
      <AddExperienceModal
        isOpen={isAddExperienceModalOpen}
        onClose={onCloseAddExperience}
        onSave={onSaveExperience}
        userSkills={formData.skills || []}
        formData={formData}
      />

      {/* Modal per modificare esperienza */}
      <AddExperienceModal
        isOpen={isEditExperienceModalOpen}
        onClose={onCloseEditExperience}
        onSave={(updatedData) =>
          onSaveEditedExperience(experienceToEdit, updatedData)
        }
        userSkills={formData.skills || []}
        formData={formData}
        editMode={true}
        initialData={experienceToEdit}
      />

      <ViewExperienceModal
        isOpen={isViewExperienceModalOpen}
        onClose={onCloseViewExperience}
        experience={selectedExperience}
        onUpdate={onUpdateExperience}
        onDelete={onDeleteExperience}
        formData={formData}
      />
    </>
  );
};

export default ProfileModals;
