import React, { useState } from "react";
import {
  X,
  Share,
  Copy,
  Link,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import styles from "./ShareModal.module.css";

const ShareModal = ({ isOpen, onClose, userProfile }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const profileUrl = `${window.location.origin}/profile/${
    userProfile?.username || "user"
  }`;

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
    const shareText = `Check out ${userProfile?.firstName} ${userProfile?.lastName}'s profile!`;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        profileUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(profileUrl)}`,
      instagram: profileUrl, // Instagram doesn't have direct sharing URLs
    };

    if (platform === "instagram") {
      handleCopyLink();
      alert("Link copied! You can paste it in your Instagram story or bio.");
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Share Profile</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Profile Info */}
          <div className={styles.descriptionBox}>
            <p className={styles.descriptionText}>
              Share {userProfile?.firstName} {userProfile?.lastName}'s profile
              with others
            </p>
          </div>

          <div className={styles.divider}></div>

          {/* Share Options */}
          <div className={styles.shareOptions}>
            {/* Copy Link */}
            <button onClick={handleCopyLink} className={styles.copyLinkButton}>
              {copied ? <Copy color="#22c55e" /> : <Link />}
              <span>{copied ? "Link Copied!" : "Copy Profile Link"}</span>
            </button>

            {/* Social Media Options */}
            <div className={styles.socialButtons}>
              <button
                onClick={() => handleShareTo("facebook")}
                className={`${styles.socialButton} ${styles.facebookButton}`}
              >
                <Facebook size={18} />
                Facebook
              </button>

              {/* <button
                onClick={() => handleShareTo("twitter")}
                className={`${styles.socialButton} ${styles.twitterButton}`}
              >
                <Twitter size={18} />
                Twitter
              </button> */}

              <button
                onClick={() => handleShareTo("instagram")}
                className={`${styles.socialButton} ${styles.instagramButton}`}
              >
                <Instagram size={18} />
                Instagram
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.viewActions}>
            <button className={styles.cancelButton} onClick={onClose}>
              <X />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
