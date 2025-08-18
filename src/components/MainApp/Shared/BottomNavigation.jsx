import React from "react";
import { Cherry, Search, Building, MessageCircle, User } from "lucide-react";
import styles from "./BottomNavigation.module.css";
import { useSelector } from "react-redux";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";

const BottomNavigation = ({ activeTab, onTabChange }) => {
  // const unreadCounts = useSelector((state) => state.chat.unreadCounts);

  // const totalUnread = Object.values(unreadCounts).reduce(
  //   (sum, count) => sum + count,
  //   0
  // );

  const chatNotifications = useUnreadMessages("viewer"); // Perché isOwner={true} nel tuo chat

  // console.log(chatNotifications.hasUnread);

  const tabs = [
    { id: "home", icon: Cherry, label: "Cherry" },
    { id: "search", icon: Search, label: "Cerca" },
    { id: "explore", icon: Building, label: "Esplora" },
    {
      id: "chat",
      icon: MessageCircle,
      label: "Chat",
      badge: chatNotifications,
    },
    { id: "profile", icon: User, label: "Profilo" },
    // { id: "test", icon: User, label: "test" },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
  };

  return (
    <div className={styles.bottomNav}>
      <div className={styles.bottomNavContainer}>
        <div className={styles.bottomNavTabs}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`${styles.bottomNavTab} ${
                  isActive
                    ? styles.bottomNavTabActive
                    : styles.bottomNavTabInactive
                }`}
              >
                <div className={styles.bottomNavIconWrapper}>
                  <IconComponent className={styles.bottomNavIcon} />
                  {chatNotifications.hasUnread && tab.badge && (
                    <span className={styles.bottomNavBadge}>
                      {tab.badge.total}
                    </span>
                  )}
                </div>
                <span className={styles.bottomNavLabel}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
