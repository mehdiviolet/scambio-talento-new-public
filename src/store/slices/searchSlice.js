import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Query di ricerca
  searchQuery: "",

  // Filtri attivi
  activeMainFilter: "esperienze", // "esperienze" | "eventi"
  activeMicroFilter: "all", // "all" | "in_corso" | "in_attesa" | "finite" | "waiting" | "prossimi" | "passati" | "cancellati"

  // Risultati e stato UI
  searchResults: [], // array di esperienze/eventi filtrati
  isSearchActive: false, // se mostrare la lista risultati
  expandedCardId: null, // ID della card espansa (solo una alla volta)

  // Dropdown anteprima
  previewResults: [], // risultati per dropdown real-time
  showPreview: false, // mostra/nascondi dropdown
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Gestione query di ricerca
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Gestione filtri
    setActiveMainFilter: (state, action) => {
      state.activeMainFilter = action.payload;
      state.activeMicroFilter = "all"; // Reset micro-filtro quando cambi principale
    },

    setActiveMicroFilter: (state, action) => {
      state.activeMicroFilter = action.payload;
    },

    // Gestione risultati
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.isSearchActive = true;
    },

    setIsSearchActive: (state, action) => {
      state.isSearchActive = action.payload;
      if (!action.payload) {
        state.expandedCardId = null; // Chiudi card espanse quando nascondi ricerca
      }
    },

    // Gestione espansione cards
    setExpandedCardId: (state, action) => {
      // Se clicco sulla stessa card, la chiudo
      state.expandedCardId =
        state.expandedCardId === action.payload ? null : action.payload;
    },

    // Gestione preview dropdown
    setPreviewResults: (state, action) => {
      state.previewResults = action.payload;
    },

    setShowPreview: (state, action) => {
      state.showPreview = action.payload;
    },

    // Reset completo
    resetSearch: (state) => {
      state.searchQuery = "";
      state.activeMainFilter = "esperienze";
      state.activeMicroFilter = "all";
      state.searchResults = [];
      state.isSearchActive = false;
      state.expandedCardId = null;
      state.previewResults = [];
      state.showPreview = false;
    },
  },
});

export const {
  setSearchQuery,
  setActiveMainFilter,
  setActiveMicroFilter,
  setSearchResults,
  setIsSearchActive,
  setExpandedCardId,
  setPreviewResults,
  setShowPreview,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
