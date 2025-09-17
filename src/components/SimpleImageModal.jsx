import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./SimpleImageModal.module.css";

const SimpleImageModal = ({
  isOpen,
  photos,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}) => {
  if (!isOpen || !photos.length) return null;

  const currentPhoto = photos[currentIndex];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Chiudi"
        >
          <X size={24} />
        </button>

        {/* Navigation Buttons */}
        {photos.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={onPrevious}
              disabled={currentIndex === 0}
              aria-label="Foto precedente"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={onNext}
              disabled={currentIndex === photos.length - 1}
              aria-label="Foto successiva"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Image */}
        <div className={styles.imageContainer}>
          <img
            src={currentPhoto.url}
            alt={currentPhoto.alt || `Gallery foto ${currentIndex + 1}`}
            className={styles.modalImage}
          />

          {/* Image Info */}
          <div className={styles.imageInfo}>
            <span className={styles.imageCounter}>
              {currentIndex + 1} di {photos.length}
            </span>
            {currentPhoto.caption && (
              <span className={styles.imageCaption}>
                {currentPhoto.caption}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleImageModal;
