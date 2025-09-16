import React from "react";
import {
  Cherry,
  Search,
  Building,
  MessageCircle,
  User,
  CalendarCheck,
  UserRoundSearch,
  GraduationCap,
} from "lucide-react";
import styles from "./BottomNavigation.module.css";
// import { useSelector } from "react-redux";
import { useUnreadMessages } from "@/hooks/useUnreadMessages";

const BottomNavigationTest = ({ activeTab, onTabChange }) => {
  // const unreadCounts = useSelector((state) => state.chat.unreadCounts);

  // const totalUnread = Object.values(unreadCounts).reduce(
  //   (sum, count) => sum + count,
  //   0
  // );

  const chatNotifications = useUnreadMessages("owner"); // Perché isOwner={true} nel tuo chat

  // console.log(chatNotifications);

  const tabs = [
    { id: "Eventi", icon: CalendarCheck, label: "Eventi" },
    { id: "Esperienze", icon: GraduationCap, label: "Esperienze" },
    { id: "UserRoundSearch", icon: UserRoundSearch, label: "Persone" },

    { id: "profile", icon: User, label: "Profilo" },
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

export default BottomNavigationTest;
