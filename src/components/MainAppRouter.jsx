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
import StarModal from "./StarModal";
import {
  selectNotificationsByRole,
  selectUnreadCountByRole,
  selectUnreadCountForCurrentRole,
} from "@/store/slices/notificationSlice";
import NotificationBell from "./notifications/NotificationBell";
import NotificationPanel from "./notifications/NotificationPanel";
import { useAppSelector } from "@/hooks/redux";

const MainAppRouter = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [xpJustChanged, setXpJustChanged] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isStarteModalOpen, setsStarteModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("chats"); // "chats" o "notifications"

  // Nuovi stati per la navigazione del drawer
  const [drawerView, setDrawerView] = useState("list"); // 'list' | 'chat'
  const [selectedChat, setSelectedChat] = useState(null);

  const allNotifications = useAllNotifications("viewer");

  ////////////////NEW/////////////////
  const { isOwner } = useAppSelector((state) => state.onboarding);

  // ✅ Logica notifiche basata su isOwner
  const userRole = "viewer";
  const notifications = useSelector(selectNotificationsByRole(userRole));
  const notificationUnread = useSelector(selectUnreadCountByRole(userRole));

  const chatUnread = allNotifications.chat.total;
  console.log("chattt un read", chatUnread);
  const lastSlotReward = useSelector(selectLastSlotReward);
  console.log("OWNERRRRRRR", useSelector(selectNotificationsByRole("owner")));
  console.log(
    "VIEWERRRRRRRR",
    useSelector(selectNotificationsByRole("viewer"))
  );

  const currentUserEvent = useSelector(selectCurrentUser);
  console.log("NNNNN", useSelector(selectNotificationsByRole("viewer")));

  const userProfile = useSelector(selectUserProfile("currentUser"));

  const totalDisplayXP = useSelector(selectTotalDisplayXP); // XP + demo bonus

  const userXP = useSelector(selectUserXP("currentUser"));

  const { lastXpReward, addXP } = useQuickSetup();

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
          isOwner={false}
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
      id: userProfile?.email || userProfile?.phone || "currentUser",
      firstName: userProfile?.firstName || "User",
      lastName: userProfile?.lastName || "",
      email: userProfile?.email || "",
      location: userProfile?.location || "",
      joinedDate: userProfile?.joinedDate || "",
    };

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
    return Math.round(percentuale);
  };

  const GIORNI_MASSIMI = 20;
  const giorniConsecutivi = 10;
  const percentualeProgress = calcolaPercentualeProgressBar(
    giorniConsecutivi,
    GIORNI_MASSIMI
  );
  const chatNotifications = useUnreadMessages("viewer");

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
                <Cookie style={{ color: "var(--secondary)" }} />
                {/* <h1 style={{ color: "var(--secondary)" }}>XP</h1> */}
                <p className={styles.userXP}>{userXP}</p>
                {/* <h1 style={{ color: "var(--secondary)" }}>XP</h1> */}
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

          {isOwner && (
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
          )}
        </div>
      </div>
    );
  };

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
            <>
              <div className={styles.drawerTabs}>
                <div
                  className={`${styles.headerTitle} ${
                    activeFilter === "chats" ? styles.active : ""
                  }`}
                  onClick={() => setActiveFilter("chats")}
                >
                  <MessageCircle size={20} />
                  {/* <span>Chats</span> */}
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
                  {/* <span>Notifications</span> */}
                  {notificationUnread > 0 && (
                    <div className={styles.unreadBadge}>
                      {notificationUnread}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.drawerContent}>
          {/* Mostra i tab solo se sei nella vista lista */}

          {isChatModalOpen && renderDrawerContent()}
        </div>
      </div>
    </div>
  );
};

export default MainAppRouter;
