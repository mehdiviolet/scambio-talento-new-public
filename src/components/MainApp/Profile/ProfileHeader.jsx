import React, { useState } from "react";
import { motion } from "motion/react";

import {
  Calendar,
  MapPin,
  Settings,
  Share,
  MessageCircle,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Camera,
  Star,
  Cherry,
  Heart,
  ShieldCheckIcon,
  X,
  ChevronLeft,
} from "lucide-react";
import styles from "./ProfileHeader.module.css";
import { useQuickSetup } from "../../../hooks/useQuickSetup";
import { useOnboarding } from "../../../hooks/useOnboardingRedux";
import { useAppSelector } from "../../../hooks/redux";

import ShareModal from "../Shared/Modals/ShareModal";
import MessageModal from "../Shared/Modals/MessageModal";
import PhotoUploadModal from "./PhotoUploadModal"; // ✅ NUOVO IMPORT
import { useSelector } from "react-redux";
import SettingsDropdown from "./SettingsDropdown";
import ViewerMenuDropdown from "./ViewerMenuDropdown";
import ShareProfileModal from "./ShareProfileModal";
import ConfirmBlockModal from "./ConfirmBlockModal";
import PrivacyModal from "./PrivacyModal";
import HelpModal from "./HelpModal";
import LogoutModal from "./LogoutModal";
import RoleSpecificNotificationDropdown from "@/components/notifications/RoleSpecificNotificationDropdown";
import ToastContainer from "@/components/notifications/ToastContainer";
import InviteFriendModal from "./InviteFriendModal";
import { selectFeedbacks } from "@/store/slices/sharedEventSlice";
import CherryModal from "./CherryModal";
import CherryComp from "@/components/CherryComp";

