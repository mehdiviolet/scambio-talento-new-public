import React, { useState } from "react";
import styles from "./RegisterMinimal.module.css";

const RegisterMinimal = ({ onRegisterSuccess, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Aggiungi questa funzione nel componente RegisterMinimal
  const handleDemoFill = () => {
    setFormData({
      email: "demo@newuser.com",
      password: "demo123456",
      confirmPassword: "demo123456",
      agreeToTerms: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email richiesta";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email non valida";

    if (!formData.password) newErrors.password = "Password richiesta";
    else if (formData.password.length < 8)
      newErrors.password = "Minimo 8 caratteri";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Le password non coincidono";
    }

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "Devi accettare i termini";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate registration success
      const userData = {
        id: `user_${Date.now()}`,
        email: formData.email,
        registeredAt: new Date().toISOString(),
      };

      console.log("Registration successful:", userData);
      onRegisterSuccess && onRegisterSuccess(userData);
    } catch (err) {
      setErrors({ general: "Errore durante la registrazione. Riprova." });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>Crea Account</h1>
          <p className={styles.subtitle}>Ci vogliono solo 30 secondi</p>

          {errors.general && (
            <div className={styles.errorMessage}>{errors.general}</div>
          )}
        </div>

        <div className={styles.registerForm}>
          <div className={styles.inputGroup}>
            <div
              className={`${styles.inputWrapper} ${
                errors.email ? styles.error : ""
              }`}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.formInput}
                disabled={isLoading}
                required
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
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <div
              className={`${styles.inputWrapper} ${
                errors.password ? styles.error : ""
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.formInput}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
                disabled={isLoading}
              >
                {showPassword ? (
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

            {formData.password && (
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
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
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
                placeholder="Conferma Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={styles.formInput}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.passwordToggle}
                disabled={isLoading}
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
          <div className={styles.termsSection}>
            <label
              className={`${styles.checkboxLabel} ${
                errors.agreeToTerms ? styles.error : ""
              }`}
            >
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className={styles.checkbox}
                disabled={isLoading}
              />
              <span className={styles.checkmark}></span>
              <span>
                Accetto i{" "}
                <button type="button" className={styles.linkButton}>
                  Termini di Servizio
                </button>{" "}
                e la{" "}
                <button type="button" className={styles.linkButton}>
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.agreeToTerms && (
              <span className={styles.errorText}>{errors.agreeToTerms}</span>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className={styles.registerButton}
            disabled={
              isLoading ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword ||
              !formData.agreeToTerms
            }
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                Creazione Account...
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
                Crea Account
              </>
            )}
          </button>
          <div className={styles.loginPrompt}>
            <span>Hai già un account? </span>
            <button
              type="button"
              className={styles.loginLink}
              onClick={onBackToLogin}
              disabled={isLoading}
            >
              Accedi
            </button>
          </div>
          {/* ✅ AGGIUNGI QUESTO NUOVO DIV: */}
          <div className={styles.demoHelper} onClick={handleDemoFill}>
            <small>
              <strong>Demo Veloce:</strong> Compila automaticamente
              {/* <br /> */}
              {/* <span className={styles.clickHint}>
                👆 Clicca per auto-compilare
              </span> */}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMinimal;
