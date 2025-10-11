import React from "react";
import {
  Trash2,
  X,
  Save,
  Edit2,
  LogOut,
  UserCheck,
  CheckCircle,
  Cherry,
  Lock,
  Hourglass,
  Check,
  Dices,
} from "lucide-react";

import styles from "./Button.module.css";

// ===== COMPONENTE BASE BUTTON =====
export const Button = ({
  children,
  variant = "primary",
  mode = "solid",
  size = "md",
  disabled = false,
  onClick,
  className = "",
  disabledMessage = "Azione non disponibile",
  ...props
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[size]} ${styles[mode]} ${styles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      data-disabled-message={disabled ? disabledMessage : ""}
      {...props}
    >
      {children}
    </button>
  );
};

// ===== BUTTON ELIMINA =====
export const ButtonTrash = ({
  onClick,
  disabled = false,
  disabledMessage = "Impossibile eliminare",
  size = "md",
  mode = "solid",
  children = "Elimina",
  ...props
}) => {
  return (
    <Button
      variant="error"
      mode={mode}
      size={size}
      onClick={onClick}
      disabled={disabled}
      disabledMessage={disabledMessage}
      title="Elimina"
      {...props}
    >
      <Trash2 size={16} />
      <span>{children}</span>
    </Button>
  );
};

// ===== BUTTON ANNULLA =====
export const ButtonCancel = ({
  onClick,
  disabled = false,
  disabledMessage = "Impossibile annullare",
  size = "md",
  mode = "outline",
  children = "Annulla",
  ...props
}) => {
  return (
    <Button
      variant="neutral"
      mode={mode}
      size={size}
      onClick={onClick}
      disabled={disabled}
      disabledMessage={disabledMessage}
      title="Annulla modifiche"
      {...props}
    >
      <X size={14} />
      <span>{children}</span>
    </Button>
  );
};

// ===== BUTTON SALVA =====
export const ButtonSave = ({
  onClick,
  disabled = false,
  disabledMessage = "Compila tutti i campi obbligatori",
  size = "md",
  mode = "solid",
  children = "Salva",
  ...props
}) => {
  return (
    <Button
      variant="primary"
      mode={mode}
      size={size}
      onClick={onClick}
      disabled={disabled}
      disabledMessage={disabledMessage}
      title="Salva modifiche"
      {...props}
    >
      <Save size={14} />
      <span>{children}</span>
    </Button>
  );
};

// ===== BUTTON MODIFICA =====
export const ButtonEdit = ({
  onClick,
  disabled = false,
  disabledMessage = "Impossibile modificare",
  size = "md",
  mode = "outline",
  children = "Modifica",
  ...props
}) => {
  return (
    <Button
      variant="primary"
      mode={mode}
      size={size}
      onClick={onClick}
      disabled={disabled}
      disabledMessage={disabledMessage}
      title="Modifica"
      {...props}
    >
      <Edit2 size={14} />
      <span>{children}</span>
    </Button>
  );
};

// ===== BUTTON LOGOUT =====
export const ButtonLogout = ({
  onClick,
  disabled = false,
  isLoading = false,
  disabledMessage = "Impossibile disconnettersi",
  size = "md",
  mode = "solid",
  children = "Logout",
  loadingText = "Disconnessione...",
  ...props
}) => {
  return (
    <Button
      variant="secondary"
      mode={mode}
      size={size}
      onClick={onClick}
      disabled={disabled || isLoading}
      disabledMessage={disabledMessage}
      title="Disconnetti"
      {...props}
    >
      {isLoading ? (
        <>
          <div className={styles.spinner}></div>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <LogOut size={16} />
          <span>{children}</span>
        </>
      )}
    </Button>
  );
};

// ===== BUTTON PARTECIPA =====

export const ButtonParticipate = ({
  onClick,
  disabled = false,
  isParticipating = false,
  disabledMessage = "Impossibile modificare partecipazione",
  size = "md",
  children,
  ...props
}) => {
  return (
    <Button
      variant={isParticipating ? "tertiary" : "primary"}
      mode="solid"
      size={size}
      onClick={onClick}
      disabled={disabled}
      disabledMessage={disabledMessage}
      title={
        isParticipating ? "Rimuovi partecipazione" : "Partecipa all'evento"
      }
      {...props}
    >
      <UserCheck size={16} />
      <span>{children || (isParticipating ? "Partecipo! ✓" : "Ci sono!")}</span>
    </Button>
  );
};

// ===== BUTTON CONFERMA EVENTO =====
export const ButtonConfirmEvent = ({
  onClick,
  disabled = false,
  isLoading = false,
  disabledMessage = "Impossibile confermare l'evento",
  size = "md",
  mode = "solid",
  children = "Conferma Evento",
  loadingText = "Confermando...",
  ...props
}) => {
  return (
    <Button
      variant="primary"
      mode={mode}
      size={size}
      onClick={onClick}
      disabled={disabled || isLoading}
      disabledMessage={disabledMessage}
      title="Conferma evento"
      {...props}
    >
      {isLoading ? (
        <>
          <div className={styles.spinner}></div>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <CheckCircle size={16} />
          <span>{children}</span>
        </>
      )}
    </Button>
  );
};

// ===== BUTTON TERMINA EVENTO =====
export const ButtonEndEvent = ({
  onClick,
  disabled = false,
  isLoading = false,
  disabledMessage = "Impossibile terminare l'evento",
  size = "md",
  mode = "solid",
  children = "Termina Evento",
  loadingText = "Terminando...",
  ...props
}) => {
  return (
    <Button
      variant="primary"
      mode={mode}
      size={size}
      onClick={onClick}
      disabled={disabled || isLoading}
      disabledMessage={disabledMessage}
      title="Termina evento"
      {...props}
    >
      {isLoading ? (
        <>
          <div className={styles.spinner}></div>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <CheckCircle size={16} />
          <span>{children}</span>
        </>
      )}
    </Button>
  );
};

// ===== BUTTON SPIN WHEEL =====

// ===== BUTTON SPIN WHEEL =====
export const ButtonSpinWheel = ({
  onClick,
  disabled = false,
  isSpinning = false,
  hasSpunToday = false,
  isBlocked = false,
  disabledMessage = "Azione non disponibile",
  size = "lg",
  mode = "solid",
  ...props
}) => {
  const getButtonText = () => {
    if (isSpinning) return "Girando...";
    if (isBlocked) return "Bloccato per 1 giorno";
    if (hasSpunToday) return "Torna domani!";
    return "GIRA ORA";
  };

  const getButtonIcon = () => {
    if (isBlocked) return <Lock size={16} />;
    if (isSpinning) return <Hourglass size={16} />;
    if (hasSpunToday) return <Check size={16} />;
    return <Dices size={16} />;
  };

  const getTitle = () => {
    if (isBlocked) return "Riprova tra 24 ore";
    if (hasSpunToday) return "Hai già girato oggi, torna domani!";
    if (isSpinning) return "La ruota sta girando...";
    return "Clicca per girare la ruota della fortuna e vincere XP!";
  };

  return (
    <Button
      variant="primary"
      mode={mode}
      size={size}
      onClick={onClick}
      disabled={disabled || hasSpunToday || isSpinning || isBlocked}
      disabledMessage={disabledMessage}
      title={getTitle()}
      {...props}
    >
      {getButtonIcon()}
      <span>{getButtonText()}</span>
      {/* <Cherry size={16} /> */}
    </Button>
  );
};
