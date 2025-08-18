// import React, { useState } from "react";
// import {
//   Calendar,
//   MapPin,
//   Share,
//   MessageCircle,
//   MoreHorizontal,
//   ChevronDown,
//   ChevronUp,
//   Heart,
//   X,
//   Send,
//   Copy,
//   Facebook,
//   Instagram,
// } from "lucide-react";
// import styles from "@/components/MainApp/Profile/ProfileHeader.module.css";
// import shareStyles from "@/components/MainApp/Shared/Modals/ShareModal.module.css";
// import messageStyles from "@/components/MainApp/Shared/Modals/ViewSkillModal.module.css";

// const ShareModal = ({ isOpen, onClose, userProfile }) => {
//   if (!isOpen) return null;

//   return (
//     <div className={shareStyles.overlay}>
//       <div className={shareStyles.container}>
//         <div className={shareStyles.header}>
//           <h3 className={shareStyles.title}>
//             Share {userProfile.firstName}'s Profile
//           </h3>
//           <button className={shareStyles.closeButton} onClick={onClose}>
//             <X />
//           </button>
//         </div>

//         <div className={shareStyles.content}>
//           <div className={shareStyles.descriptionBox}>
//             <p className={shareStyles.descriptionText}>
//               Share this profile with your network
//             </p>
//           </div>

//           <div className={shareStyles.divider}></div>

//           <div className={shareStyles.shareOptions}>
//             <button className={shareStyles.copyLinkButton}>
//               <Copy size={20} />
//               Copy Link
//             </button>

//             <div className={shareStyles.socialButtons}>
//               <button className={shareStyles.facebookButton}>
//                 <Facebook size={16} />
//                 Facebook
//               </button>
//               <button className={shareStyles.xButton}>
//                 <span>𝕏</span>
//                 Twitter
//               </button>
//               <button className={shareStyles.instagramButton}>
//                 <Instagram size={16} />
//                 Instagram
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className={shareStyles.footer}>
//           <div className={shareStyles.userInfo}>
//             <div className={shareStyles.avatar}>
//               <div className={shareStyles.avatarEmoji}>👩‍🎨</div>
//             </div>
//             <span className={shareStyles.userName}>
//               {userProfile.firstName} {userProfile.lastName}
//             </span>
//           </div>
//         </div>

//         <div className={shareStyles.actions}>
//           <div className={shareStyles.viewActions}>
//             <button className={shareStyles.cancelButton} onClick={onClose}>
//               <X />
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // MessageModal using ViewSkillModal.module.css
// const MessageModal = ({ isOpen, onClose, userProfile }) => {
//   const [message, setMessage] = useState("");

//   if (!isOpen) return null;

//   return (
//     <div className={messageStyles.overlay}>
//       <div className={messageStyles.container}>
//         <div className={messageStyles.header}>
//           <h3 className={messageStyles.title}>
//             Message {userProfile.firstName}
//           </h3>
//           <button className={messageStyles.closeButton} onClick={onClose}>
//             <X />
//           </button>
//         </div>

//         <div className={messageStyles.content}>
//           <div className={messageStyles.descriptionBox}>
//             <textarea
//               className={messageStyles.editTextarea}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Write your message..."
//               rows={4}
//             />
//           </div>
//         </div>

//         <div className={messageStyles.footer}>
//           <div className={messageStyles.userInfo}>
//             <div className={messageStyles.avatar}>
//               <div className={messageStyles.avatarEmoji}>👩‍🎨</div>
//             </div>
//             <span className={messageStyles.userName}>
//               {userProfile.firstName} {userProfile.lastName}
//             </span>
//           </div>
//         </div>

//         <div className={messageStyles.actions}>
//           <div className={messageStyles.editActions}>
//             <button className={messageStyles.cancelButton} onClick={onClose}>
//               <X />
//               Cancel
//             </button>
//             <button className={messageStyles.saveButton}>
//               <Send />
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ProfileHeaderMockup standalone component
// const ProfileHeaderTest = ({ selectedPerson }) => {
//   const [isAboutExpanded, setIsAboutExpanded] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

//   // Template dati base (sempre uguali tranne nome)
//   const baseUserData = {
//     email: "sara@example.com",
//     firstName: "Sara",
//     lastName: "Dormandaaa",
//     birthDate: "30.09.1995",
//     location: "Torino",
//     zone: "Vanchiglia",
//     joinedDate: "Maggio 2025",
//     languages: [
//       { name: "Inglese", flag: "🇬🇧" },
//       { name: "Francese", flag: "🇫🇷" },
//     ],
//     level: 16,
//     profilePhoto: "_pi.jpg",
//     avatar: "👩‍🎨",
//   };

