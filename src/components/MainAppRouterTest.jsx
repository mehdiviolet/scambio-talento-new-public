import {
  Activity,
  Bell,
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
// import ToastContainer from "./notifications/ToastContainer";
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
import CookieModal from "./CookieModal";
import ActivityModalTest from "./ActivityModalTest";
import StarModal from "./StarModal";
import { useAllNotifications } from "@/hooks/useAllNotifications";
import NotificationPanel from "./notifications/NotificationPanel";
import {
  selectNotificationsByRole,
  selectUnreadCountByRole,
} from "@/store/slices/notificationSlice";

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
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isStarteModalOpen, setsStarteModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("chats"); // "chats" o "notifications"

  const allNotifications = useAllNotifications("owner");

  const dispatch = useDispatch();

  const { addXP, profileData } = useQuickSetup();

  const userRole = "owner";
  const notifications = useSelector(selectNotificationsByRole(userRole));
  const notificationUnread = useSelector(selectUnreadCountByRole(userRole));

  const saraXP = useSelector(selectUserXP("sara"));
  const demoState = useSelector(selectDemoState);
  const organizerEvent = useSelector(selectOrganizer);

  // const userXP = useSelector(selectUserXP("currentUser"));
  const userXP = saraXP + demoState.dayXP;

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

  // Nel drawer content, sostituisci la parte esistente con:
  const renderDrawerContent = () => {
    if (activeFilter === "chats") {
      return (
        <ChatComponentTest
          isOwner={true}
          onClose={() => setIsChatModalOpen(false)}
        />
      );
    }
    if (activeFilter === "notifications") {
      return (
        <NotificationPanel
          currentRole={userRole}
          notifications={notifications}
          unreadCount={notificationUnread}
          // mode="dropdown"
        />
      );
    }

    return null;
  };

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
              </div>
            </div>
            <div
              className={`${styles.hudAchievements} ${styles.clickable}`}
              onClick={() => setsStarteModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <Star style={{ color: "var(--text-secondary)" }} />
            </div>
            <div
              className={`${styles.hudAchievements} ${styles.clickable}`}
              onClick={() => setIsActivityModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <Activity style={{ color: "var(--text-secondary)" }} />
            </div>
          </div>
          <div
            className={`${styles.hudAchievements} ${styles.clickable}`}
            onClick={() => setIsChatModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Bell style={{ color: "var(--text-secondary)" }} />

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
      {/* Activity Modal */}
      <ActivityModalTest
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />
      <CookieModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
        userXP={userXP}
      />
      <StarModal
        isOpen={isStarteModalOpen}
        onClose={() => setsStarteModalOpen(false)}
        userStars={userXP}
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
          {/* Aggiungi questi tab */}
          <div className={styles.drawerTabs}>
            <div
              className={`${styles.headerTitle} ${
                activeFilter === "chats" ? styles.active : ""
              }`}
              onClick={() => setActiveFilter("chats")}
            >
              <MessageCircle size={20} />
              <span>Chats</span>
              {/* {totalUnread > 0 && (
                <div className={styles.unreadBadge}>{totalUnread}</div>
              )} */}
            </div>
            <div
              className={`${styles.headerTitle} ${
                activeFilter === "notifications" ? styles.active : ""
              }`}
              onClick={() => setActiveFilter("notifications")}
            >
              <Bell size={20} />
              <span>Notifications</span>
              {notificationUnread > 0 && (
                <div className={styles.unreadBadge}>{notificationUnread}</div>
              )}
            </div>
          </div>
          {isChatModalOpen && renderDrawerContent()}
        </div>
      </div>
    </div>
  );
};

export default MainAppRouter;
