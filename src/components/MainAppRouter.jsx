import {
  Activity,
  Bell,
  CalendarFoldIcon,
  Cherry,
  ChevronLeft,
  Cookie,
  Crown,
  Gem,
  LucideDatabase,
  MessageCircle,
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
// import ToastContainer from "./notifications/ToastContainer";
// import NotificationBell from "./notifications/NotificationBell";
// import RoleSpecificNotificationDropdown from "@/components/notifications/RoleSpecificNotificationDropdown";

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
import ChatModal from "./ChatModal";
import CookieModal from "./CookieModal";
import { useAllNotifications } from "@/hooks/useAllNotifications";
// import useUnreadMessages from "src/hooks/useUnreadMessages.js";
// Sostituisci ExplorePage con questo componente Esperienze

const MainAppRouter = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [xpJustChanged, setXpJustChanged] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  const allNotifications = useAllNotifications("viewer");

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
  const chatNotifications = useUnreadMessages("viewer"); // o "viewer" a seconda del ruolo

  const renderGameHUD = () => {
    return (
      <div className={styles.gameHud}>
        <div className={styles.hudTop}>
          <div className={styles.hudLeft}>
            <div className={styles.hudLevel}>
              <div
                className={`${styles.hudLevel} ${styles.clickable}`}
                onClick={() => setIsCookieModalOpen(true)}
                style={{ cursor: "pointer" }}
              >
                <Cookie style={{ color: "var(--text-secondary)" }} />
                <span style={{ color: "var(--text-secondary)" }}>
                  {userXP} XP
                </span>
              </div>
            </div>
            <div
              className={`${styles.hudAchievements} ${styles.clickable}`}
              onClick={() => setIsActivityModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <Activity style={{ color: "var(--text-secondary)" }} />
              <span style={{ color: "var(--text-secondary)" }}>0</span>
              {/* <Bell size={24} /> */}
            </div>

            {/* <div className={styles.hudXp}>
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
            </div> */}
          </div>
          {/* <div className={styles.hudXp}>
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
          </div> */}
          {/* <div
            className={`${styles.hudAchievements} ${styles.clickable}`}
            onClick={() => setIsActivityModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Activity className="icon-sm text-yellow-300" />
            <span>0</span>
          </div> */}
          <div
            className={`${styles.hudAchievements} ${styles.clickable}`}
            onClick={() => setIsChatModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Bell style={{ color: "var(--text-secondary)" }} />
            {/* <span>{chatNotifications.total}</span> */}
            {/* Badge Instagram-style */}
            {allNotifications.hasUnread && (
              <div
                className={`${styles.notificationBadge} ${
                  allNotifications.total > 9 ? styles.large : ""
                }`}
              >
                {allNotifications.total > 99 ? "99+" : allNotifications.total}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  // Nel MainAppRouter.jsx, modifica la parte del return:

  return (
    <div className={styles.screen}>
      <div className={styles.cardApp}>
        {renderGameHUD()}
        <div className={styles.contentArea}>{renderCurrentPage()}</div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Activity Modal */}
      <ActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        giorniConsecutivi={giorniConsecutivi}
        percentualeProgress={percentualeProgress}
      />
      <CookieModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
        userXP={userXP}
      />

      {/* Chat Slide Drawer */}
      <div
        className={`${styles.slideDrawer} ${
          isChatModalOpen ? styles.open : ""
        }`}
      >
        <div className={styles.drawerHeader}>
          <button
            className={styles.backButton}
            onClick={() => setIsChatModalOpen(false)}
          >
            <ChevronLeft size={20} />
            <span>Messaggi</span>
          </button>
        </div>
        <div className={styles.drawerContent}>
          {isChatModalOpen && (
            <ChatComponentTest
              isOwner={false}
              onClose={() => setIsChatModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainAppRouter;
