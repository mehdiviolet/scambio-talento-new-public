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
  Book,
  Mail,
  ExternalLink,
  Phone,
  CheckCircle,
  Instagram,
  Copy,
  Facebook,
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
  const [showReportConfirm, setShowReportConfirm] = useState(null); // 'spam', 'inappropriate', etc.
  const [showBlockConfirm, setShowBlockConfirm] = useState(null); // 'temp', 'permanent'

  // Estados para os modais
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCherryDrawerOpen, setIsCherryDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isShareSubmenuOpen, setIsShareSubmenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isReportSubmenuOpen, setIsReportSubmenuOpen] = useState(false);
  const [isBlockSubmenuOpen, setIsBlockSubmenuOpen] = useState(false);

  // Privacy settings states
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [activityVisible, setActivityVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(null); // 'reported', 'blocked'
  const [reportMessage, setReportMessage] = useState("");

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

  const profileUrl = `${window.location.origin}/profile/${user.username}`;

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

  const helpCategories = [
    {
      id: "account",
      title: "Account e Profilo",
      description: "Gestione account, password, impostazioni",
      icon: <Book size={16} />,
    },
    {
      id: "events",
      title: "Eventi e Partecipazione",
      description: "Come creare e partecipare agli eventi",
      icon: <MessageCircle size={16} />,
    },
    {
      id: "xp",
      title: "XP e Livelli",
      description: "Come guadagnare punti esperienza",
      icon: <HelpCircle size={16} />,
    },
  ];

  const contactOptions = [
    {
      label: "Email Support",
      description: "Rispondiamo entro 24 ore",
      icon: <Mail size={16} />,
      action: () => window.open("mailto:support@myapp.com"),
    },
    {
      label: "Chat dal vivo",
      description: "Disponibile 9:00-18:00",
      icon: <MessageCircle size={16} />,
      action: () => console.log("Opening chat..."),
    },
    {
      label: "FAQ Complete",
      description: "Tutte le domande frequenti",
      icon: <ExternalLink size={16} />,
      action: () => window.open("https://help.myapp.com"),
    },
  ];

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
    setIsShareSubmenuOpen(false); // Chiudi il submenu
    setIsViewerDrawerOpen(false);
  };

  const handleBlockUser = () => {
    console.log("Blocca utente");
    setIsShareSubmenuOpen(false); // Chiudi il submenu
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
  const handleHelpSettings = () => {
    setCurrentSubmenu("help");
    setIsInSubmenu(true);
  };

  const renderHelpSubmenu = () => (
    <div className={styles.submenuContent}>
      {/* Help Icon Section */}
      <div className={styles.submenuHeader}>
        <div className={styles.submenuIconContainer}>
          <HelpCircle size={32} className={styles.submenuIcon} />
        </div>
        <h4 className={styles.submenuTitle}>Come possiamo aiutarti?</h4>
      </div>

      {/* Help Categories Section */}
      <div className={styles.submenuSection}>
        <h3 className={styles.submenuSectionTitle}>Argomenti di aiuto</h3>
        <div className={styles.submenuOptions}>
          {helpCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`${styles.drawerMenuItem} ${
                selectedCategory === category.id ? styles.selected : ""
              }`}
            >
              <div className={styles.drawerMenuIcon}>{category.icon}</div>
              <div className={styles.drawerMenuText}>
                <div className={styles.drawerMenuLabel}>{category.title}</div>
                <div className={styles.drawerMenuDescription}>
                  {category.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className={styles.submenuSection}>
        <h3 className={styles.submenuSectionTitle}>Contatta il supporto</h3>
        <div className={styles.submenuOptions}>
          {contactOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className={styles.drawerMenuItem}
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

      {/* Info */}
      <div className={styles.submenuInfo}>
        <Phone size={20} className={styles.submenuInfoIcon} />
        <p className={styles.submenuInfoText}>
          Il nostro team di supporto è sempre pronto ad aiutarti. Scegli il
          metodo di contatto che preferisci.
        </p>
      </div>
    </div>
  );

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
      // action: handleHelp,
      action: handleHelpSettings, // che imposta il submenu
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
      // action: handleShareProfile,
      action: () => setIsShareSubmenuOpen(!isShareSubmenuOpen), // Toggle submenu
      hasSubmenu: true, // Per indicare che ha un submenu
    },
    {
      icon: <Flag size={16} />,
      label: "Segnala",
      description: "Segnala questo utente",
      action: () => setIsReportSubmenuOpen(!isReportSubmenuOpen),
      warning: true,
      hasSubmenu: true,
    },
    {
      icon: <Ban size={16} />,
      label: "Blocca",
      description: "Blocca questo utente",
      action: () => setIsBlockSubmenuOpen(!isBlockSubmenuOpen),
      danger: true,
      hasSubmenu: true,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleShareTo = (platform) => {
    const shareText = `Guarda il profilo di ${user?.firstName} ${user?.lastName}!`;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        profileUrl
      )}`,
      instagram: profileUrl,
    };

    if (platform === "instagram") {
      handleCopyLink();
      console.log("Link copiato per Instagram!");
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Profilo di ${user?.firstName} ${user?.lastName}`,
          text: `Guarda il profilo di ${user?.firstName} ${user?.lastName}!`,
          url: profileUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      handleCopyLink();
    }
  };

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
            {/* <span>{isInSubmenu ? "Privacy del profilo" : "Impostazioni"}</span> */}
            <span>
              {isInSubmenu
                ? currentSubmenu === "privacy"
                  ? "Privacy del profilo"
                  : "Aiuto e supporto"
                : "Impostazioni"}
            </span>
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
            (currentSubmenu === "privacy" && renderPrivacySubmenu()) ||
            (currentSubmenu === "help" && renderHelpSubmenu()) // <-- nuovo
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
          {/* <div className={styles.drawerMenuList}>
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
            </div> */}
          <div className={styles.drawerMenuList}>
            {viewerMenuItems.map((item, index) => (
              <div key={index}>
                <button
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
                  {item.hasSubmenu && (
                    <ChevronDown
                      size={16}
                      style={{
                        transform: isShareSubmenuOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  )}
                </button>

                {/* Submenu condizionale */}
                {item.label === "Condividi profilo" && isShareSubmenuOpen && (
                  <div className={styles.submenuDropdown}>
                    <button
                      className={styles.submenuItem}
                      onClick={handleShareNative}
                    >
                      <Share size={16} />
                      <span>Condividi</span>
                    </button>

                    <button
                      className={styles.submenuItem}
                      onClick={handleCopyLink}
                    >
                      {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      <span>{copied ? "Copiato!" : "Copia link"}</span>
                    </button>

                    <button
                      className={styles.submenuItem}
                      onClick={() => handleShareTo("facebook")}
                    >
                      <Facebook size={16} />
                      <span>Facebook</span>
                    </button>

                    <button
                      className={styles.submenuItem}
                      onClick={() => handleShareTo("instagram")}
                    >
                      <Instagram size={16} />
                      <span>Instagram</span>
                    </button>
                  </div>
                )}

                {/* Submenu Segnala */}
                {item.label === "Segnala" && isReportSubmenuOpen && (
                  <div className={styles.submenuDropdown}>
                    {showSuccessMessage === "reported" ? (
                      // Mostra messaggio di successo al posto delle opzioni
                      <div className={styles.successMessage}>
                        <Flag
                          size={16}
                          style={{ color: "var(--success-green)" }}
                        />
                        <span>Utente segnalato con successo</span>
                      </div>
                    ) : (
                      // Mostra le normali opzioni di segnalazione
                      <>
                        <button
                          className={styles.submenuItem}
                          onClick={() => setShowReportConfirm("spam")}
                        >
                          <Flag size={16} />
                          <span>Spam</span>
                        </button>
                        <button
                          className={styles.submenuItem}
                          onClick={() => setShowReportConfirm("inappropriate")}
                        >
                          <Flag size={16} />
                          <span>Contenuto inappropriato</span>
                        </button>
                        <button
                          className={styles.submenuItem}
                          onClick={() => setShowReportConfirm("fake")}
                        >
                          <Flag size={16} />
                          <span>Account falso</span>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Submenu Blocca */}
                {item.label === "Blocca" && isBlockSubmenuOpen && (
                  <div className={styles.submenuDropdown}>
                    {showSuccessMessage === "blocked" ? (
                      // Mostra messaggio di successo
                      <div className={styles.successMessage}>
                        <Ban
                          size={16}
                          style={{ color: "var(--success-green)" }}
                        />
                        <span>Utente bloccato con successo</span>
                      </div>
                    ) : (
                      // Mostra le normali opzioni di blocco
                      <>
                        <button
                          className={styles.submenuItem}
                          onClick={() => setShowBlockConfirm("temp")}
                        >
                          <Ban size={16} />
                          <span>Blocca temporaneamente</span>
                        </button>
                        <button
                          className={styles.submenuItem}
                          onClick={() => setShowBlockConfirm("permanent")}
                        >
                          <Ban size={16} />
                          <span>Blocca definitivamente</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
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

      {/* Mini-modal Conferma Segnalazione */}
      {/* Mini-modal Conferma Segnalazione */}
      {/* Mini-modal Conferma Segnalazione */}
      {showReportConfirm && (
        <div className={styles.miniModalOverlay}>
          <div className={styles.miniModal}>
            {showSuccessMessage === "reported" ? (
              // Stato di successo - sostituisce tutto il contenuto del modal
              <div className={styles.successContent}>
                <div className={styles.successIcon}>
                  <Flag size={32} style={{ color: "var(--success-green)" }} />
                </div>
                <h4 className={styles.successTitle}>Segnalazione inviata!</h4>
                <p className={styles.successText}>
                  Grazie per aver contribuito a mantenere la community sicura.
                </p>
              </div>
            ) : (
              // Contenuto normale del modal
              <>
                <div className={styles.miniModalHeader}>
                  <Flag size={20} style={{ color: "var(--text-secondary)" }} />
                  <h4>Segnala utente</h4>
                </div>
                <p className={styles.miniModalText}>
                  Motivo:{" "}
                  {showReportConfirm === "spam"
                    ? "Spam"
                    : showReportConfirm === "inappropriate"
                    ? "Contenuto inappropriato"
                    : "Account falso"}
                </p>

                <div className={styles.miniModalInputGroup}>
                  <label className={styles.miniModalLabel}>
                    Dettagli aggiuntivi (opzionale):
                  </label>
                  <textarea
                    value={reportMessage}
                    onChange={(e) => setReportMessage(e.target.value)}
                    placeholder="Descrivi brevemente il problema..."
                    className={styles.miniModalTextarea}
                    rows={3}
                  />
                </div>

                <div className={styles.miniModalButtons}>
                  <button
                    onClick={() => {
                      setShowReportConfirm(null);
                      setReportMessage("");
                    }}
                    className={styles.miniModalCancel}
                  >
                    Annulla
                  </button>
                  <button
                    onClick={() => {
                      console.log(
                        `Segnalato per: ${showReportConfirm}`,
                        reportMessage
                      );
                      setReportMessage("");
                      setShowSuccessMessage("reported");
                      // Dopo 3 secondi chiudi tutto
                      setTimeout(() => {
                        setShowSuccessMessage(null);
                        setShowReportConfirm(null);
                        setIsReportSubmenuOpen(false);
                      }, 3000);
                    }}
                    className={styles.miniModalConfirm}
                  >
                    Invia segnalazione
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Mini-modal Conferma Blocco */}
      {/* Mini-modal Conferma Blocco */}
      {showBlockConfirm && (
        <div className={styles.miniModalOverlay}>
          <div className={styles.miniModal}>
            {showSuccessMessage === "blocked" ? (
              // Stato di successo - sostituisce tutto il contenuto del modal
              <div className={styles.successContent}>
                <div className={styles.successIcon}>
                  <Ban size={32} style={{ color: "var(--success-green)" }} />
                </div>
                <h4 className={styles.successTitle}>Utente bloccato!</h4>
                <p className={styles.successText}>
                  {showBlockConfirm === "temp"
                    ? "L'utente è stato bloccato temporaneamente."
                    : "L'utente è stato bloccato definitivamente."}
                </p>
              </div>
            ) : (
              // Contenuto normale del modal
              <>
                <div className={styles.miniModalHeader}>
                  <Ban size={20} style={{ color: "var(--danger-red)" }} />
                  <h4>Conferma blocco</h4>
                </div>
                <p className={styles.miniModalText}>
                  {showBlockConfirm === "temp"
                    ? "Bloccare temporaneamente"
                    : "Bloccare definitivamente"}{" "}
                  questo utente?
                </p>
                <div className={styles.miniModalButtons}>
                  <button
                    onClick={() => setShowBlockConfirm(null)}
                    className={styles.miniModalCancel}
                  >
                    Annulla
                  </button>
                  <button
                    onClick={() => {
                      console.log(`Bloccato: ${showBlockConfirm}`);
                      setShowSuccessMessage("blocked");
                      // Dopo 3 secondi chiudi tutto
                      setTimeout(() => {
                        setShowSuccessMessage(null);
                        setShowBlockConfirm(null);
                        setIsBlockSubmenuOpen(false);
                      }, 3000);
                    }}
                    className={styles.miniModalConfirm}
                    style={{ background: "var(--danger-red)", color: "white" }}
                  >
                    Blocca
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Messaggio di successo */}
      {showSuccessMessage && (
        <div className={styles.successToast}>
          <div className={styles.successToastContent}>
            {showSuccessMessage === "reported" ? (
              <>
                <Flag size={16} />
                <span>Utente segnalato con successo</span>
              </>
            ) : (
              <>
                <Ban size={16} />
                <span>Utente bloccato con successo</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {/* <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        userProfile={user}
        onBack={() => {
          setIsShareModalOpen(false);
          setIsViewerDrawerOpen(true);
        }}
      /> */}
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
      {/* <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      /> */}
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
