import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import styles from "./ConfirmDeleteModal.module.css";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, photoName }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.titleSection}>
                <div className={styles.iconContainer}>
                  <AlertTriangle size={24} />
                </div>
                <h3>Delete Photo</h3>
              </div>
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
              <p className={styles.message}>
                Are you sure you want to delete this photo?
              </p>
              {photoName && <p className={styles.photoName}>"{photoName}"</p>}
              <p className={styles.warning}>This action cannot be undone.</p>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <button className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              <motion.button
                className={styles.deleteBtn}
                onClick={handleConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 size={16} />
                Delete Photo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
