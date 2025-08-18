import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Copy,
  Share,
  Mail,
  MessageCircle,
  UserPlus2Icon,
  CheckCircle,
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
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <UserPlus2Icon size={24} />
          </div>
          <div className={styles.headerText}>
            <h2 className={styles.title}>Invita un amico</h2>
            <p className={styles.subtitle}>
              Condividi il link e ottieni <strong>10 XP</strong> quando si
              iscrive!
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Link di invito */}
          <div className={styles.section}>
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
                className={`${styles.copyBtn} ${isCopied ? styles.copied : ""}`}
              >
                {isCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {isCopied ? "Copiato!" : "Copia"}
              </button>
            </div>
          </div>

          {/* Invito via email */}
          <div className={styles.section}>
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
                className={`${styles.sendBtn} ${
                  isEmailSent ? styles.sent : ""
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
          </div>

          {/* Condivisione rapida */}
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

          {/* Info reward */}
          <div className={styles.rewardInfo}>
            <div className={styles.rewardIcon}>🎉</div>
            <div className={styles.rewardText}>
              <strong>Ottieni 10 XP</strong> per ogni amico che si iscrive
              tramite il tuo link!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendModal;
