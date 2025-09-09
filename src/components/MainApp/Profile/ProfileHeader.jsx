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
  UserPlus2Icon,
  Shield,
  HelpCircle,
  LogOut,
  Flag,
  Ban,
  Globe,
  Users,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import styles from "./ProfileHeader.module.css";
import { useQuickSetup } from "../../../hooks/useQuickSetup";
import { useOnboarding } from "../../../hooks/useOnboardingRedux";
import { useAppSelector } from "../../../hooks/redux";

import ShareModal from "./ShareModal";
import MessageModal from "../Shared/Modals/MessageModal";
import PhotoUploadModal from "./PhotoUploadModal";
import { useSelector } from "react-redux";
import HelpModal from "./HelpModal";
import LogoutModal from "./LogoutModal";
import InviteFriendModal from "./InviteFriendModal";
import { selectFeedbacks } from "@/store/slices/sharedEventSlice";
import CherryComp from "@/components/CherryComp";

const ProfileHeader = ({ isOwnProfile = true, userData = null, role }) => {
  const { profileData, level, achievements, updateProfileData } =
    useQuickSetup();
  const { setShowQuickSetup, setShowDashboard } = useOnboarding();
  const { setCurrentStep, currentStep, resetForEdit } = useQuickSetup();

  const { isOwner } = useAppSelector((state) => state.onboarding);

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Estados para os drawers
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const [isViewerDrawerOpen, setIsViewerDrawerOpen] = useState(false);
  const [currentSubmenu, setCurrentSubmenu] = useState(null);
  const [isInSubmenu, setIsInSubmenu] = useState(false);

  // Estados para os modais
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCherryDrawerOpen, setIsCherryDrawerOpen] = useState(false);

  // Privacy settings states
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [activityVisible, setActivityVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);

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

  const MAX_DESCRIPTION_CHARS = 150;
  const descriptionText = user?.aboutMe || "Nessuna descrizione disponibile";
  const needsTruncation = descriptionText.length > MAX_DESCRIPTION_CHARS;
  const visibleText =
    showFullDescription || !needsTruncation
      ? descriptionText
      : descriptionText.substring(0, MAX_DESCRIPTION_CHARS) + "...";

  const feedbacks = useSelector(selectFeedbacks);
  const currentUser = useSelector((state) => state.sharedEvent.currentUser);
  const myFeedback = feedbacks.find(
    (feedback) => feedback.fromUserId === currentUser.id
  );

  // Privacy options
  const visibilityOptions = [
    {
      id: "public",
      label: "Pubblico",
      description: "Tutti possono vedere il tuo profilo",
      icon: <Globe size={16} />,
    },
    {
      id: "friends",
      label: "Solo amici",
      description: "Solo i tuoi amici possono vedere il profilo",
      icon: <Users size={16} />,
    },
    {
      id: "private",
      label: "Privato",
      description: "Solo tu puoi vedere il tuo profilo",
      icon: <Lock size={16} />,
    },
  ];

  // Funções dos drawers
  const handleInviteFriend = () => {
    setIsInviteModalOpen(true);
    setIsSettingsDrawerOpen(false);
  };

  const handlePrivacySettings = () => {
    setCurrentSubmenu("privacy");
    setIsInSubmenu(true);
  };

  const handleHelp = () => {
    setIsHelpModalOpen(true);
    setIsSettingsDrawerOpen(false);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
    setIsSettingsDrawerOpen(false);
  };

  const handleBackToMainMenu = () => {
    setIsInSubmenu(false);
    setCurrentSubmenu(null);
  };

  const handleCloseSettingsDrawer = () => {
    setIsSettingsDrawerOpen(false);
    setIsInSubmenu(false);
    setCurrentSubmenu(null);
  };

  const handleShareProfile = () => {
    setIsShareModalOpen(true);
    setIsViewerDrawerOpen(false);
  };

  const handleReportUser = () => {
    console.log("Segnala utente");
    setIsViewerDrawerOpen(false);
  };

  const handleBlockUser = () => {
    console.log("Blocca utente");
    setIsViewerDrawerOpen(false);
  };

  // Privacy handlers
  const handleVisibilityChange = (value) => {
    setProfileVisibility(value);
  };

  // Outras funções existentes
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

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    console.log(isFollowing ? "Unfollowed" : "Followed");
  };

  const handleMessage = () => {
    setIsMessageModalOpen(true);
  };

  const handlePhotoUpdate = (newPhotoUrl) => {
    updateProfileData({ profilePhoto: newPhotoUrl });
    console.log("Photo updated successfully:", newPhotoUrl);
  };

  const handleFollowingClick = () => console.log("Following list clicked");
  const handleFollowersClick = () => console.log("Followers list clicked");

  // Itens do menu settings
  const settingsMenuItems = [
    {
      icon: <UserPlus2Icon size={16} />,
      label: "Invita un amico",
      description: "Invita qualcuno e ottiene 10XP!",
      action: handleInviteFriend,
      positive: true,
    },
    {
      icon: <Shield size={16} />,
      label: "Privacy del profilo",
      description: "Controlla chi può vedere il tuo profilo",
      action: handlePrivacySettings,
      hasSubmenu: true,
    },
    {
      icon: <HelpCircle size={16} />,
      label: "Aiuto e supporto",
      description: "Ottieni aiuto o contatta il supporto",
      action: handleHelp,
    },
    {
      icon: <LogOut size={16} />,
      label: "Esci",
      description: "Disconnettiti dal tuo account",
      action: handleLogout,
      danger: true,
    },
  ];

  // Itens do menu viewer
  const viewerMenuItems = [
    {
      icon: <Share size={16} />,
      label: "Condividi profilo",
      description: "Condividi questo profilo",
      action: handleShareProfile,
    },
    {
      icon: <Flag size={16} />,
      label: "Segnala",
      description: "Segnala questo utente",
      action: handleReportUser,
      warning: true,
    },
    {
      icon: <Ban size={16} />,
      label: "Blocca",
      description: "Blocca questo utente",
      action: handleBlockUser,
      danger: true,
    },
  ];

  const renderPrivacySubmenu = () => (
    <div className={styles.submenuContent}>
      {/* Privacy Icon Section */}
      <div className={styles.submenuHeader}>
        <div className={styles.submenuIconContainer}>
          <Shield size={32} className={styles.submenuIcon} />
        </div>
        <h4 className={styles.submenuTitle}>Controlla la tua privacy</h4>
      </div>

      {/* Profile Visibility Section */}
      <div className={styles.submenuSection}>
        <h3 className={styles.submenuSectionTitle}>Visibilità profilo</h3>
        <div className={styles.submenuOptions}>
          {visibilityOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleVisibilityChange(option.id)}
              className={`${styles.drawerMenuItem} ${
                profileVisibility === option.id ? styles.selected : ""
              }`}
            >
              <div className={styles.drawerMenuIcon}>{option.icon}</div>
              <div className={styles.drawerMenuText}>
                <div className={styles.drawerMenuLabel}>{option.label}</div>
                <div className={styles.drawerMenuDescription}>
                  {option.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Activity Settings */}
      <div className={styles.submenuSection}>
        <h3 className={styles.submenuSectionTitle}>Impostazioni attività</h3>
        <div className={styles.submenuOptions}>
          <button
            onClick={() => setActivityVisible(!activityVisible)}
            className={`${styles.drawerMenuItem} ${
              activityVisible ? styles.selected : ""
            }`}
          >
            <div className={styles.drawerMenuIcon}>
              {activityVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            </div>
            <div className={styles.drawerMenuText}>
              <div className={styles.drawerMenuLabel}>
                Mostra attività recente
              </div>
              <div className={styles.drawerMenuDescription}>
                {activityVisible ? "Visibile" : "Nascosta"}
              </div>
            </div>
          </button>

          <button
            onClick={() => setContactVisible(!contactVisible)}
            className={`${styles.drawerMenuItem} ${
              contactVisible ? styles.selected : ""
            }`}
          >
            <div className={styles.drawerMenuIcon}>
              <Users size={16} />
            </div>
            <div className={styles.drawerMenuText}>
              <div className={styles.drawerMenuLabel}>Mostra info contatto</div>
              <div className={styles.drawerMenuDescription}>
                {contactVisible ? "Visibile" : "Nascosta"}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className={styles.submenuInfo}>
        <Shield size={20} className={styles.submenuInfoIcon} />
        <p className={styles.submenuInfoText}>
          Le tue impostazioni privacy vengono applicate immediatamente e
          controllano chi può vedere il tuo profilo e le tue attività.
        </p>
      </div>
    </div>
  );

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

                  <motion.button
                    className={`${styles.editProfileBtn} ${styles.liquidButton}`}
                    onClick={() => setIsCherryDrawerOpen(true)}
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
                <div></div>
                {!isOwner && (
                  <button
                    className={styles.moreOptionsBtn}
                    onClick={() => setIsViewerDrawerOpen(true)}
                    title="More options"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                )}
                {isOwner && (
                  <Settings
                    className={styles.settingsIcon}
                    size={20}
                    onClick={() => setIsSettingsDrawerOpen(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </h1>

              <div className={styles.hudLevel}>
                <p className={styles.username}>@{user.username}</p>
              </div>
            </div>

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
                <div className={styles.descriptionContainer}>
                  <p className={styles.aboutText}>{visibleText}</p>
                  {needsTruncation && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className={styles.expandTextButton}
                    >
                      {showFullDescription ? "Riduci" : "Leggi tutto"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Slide Drawer */}
      <div
        className={`${styles.slideDrawer} ${
          isSettingsDrawerOpen ? styles.open : ""
        }`}
      >
        <div className={styles.drawerHeader}>
          <button
            className={styles.backButton}
            onClick={
              isInSubmenu ? handleBackToMainMenu : handleCloseSettingsDrawer
            }
          >
            <ChevronLeft size={20} />
            <span>{isInSubmenu ? "Privacy del profilo" : "Impostazioni"}</span>
          </button>
        </div>
        <div className={styles.drawerContent}>
          {!isInSubmenu ? (
            <div className={styles.drawerMenuList}>
              {settingsMenuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className={`${styles.drawerMenuItem} ${
                    item.danger ? styles.danger : ""
                  } ${item.positive ? styles.positive : ""}`}
                >
                  <div className={styles.drawerMenuIcon}>{item.icon}</div>
                  <div className={styles.drawerMenuText}>
                    <div className={styles.drawerMenuLabel}>{item.label}</div>
                    <div className={styles.drawerMenuDescription}>
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            currentSubmenu === "privacy" && renderPrivacySubmenu()
          )}
        </div>
      </div>

      {/* Viewer Menu Slide Drawer */}
      <div
        className={`${styles.slideDrawer} ${
          isViewerDrawerOpen ? styles.open : ""
        }`}
      >
        <div className={styles.drawerHeader}>
          <button
            className={styles.backButton}
            onClick={() => setIsViewerDrawerOpen(false)}
          >
            <ChevronLeft size={20} />
            <span>Opzioni utente</span>
          </button>
        </div>
        <div className={styles.drawerContent}>
          <div className={styles.drawerMenuList}>
            {viewerMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`${styles.drawerMenuItem} ${
                  item.danger ? styles.danger : ""
                } ${item.warning ? styles.warning : ""}`}
              >
                <div className={styles.drawerMenuIcon}>{item.icon}</div>
                <div className={styles.drawerMenuText}>
                  <div className={styles.drawerMenuLabel}>{item.label}</div>
                  <div className={styles.drawerMenuDescription}>
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

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

      {/* Modals */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userProfile={user}
        onBack={() => {
          setIsShareModalOpen(false);
          setIsViewerDrawerOpen(true);
        }}
      />
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        userProfile={user}
      />
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhoto={user.profilePhoto}
        onPhotoUpdate={handlePhotoUpdate}
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
          window.location.reload();
        }}
      />
      <InviteFriendModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </>
  );
};

export default ProfileHeader;
