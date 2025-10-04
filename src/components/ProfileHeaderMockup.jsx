import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Settings,
  MessageCircle,
  Cherry,
  ChevronLeft,
  UserPlus,
  UserCheck,
  Camera,
} from "lucide-react";
import styles from "../components/MainApp/Profile/ProfileHeader.module.css";
import { useSelector, useDispatch } from "react-redux";
import { followUser } from "@/store/slices/experienceSliceTest";
import MessageModal from "./MainApp/Shared/Modals/MessageModal";

const ProfileHeaderMockup = ({ selectedPerson, isInstructorPanel = false }) => {
  const dispatch = useDispatch();
  const isOwnProfile = isInstructorPanel;

  // Redux selectors (MANTENUTI COME ERANO)
  const { followers, following } = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData.social
  );

  const currentUserProfile = useSelector(
    (state) => state.quickSetup.profileData
  );

  const selectedPersonData = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData
  );

  const isFollowingIstruttore = useSelector((state) => {
    const currentUserConnections =
      state.experienceSliceTest.socialConnections["currentUser"];
    if (!currentUserConnections || !currentUserConnections.following)
      return false;

    const personId = selectedPerson.firstName + selectedPerson.lastName;
    return currentUserConnections.following.some(
      (person) => person.id === personId
    );
  });

  // Stati locali (SOLO quelli necessari)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFollowersDrawerOpen, setIsFollowersDrawerOpen] = useState(false);
  const [isFollowingDrawerOpen, setIsFollowingDrawerOpen] = useState(false);

  // User data
  const user = {
    firstName: selectedPerson.firstName,
    lastName: selectedPerson.lastName,
    username:
      selectedPerson.firstName.toLowerCase() +
      selectedPerson.lastName.toLowerCase().slice(0, 3),
    location: `${selectedPerson.location}, ${selectedPerson.zone}`,
    profilePhoto: selectedPerson.profilePhoto,
    joinedDate: selectedPerson.joinedDate,
    following: following.length,
    followers: followers.length,
  };

  // Handlers (MANTENUTI SEMPLICI)
  const handleFollow = () => {
    const personId = selectedPerson.firstName + selectedPerson.lastName;
    dispatch(
      followUser({
        followerId: "currentUser",
        followedId: personId,
        followerData: {
          firstName: currentUserProfile.firstName,
          lastName: currentUserProfile.lastName,
          username: "currentuser",
          profilePhoto: currentUserProfile.profilePhoto,
        },
        followedData: selectedPersonData.profile,
      })
    );
  };

  const handleMessage = () => setIsMessageModalOpen(true);
  const handleFollowersClick = () => setIsFollowersDrawerOpen(true);
  const handleFollowingClick = () => setIsFollowingDrawerOpen(true);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileGrid}>
          {/* Avatar */}
          <div className={styles.gridAvatar}>
            <div className={styles.avatarContainer}>
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={`${user.firstName} ${user.lastName}`}
                  className={styles.avatarImage}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className={styles.gridName}>
            <h1 className={styles.displayName}>
              {user.firstName} {user.lastName}
            </h1>
          </div>

          {/* Actions */}
          <div className={styles.gridActions}>
            {isOwnProfile ? (
              <>
                <button className={styles.actionBtn}>
                  <Settings size={16} />
                </button>
                <button className={styles.actionBtn}>
                  <Camera size={16} />
                </button>
                <motion.button
                  className={styles.actionBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Cherry size={16} />
                </motion.button>
              </>
            ) : (
              <>
                <button
                  className={styles.actionBtn}
                  onClick={handleMessage}
                  title="Send message"
                >
                  <MessageCircle size={16} />
                </button>
                <button className={styles.followBtn} onClick={handleFollow}>
                  {isFollowingIstruttore ? (
                    <UserCheck size={17} />
                  ) : (
                    <UserPlus size={17} />
                  )}
                </button>
              </>
            )}
          </div>

          {/* Username */}
          <div className={styles.gridUsername}>
            <p className={styles.username}>@{user.username}</p>
          </div>

          {/* Meta */}
          <div className={styles.gridMeta}>
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.gridStats}>
            <button
              className={styles.followStat}
              onClick={handleFollowingClick}
            >
              <strong>{user.following || 0}</strong> following
            </button>
            <button
              className={styles.followStat}
              onClick={handleFollowersClick}
            >
              <strong>{user.followers || 0}</strong> followers
            </button>
          </div>
        </div>
      </div>

      {/* Followers Drawer */}
      <div
        className={`${styles.slideDrawer} ${
          isFollowersDrawerOpen ? styles.open : ""
        }`}
      >
        <div className={styles.drawerHeader}>
          <button
            className={styles.backButton}
            onClick={() => setIsFollowersDrawerOpen(false)}
          >
            <ChevronLeft size={20} />
            <span>Followers ({user.followers})</span>
          </button>
        </div>
        <div className={styles.drawerContent}>
          <div style={{ padding: "0 1rem" }}>
            {followers.map((follower) => (
              <div
                key={follower.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 0",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--on-surface)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}
                >
                  {follower.firstName?.[0]}
                  {follower.lastName?.[0]}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      color: "var(--on-surface)",
                      marginBottom: "2px",
                    }}
                  >
                    {follower.firstName} {follower.lastName}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--primary-light)",
                    }}
                  >
                    @{follower.username}
                  </div>
                </div>

                <button
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "var(--on-surface)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  Follow Back
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Following Drawer */}
      <div
        className={`${styles.slideDrawer} ${
          isFollowingDrawerOpen ? styles.open : ""
        }`}
      >
        <div className={styles.drawerHeader}>
          <button
            className={styles.backButton}
            onClick={() => setIsFollowingDrawerOpen(false)}
          >
            <ChevronLeft size={20} />
            <span>Following ({user.following})</span>
          </button>
        </div>
        <div className={styles.drawerContent}>
          <div style={{ padding: "0 1rem" }}>
            {following.map((person) => (
              <div
                key={person.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 0",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--on-surface)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}
                >
                  {person.firstName?.[0]}
                  {person.lastName?.[0]}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      color: "var(--on-surface)",
                      marginBottom: "2px",
                    }}
                  >
                    {person.firstName} {person.lastName}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--primary-light)",
                    }}
                  >
                    @{person.username}
                  </div>
                </div>

                <button
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "var(--on-surface)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  Following
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        userProfile={user}
      />
    </>
  );
};

export default ProfileHeaderMockup;
