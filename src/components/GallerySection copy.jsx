import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { Plus, Camera, ImagePlus } from "lucide-react";
import {
  selectGalleryPhotos,
  selectCanAddPhotos,
} from "@/store/slices/gallerySlice";
import GalleryModal from "./GalleryModal";
import GallerySlider from "./GallerySlider";
import styles from "./GallerySection.module.css";

function GallerySection({ isOwner = true }) {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const photos = useSelector(selectGalleryPhotos);
  const canAddPhotos = useSelector(selectCanAddPhotos);

  const handleOpenGalleryModal = () => {
    setIsGalleryModalOpen(true);
  };

  const handleCloseGalleryModal = () => {
    setIsGalleryModalOpen(false);
  };

  return (
    <>
      <div className={styles.gallerySection}>
        {/* Header */}
        <div className={styles.galleryHeader}>
          <h3 className={styles.galleryTitle}>
            {/* <span className={styles.galleryIcon}>🖼️</span> */}
            Gallery
          </h3>

          {isOwner && canAddPhotos && (
            <motion.button
              className={styles.addPhotosBtn}
              onClick={handleOpenGalleryModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Add photos to gallery"
            >
              <Plus size={16} />
              Add Photos
            </motion.button>
          )}
        </div>
        <span className={styles.gallerySubtitle}>
          (artworks • experiences • events)
        </span>

        {/* Content */}
        <div className={styles.galleryContent}>
          {photos.length > 0 ? (
            // Show Gallery Slider when photos exist
            <GallerySlider photos={photos} isOwner={isOwner} />
          ) : (
            // Show Placeholder when no photos
            <div className={styles.galleryPlaceholder}>
              {isOwner ? (
                <>
                  <div className={styles.placeholderIcon}>
                    <ImagePlus size={48} />
                  </div>
                  <div className={styles.placeholderText}>
                    <h4>Share your visual story</h4>
                    <p>
                      Add photos to showcase your artworks, experiences, and
                      memorable events
                    </p>
                  </div>
                  <motion.button
                    className={styles.placeholderBtn}
                    onClick={handleOpenGalleryModal}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Camera size={16} />
                    Add Your First Photos
                  </motion.button>
                </>
              ) : (
                <>
                  <div className={styles.placeholderIcon}>
                    <Camera size={48} />
                  </div>
                  <div className={styles.placeholderText}>
                    <h4>No photos yet</h4>
                    <p>This user hasn't shared any photos in their gallery</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Photo Count Info */}
        {photos.length > 0 && (
          <div className={styles.galleryInfo}>
            <span className={styles.photoCount}>
              {photos.length} / 3 photos
            </span>
            {isOwner && canAddPhotos && (
              <button
                className={styles.addMoreBtn}
                onClick={handleOpenGalleryModal}
              >
                Add more
              </button>
            )}
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={handleCloseGalleryModal}
      />
    </>
  );
}

export default GallerySection;