//   const user = {
//     firstName: baseUserData.firstName,
//     lastName: baseUserData.lastName,
//     username:
//       baseUserData.firstName.toLowerCase() +
//       baseUserData.lastName.toLowerCase().slice(0, 3),
//     bio: "Digital Artist | UI/UX Designer | Creative Director",
//     aboutMe:
//       "Passionate about creating beautiful digital experiences. I love exploring new design trends and bringing creative visions to life. When I'm not designing, you can find me painting or exploring the beautiful streets of Torino.",
//     location: `${baseUserData.location}, ${baseUserData.zone}`,
//     profilePhoto: null,
//     joinedDate: baseUserData.joinedDate,
//     following: 342,
//     followers: 1847,
//     verified: true,
//   };

//   const handleFollow = () => {
//     setIsFollowing(!isFollowing);
//     console.log(isFollowing ? "Unfollowed" : "Followed");
//   };

//   const handleShare = () => {
//     setIsShareModalOpen(true);
//   };

//   const handleMessage = () => {
//     setIsMessageModalOpen(true);
//   };

//   const handleMoreOptions = () => console.log("More options clicked");
//   const handleFollowingClick = () => console.log("Following list clicked");
//   const handleFollowersClick = () => console.log("Followers list clicked");

//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.profileHeader}>
//           {/* Cover Photo */}
//           <div className={styles.coverPhoto}>
//             {/* Avatar */}
//             <div className={styles.avatarContainer}>
//               {user.profilePhoto ? (
//                 <img
//                   src={user.profilePhoto}
//                   alt={`${user.firstName} ${user.lastName}`}
//                   className={styles.avatarImage}
//                 />
//               ) : (
//                 <div className={styles.avatarPlaceholder}>
//                   {user.firstName?.[0]}
//                   {user.lastName?.[0]}
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons - VIEWER VIEW */}
//             <div className={styles.actionButtons}>
//               <button
//                 className={styles.followBtn}
//                 onClick={handleFollow}
//                 style={{
//                   backgroundColor: isFollowing ? "#666" : "#000",
//                 }}
//               >
//                 {isFollowing ? "FOLLOWING" : "FOLLOW"}
//               </button>
//               <div className={styles.iconsME}>
//                 <button
//                   className={styles.shareBtn}
//                   onClick={handleShare}
//                   title="Like profile"
//                 >
//                   <Heart size={16} />
//                 </button>
//                 <button
//                   className={styles.shareBtn}
//                   onClick={handleShare}
//                   title="Share profile"
//                 >
//                   <Share size={16} />
//                 </button>
//                 <button
//                   className={styles.messageBtn}
//                   onClick={handleMessage}
//                   title="Send message"
//                 >
//                   <MessageCircle size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className={styles.profileInfo}>
//             {/* Name and More Options */}
//             <div className={styles.nameSection}>
//               <h1 className={styles.displayName}>
//                 {user.firstName} {user.lastName}
//                 <button
//                   className={styles.moreOptionsBtn}
//                   onClick={handleMoreOptions}
//                   title="More options"
//                 >
//                   <MoreHorizontal size={20} />
//                 </button>
//               </h1>
//               <p className={styles.username}>@{user.username}</p>
//             </div>

//             {/* Bio */}
//             <p className={styles.bio}>{user.bio}</p>

//             {/* Meta Info */}
//             <div className={styles.metaInfo}>
//               <div className={styles.metaItem}>
//                 <Calendar size={16} />
//                 <span>Joined {user.joinedDate}</span>
//               </div>
//               <div className={styles.metaItem}>
//                 <MapPin size={16} />
//                 <span>{user.location}</span>
//               </div>
//             </div>

//             {/* Enhanced Stats */}
//             <div className={styles.followStats}>
//               <button
//                 className={styles.followStat}
//                 onClick={handleFollowingClick}
//               >
//                 <strong>{user.following}</strong> following
//               </button>
//               <button
//                 className={styles.followStat}
//                 onClick={handleFollowersClick}
//               >
//                 <strong>{user.followers}</strong> followers
//               </button>
//               <button
//                 className={styles.aboutToggle}
//                 onClick={() => setIsAboutExpanded(!isAboutExpanded)}
//               >
//                 <span>About me</span>
//                 {isAboutExpanded ? (
//                   <ChevronUp size={20} />
//                 ) : (
//                   <ChevronDown size={20} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* About Me Section */}
//           <div className={styles.aboutSection}>
//             {isAboutExpanded && (
//               <div className={styles.aboutContent}>
//                 <p>{user.aboutMe}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modali */}
//       <ShareModal
//         isOpen={isShareModalOpen}
//         onClose={() => setIsShareModalOpen(false)}
//         userProfile={user}
//       />

//       <MessageModal
//         isOpen={isMessageModalOpen}
//         onClose={() => setIsMessageModalOpen(false)}
//         userProfile={user}
//       />
//     </>
//   );
// };

// export default ProfileHeaderTest;

function ProfileHeaderTest() {
  return <div>TEST</div>;
}

export default ProfileHeaderTest;
