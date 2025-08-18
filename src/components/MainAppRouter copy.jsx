import {
  Activity,
  Cherry,
  Cookie,
  Crown,
  Gem,
  Star,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuickSetup } from "../hooks/useQuickSetup";

import ProfilePage from "./MainApp/Profile/ProfilePage"; // IMPORT VERO
import BottomNavigation from "./MainApp/Shared/BottomNavigation";
import styles from "./MainAppRouter.module.css";
import DailySpin from "./DailySpin";
import { useSelector } from "react-redux";
import ProfileHeaderMockup from "./ProfileHeaderMockup";
import SearchPage from "./SearchPage";
import ChatComponentTest from "./ChatComponentTest";
import RoleSpecificNotificationDropdown from "./notifications/RoleSpecificNotificationDropdown";
import ToastContainer from "./notifications/ToastContainer";
import NotificationBell from "./notifications/NotificationBell";
import SearchAdvanced from "./SearchAdvanced";
import XPServiceTest from "@/services/test/XPServiceTest";

// Placeholder components per ora
const HomePage = ({ currentUser }) => (
  <div className={styles.homeContainer}>
    {/* <h1 className={styles.homeTitle}>Home</h1> */}

    <DailySpin
      currentUser={currentUser} // ← Oggetto utente per localStorage keys
    />
  </div>
);

// const SearchPage = () => (
//   <div className={styles.searchContainer}>
//     <input
//       type="text"
//       placeholder="Cerca persone o skill..."
//       className={styles.searchInput}
//     />
//     <ProfileHeaderMockup />
//   </div>
// );

const ExplorePage = () => (
  <div className={styles.exploreContainer}>
    <h1 className={styles.exploreTitle}>🏛️ Esplora</h1>
    <SearchAdvanced />
  </div>
);

const ChatPage = () => (
  <div className={styles.chatContainer}>
    <h1 className={styles.chatTitle}>💬 Chat</h1>
    <p className={styles.chatDescription}>Conversazioni</p>
    <div className={styles.chatList}>
      <div className={styles.chatItem}>
        <h3 className={styles.chatItemName}>Marco Rossi</h3>
        <p className={styles.chatItemMessage}>
          Ciao! Quando possiamo iniziare le lezioni?
        </p>
        <p className={styles.chatItemTime}>2 min fa</p>
      </div>
    </div>
  </div>
);