const ProfileHeader = ({ isOwnProfile = true, userData = null, role }) => {
  const { profileData, level, achievements, updateProfileData } =
    useQuickSetup(); // ✅ Aggiungi updateProfileData
  const { setShowQuickSetup, setShowDashboard } = useOnboarding();
  const { setCurrentStep, currentStep, resetForEdit } = useQuickSetup();

  const { isOwner } = useAppSelector((state) => state.onboarding);

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isViewerMenuOpen, setIsViewerMenuOpen] = useState(false);

  // Stati per i modali
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // ✅ NUOVO STATO // ✅ NUOVO STATO
  const [isCherryModalOpen, setIsCherryModalOpen] = useState(false); // ✅ NUOVO STATO // ✅ NUOVO STATO

  // Aggiungi questi stati nel ProfileHeader
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

  // Aggiungi questi stati (accanto agli altri)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCherryDrawerOpen, setIsCherryDrawerOpen] = useState(false);
  const myFollowing = useSelector(
    (state) =>
      state.experienceSliceTest.socialConnections.currentUser?.following
        .length || 0
  );

  const user = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    username:
      profileData.firstName?.toLowerCase() +
      profileData.lastName?.toLowerCase().slice(0, 3),
    bio: profileData.skills?.map((s) => s.name).join(" | ") || "",
    aboutMe: profileData.aboutMe,
    location: profileData.location,
    profilePhoto: profileData.profilePhoto,
    joinedDate: "oggi",
    verified: achievements.length >= 3,
    followers: profileData.social.followers.length,
    following: myFollowing,
  };

  const feedbacks = useSelector(selectFeedbacks);
  const currentUser = useSelector((state) => state.sharedEvent.currentUser);
  const myFeedback = feedbacks.find(
    (feedback) => feedback.fromUserId === currentUser.id
  );
  // console.log(myFeedback);

  const handleInviteFriend = () => {
    setIsInviteModalOpen(true);
    setIsSettingsOpen(false);
  };
  // ✅ FUNZIONE MODIFICATA
  const handleAvatarClick = () => {
    if (isOwner) {
      setIsPhotoModalOpen(true);
    }
  };

  const handleEditProfile = () => {
    resetForEdit();
    setShowDashboard(false);
    setTimeout(() => {
      setShowQuickSetup(true);
    }, 50);
  };

  const handleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Sostituisci le funzioni esistenti con queste:
  const handlePrivacySettings = () => {
    setIsPrivacyModalOpen(true);
    setIsSettingsOpen(false);
  };

  const handleHelp = () => {
    setIsHelpModalOpen(true);
    setIsSettingsOpen(false);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
    setIsSettingsOpen(false);
  };

  const handleSpecialAction = () => console.log("Special action clicked");

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    console.log(isFollowing ? "Unfollowed" : "Followed");
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleMessage = () => {
    setIsMessageModalOpen(true);
  };

  // ✅ NUOVA FUNZIONE
  const handlePhotoUpdate = (newPhotoUrl) => {
    // Usa updateProfileData dal hook Redux
    updateProfileData({ profilePhoto: newPhotoUrl });
    console.log("Photo updated successfully:", newPhotoUrl);
  };

  const handleMoreOptions = () => console.log("More options clicked");
  const handleFollowingClick = () => console.log("Following list clicked");
  const handleFollowersClick = () => console.log("Followers list clicked");
  const handleCherry = () => {
    setIsCherryModalOpen(true);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          {/* Cover Photo */}
          <div className={`${styles.coverPhoto}`}>
            {/* Avatar */}
            <div
              className={`${styles.avatarContainer} ${
                isOwner ? styles.clickable : ""
              }`}
              onClick={handleAvatarClick}
              title={isOwner ? "Click to replace profile photo" : ""}
            >
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

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              {isOwner ? (
                <>
                  <button
                    className={styles.editProfileBtn}
                    onClick={handleEditProfile}
                  >
                    Edit profile
                  </button>
                  {/* <motion.button
                    className={`${styles.editProfileBtn} ${styles.liquidButton}`}
                    onClick={handleCherry}
                    title="Ruota della fortuna! (da definire)"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Cherry size={16} />
                  </motion.button> */}
                  <motion.button
                    className={`${styles.editProfileBtn} ${styles.liquidButton}`}
                    onClick={() => setIsCherryDrawerOpen(true)} // Cambia questa riga
                    title="Ruota della fortuna! (da definire)"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Cherry size={16} />
                  </motion.button>
                </>
              ) : (
                <>
                  <button
                    className={styles.editProfileBtn}
                    onClick={handleFollow}
                  >
                    {isFollowing ? "FOLLOWING" : "FOLLOW"}
                  </button>

                  <button
                    // className={styles.messageBtn}
                    className={`${styles.editProfileBtn} ${styles.msgButton}`}
                    onClick={handleMessage}
                    title="Send message"
                  >
                    <MessageCircle size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.profileInfo}>
            {/* Name and More Options */}
            <div className={styles.nameSection}>
              <h1 className={styles.displayName}>
                {user.firstName} {user.lastName}
                {!isOwner && (
                  <div style={{ position: "relative" }}>
                    <button
                      className={styles.moreOptionsBtn}
                      onClick={() => setIsViewerMenuOpen(!isViewerMenuOpen)}
                      title="More options"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    <ViewerMenuDropdown
                      isOpen={isViewerMenuOpen}
                      onClose={() => setIsViewerMenuOpen(false)}
                      userProfile={user}
                      onOpenShare={() => setIsShareModalOpen(true)} // ✅ AGGIUNGI
                      onOpenBlock={() => setIsBlockModalOpen(true)} // ✅ AGGIUNGI
                    />
                  </div>
                )}
                {isOwner && (
                  <div style={{ position: "relative" }}>
                    <Settings
                      className={styles.settingsIcon}
                      size={20}
                      onClick={handleSettings}
                      style={{ cursor: "pointer" }}
                    />
                    {/* <div className="panel-header">
                      <RoleSpecificNotificationDropdown
                        role="student"
                        title={
                          role === "owner"
                            ? "Notifiche Istruttore"
                            : "Notifiche Studente"
                        }
                      />
                      <ToastContainer role={role} />
                    </div> */}
                    <SettingsDropdown
                      isOpen={isSettingsOpen}
                      onClose={() => setIsSettingsOpen(false)}
                      onOpenPrivacy={handlePrivacySettings}
                      onOpenHelp={handleHelp}
                      onLogout={handleLogout}
                      onInviteFriend={handleInviteFriend} // ✅ AGGIUNGI QUESTA RIGA
                    />
                  </div>
                )}
              </h1>

              <div className={styles.hudLevel}>
                <p className={styles.username}>@{user.username}</p>
                <Star
                  // className="icon-md text-orange-500"
                  style={{ color: "var(--text-terzo)" }}
                />
                {/* <span>{myFeedback?.stars || 0} </span> */}
                <span style={{ color: "var(--text-primary)" }}>
                  {currentUser.participationScore || 0}{" "}
                </span>

                <ShieldCheckIcon
                  // className="icon-md text-orange-300"
                  // style={{ color: "var(--text-secondary)" }}
                  style={{ color: "var(--text-terzo)" }}
                />
                {/* ✅ NUOVO: Usa totalDisplayXP (include demo bonus) */}
                <span style={{ color: "var(--text-primary)" }}>0 </span>
              </div>
            </div>

            {/* Bio */}
            <p className={styles.bio}>{user.bio}</p>

            {/* Meta Info */}
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>Joined {user.joinedDate}</span>
              </div>
              <div className={styles.metaItem}>
                <MapPin size={16} />
                <span>{user.location ? user.location : "nowhere"}</span>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className={styles.followStats}>
              <button
                className={styles.followStat}
                onClick={handleFollowingClick}
              >
                <strong>{user.following ? user.following : 0}</strong> following
              </button>
              <button
                className={styles.followStat}
                onClick={handleFollowersClick}
              >
                <strong>{user.followers ? user.followers : 0}</strong> followers
              </button>
              <button
                className={styles.aboutToggle}
                onClick={() => setIsAboutExpanded(!isAboutExpanded)}
              >
                <span>About me</span>
                {isAboutExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
          </div>

          {/* About Me Section */}
          <div className={styles.aboutSection}>
            {isAboutExpanded && (
              <div className={styles.aboutContent}>
                <p>{user.aboutMe}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modali */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userProfile={user}
      />
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        userProfile={user}
      />
      {/* ✅ NUOVO MODAL */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhoto={user.profilePhoto}
        onPhotoUpdate={handlePhotoUpdate}
      />
      {/* Nel ProfileHeader, dopo PhotoUploadModal */}
      <ShareProfileModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userProfile={user}
      />
      <ConfirmBlockModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        userProfile={user}
        onConfirm={() => {
          console.log("Utente bloccato!");
          setIsBlockModalOpen(false);
        }}
      />
      {/* Dopo gli altri modal */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          console.log("Logout confermato!");
          setIsLogoutModalOpen(false);
          window.location.reload(); // Simula restart app
        }}
      />
      <InviteFriendModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
      {/* <CherryModal
        isOpen={isCherryModalOpen}
        onClose={() => setIsCherryModalOpen(false)}
        currentUser={currentUser}
      /> */}

      {/* Sostituisci il CherryModal esistente con questo */}
      {/* Cherry Slide Drawer */}
      <div
        className={`${styles.slideDrawer} ${
          isCherryDrawerOpen ? styles.open : ""
        }`}
      >
        <div className={styles.drawerHeader}>
          <button
            className={styles.backButton}
            onClick={() => setIsCherryDrawerOpen(false)}
          >
            <ChevronLeft size={20} />
            <span>Cherry Slot</span>
          </button>
        </div>
        <div className={styles.drawerContent}>
          {isCherryDrawerOpen && (
            <CherryComp
              currentUser={currentUser}
              onClose={() => setIsCherryDrawerOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
