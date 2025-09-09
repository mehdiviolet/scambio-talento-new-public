import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Copy,
  Share,
  Mail,
  MessageCircle,
  UserPlus2Icon,
  CheckCircle,
  Star,
} from "lucide-react";
import styles from "./InviteFriendModal.module.css";

const InviteFriendModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [inviteLink] = useState("https://myapp.com/invite/abc123");
  const [isCopied, setIsCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEmailInvite = () => {
    if (email) {
      console.log("Sending invite to:", email);
      setIsEmailSent(true);
      setTimeout(() => {
        setIsEmailSent(false);
        setEmail("");
      }, 2000);
    }
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Unisciti alla mia community!",
          text: "Ti invito a unirti alla nostra piattaforma. È fantastica!",
          url: inviteLink,
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3>Invita un amico</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.inviteDisplay}>
            <div className={styles.inviteValue}>
              <span className={styles.valueNumber}>10</span>
              <UserPlus2Icon size={32} className={styles.inviteIcon} />
            </div>

            <h4 className={styles.inviteTitle}>XP per ogni amico invitato</h4>

            {/* Link Section */}
            {/* <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Link di invito</h3>
              <div className={styles.linkContainer}>
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className={styles.linkInput}
                />
                <button
                  onClick={handleCopyLink}
                  className={`${styles.actionBtn} ${
                    isCopied ? styles.success : ""
                  }`}
                >
                  {isCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  {isCopied ? "Copiato!" : "Copia"}
                </button>
              </div>
            </div> */}

            {/* Email Section */}
            {/* <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Invita via email</h3>
              <div className={styles.emailContainer}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@esempio.com"
                  className={styles.emailInput}
                />
                <button
                  onClick={handleEmailInvite}
                  disabled={!email || isEmailSent}
                  className={`${styles.actionBtn} ${
                    isEmailSent ? styles.success : ""
                  }`}
                >
                  {isEmailSent ? (
                    <>
                      <CheckCircle size={16} />
                      Inviato!
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      Invia
                    </>
                  )}
                </button>
              </div>
            </div> */}

            {/* Share Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Condividi rapidamente</h3>
              <div className={styles.shareButtons}>
                <button onClick={handleShareNative} className={styles.shareBtn}>
                  <Share size={16} />
                  Condividi
                </button>
                <button onClick={handleCopyLink} className={styles.shareBtn}>
                  <Copy size={16} />
                  Copia link
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(
                        "Ti invito a unirti! " + inviteLink
                      )}`
                    )
                  }
                  className={styles.shareBtn}
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Reward Info */}
            <div className={styles.rewardInfo}>
              {/* <Star size={20} className={styles.rewardIcon} /> */}
              <p className={styles.rewardText}>
                Ottieni 10 XP per ogni amico che si iscrive tramite il tuo link
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendModal;
