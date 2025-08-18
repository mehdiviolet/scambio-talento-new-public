import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = ({ onBackToLogin, onResetPassword }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Email richiesta");
      return;
    }

    if (!validateEmail(email)) {
      setError("Inserisci un'email valida");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      console.log("Password reset email sent to:", email);
    } catch (err) {
      setError("Errore durante l'invio. Riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    console.log("Navigate back to login");
    onBackToLogin && onBackToLogin(); // ✅ Usa callback
  };

  const handleResendEmail = () => {
    setIsSubmitted(false);
    setIsLoading(false);
    setEmail("");
    setError("");
  };

  if (isSubmitted) {
    return (
      <div className={styles.forgotContainer}>
        <div className={styles.forgotCard}>
          <div className={styles.successContent}>
            <div className={styles.successIcon}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
                <circle cx="18" cy="8" r="3" fill="currentColor"></circle>
              </svg>
            </div>

            <h1 className={styles.successTitle}>Email Inviata!</h1>
            <p className={styles.successMessage}>
              Abbiamo inviato le istruzioni per reimpostare la password a:
            </p>
            <div className={styles.emailDisplay}>{email}</div>

            <p className={styles.instructionsText}>
              Controlla la tua casella di posta e clicca sul link per
              reimpostare la password. Il link sarà valido per 15 minuti.
            </p>

            <div className={styles.actionButtons}>
              {/* <button onClick={handleBackToLogin} className={styles.backButton}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
                Torna al Login
              </button> */}
              <button
                onClick={() => {
                  console.log("Simulating email link click");
                  // Simula click su link email
                  onResetPassword && onResetPassword();
                }}
                className={styles.resetLinkButton}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Click Email
              </button>
              <button
                onClick={handleResendEmail}
                className={styles.resendButton}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="23,4 23,10 17,10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
                Invia di Nuovo
              </button>
            </div>

            <div className={styles.helpSection}>
              <p>Non hai ricevuto l'email?</p>
              <ul>
                <li>Controlla la cartella spam</li>
                <li>Verifica che l'email sia corretta</li>
                <li>Attendi fino a 5 minuti</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.forgotCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerIcon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <circle cx="12" cy="16" r="1"></circle>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h1 className={styles.title}>Password Dimenticata?</h1>
          <p className={styles.subtitle}>
            Nessun problema! Inserisci la tua email e ti invieremo le istruzioni
            per reimpostare la password.
          </p>
        </div>

        <div className={styles.forgotForm}>
          <div className={styles.inputGroup}>
            <div
              className={`${styles.inputWrapper} ${error ? styles.error : ""}`}
            >
              <input
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={handleEmailChange}
                className={styles.formInput}
                disabled={isLoading}
              />
              <div className={styles.inputIcon}>
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
            </div>
            {error && <span className={styles.errorText}>{error}</span>}
          </div>

          <button
            onClick={handleSubmit}
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                Invio in corso...
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9"></polygon>
                </svg>
                Invia Istruzioni
              </>
            )}
          </button>

          <button onClick={handleBackToLogin} className={styles.backToLogin}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
            Torna al Login
          </button>
        </div>

        <div className={styles.securityInfo}>
          <div className={styles.securityIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
          <div>
            <h4>Sicurezza Garantita</h4>
            <p>
              Il tuo account è protetto. Il link di reset sarà valido solo per
              15 minuti e può essere utilizzato una sola volta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