const MainAppRouter = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [xpJustChanged, setXpJustChanged] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const {
    // States
    currentStep,
    setCurrentStep,
    // xp,
    level,
    achievements,
    showAchievement,
    showWelcome,
    isExiting,
    completedSteps,
    setCompletedSteps,
    profileData,
    setProfileData,

    // Static data
    skillsData,
    languagesData,
    steps,
    achievementsList,

    // Functions
    triggerAchievement,
    addXP,
    checkAchievements,
    canContinue,
    toggleSkill,
    toggleWantedSkill,
    toggleLanguage,

    lastXpReward, // ← AGGIUNGI QUESTO
  } = useQuickSetup();

  const { userXP: xp } = useSelector((state) => state.experienceSliceTest);

  console.log("USERXP:", xp);

  const renderCurrentPage = () => {
    // Crea currentUser dal profileData
    const currentUser = {
      id: profileData.email || profileData.phone || "default",
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
    };

    switch (activeTab) {
      case "home":
        return <HomePage addXP={addXP} currentUser={currentUser} />;
      case "search":
        return <SearchPage />;
      case "explore":
        return <ExplorePage />;
      case "chat":
        return <ChatComponentTest isOwner={false} />;
      case "profile":
        return <ProfilePage />;
      case "test":
        return <XPServiceTest />;
      default:
        return <HomePage addXP={addXP} currentUser={currentUser} />;
    }
  };

  // Aggiungi useEffect per rilevare cambi XP
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    setXpJustChanged(true);
    const timer = setTimeout(() => setXpJustChanged(false), 600);
    return () => clearTimeout(timer);
  }, [xp]);

  // Configurazione dinamica per la progress bar
  const GIORNI_MASSIMI = 20; // Massimo per completare la progress bar
  // const giorniConsecutivi = 8; // Valore dinamico che cambia in base al progresso
  const { giorniConsecutivi } = useSelector((state) => state.demo);
  const { dayXP } = useSelector((state) => state.demo);

  // Calcolo della percentuale della progress bar
  const calcolaPercentualeProgressBar = (giorniAttuali, giorniMax) => {
    const percentuale = Math.min((giorniAttuali / giorniMax) * 100, 100);
    return Math.round(percentuale); // Arrotonda per evitare decimali
  };

  // Funzione per ottenere il messaggio dinamico
  const getMessaggioGiorni = (giorni, max) => {
    if (giorni >= max) {
      return "Grande! 💎";
    } else if (giorni === 0) {
      return "Inizia il tuo streak!";
    } else if (giorni >= max - 3) {
      return `Ci sei quasi! ${giorni} giorni! 🔥`;
    } else if (giorni >= max - 5) {
      return `Quasi al traguardo! ${giorni} giorni! ⭐`;
    } else if (giorni >= max / 2) {
      return `Ottimo lavoro! ${giorni} giorni! 🚀`;
    } else if (giorni >= 5) {
      return `Continua così! ${giorni} giorni! 💪`;
    } else {
      return `${giorni} giorni! 🌱`;
    }
  };

  // Render function migliorata
  const renderGameHUD = () => {
    const percentualeProgress = calcolaPercentualeProgressBar(
      giorniConsecutivi,
      GIORNI_MASSIMI
    );
    const messaggioGiorni = getMessaggioGiorni(
      giorniConsecutivi,
      GIORNI_MASSIMI
    );

    return (
      <div className={styles.gameHud}>
        <div className="panel-header">
          {/* <h1>👨‍🎓 Pannello Studente</h1> */}
          <RoleSpecificNotificationDropdown
            role="viewer"
            title="Notifiche Studente"
          />
          <ToastContainer role="viewer" />
          {/* <NotificationBell role="viewer" /> */}
        </div>

        <div className={styles.hudTop}>
          <div className={styles.hudLeft}>
            <div className={styles.hudLevel}>
              {/* <Gem className="icon-md text-yellow-300" /> */}
              <Cookie className="icon-md text-yellow-300" />
              <span>{xp + dayXP} XP</span>
            </div>
            <div className={styles.hudXp}>
              <div className={styles.cherryContainer}>
                <Cherry
                  // fill={xpJustChanged ? "currentColor" : "none"}
                  className="icon-sm text-yellow-300"
                  style={{
                    color:
                      lastXpReward >= 30
                        ? "#b81313"
                        : lastXpReward >= 10
                        ? "#fde047"
                        : "rgb(19, 200, 255)",
                    transition: "all 0.3s ease",
                    // animation: xpJustChanged
                    //   ? "cherry-fill-bounce 0.6s ease-out"
                    //   : "none",
                    animation: xpJustChanged
                      ? "cherry-shake-scale 0.4s ease-in-out"
                      : "none",
                  }}
                />
                {xpJustChanged && (
                  <div className={styles.splashEffect}>
                    <div className={styles.spark}></div>
                    <div className={styles.spark}></div>
                    <div className={styles.spark}></div>
                    <div className={styles.flash}></div>
                  </div>
                )}
              </div>
              {/* <span>Fortuna {level}</span> */}
              <span>Fortuna {lastXpReward > 0 ? `+${lastXpReward}` : 0}</span>
            </div>
          </div>
          <div className={styles.hudAchievements}>
            <Activity className="icon-sm text-yellow-300" />
            {/* da calcolare: se ha hatto tre 20 giorni consecutivi sarà 3 */}
            <span>3</span>
          </div>
        </div>
        <div className={styles.progressSection}>
          <div className={styles.progressLabel}>
            <span>Giorni consecutivi attivi!</span>
            <span>{messaggioGiorni}</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${percentualeProgress}%`,
                // Aggiunge un effetto visivo quando si avvicina al completamento
                background:
                  percentualeProgress >= 90
                    ? "linear-gradient(to right, #f59e0b, #fbbf24)"
                    : "linear-gradient(to right, #2e9688, #aaebe2)",
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.screen}>
      <div className={styles.cardApp}>
        {renderGameHUD()}

        {/* Content area */}
        <div className={styles.contentArea}>
          {" "}
          {/* Bottom padding per il menu */}
          {renderCurrentPage()}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default MainAppRouter;
