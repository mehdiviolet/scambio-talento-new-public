// // components/notifications/ToastContainer.jsx
// import React from "react";
// import { useSelector } from "react-redux";
// import { selectToastsByRole } from "@/store/slices/notificationSlice";
// import Toast from "./Toast";
// import styles from "./ToastContainer.module.css";

// const ToastContainer = ({ role = "viewer" }) => {
//   const toasts = useSelector(selectToastsByRole(role));

//   if (toasts.length === 0) return null;

//   return (
//     <div className={`${styles.toastContainer} ${styles[`container_${role}`]}`}>
//       {toasts.map((toast) => (
//         <Toast
//           key={toast.id}
//           toast={toast}
//           role={role} // 🎯 Passa role per styling specifico
//         />
//       ))}
//     </div>
//   );
// };

// export default ToastContainer;
