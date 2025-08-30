import {
  Activity,
  CalendarFoldIcon,
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
import { useEffect, useState } from "react";
import { useQuickSetup } from "../hooks/useQuickSetup";

import ProfilePage from "./MainApp/Profile/ProfilePage";
import BottomNavigation from "./MainApp/Shared/BottomNavigation";
import styles from "./MainAppRouter.module.css";
import DailySpin from "./DailySpin";
import { useSelector } from "react-redux";
import ProfileHeaderMockup from "./ProfileHeaderMockup";
import SearchPage from "./SearchPage";
import ChatComponentTest from "./ChatComponentTest";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import BottomNavigationTest from "./MainApp/Shared/BottomNavigationTest";
import ToastContainer from "./notifications/ToastContainer";
import NotificationBell from "./notifications/NotificationBell";
import RoleSpecificNotificationDropdown from "@/components/notifications/RoleSpecificNotificationDropdown";

// ✨ NUOVO: Import XP Service selectors
import {
  selectTotalDisplayXP,
  selectUserXP,
  selectCurrentUserId,
  selectDemoState,
  setCurrentUser,
  selectLastSlotReward,
} from "../services/xpService";

import {
  selectCurrentUserProfile,
  selectUserProfile,
} from "../services/userService";
import CherryComp from "./CherryComp";
import { selectCurrentUser } from "@/store/slices/sharedEventSlice";
import MyExplorePage from "./ExplorePage";
import EventSectionTest from "./EventSectionTest";
import StaticEventShowcase from "./StaticEventShowcase";
import MockupCard from "./MainApp/Shared/Modals/MockupCard";
import EsperienzePage from "./EsperienzePage";
import EventiPage from "./EventiPage";
import ActivityModal from "./ActivityModal";

// Sostituisci ExplorePage con questo componente Esperienze

const MainAppRouter = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [xpJustChanged, setXpJustChanged] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // const chatNotifications = useUnreadMessages(role); // Viewer per pannello DX
  const lastSlotReward = useSelector(selectLastSlotReward);
  console.log(lastSlotReward);

  const currentUserEvent = useSelector(selectCurrentUser);
  console.log(currentUserEvent);

  const userProfile = useSelector(selectUserProfile("currentUser"));

  const totalDisplayXP = useSelector(selectTotalDisplayXP); // XP + demo bonus

  const userXP = useSelector(selectUserXP("currentUser"));
  // const currentUserId = useSelector(selectCurrentUserId);

  const { lastXpReward, addXP } = useQuickSetup();

  const renderCurrentPage = () => {
    const currentUser = {
      id: userProfile?.email || userProfile?.phone || "currentUser",
      firstName: userProfile?.firstName || "User",
      lastName: userProfile?.lastName || "",
      email: userProfile?.email || "",
      location: userProfile?.location || "",
      joinedDate: userProfile?.joinedDate || "",
    };

    // console.log(currentUser);

    switch (activeTab) {
      case "Eventi":
        return <EventiPage />;
      case "Esperienze":
        return <EsperienzePage />;
      case "UserRoundSearch":
        return <SearchPage />;

      case "profile":
        return <ProfilePage />;

      default:
        return <EventiPage />;
    }
  };

  const calcolaPercentualeProgressBar = (giorniAttuali, giorniMax) => {
    const percentuale = Math.min((giorniAttuali / giorniMax) * 100, 100);
    return Math.round(percentuale); // Arrotonda per evitare decimali
  };
  const GIORNI_MASSIMI = 20; // Massimo per completare la progress bar
  const giorniConsecutivi = 10;

  const percentualeProgress = calcolaPercentualeProgressBar(
    giorniConsecutivi,
    GIORNI_MASSIMI
  );

  const renderGameHUD = () => {
    return (
      <div className={styles.gameHud}>
        <div className={styles.hudTop}>
          <div className={styles.hudLeft}>
            <div className={styles.hudLevel}>
              <Cookie className="icon-md text-yellow-300" />
              {/* ✅ NUOVO: Usa totalDisplayXP (include demo bonus) */}
              <span>{userXP} XP</span>
            </div>
            <div className={styles.hudXp}>
              <div className={styles.cherryContainer}>
                <Cherry
                  className="icon-sm text-yellow-300"
                  style={{
                    color:
                      lastSlotReward >= 30
                        ? "#b81313"
                        : lastSlotReward >= 10
                        ? "#fde047"
                        : "rgb(19, 200, 255)",
                    transition: "all 0.3s ease",
                    animation: xpJustChanged
                      ? "cherry-shake-scale 0.4s ease-in-out"
                      : "none",
                  }}
                />
              </div>
              <span>{lastSlotReward > 0 ? `+${lastSlotReward}` : 0}</span>
            </div>

            {/* <div className={styles.hudLevel}>
              <Star className="icon-md text-yellow-300" />
              <span>{currentUserEvent.participationScore} </span>
            </div>
            <div className={styles.hudLevel}>
              <ShieldCheckIcon className="icon-md text-yellow-300" />
              <span>{currentUserEvent.trustScore} </span>
            </div> */}
          </div>
          {/* <div className={styles.hudAchievements}>
            <Activity className="icon-sm text-yellow-300" />
            <span>0</span>
          </div> */}
          <div
            className={`${styles.hudAchievements} ${styles.clickable}`}
            onClick={() => setIsActivityModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Activity className="icon-sm text-yellow-300" />
            <span>0</span>
          </div>
        </div>
        {/* 
        <div className={styles.progressSection}>
          <div className={styles.progressLabel}>
            <span>Giorni consecutivi attivi!</span>
            <span>1 giorno! 🌱</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${percentualeProgress}%`,
                background: "linear-gradient(to right, #2e9688, #aaebe2)",
              }}
            />
          </div>
        </div> */}
      </div>
    );
  };

  {
    /* Aggiungi questo prima della chiusura del component */
  }

  return (
    <div className={styles.screen}>
      <div className={styles.cardApp}>
        {renderGameHUD()}

        <div className={styles.contentArea}>{renderCurrentPage()}</div>

        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <ActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        giorniConsecutivi={giorniConsecutivi}
        percentualeProgress={percentualeProgress}
      />
      ;
    </div>
  );
};

export default MainAppRouter;
