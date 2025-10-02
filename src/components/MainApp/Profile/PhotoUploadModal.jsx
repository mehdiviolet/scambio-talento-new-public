import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Camera } from "lucide-react";
// import { ButtonCancel, ButtonSave, ButtonTrash } from "./";
import extendedStyles from "./PhotoUploadModal.module.css";

import baseStyles from "../../../components/CookieModal.module.css";
import {
  Button,
  ButtonCancel,
  ButtonSave,
  ButtonTrash,
} from "@/components/ui/ButtonActions";
import { HeaderAddButton } from "@/components/ui/AddButtons";

const styles = { ...baseStyles, ...extendedStyles };

const PhotoUploadModal = ({ isOpen, onClose, currentPhoto, onPhotoUpdate }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validazione del file
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Crea preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // Simula upload - sostituisci con la tua logica di upload
      const formData = new FormData();
      formData.append("photo", selectedFile);

      // Esempio di upload (sostituisci con il tuo endpoint)
      // const response = await fetch('/api/upload-photo', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();

      // Per ora uso il preview URL come risultato
      setTimeout(() => {
        onPhotoUpdate(previewUrl);
        handleClose();
        setIsUploading(false);
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload photo");
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoUpdate(null); // Rimuove la foto
    handleClose();
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsUploading(false);
    onClose();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
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
              <h3>Update Profile Photo</h3>
              <button className={styles.closeButton} onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
              {/* Current/Preview Photo */}
              <div className={styles.photoPreview}>
                {previewUrl || currentPhoto ? (
                  <img
                    src={previewUrl || currentPhoto}
                    alt="Profile preview"
                    className={styles.previewImage}
                  />
                ) : (
                  <div className={styles.placeholderPhoto}>
                    <Camera size={48} />
                    <span>No photo selected</span>
                  </div>
                )}
              </div>

              {/* File Input (hidden) */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: "none" }}
              />

              {/* Action Buttons */}
              <div className={styles.actions}>
                {/* <motion.button
                  className={styles.uploadBtn}
                  onClick={triggerFileInput}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isUploading}
                  >
                  <Upload size={16} />
                  Choose Photo
                  </motion.button> */}
                <Button onClick={triggerFileInput}>Choose Photo</Button>

                {currentPhoto && (
                  <ButtonTrash
                    onClick={handleRemovePhoto}
                    disabled={isUploading}
                    mode="outline"
                  >
                    Elimina Photo
                  </ButtonTrash>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <ButtonCancel onClick={handleClose} disabled={isUploading} />

              <ButtonSave
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                disabledMessage="Seleziona una foto "
              >
                {isUploading ? "Uploading..." : "Save Photo"}
              </ButtonSave>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoUploadModal;
