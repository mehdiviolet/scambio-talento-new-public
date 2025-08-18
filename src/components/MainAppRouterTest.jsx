import {
  Activity,
  Cherry,
  Cookie,
  Crown,
  Gem,
  LucideDatabase,
  ShieldCheckIcon,
  Star,
  StarHalf,
  Trophy,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useQuickSetup } from "../hooks/useQuickSetup";

import ProfilePage from "./MainApp/Profile/ProfilePage"; // IMPORT VERO
import BottomNavigation from "./MainApp/Shared/BottomNavigation";
import styles from "./MainAppRouter.module.css";
import DailySpin from "./DailySpin";
import ProfileHeaderMockup from "./ProfileHeaderMockup";
import SearchPageTest from "./SearchPageTest";
import ProfilePageTest from "./MainApp/Profile/ProfilePageTest";
import ChatComponentTest from "./ChatComponentTest";
import { useUnreadMessages } from "@/hooks/useUnreadMessages"; // Aggiusta il path se necessario
import BottomNavigationTest from "./MainApp/Shared/BottomNavigationTest";
import ToastContainer from "./notifications/ToastContainer";
import NotificationBell from "./notifications/NotificationBell";
import RoleSpecificNotificationDropdown from "./notifications/RoleSpecificNotificationDropdown";
import {
  selectTotalDisplayXP,
  selectUserXP,
  selectDemoState,
  setCurrentUser,
} from "@/services/xpService";
import { selectCurrentUserId } from "@/services/userService";
import { store } from "@/store";
import { selectOrganizer } from "@/store/slices/sharedEventSlice";

// Placeholder components per ora
const HomePage = ({ currentUser }) => (
  <div className={styles.homeContainer}>
    {/* <h1 className={styles.homeTitle}>Home</h1> */}

    <DailySpin
      currentUser={currentUser} // ← Oggetto utente per localStorage keys
    />
  </div>
);

const ExplorePage = () => (
  <div className={styles.exploreContainer}>
    <h1 className={styles.exploreTitle}>🏛️ Esplora</h1>
    <p className={styles.exploreDescription}>Esperienze disponibili</p>
    <div className={styles.exploreList}>
      <div className={styles.exploreCard}>
        <h3 className={styles.exploreCardTitle}>Lezioni di Chitarra</h3>
        <p className={styles.exploreCardTeacher}>Insegnante: Marco Rossi</p>
        <p className={styles.exploreCardCost}>Costo: 15 GEM</p>
      </div>
    </div>
  </div>
);

const MainAppRouter = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [xpJustChanged, setXpJustChanged] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const chatNotifications = useUnreadMessages("owner"); // Perché isOwner={true} nel tuo chat

  const dispatch = useDispatch();

  const { addXP, profileData } = useQuickSetup();

  const saraXP = useSelector(selectUserXP("sara"));
  const demoState = useSelector(selectDemoState);
  const organizerEvent = useSelector(selectOrganizer);

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
        return <SearchPageTest />;
      case "explore":
        return <ExplorePage />;
      case "chat":
        return <ChatComponentTest isOwner={true} />;
      case "profile":
        return <ProfilePageTest />;
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
  }, [saraXP]);

  useEffect(() => {
    dispatch(setCurrentUser({ userId: "sara" }));
  }, [dispatch]);

  // Configurazione dinamica per la progress bar
  const GIORNI_MASSIMI = 20; // Massimo per completare la progress bar

  const giorniConsecutivi = demoState.currentDay;
  // const totalDisplayXP = useSelector(selectTotalDisplayXP);
  const saraDisplayXP = saraXP + demoState.dayXP;

  // const { dayXP } = useSelector((state) => state.demo);

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
      return `${giorni} ${giorni > 1 ? "" : "giorno"} 🌱`;
    }
  };

  // 🎯 3. MODIFICA renderGameHUD per includere la notifica
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
        {/* <NotificationBell />
        <ToastContainer /> */}
        {/* <RoleSpecificNotificationDropdown
          role="owner"
          title="Notifiche Istruttore"
        /> */}
        <ToastContainer role="owner" />

        <div className={styles.hudTop}>
          <div className={styles.hudLeft}>
            <div className={styles.hudLevel}>
              <Cookie className="icon-md" style={{ color: "#fde047" }} />
              <span>{saraDisplayXP} XP</span>
            </div>
            <div className={styles.hudXp}>
              <div className={styles.cherryContainer}>
                <Cherry className="icon-sm" style={{ color: "#fde047" }} />
                {xpJustChanged && (
                  <div className={styles.splashEffect}>
                    <div className={styles.spark}></div>
                    <div className={styles.spark}></div>
                    <div className={styles.spark}></div>
                    <div className={styles.flash}></div>
                  </div>
                )}
              </div>
              <span>+{10}</span>
            </div>
          </div>
          <div className={styles.hudLevel}>
            <Star className="icon-md text-yellow-300" />
            {/* ✅ NUOVO: Usa totalDisplayXP (include demo bonus) */}
            <span>{organizerEvent.participationScore} </span>
            <span>0</span>
          </div>
          <div className={styles.hudLevel}>
            <ShieldCheckIcon className="icon-md text-yellow-300" />
            {/* ✅ NUOVO: Usa totalDisplayXP (include demo bonus) */}
            <span>{organizerEvent.trustScore} </span>
            {/* <span>0</span> */}
          </div>

          {/* 🎯 4. AGGIUNGI la sezione chat notifiche */}
          <div className={styles.hudRight}>
            <div className={styles.hudAchievements}>
              <Activity className="icon-sm text-yellow-300" />
              <span>4</span>
            </div>

            {/* 🎯 NOTIFICA CHAT CLICCABILE */}
            {/* {chatNotifications.hasUnread && (
              <div
                className={`${styles.hudChat} ${
                  chatNotifications.hasUnread ? styles.hasNotifications : ""
                }`}
                onClick={() => {
                  setActiveTab("chat"); 
                }}
                style={{ cursor: "pointer" }}
              >
                💬
                {chatNotifications.hasUnread && (
                  <div className={styles.notificationBadge}>
                    {chatNotifications.total}
                  </div>
                )}
              </div>
            )} */}
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
    <div className={styles.screenBg}>
      <div className={styles.cardApp}>
        {renderGameHUD()}

        {/* Content area */}
        <div className={styles.contentArea}>
          {" "}
          {/* Bottom padding per il menu */}
          {renderCurrentPage()}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigationTest
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default MainAppRouter;
