import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import AnimatedLogo from "./AnimatedLogo";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

const ResetPassword = forwardRef(({ onBackToLogin }, ref) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ AGGIUNGI funzione demo fill
  const fillDemoData = () => {
    setFormData({
      newPassword: "newPassword123",
      confirmPassword: "newPassword123",
    });
  };
  // ✅ AGGIUNGI ref exposure
  useImperativeHandle(ref, () => ({
    fillDemoData: fillDemoData,
  }));

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6)
      return { strength: 1, label: "Debole", color: "#ef4444" };
    if (password.length < 8)
      return { strength: 2, label: "Media", color: "#f59e0b" };
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return { strength: 4, label: "Forte", color: "#10b981" };
    }
    return { strength: 3, label: "Buona", color: "#22d3ee" };
  };

  const handleSubmit = async () => {
    // Validazione
    const newErrors = {};
    if (!formData.newPassword) newErrors.newPassword = "Password richiesta";
    else if (formData.newPassword.length < 8)
      newErrors.newPassword = "Minimo 8 caratteri";

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Le password non coincidono";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mostra loading overlay
    setShowLoading(true);

    // Simula operazione
    setTimeout(() => {
      setShowLoading(false);
      setIsCompleted(true);

      console.log("AAA");
      // Auto redirect dopo 3 secondi
      setTimeout(() => {
        onBackToLogin && onBackToLogin();
        console.log("sss");
      }, 3000);
    }, 3000);
  };

  const handleDemoFill = () => {
    setFormData({
      newPassword: "nuovaPassword123",
      confirmPassword: "nuovaPassword123",
    });
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  // Success State
  if (isCompleted) {
    return (
      <div className={styles.resetContainer}>
        <div className={styles.resetCard}>
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
              </svg>
            </div>

            <h1 className={styles.successTitle}>Password Aggiornata!</h1>
            <p className={styles.successMessage}>
              La tua password è stata reimpostata con successo.
            </p>

            {/* <button onClick={onBackToLogin} className={styles.loginNowButton}>
              Accedi Ora
              </button> */}
          </div>

          <div className={styles.loadingDots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <div className={styles.redirectInfo}>
            <p>Reindirizzamento al login in corso...</p>
          </div>
        </div>
      </div>
    );
  }

  // Main Form
  return (
    <div className={styles.resetContainer}>
      <div className={styles.resetCard}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>Reimposta Password</h1>
          <p className={styles.subtitle}>
            Crea una nuova password sicura per il tuo account
          </p>

          <div className={styles.tokenInfo}>
            <div className={styles.tokenIcon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 12l2 2 4-4"></path>
                <path d="M21 12c0 1.66-4 7-9 7s-9-5.34-9-7 4-7 9-7 9 5.34 9 7z"></path>
              </svg>
            </div>
            <span>Link di reset valido</span>
          </div>
        </div>

        <div className={styles.resetForm}>
          <div className={styles.inputGroup}>
            <div
              className={`${styles.inputWrapper} ${
                errors.newPassword ? styles.error : ""
              }`}
            >
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Nuova Password"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={styles.formInput}
                disabled={showLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={styles.passwordToggle}
                disabled={showLoading}
              >
                {showNewPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>

            {formData.newPassword && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthMeter}>
                  <div
                    className={styles.strengthFill}
                    style={{
                      width: `${(passwordStrength.strength / 4) * 100}%`,
                      backgroundColor: passwordStrength.color,
                    }}
                  ></div>
                </div>
                <span style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </span>
              </div>
            )}
            {errors.newPassword && (
              <span className={styles.errorText}>{errors.newPassword}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div
              className={`${styles.inputWrapper} ${
                errors.confirmPassword ? styles.error : ""
              }`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Conferma Nuova Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={styles.formInput}
                disabled={showLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.passwordToggle}
                disabled={showLoading}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c0 1.66-4 7-9 7s-9-5.34-9-7 4-7 9-7 9 5.34 9 7z"></path>
                </svg>
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className={styles.resetButton}
            disabled={
              showLoading || !formData.newPassword || !formData.confirmPassword
            }
          >
            {showLoading ? (
              <>
                <div className={styles.spinner}></div>
                Aggiornamento...
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
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c0 1.66-4 7-9 7s-9-5.34-9-7 4-7 9-7 9 5.34 9 7z"></path>
                </svg>
                Aggiorna Password
              </>
            )}
          </button>

          <button
            onClick={onBackToLogin}
            className={styles.backToLogin}
            disabled={showLoading}
          >
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

          {/* <div className={styles.demoHelper} onClick={handleDemoFill}>
            <small>
              <strong>🚀 Demo Veloce:</strong> Compila automaticamente
            </small>
          </div> */}
        </div>
      </div>
    </div>
  );
});

ResetPassword.displayName = "ResetPassword";

export default ResetPassword;
