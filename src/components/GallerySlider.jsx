import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { removePhoto } from "@/store/slices/gallerySlice";
import styles from "./GallerySlider.module.css";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const GallerySlider = ({ photos, isOwner = false }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleDeletePhoto = (photoId, event) => {
    event.stopPropagation();
    const photo = photos.find((p) => p.id === photoId);
    setPhotoToDelete(photo);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePhoto = () => {
    if (photoToDelete) {
      dispatch(removePhoto(photoToDelete.id));

      // Adjust current index if needed
      if (currentIndex >= photos.length - 1) {
        setCurrentIndex(Math.max(0, photos.length - 2));
      }

      setPhotoToDelete(null);
    }
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  if (photos.length === 0) {
    return null;
  }

  const currentPhoto = photos[currentIndex];

  return (
    <>
      {/* Main Slider */}
      <div className={styles.sliderContainer}>
        <div className={styles.mainImageContainer} onClick={openFullscreen}>
          <motion.img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.name || `Gallery photo ${currentIndex + 1}`}
            className={styles.mainImage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Delete Button (only for owner) */}
          {isOwner && (
            <button
              className={styles.deleteBtn}
              onClick={(e) => handleDeletePhoto(currentPhoto.id, e)}
              title="Delete photo"
            >
              <Trash2 size={16} />
            </button>
          )}

          {/* Photo Counter */}
          <div className={styles.photoCounter}>
            {currentIndex + 1} / {photos.length}
          </div>
        </div>

        {/* Dots Navigation */}
        {photos.length > 1 && (
          <div className={styles.dotsContainer}>
            {photos.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className={styles.thumbnailsContainer}>
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                className={`${styles.thumbnail} ${
                  index === currentIndex ? styles.activeThumbnail : ""
                }`}
                onClick={() => goToSlide(index)}
              >
                <img
                  src={photo.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={styles.thumbnailImage}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className={styles.fullscreenOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            <motion.div
              className={styles.fullscreenContainer}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className={styles.fullscreenCloseBtn}
                onClick={closeFullscreen}
              >
                <X size={24} />
              </button>

              {/* Fullscreen Image */}
              <img
                src={currentPhoto.url}
                alt={currentPhoto.name || `Gallery photo ${currentIndex + 1}`}
                className={styles.fullscreenImage}
              />

              {/* Fullscreen Navigation */}
              {photos.length > 1 && (
                <>
                  <button
                    className={`${styles.fullscreenNavBtn} ${styles.fullscreenPrevBtn}`}
                    onClick={prevSlide}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className={`${styles.fullscreenNavBtn} ${styles.fullscreenNextBtn}`}
                    onClick={nextSlide}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Fullscreen Counter */}
              <div className={styles.fullscreenCounter}>
                {currentIndex + 1} / {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPhotoToDelete(null);
        }}
        onConfirm={confirmDeletePhoto}
        photoName={photoToDelete?.name}
      />
    </>
  );
};

export default GallerySlider;
