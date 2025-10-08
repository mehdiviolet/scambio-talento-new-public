import React, { useState, useImperativeHandle, forwardRef } from "react";
import styles from "./Login.module.css";

const Login = forwardRef(
  ({ onLoginSuccess, onRegister, onForgotPassword, onDemoFill }, ref) => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      rememberMe: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Funzione interna per riempire i dati demo
    const handleDemoFill = () => {
      setFormData({
        ...formData,
        email: "demo@app.com",
        password: "123456",
      });
    };

    // ✅ Esponi la funzione al componente padre
    useImperativeHandle(ref, () => ({
      fillDemoData: handleDemoFill,
    }));

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear error when user starts typing
      if (error) setError("");
    };

    const validateForm = () => {
      if (!formData.email.trim()) {
        setError("Email richiesta");
        return false;
      }
      if (!formData.password.trim()) {
        setError("Password richiesta");
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Email non valida");
        return false;
      }
      return true;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      setIsLoading(true);
      setError("");

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // 🎯 DEMO LOGIC SEMPLICE:
        if (
          formData.email === "demo@app.com" &&
          formData.password === "123456"
        ) {
          // ✅ SEMPRE UTENTE ESISTENTE - VA ALLA MAIN APP
          const userData = {
            id: "demo_user",
            email: formData.email,
            name: "Demo User",
            type: "existing", // ← Sempre existing = no onboarding
          };
          onLoginSuccess && onLoginSuccess(userData);
        } else {
          throw new Error("Usa: demo@app.com / 123456");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const handleRegisterClick = () => {
      console.log("Navigate to register");
      onRegister && onRegister();
    };

    const handleForgotPasswordClick = () => {
      console.log("Navigate to forgot password");
      onForgotPassword && onForgotPassword();
    };

    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Welcome</h1>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>

          <div className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <div
                className={`${styles.inputWrapper} ${
                  error ? styles.error : ""
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
            </div>
            <div className={styles.inputGroup}>
              <div
                className={`${styles.inputWrapper} ${
                  error ? styles.error : ""
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
            </div>
            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className={styles.checkbox}
                  disabled={isLoading}
                />
                <span className={styles.checkmark}></span>
                Remember Me
              </label>

              <button
                type="button"
                className={styles.forgotPassword}
                onClick={handleForgotPasswordClick}
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className={styles.loginButton}
              disabled={isLoading || !formData.email || !formData.password}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>
            <div className={styles.registerPrompt}>
              <span>Don't have an account? </span>
              <button
                type="button"
                className={styles.registerLink}
                onClick={handleRegisterClick}
                disabled={isLoading}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Login.displayName = "Login";

export default Login;
