import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Share,
  MessageCircle,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Heart,
  X,
  Send,
  Copy,
  Facebook,
  Instagram,
  Settings,
  Cherry,
  ChevronLeft,
} from "lucide-react";
// import styles from "@/components/MainApp/Profile/ProfileHeader.module.css";
import styles from "../components/MainApp/Profile/ProfileHeader.module.css";
import shareStyles from "@/components/MainApp/Shared/Modals/ShareModal.module.css";
import messageStyles from "@/components/MainApp/Shared/Modals/ViewSkillModal.module.css";
import { useSelector, useDispatch } from "react-redux";
// ✅ CORRETTO: importa solo followUser
import { followUser } from "@/store/slices/experienceSliceTest";
import MessageModal from "./MainApp/Shared/Modals/MessageModal";

const ShareModal = ({ isOpen, onClose, userProfile }) => {
  if (!isOpen) return null;

  return (
    <div className={shareStyles.overlay}>
      <div className={shareStyles.container}>
        <div className={shareStyles.header}>
          <h3 className={shareStyles.title}>
            Share {userProfile.firstName}'s Profile
          </h3>
          <button className={shareStyles.closeButton} onClick={onClose}>
            <X />
          </button>
        </div>

        <div className={shareStyles.content}>
          <div className={shareStyles.descriptionBox}>
            <p className={shareStyles.descriptionText}>
              Share this profile with your network
            </p>
          </div>

          <div className={shareStyles.divider}></div>

          <div className={shareStyles.shareOptions}>
            <button className={shareStyles.copyLinkButton}>
              <Copy size={20} />
              Copy Link
            </button>

            <div className={shareStyles.socialButtons}>
              <button className={shareStyles.facebookButton}>
                <Facebook size={16} />
                Facebook
              </button>
              <button className={shareStyles.xButton}>
                <span>𝕏</span>
                Twitter
              </button>
              <button className={shareStyles.instagramButton}>
                <Instagram size={16} />
                Instagram
              </button>
            </div>
          </div>
        </div>

        <div className={shareStyles.footer}>
          <div className={shareStyles.userInfo}>
            <div className={shareStyles.avatar}>
              <div className={shareStyles.avatarEmoji}>👩‍🎨</div>
            </div>
            <span className={shareStyles.userName}>
              {userProfile.firstName} {userProfile.lastName}
            </span>
          </div>
        </div>

        <div className={shareStyles.actions}>
          <div className={shareStyles.viewActions}>
            <button className={shareStyles.cancelButton} onClick={onClose}>
              <X />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileHeaderMockup = ({ selectedPerson, isInstructorPanel = false }) => {
  const dispatch = useDispatch();
  const isOwnProfile = isInstructorPanel; // Nel pannello instructor, Sara vede il suo profilo

  console.log(selectedPerson);
  const [isViewerDrawerOpen, setIsViewerDrawerOpen] = useState(false);

  const socialFollowers = useSelector(
    (state) =>
      state.experienceSliceTest.selectedPersonData.social.followers || []
  );

  // ******************
  const { followers, following } = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData.social
  );

  const currentUserProfile = useSelector(
    (state) => state.quickSetup.profileData
  );

  // Mappa i followers con i dati completi
  const followersWithData = followers.map((follower) => {
    if (follower.id === "currentUser") {
      return {
        id: "currentUser",
        firstName: currentUserProfile.firstName,
        lastName: currentUserProfile.lastName,
        profilePhoto: currentUserProfile.profilePhoto,
      };
    }
    return follower;
  });

  // const followersWithDataa = followers.map((follower) => {
  //   if (follower.id === "currentUser") {
  //     return {
  //       id: "currentUser",
  //       name: `${currentUserProfile.firstName} ${currentUserProfile.lastName}`,
  //       username: "currentuser", // o quello che vuoi
  //       avatar: currentUserProfile.profilePhoto,
  //     };
  //   }
  //   return follower; // Mantieni gli altri followers così come sono
  // });

  console.log("FOLLL", followersWithData);
  console.log("FOLLLwing", following);

  // ******************

  const socialFollowing = useSelector(
    (state) =>
      state.experienceSliceTest.selectedPersonData.social.following || []
  );
  // ✅ CORRETTO: controlla se currentUser sta seguendo sara
  // const isFollowingIstruttore = useSelector((state) => {
  //   const currentUserConnections =
  //     state.experienceSliceTest.socialConnections["currentUser"];
  //   if (!currentUserConnections || !currentUserConnections.following)
  //     return false;

  //   const personId = selectedPerson.firstName + selectedPerson.lastName;
  //   return currentUserConnections.following.includes(personId);
  // });
  // ✅ CORRETTO:
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
  console.log(isFollowingIstruttore);

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isFollowersDrawerOpen, setIsFollowersDrawerOpen] = useState(false);
  const [isFollowingDrawerOpen, setIsFollowingDrawerOpen] = useState(false);

  const user = {
    firstName: selectedPerson.firstName,
    lastName: selectedPerson.lastName,
    username:
      selectedPerson.firstName.toLowerCase() +
      selectedPerson.lastName.toLowerCase().slice(0, 3),
    bio: "Digital Artist | UI/UX Designer | Creative Director",
    aboutMe:
      "..Passionate about creating beautiful digital experiences. I love exploring new design trends and bringing creative visions to life. When I'm not designing, you can find me painting or exploring the beautiful streets of Torino.",
    location: `${selectedPerson.location}, ${selectedPerson.zone}`,
    profilePhoto: selectedPerson.profilePhoto,
    joinedDate: selectedPerson.joinedDate,
    following: socialFollowing.length,
    followers: socialFollowers.length,
    verified: true,
  };

  // Dati della persona che stai visualizzando
  const selectedPersonData = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData
  );
  // Handlers
  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  // ✅ CORRETTO: usa solo followUser con logica toggle
  const handleFollow = () => {
    const personId = selectedPerson.firstName + selectedPerson.lastName;
    console.log("personId", personId);

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

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleMessage = () => {
    setIsMessageModalOpen(true);
  };

  const handleMoreOptions = () => console.log("More options clicked");
  // const handleFollowing = () => {
  //   dispatch(
  //     followUser({
  //       followerId: "currentUser",
  //       followedId: `${selectedPersonData.profile.firstName} ${selectedPersonData.profile.lastName}`,
  //       followerData: {
  //         firstName: currentUserProfile.firstName,
  //         lastName: currentUserProfile.lastName,
  //         username: "currentuser",
  //         profilePhoto: currentUserProfile.profilePhoto,
  //       },
  //       followedData: selectedPersonData.profile,
  //     })
  //   );
  // };
  // const handleFollowersClick = () => console.log("Followers list clicked");
  // const handleFollowingClick = () => console.log("Following list clicked");

  const handleFollowersClick = () => setIsFollowersDrawerOpen(true);
  const handleFollowingClick = () => setIsFollowingDrawerOpen(true);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          {/* Cover Photo */}
          <div className={styles.coverPhoto}>
            {/* Avatar */}
            <div
              className={`${styles.avatarContainer} ${
                isOwnProfile ? styles.clickable : ""
              }`}
              title={isOwnProfile ? "Click to replace profile photo" : ""}
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

            {/* Action Buttons - CONDITIONAL LOGIC */}
            <div className={styles.actionButtons}>
              {isOwnProfile ? (
                // OWNER VIEW - Sara vede i suoi bottoni
                <>
                  <button
                    className={styles.editProfileBtn}
                    onClick={handleEditProfile}
                  >
                    Edit profile
                  </button>

                  <motion.button
                    className={`${styles.editProfileBtn} ${styles.liquidButton}`}
                    onClick={handleSettings}
                    title="Ruota della fortuna!"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: { duration: 0.1 },
                    }}
                  >
                    <Cherry size={16} />
                  </motion.button>
                </>
              ) : (
                // VIEWER VIEW - currentUser vede bottoni follow
                <>
                  {/* <button
                    className={styles.followBtn}
                    onClick={handleFollow}
                    style={{
                      backgroundColor: isFollowingIstruttore ? "#666" : "#000",
                    }}
                  >
                    {isFollowingIstruttore ? "FOLLOWING" : "FOLLOW"}
                    </button>
                    <div className={styles.iconsME}>
                    <button
                    className={styles.shareBtn}
                    onClick={handleShare}
                    title="Like profile"
                    >
                    <Heart size={16} />
                    </button>
                    <button
                    className={styles.shareBtn}
                    onClick={handleShare}
                    title="Share profile"
                    >
                    <Share size={16} />
                    </button>
                    <button
                      className={styles.messageBtn}
                      onClick={handleMessage}
                      title="Send message"
                      >
                      <MessageCircle size={16} />
                      </button>
                      </div> */}
                  <button
                    className={styles.editProfileBtn}
                    onClick={handleFollow}
                  >
                    {/* {"FOLLOW"} */}
                    {isFollowingIstruttore ? "FOLLOWING" : "FOLLOW"}
                    {/* {isFollowing ? "FOLLOWING" : "FOLLOW"} */}
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
                {/* Conditional icons */}
                {isOwnProfile ? (
                  <Settings
                    className={styles.settingsIcon}
                    size={20}
                    onClick={handleSettings}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <button
                    className={styles.moreOptionsBtn}
                    onClick={handleMoreOptions}
                    title="More options"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                )}
              </h1>
              <p className={styles.username}>@{user.username}</p>
            </div>

            {/* Bio */}
            {/* <p className={styles.bio}>{user.bio}</p> */}

            {/* Meta Info */}
            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>Joined {user.joinedDate}</span>
              </div>
              <div className={styles.metaItem}>
                <MapPin size={16} />
                <span>{user.location}</span>
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
              {/* <button
                className={styles.followStat}
                onClick={handleFollowingClick}
              >
                <strong>{user.following}</strong> following
              </button>
              <button
                className={styles.followStat}
                onClick={handleFollowersClick}
              >
                <strong>{user.followers}</strong> followers
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
              </button> */}
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
                    background: "var(--text-primary)",
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
                      color: "var(--text-primary)",
                      marginBottom: "2px",
                    }}
                  >
                    {follower.firstName} {follower.lastName}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-primary-light)",
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
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                  // onClick={() => handleFollowBack(follower)}
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
            {following.map((following) => (
              <div
                key={following.id}
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
                    background: "var(--text-primary)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}
                >
                  {following.firstName?.[0]}
                  {following.lastName?.[0]}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      color: "var(--text-primary)",
                      marginBottom: "2px",
                    }}
                  >
                    {following.firstName} {following.lastName}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-primary-light)",
                    }}
                  >
                    @{following.username}
                  </div>
                </div>

                <button
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    borderRadius: "1rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                  // onClick={() => handleUnfollow(following)}
                >
                  Following
                </button>

                {/* <button
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.75rem",
                          borderRadius: "1rem",
                          border: `1px solid ${
                            followingList.has(following.id)
                              ? "var(--success-green)"
                              : "rgba(255, 255, 255, 0.2)"
                          }`,
      
                          background: followingList.has(following.id)
                            ? "rgba(16, 185, 129, 0.15)"
                            : "rgba(255, 255, 255, 0.1)",
                          color: followingList.has(following.id)
                            ? "var(--success-green-dark)"
                            : "var(--text-primary)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          flexShrink: 0,
                        }}
                        onClick={() => handleToggleFollow(following)}
                      >
                        {followingList.has(following.id) ? "Following" : "Follow"}
                      </button> */}
              </div>
            ))}
            {/* {followersWithData.map((follower) => (
              <div key={follower.id}>
                {follower.firstName} {follower.lastName}
              </div>
            ))} */}

            {/* <h3>Following:</h3>
                  {following.map((person) => (
                    <div key={person.id}>
                      {person.firstName} {person.lastName}
                    </div>
                  ))} */}
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
    </>
  );
};

export default ProfileHeaderMockup;
