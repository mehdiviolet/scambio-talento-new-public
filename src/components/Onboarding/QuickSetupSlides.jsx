import React, { useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Camera,
  Target,
  Globe,
  Star,
  Trophy,
  Heart,
  Sparkles,
  Crown,
  Flame,
  Phone,
  Mail,
  Cherry,
  Gem,
  Cookie,
  Activity,
} from "lucide-react";
import { useQuickSetup } from "../../hooks/useQuickSetup";
import { useOnboarding } from "../../hooks/useOnboardingRedux";
import {
  // selectCurrentUserXP,
  addXP as addXPToUser,
  selectUserXP,
} from "@/services/xpService";

import styles from "./QuickSetupSlides.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const QuickSetupSlides = ({ onComplete }) => {
  const { setShowAuth, completeOnboarding } = useOnboarding();
  const currentXP = useAppSelector(selectUserXP("currentUser")); // ← XP da users!
  const dispatch = useAppDispatch(); // ← AGGIUNGI questo

  const {
    // States
    currentStep,
    setCurrentStep,
    xp,
    level,
    achievements,
    showAchievement,
    showWelcome,
    setShowWelcome,
    // isExiting,
    completedSteps,
    setCompletedSteps,
    setIsExiting,
    profileData,
    updateProfileData,

    // Static data
    skillsData,
    languagesData,
    steps,
    achievementsList,

    // ✅ STATI MANCANTI - Aggiungi questi
    showXPCelebration,
    celebrationXP,
    setShowXPCelebration,
    setCelebrationXP,

    // Functions
    triggerAchievement,
    // addXP,
    checkAchievements,
    canContinue,
    toggleSkill,
    toggleWantedSkill,
    handleProfilePhotoUpload,
    toggleLanguage,
  } = useQuickSetup();

  console.log("AAA");

  useEffect(() => {
    console.log(
      "QuickSetupSlides montato/aggiornato, currentStep:",
      currentStep
    );
  }, [currentStep]);

  // const handleNext = () => {
  //   console.log("🔍 DEBUG XP:", {
  //     currentUserXP: currentXP,
  //     completedSteps: completedSteps,
  //     currentStep: currentStep,
  //     willEnterIf: !completedSteps.includes(currentStep),
  //   });
  //   if (!completedSteps.includes(currentStep)) {
  //     // addXP(steps[currentStep].xpReward);
  //     console.log("✅ ENTRO NELL'IF - Aggiungo XP!"); // ← AGGIUNGI ANCHE QUESTO

  //     dispatch(
  //       addXPToUser({
  //         userId: "currentUser",
  //         amount: steps[currentStep].xpReward,
  //         source: "onboarding",
  //         metadata: { step: currentStep, stepName: steps[currentStep].title },
  //       })
  //     );
  //     setCompletedSteps([...completedSteps, currentStep]);
  //     checkAchievements();
  //   }

  //   if (currentStep < steps.length - 1) {
  //     setCurrentStep(currentStep + 1);
  //   } else {
  //     triggerAchievement(achievementsList.find((a) => a.id === "complete"));
  //     setIsExiting(true);

  //     setTimeout(() => setShowWelcome(true), 500);
  //     setTimeout(() => {
  //       console.log(setShowAuth, 2 * 2);

  //       const completeData = {
  //         ...profileData,
  //         xp: currentXP,
  //         level,
  //         achievements,
  //       };

  //       console.log("📦 Dati finali da trasferire:", completeData);
  //       console.log(
  //         "🎯 Skills da trasferire:",
  //         completeData.skills?.length || 0,
  //         "skills"
  //       );

  //       completeOnboarding(completeData);
  //       onComplete && onComplete(completeData); // ✅ Usa callback
  //     }, 3000000);
  //   }
  // };

  const handleNext = () => {
    console.log("🔍 DEBUG XP:", {
      currentUserXP: currentXP,
      completedSteps: completedSteps,
      currentStep: currentStep,
      willEnterIf: !completedSteps.includes(currentStep),
    });

    // Aggiungi XP se step non completato
    if (!completedSteps.includes(currentStep)) {
      console.log("✅ ENTRO NELL'IF - Aggiungo XP!");

      dispatch(
        addXPToUser({
          userId: "currentUser",
          amount: steps[currentStep].xpReward,
          source: "onboarding",
          metadata: { step: currentStep, stepName: steps[currentStep].title },
        })
      );
      setCompletedSteps([...completedSteps, currentStep]);
      checkAchievements();
    }

    // Continua al prossimo step o completa
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // ✅ NUOVO FLOW: XP Celebration prima di Welcome
      console.log("🚀 Completando onboarding - nuovo flow con XP celebration");

      triggerAchievement(achievementsList.find((a) => a.id === "complete"));
      setIsExiting(true);

      // FASE 1: Mostra XP Celebration dopo 500ms
      setTimeout(() => {
        setShowXPCelebration(true);

        // Animazione conteggio XP da 0 a 200
        let currentXPCount = 0;
        const targetXP = 200;
        const increment = 8;
        const duration = 2500; // 2.5 secondi
        const intervalTime = duration / (targetXP / increment);

        const countInterval = setInterval(() => {
          currentXPCount += increment;
          const displayXP = Math.min(currentXPCount, targetXP);
          setCelebrationXP(displayXP);

          if (currentXPCount >= targetXP) {
            clearInterval(countInterval);
          }
        }, intervalTime);

        // FASE 2: Dopo 4 secondi nascondi XP e mostra Welcome
        setTimeout(() => {
          setShowXPCelebration(false);
          setShowWelcome(true);

          // FASE 3: Dopo altri 3 secondi completa onboarding
          setTimeout(() => {
            console.log("🚀 Completando onboarding con i seguenti dati:");
            console.log("📊 ProfileData completo:", profileData);
            console.log("🎯 Skills selezionate:", profileData.skills);
            console.log("💎 XP totale:", currentXP + 200); // XP esistente + bonus registrazione
            console.log("🏆 Achievement ottenuti:", achievements);

            const completeData = {
              ...profileData,
              xp: currentXP + 200, // Aggiungi bonus XP registrazione
              level,
              achievements,
            };

            console.log("📦 Dati finali da trasferire:", completeData);
            console.log(
              "🎯 Skills da trasferire:",
              completeData.skills?.length || 0,
              "skills"
            );

            completeOnboarding(completeData);
            onComplete && onComplete(completeData);
          }, 3000);
        }, 4000);
      }, 500);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className={`${styles.screen} ${styles.screenBenvenuto}`}>
        <div className={styles.card}>
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeIcon}>
              {/* <Crown className={`${styles.iconXxl} ${styles.textYellow300}`} /> */}
              {/* <Sparkles
                className={`${styles.iconXxl} ${styles.textYellow300}`}
              /> */}
            </div>
            <h1 className={styles.welcomeTitle}>
              Benvenut* {profileData.firstName}!
            </h1>
            <p className={styles.welcomeSubtitle}>Il tuo profilo è pronto!</p>
          </div>
        </div>
      </div>
    );
  }

  if (showXPCelebration) {
    return (
      <div className={`${styles.screen} ${styles.screenCelebration}`}>
        <div className={styles.card}>
          <div className={styles.xpCelebrationContent}>
            <div className={styles.xpIconContainer}>
              <Cookie className={`${styles.iconXxl} ${styles.textSecondary}`} />
              {/* <div className={styles.xpSparkles}>
                <Sparkles
                  className={`${styles.sparkle1} ${styles.textYellow300}`}
                />
                <Sparkles
                  className={`${styles.sparkle2} ${styles.textYellow300}`}
                />
                <Sparkles
                  className={`${styles.sparkle3} ${styles.textYellow300}`}
                />
              </div> */}
            </div>

            <div className={styles.xpCounter}>
              <span className={styles.xpNumber}>+{celebrationXP} XP</span>
              {/* <span className={styles.xpLabel}>XP</span> */}
            </div>

            {/* <h2 className={styles.celebrationTitle}>
              Registrazione Completata!
            </h2> */}

            <div className={styles.celebrationProgress}>
              <div
                className={styles.celebrationProgressBar}
                style={{ width: `${(celebrationXP / 200) * 100}%` }}
              />
            </div>
            {/* <p className={styles.welcomeSubtitle}>Il tuo profilo è pronto!</p> */}

            {/* <p className={styles.celebrationSubtitle}>
              Hai guadagnato i tuoi primi punti esperienza
            </p> */}
          </div>
        </div>
      </div>
    );
  }

  // Render functions for UI components OLD version
  // const renderGameHUD = () => (
  //   <div className={styles.gameHud}>
  //     <div className={styles.hudTop}>
  //       <div className={styles.hudLeft}>
  //         <div className={styles.hudLevel}>
  //           {/* <Gem className="icon-md text-yellow-300" /> */}
  //           <Cookie className="icon-md text-yellow-300" />

  //           <span>{xp} XP</span>
  //         </div>
  //       </div>
  //     </div>

  //     <div className={styles.progressSection}>
  //       <div className={styles.progressLabel}>
  //         <span>Progresso Profilo</span>
  //         <span>{Math.round((currentStep / (steps.length - 1)) * 100)}%</span>
  //       </div>
  //       <div className={styles.progressBar}>
  //         <div
  //           className={styles.progressFill}
  //           style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );

  const renderGameHUD = () => (
    <div className={styles.gameHud}>
      <div className={styles.hudTop}>
        <div className={styles.hudLeft}>
          <div className={styles.hudLevel}>
            <Cookie className="icon-md text-yellow-300" />
            <span>{currentXP} XP</span>
          </div>
          {/* <div className={styles.hudXp}>
            <div className={styles.cherryContainer}>
              <Cherry className="icon-sm text-yellow-300" />
            </div>
            <span>Fortuna 0</span>
          </div> */}
        </div>
        {/* <div className={styles.hudAchievements}>
          <Activity className="icon-sm text-yellow-300" />
          <span>0</span>
        </div> */}
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressLabel}>
          <span>Progresso Profilo</span>
          <span>{Math.round((currentStep / (steps.length - 1)) * 100)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  const renderIdentityStep = () => (
    <div className={styles.formSection}>
      <div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            {profileData.profilePhoto ? (
              <img src={profileData.profilePhoto} alt="Profile" />
            ) : (
              <User className={styles.iconXl} />
            )}
          </div>
          <label className={styles.avatarUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleProfilePhotoUpload(file);
                }
              }}
            />
            <Camera className={styles.iconSm} />
          </label>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formRow}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={profileData.firstName || ""}
              onChange={(e) =>
                updateProfileData({
                  firstName: e.target.value,
                })
              }
              className={styles.formInput}
              placeholder="Nome"
            />
            <span className={styles.requiredAsterisk}>*</span>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={profileData.lastName || ""}
              onChange={(e) =>
                updateProfileData({
                  lastName: e.target.value,
                })
              }
              className={styles.formInput}
              placeholder="Cognome"
            />
            <span className={styles.requiredAsterisk}>*</span>
          </div>
        </div>

        {/* <div className={styles.inputGroup}>
          <div className={`${styles.inputGroup} ${styles.withIcon}`}>
            <Mail className={`${styles.iconSm} ${styles.textPurple400}`} />
            <input
              type="email"
              value={profileData.email || ""}
              onChange={(e) =>
                updateProfileData({
                  email: e.target.value,
                })
              }
              className={styles.formInput}
              placeholder="Email"
            />
          </div>
          <span className={styles.requiredAsterisk}>*</span>
        </div> */}

        {/* <div className={styles.orDivider}>oppure</div> */}

        <div className={`${styles.inputGroup} ${styles.withIcon}`}>
          <Phone className={`${styles.iconSm} ${styles.textPurple400}`} />
          <input
            type="tel"
            value={profileData.phone || ""}
            onChange={(e) =>
              updateProfileData({
                phone: e.target.value,
              })
            }
            className={styles.formInput}
            placeholder="Numero di telefono"
          />
          <span className={styles.requiredAsterisk}>*</span>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="date"
            value={profileData.birthDate || ""}
            onChange={(e) =>
              updateProfileData({
                birthDate: e.target.value,
              })
            }
            className={styles.formInput}
          />
          {/* <span className={styles.requiredAsterisk}>*</span> */}
        </div>
      </div>
    </div>
  );

  const renderSkillsStep = () => (
    <div className={styles.formSection}>
      <div className={styles.skillsGrid}>
        {skillsData.map((skill) => {
          const isSelected = profileData.skills?.find((s) => s.id === skill.id);
          return (
            <div
              key={skill.id}
              className={`${styles.skillCard} ${styles.learning} ${
                isSelected ? styles.selected : ""
              }`}
              onClick={() => toggleSkill(skill)}
            >
              <div className={styles.skillContent}>
                {/* <span className={styles.skillIcon}>{skill.icon}</span> */}
                <span className={styles.skillIcon}>
                  {skill.icon ? <skill.icon size={24} /> : "⚡"}
                </span>
                <span className={styles.skillName}>{skill.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.skillsCounter}>
        {profileData.skills?.length > 0 ? (
          <p>Selezionate: {profileData.skills.length} competenze</p>
        ) : (
          <p>Seleziona le tue competenze!</p>
        )}
      </div>
    </div>
  );

  const renderLearningStep = () => (
    <div className={styles.formSection}>
      {/* <div className={styles.skillsIntro}>
        <p>Scopri nuove abilità 🚀</p>
      </div> */}

      <div className={styles.skillsGrid}>
        {skillsData.map((skill) => {
          const isSelected = profileData.wantedSkills?.find(
            (s) => s.id === skill.id
          );
          return (
            <div
              key={skill.id}
              className={`${styles.skillCard} ${styles.learning} ${
                isSelected ? styles.selected : ""
              }`}
              onClick={() => toggleWantedSkill(skill)}
            >
              <div className={styles.skillContent}>
                {/* <span className={styles.skillIcon}>{skill.icon}</span> */}
                <span className={styles.skillIcon}>
                  {skill.icon ? <skill.icon size={24} /> : "⚡"}
                </span>
                <span className={styles.skillName}>{skill.name}</span>
                {/* {isSelected && (
                  <Heart className={`${styles.iconSm} ${styles.textRed500}`} />
                )} */}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.skillsCounter}>
        {profileData.wantedSkills?.length > 0 ? (
          <p>
            Selezionate: {profileData.wantedSkills.length} competenze da
            imparare
          </p>
        ) : (
          <p>Seleziona ciò che ti incuriosisce ✨</p>
        )}
      </div>
    </div>
  );

  const renderLocationStep = () => (
    <div className={styles.formSection}>
      <div className={styles.languagesSection}>
        {/* <h3 className={styles.sectionTitle}>
          <Globe className={`${styles.iconMd} ${styles.textBlue400}`} />
          Che lingue parli?
        </h3> */}
        <div className={styles.languagesGrid}>
          {languagesData.map((language) => {
            const isSelected = profileData.languages?.find(
              (l) => l.name === language.name
            );
            return (
              <div
                key={language.name}
                className={`${styles.skillCard} ${styles.learning} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => toggleLanguage(language)}
              >
                <div className={styles.languageContent}>
                  <span className={styles.languageFlag}>{language.flag}</span>
                  <span className={styles.languageName}>{language.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderFinalStep = () => (
    <div className={styles.finalSection}>
      <div>
        <h3 className={styles.sectionTitle}>
          {/* <Sparkles className={`${styles.iconMd} ${styles.textYellow400}`} /> */}
          Raccontaci di te!
        </h3>
        <textarea
          value={profileData.aboutMe || ""}
          onChange={(e) =>
            updateProfileData({
              aboutMe: e.target.value,
            })
          }
          className={styles.aboutTextarea}
          rows="4"
          placeholder="Scrivi qualcosa di interessante su di te..."
        />
      </div>

      {/* <div className={styles.settingsCard}>
        <div className={styles.settingsContent}>
          <h4>Suggerimenti eventi 🎪</h4>
          <p>Ricevi notifiche su eventi!</p>
        </div>
        <button
          onClick={() => {
            updateProfileData({
              eventSuggestions: !profileData.eventSuggestions,
            });
          }}
          className={`${styles.toggleSwitch} ${
            profileData.eventSuggestions ? styles.on : styles.off
          }`}
        >
          <div
            className={`${styles.toggleHandle} ${
              profileData.eventSuggestions ? styles.on : styles.off
            }`}
          />
        </button>
      </div> */}
      <div className={styles.locationSection}>
        <h3 className={styles.sectionTitle}>
          {/* <Target className={`${styles.iconMd} ${styles.textPurple400}`} /> */}
          Dove ti trovi?
        </h3>
        <input
          type="text"
          value={profileData.location || ""}
          onChange={(e) =>
            updateProfileData({
              location: e.target.value,
            })
          }
          className={styles.formInput}
          placeholder="Torino"
        />
      </div>

      {/* {currentStep === steps.length - 1 && (
        <div className={styles.completionCard}>
          <Sparkles
            className={`${styles.iconXl} ${styles.textYellow400} ${styles.completionIcon}`}
          />
          <h3 className={styles.completionTitle}>Quasi pronto! 🎉</h3>
        </div>
      )} */}
    </div>
  );

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case "identity":
        return renderIdentityStep();
      case "skills":
        return renderSkillsStep();
      case "learning":
        return renderLearningStep();
      case "location":
        return renderLocationStep();
      case "final":
        return renderFinalStep();
      default:
        return null;
    }
  };

  return (
    <div>
      <div className={`${styles.screen} `}>
        <div className={styles.card}>
          {/* Achievement Popup */}
          {/* {showAchievement && (
            <div className={styles.achievementPopup}>
              <div className={styles.achievementContent}>
                <span className={styles.achievementIcon}>
                  {showAchievement.icon}
                </span>
                <div className={styles.achievementText}>
                  <h4>{showAchievement.name}</h4>
                  <p>{showAchievement.description}</p>
                </div>
              </div>
            </div>
          )} */}

          {/* Game HUD */}
          {renderGameHUD()}

          {/* Content */}
          <div className={styles.stepContentContainer}>
            <div className={styles.stepHeader}>
              <h1 className={styles.stepTitle}>{steps[currentStep].title}</h1>
              <p className={styles.stepSubtitle}>
                {steps[currentStep].subtitle}
              </p>
            </div>
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className={styles.navigation}>
            {/* <div className={styles.navigationContent}> */}
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`${styles.navButton} ${styles.prev} ${
                currentStep === 0 ? styles.disabled : ""
              }`}
            >
              <ChevronLeft className={styles.iconSm} />
              <span>Indietro</span>
            </button>

            <div className={styles.progressDots}>
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.progressDot} ${
                    index === currentStep
                      ? styles.current
                      : index < currentStep
                      ? styles.completed
                      : styles.pending
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!canContinue()}
              className={`${styles.navButton} ${styles.next} ${
                !canContinue() ? styles.disabled : ""
              }`}
            >
              <span>
                {currentStep === steps.length - 1 ? "Finito!" : "Avanti"}
              </span>
              {currentStep === steps.length - 1 ? (
                <Flame className={styles.iconSm} />
              ) : (
                <ChevronRight className={styles.iconSm} />
              )}
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSetupSlides;
