import React, { useState, useEffect } from "react";
import styles from "./EmailHelper.module.css";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";

const EmailHelper = forwardRef(({ onSimulateEmailClick, hidden }, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minuti in secondi
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  // Timer per countdown
  useEffect(() => {
    if (showModal && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showModal, timeLeft]);

  // ✅ AGGIUNGI questo subito dopo i useState esistenti
  useImperativeHandle(ref, () => ({
    openModal: () => setShowModal(true),
  }));

  // Formatta il tempo rimanente
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEmailClick = () => {
    setShowModal(true);
  };

  const handleLinkClick = () => {
    setIsLinkClicked(true);

    // Animazione di click e poi chiudi modal
    setTimeout(() => {
      setShowModal(false);
      setIsLinkClicked(false);
      onSimulateEmailClick();
    }, 1500);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsLinkClicked(false);
  };

  return (
    <>
      {/* Widget trigger */}
      {!hidden && (
        <div className={styles.emailHelper} onClick={handleEmailClick}>
          <div className={styles.emailIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div className={styles.emailContent}>
            <div className={styles.emailTitle}>Check Email</div>
            <div className={styles.emailText}>
              <small>
                <strong>Open:</strong> Reset email
              </small>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.emailModal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Email Header */}
            <div className={styles.emailHeader}>
              <div className={styles.emailHeaderTop}>
                <div className={styles.emailProvider}>
                  <div className={styles.gmailIcon}>📧</div>
                  <span>Gmail</span>
                </div>
                <button
                  className={styles.closeButton}
                  onClick={handleCloseModal}
                >
                  ✕
                </button>
              </div>

              <div className={styles.emailMeta}>
                <div className={styles.emailFrom}>
                  <strong>Da:</strong> noreply@talentexchange.com
                </div>
                <div className={styles.emailTo}>
                  <strong>A:</strong> demo@app.com
                </div>
                <div className={styles.emailSubject}>
                  <strong>Oggetto:</strong> Reimposta la tua password
                </div>
                <div className={styles.emailTime}>Ricevuto ora</div>
              </div>
            </div>

            {/* Email Body */}
            <div className={styles.emailBody}>
              <div className={styles.emailContent}>
                <h3>Reimposta la tua password</h3>
                <p>Ciao,</p>
                <p>
                  Hai richiesto di reimpostare la password per il tuo account
                  TalentExchange. Clicca sul link qui sotto per procedere:
                </p>

                <div className={styles.resetLinkContainer}>
                  <button
                    className={`${styles.resetLink} ${
                      isLinkClicked ? styles.clicking : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    {isLinkClicked ? (
                      <span>🔄 Reindirizzamento...</span>
                    ) : (
                      <>
                        🔗 Reimposta Password
                        <span className={styles.linkExpiry}>
                          Valido per {formatTime(timeLeft)}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <div className={styles.emailFooter}>
                  <p>
                    <small>
                      Se non hai richiesto questa email, puoi ignorarla in
                      sicurezza. Questo link scadrà tra 15 minuti per motivi di
                      sicurezza.
                    </small>
                  </p>

                  <p>
                    <small>
                      Team TalentExchange
                      <br />
                      <span style={{ color: "#888" }}>
                        Questo messaggio è stato inviato automaticamente, non
                        rispondere a questa email.
                      </span>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default EmailHelper;
