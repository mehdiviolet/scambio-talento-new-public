// components/notifications/Toast.jsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideToast } from "@/store/slices/notificationSlice";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import styles from "./Toast.module.css";

const Toast = ({ toast, role }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      // 🎯 PERFORMANCE: Rimozione mirata
      dispatch(hideToast({ id: toast.id, role }));
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [dispatch, toast.id, toast.duration, role]);

  const handleClose = () => {
    dispatch(hideToast({ id: toast.id, role }));
  };

  const getRoleTheme = () => {
    const themes = {
      owner: { primary: "#3b82f6", secondary: "#dbeafe" },
      viewer: { primary: "#10b981", secondary: "#d1fae5" },
    };
    return themes[role] || themes.viewer;
  };

  const theme = getRoleTheme();

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <AlertCircle size={20} />;
      case "warning":
        return <AlertTriangle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div
      className={`${styles.toast} ${styles[toast.type]}`}
      style={{
        borderLeft: `4px solid ${theme.primary}`,
        backgroundColor: theme.secondary,
      }}
    >
      <div className={styles.toastIcon} style={{ color: theme.primary }}>
        {getIcon()}
      </div>
      <div className={styles.toastMessage}>{toast.message}</div>
      <button className={styles.toastClose} onClick={handleClose}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
