import React, { useState } from "react";
import {
  X,
  Share,
  Copy,
  Link,
  Facebook,
  Instagram,
  CheckCircle,
  User,
  ArrowLeft,
} from "lucide-react";
import styles from "./InviteFriendModal.module.css";

const ShareModal = ({ isOpen, onClose, userProfile, onBack }) => {
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
    const shareText = `Guarda il profilo di ${userProfile?.firstName} ${userProfile?.lastName}!`;
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
          title: `Profilo di ${userProfile?.firstName} ${userProfile?.lastName}`,
          text: `Guarda il profilo di ${userProfile?.firstName} ${userProfile?.lastName}!`,
          url: profileUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      handleCopyLink();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <button
            className={styles.closeButton}
            onClick={onBack}
            style={{ left: "1rem", right: "auto" }}
          >
            <ArrowLeft size={20} />
          </button>
          <h3>Condividi Profilo</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.inviteDisplay}>
            <div className={styles.inviteValue}>
              <Share size={32} className={styles.inviteIcon} />
            </div>

            <h4 className={styles.inviteTitle}>
              {userProfile?.firstName} {userProfile?.lastName}
            </h4>

            {/* Profile Info */}
            <div className={styles.section}>
              <div
                className={styles.linkContainer}
                style={{
                  flexDirection: "column",
                  gap: "0.75rem",
                  textAlign: "center",
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <User
                  size={20}
                  style={{ color: "var(--text-primary)", alignSelf: "center" }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.875rem",
                    color: "var(--text-primary-light)",
                    lineHeight: "1.4",
                  }}
                >
                  Condividi questo profilo con i tuoi amici e contatti
                </p>
              </div>
            </div>

            {/* Copy Link Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Link profilo</h3>
              <div className={styles.linkContainer}>
                <input
                  type="text"
                  value={profileUrl}
                  readOnly
                  className={styles.linkInput}
                  style={{ fontSize: "0.8rem" }}
                />
                <button
                  onClick={handleCopyLink}
                  className={`${styles.actionBtn} ${
                    copied ? styles.success : ""
                  }`}
                >
                  {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  {copied ? "Copiato!" : "Copia"}
                </button>
              </div>
            </div>

            {/* Share Options */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Condividi su</h3>
              <div className={styles.shareButtons}>
                <button onClick={handleShareNative} className={styles.shareBtn}>
                  <Share size={16} />
                  Condividi
                </button>

                <button
                  onClick={() => handleShareTo("facebook")}
                  className={styles.shareBtn}
                >
                  <Facebook size={16} />
                  Facebook
                </button>

                <button
                  onClick={() => handleShareTo("instagram")}
                  className={styles.shareBtn}
                >
                  <Instagram size={16} />
                  Instagram
                </button>
              </div>
            </div>

            {/* Info */}
            <div className={styles.rewardInfo}>
              <Link size={20} className={styles.rewardIcon} />
              <p className={styles.rewardText}>
                Il link del profilo permette ad altri di visualizzare le
                informazioni pubbliche e connettersi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
