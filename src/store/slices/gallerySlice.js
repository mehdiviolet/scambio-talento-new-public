import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: [], // Array di oggetti foto: { id, url, name, uploadDate }
  isLoading: false,
  error: null,
  maxPhotos: 3,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addPhotos: (state, action) => {
      // action.payload è un array di nuove foto
      const newPhotos = action.payload;
      const remainingSlots = state.maxPhotos - state.photos.length;

      // Aggiungi solo le foto che ci stanno nel limite
      const photosToAdd = newPhotos.slice(0, remainingSlots);

      photosToAdd.forEach((photo) => {
        state.photos.push({
          id: Date.now() + Math.random(), // ID temporaneo
          url: photo.url,
          name: photo.name,
          uploadDate: new Date().toISOString(),
        });
      });
    },
    removePhoto: (state, action) => {
      const photoId = action.payload;
      state.photos = state.photos.filter((photo) => photo.id !== photoId);
    },
    updatePhoto: (state, action) => {
      const { id, updates } = action.payload;
      const photoIndex = state.photos.findIndex((photo) => photo.id === id);
      if (photoIndex !== -1) {
        state.photos[photoIndex] = { ...state.photos[photoIndex], ...updates };
      }
    },
    clearGallery: (state) => {
      state.photos = [];
    },
    reorderPhotos: (state, action) => {
      // Per future funzionalità di drag & drop
      state.photos = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  addPhotos,
  removePhoto,
  updatePhoto,
  clearGallery,
  reorderPhotos,
} = gallerySlice.actions;

// Selectors
export const selectGalleryPhotos = (state) => state.gallery.photos;
export const selectGalleryLoading = (state) => state.gallery.isLoading;
export const selectGalleryError = (state) => state.gallery.error;
export const selectCanAddPhotos = (state) =>
  state.gallery.photos.length < state.gallery.maxPhotos;
export const selectRemainingSlots = (state) =>
  state.gallery.maxPhotos - state.gallery.photos.length;

export default gallerySlice.reducer;
