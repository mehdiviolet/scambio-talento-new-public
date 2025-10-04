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

import ProfilePage from "./MainApp/Profile/ProfilePage";
import BottomNavigation from "./MainApp/Shared/BottomNavigation";
import styles from "./MainAppRouter.module.css";
import DailySpin from "./DailySpin";
import ProfileHeaderMockup from "./ProfileHeaderMockup";
import SearchPageTest from "./SearchPageTest";
import ProfilePageTest from "./MainApp/Profile/ProfilePageTest";
import ChatComponentTest from "./ChatComponentTest";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import BottomNavigationTest from "./MainApp/Shared/BottomNavigationTest";
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
import EsperienzePage from "./EsperienzePage";
import EventiPage from "./EventiPage";
import SearchPage from "./SearchPage";
import CookieModalTest from "./CookieModalTest";

const MainAppRouterTest = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [xpJustChanged, setXpJustChanged] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isStarteModalOpen, setsStarteModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("chats");

  // Nuovi stati per la navigazione del drawer
  const [drawerView, setDrawerView] = useState("list");
  const [selectedChat, setSelectedChat] = useState(null);

  const allNotifications = useAllNotifications("owner");
  const dispatch = useDispatch();
  const { addXP, profileData } = useQuickSetup();

  // Logica notifiche
  const userRole = "owner";
  const notifications = useSelector(selectNotificationsByRole(userRole));
  const notificationUnread = useSelector(selectUnreadCountByRole(userRole));
  const chatUnread = allNotifications.chat.total;

  const saraXP = useSelector(selectUserXP("sara"));
  const demoState = useSelector(selectDemoState);
  const organizerEvent = useSelector(selectOrganizer);
  const userXP = saraXP + demoState.dayXP;

  // Funzione per gestire il back del drawer
  const handleDrawerBack = () => {
    if (drawerView === "chat") {
      setDrawerView("list");
      setSelectedChat(null);
    } else {
      setIsChatModalOpen(false);
    }
  };

  // Funzione per renderizzare la vista della chat singola
  const renderChatView = () => {
    return (
      <div style={{ padding: "20px", height: "100%" }}>
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setDrawerView("list")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            <ChevronLeft size={20} />
            Torna alle chat
          </button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ margin: 0, color: "var(--text-primary)" }}>
            {selectedChat?.name || "Chat"}
          </h3>
        </div>

        {/* Header della conversazione */}
        <div
          style={{
            background: "var(--bg-secondary)",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--accent-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {selectedChat?.name?.charAt(0) || "C"}
            </div>
            <div>
              <div style={{ fontWeight: "600", color: "var(--text-primary)" }}>
                {selectedChat?.name || "Chat"}
              </div>
              <div style={{ fontSize: "14px", color: "var(--secondary)" }}>
                Online ora
              </div>
            </div>
          </div>
        </div>

        {/* Area messaggi */}
        <div
          style={{
            flex: 1,
            background: "var(--bg-secondary)",
            borderRadius: "12px",
            padding: "20px",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Messaggio di esempio */}
          <div
            style={{
              alignSelf: "flex-start",
              background: "white",
              padding: "12px 16px",
              borderRadius: "18px 18px 18px 6px",
              maxWidth: "80%",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "14px", color: "#333" }}>
              Ciao! Come stai oggi?
            </div>
            <div style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>
              10:30
            </div>
          </div>

          <div
            style={{
              alignSelf: "flex-end",
              background: "var(--accent-primary)",
              color: "white",
              padding: "12px 16px",
              borderRadius: "18px 18px 6px 18px",
              maxWidth: "80%",
            }}
          >
            <div style={{ fontSize: "14px" }}>Tutto bene! Tu come va?</div>
            <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "4px" }}>
              10:32
            </div>
          </div>
        </div>

        {/* Input per nuovo messaggio */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Scrivi un messaggio..."
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "1px solid var(--border-color)",
              borderRadius: "24px",
              background: "var(--bianco)",
              color: "var(--text-primary)",
              fontSize: "14px",
            }}
          />
          <button
            style={{
              background: "var(--accent-primary)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
            }}
          >
            →
          </button>
        </div>
      </div>
    );
  };

  const renderDrawerContent = () => {
    if (drawerView === "chat") {
      return renderChatView();
    }

    if (activeFilter === "chats") {
      return (
        <ChatComponentTest
          isOwner={true}
          onClose={() => setIsChatModalOpen(false)}
          onChatOpen={(chatData) => {
            setDrawerView("chat");
            setSelectedChat(chatData);
          }}
        />
      );
    }

    if (activeFilter === "notifications") {
      return (
        <NotificationPanel
          currentRole={userRole}
          notifications={notifications}
          unreadCount={notificationUnread}
        />
      );
    }

    return null;
  };

  const renderCurrentPage = () => {
    const currentUser = {
      id: profileData.email || profileData.phone || "default",
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
    };

    switch (activeTab) {
      case "Eventi":
        return <EventiPage />;
      case "Esperienze":
        return <EsperienzePage />;
      case "UserRoundSearch":
        return <SearchPage />;
      case "profile":
        return <ProfilePageTest />;
      default:
        return <EventiPage />;
    }
  };

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
                <h1 style={{ color: "var(--secondary)" }}>XP</h1>
                <p className={styles.userXP}>{userXP}</p>
              </div>
            </div>

            <div
              className={`${styles.hudAchievements} ${styles.clickable}`}
              onClick={() => setsStarteModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <Star style={{ color: "var(--secondary)" }} size={20} />
              <p className={styles.userXP}>35</p>
            </div>

            <div
              className={`${styles.hudAchievements} ${styles.clickable}`}
              onClick={() => setIsActivityModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <Activity style={{ color: "var(--secondary)" }} size={20} />
              <p className={styles.userXP}>0</p>
            </div>
          </div>

          <div
            className={`${styles.hudAchievements} ${styles.clickable}`}
            onClick={() => setIsChatModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <Bell style={{ color: "var(--secondary)" }} />
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
        <div className={styles.contentArea}>{renderCurrentPage()}</div>
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

      <CookieModalTest
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
          <button className={styles.backButton} onClick={handleDrawerBack}>
            <ChevronLeft size={20} />
            <span>
              {drawerView === "chat" ? selectedChat?.name || "Chat" : "Profile"}
            </span>
          </button>
          {drawerView === "list" && (
            <div className={styles.drawerTabs}>
              <div
                className={`${styles.headerTitle} ${
                  activeFilter === "chats" ? styles.active : ""
                }`}
                onClick={() => setActiveFilter("chats")}
              >
                <MessageCircle size={20} />
                {chatUnread > 0 && (
                  <div className={styles.unreadBadge}>{chatUnread}</div>
                )}
              </div>

              <div
                className={`${styles.headerTitle} ${
                  activeFilter === "notifications" ? styles.active : ""
                }`}
                onClick={() => setActiveFilter("notifications")}
              >
                <Bell size={20} />
                {notificationUnread > 0 && (
                  <div className={styles.unreadBadge}>{notificationUnread}</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.drawerContent}>
          {isChatModalOpen && renderDrawerContent()}
        </div>
      </div>
    </div>
  );
};

export default MainAppRouterTest;
