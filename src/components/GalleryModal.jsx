import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Camera, Trash2, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPhotos,
  selectRemainingSlots,
  setLoading,
} from "@/store/slices/gallerySlice";
import styles from "./GalleryModal.module.css";

const GalleryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const remainingSlots = useSelector(selectRemainingSlots);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) return;

    // Filtra solo immagini e rispetta il limite
    const validFiles = files
      .filter((file) => file.type.startsWith("image/"))
      .filter((file) => file.size <= 5 * 1024 * 1024) // 5MB limit
      .slice(0, remainingSlots);

    if (validFiles.length !== files.length) {
      alert(
        `Only ${validFiles.length} files were selected. Check file types and size limits.`
      );
    }

    setSelectedFiles(validFiles);

    // Crea preview per tutti i file
    const previews = [];
    let loadedCount = 0;

    validFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews[index] = {
          id: `preview-${Date.now()}-${index}`,
          url: e.target.result,
          name: file.name,
          file: file,
        };
        loadedCount++;

        if (loadedCount === validFiles.length) {
          setPreviewUrls([...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    dispatch(setLoading(true));

    try {
      // Simula upload - sostituisci con la tua logica di upload
      const uploadPromises = selectedFiles.map(async (file, index) => {
        const formData = new FormData();
        formData.append("photo", file);

        // Simulated upload delay
        await new Promise((resolve) => setTimeout(resolve, 500 + index * 200));

        // Return the preview URL for now (in real app, return server URL)
        return {
          url: previewUrls[index].url,
          name: file.name,
        };
      });

      const uploadedPhotos = await Promise.all(uploadPromises);

      // Dispatch alle foto caricate
      dispatch(addPhotos(uploadedPhotos));

      handleClose();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload photos");
    } finally {
      setIsUploading(false);
      dispatch(setLoading(false));
    }
  };

  const handleRemovePreview = (previewId) => {
    const updatedPreviews = previewUrls.filter(
      (preview) => preview.id !== previewId
    );
    const updatedFiles = selectedFiles.filter(
      (_, index) => previewUrls[index]?.id !== previewId
    );

    setPreviewUrls(updatedPreviews);
    setSelectedFiles(updatedFiles);
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
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
              <h3>Add Gallery Photos</h3>
              <div className={styles.headerInfo}>
                <span className={styles.slotInfo}>
                  {remainingSlots} slots remaining
                </span>
                <button className={styles.closeBtn} onClick={handleClose}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
              {/* Preview Grid */}
              {previewUrls.length > 0 ? (
                <div className={styles.previewGrid}>
                  {previewUrls.map((preview) => (
                    <div key={preview.id} className={styles.previewItem}>
                      <img
                        src={preview.url}
                        alt={preview.name}
                        className={styles.previewImage}
                      />
                      <button
                        className={styles.removePreviewBtn}
                        onClick={() => handleRemovePreview(preview.id)}
                        disabled={isUploading}
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className={styles.fileName}>{preview.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <Camera size={48} />
                  <span>Select photos to add to your gallery</span>
                  <small>
                    Maximum {remainingSlots} photos • JPG, PNG • Max 5MB each
                  </small>
                </div>
              )}

              {/* File Input (hidden) */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                multiple
                style={{ display: "none" }}
              />

              {/* Upload Button */}
              {remainingSlots > 0 && (
                <motion.button
                  className={styles.selectBtn}
                  onClick={triggerFileInput}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isUploading}
                >
                  <Plus size={16} />
                  Select Photos ({remainingSlots} remaining)
                </motion.button>
              )}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <button
                className={styles.cancelBtn}
                onClick={handleClose}
                disabled={isUploading}
              >
                Cancel
              </button>
              <motion.button
                className={styles.saveBtn}
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || isUploading}
                whileHover={
                  selectedFiles.length === 0 || isUploading
                    ? {}
                    : { scale: 1.02 }
                }
                whileTap={
                  selectedFiles.length === 0 || isUploading
                    ? {}
                    : { scale: 0.98 }
                }
              >
                {isUploading
                  ? "Uploading..."
                  : `Add ${selectedFiles.length} Photo${
                      selectedFiles.length !== 1 ? "s" : ""
                    }`}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
