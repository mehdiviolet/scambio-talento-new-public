import React from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setActiveMainFilter,
  setActiveMicroFilter,
  setSearchResults,
  setIsSearchActive,
  setExpandedCardId,
  setPreviewResults,
  setShowPreview,
  resetSearch,
} from "@/store/slices/searchSlice";
import { extendedMockupExperiences } from "@/mockup/extendedMockupExperiences";

const SearchAdvanced = () => {
  const dispatch = useDispatch();
  const {
    searchQuery,
    activeMainFilter,
    activeMicroFilter,
    searchResults,
    isSearchActive,
    expandedCardId,
    previewResults,
    showPreview,
  } = useSelector((state) => state.search);

  // 🎯 Micro-filtri disponibili per ogni categoria
  const microFilters = {
    esperienze: [
      { value: "all", label: "All" },
      { value: "in_corso", label: "In Corso" },
      { value: "in_attesa", label: "In Attesa" },
      { value: "finite", label: "Finite" },
      { value: "waiting", label: "Waiting" },
    ],
    eventi: [
      { value: "all", label: "All" },
      { value: "prossimi", label: "Prossimi" },
      { value: "in_corso", label: "In Corso" },
      { value: "passati", label: "Passati" },
      { value: "cancellati", label: "Cancellati" },
    ],
  };

  // 🎯 Funzione di ricerca nelle esperienze
  const searchInExperiences = (query) => {
    return extendedMockupExperiences.filter((experience) => {
      const searchTerms = [
        experience.title,
        experience.skillName,
        experience.skillDetail,
        experience.descrizione,
      ]
        .join(" ")
        .toLowerCase();

      return searchTerms.includes(query.toLowerCase());
    });
  };

  // 🎯 Funzione per filtrare per status
  const filterByStatus = (items, status) => {
    if (status === "all") return items;
    return items.filter((item) => item.status === status);
  };

  // 🎯 Gestisce cambio input ricerca
  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));

    if (query.length > 0) {
      // Mostra anteprima real-time
      const results = searchInExperiences(query);
      dispatch(setPreviewResults(results.slice(0, 5))); // Max 5 per dropdown
      dispatch(setShowPreview(true));
    } else {
      dispatch(setShowPreview(false));
      dispatch(setPreviewResults([]));
    }
  };

  // 🎯 Gestisce click pulsante cerca o ENTER
  const handleSearch = (
    customMainFilter = null,
    customMicroFilter = null,
    customQuery = null
  ) => {
    // Usa valori custom se forniti, altrimenti usa stato attuale
    const mainFilter = customMainFilter || activeMainFilter;
    const microFilter = customMicroFilter || activeMicroFilter;
    const query = customQuery !== null ? customQuery : searchQuery;

    let results = [];

    if (mainFilter === "esperienze") {
      // Se c'è una query, cerca; altrimenti prendi tutto
      results = query.trim()
        ? searchInExperiences(query)
        : [...extendedMockupExperiences];
    } else {
      // TODO: Cerca negli eventi quando avremo i mockup
      results = [];
    }

    // Applica micro-filtro
    results = filterByStatus(results, microFilter);

    dispatch(setSearchResults(results));
    dispatch(setIsSearchActive(true));
    dispatch(setShowPreview(false));
  };

  // 🎯 Gestisce ENTER key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Reset micro-filtro ad "all" quando faccio nuova ricerca
      dispatch(setActiveMicroFilter("all"));
      handleSearch(null, "all", null);
    }
  };

  // 🎯 Gestisce click su filtro principale
  const handleMainFilterChange = (filter) => {
    dispatch(setActiveMainFilter(filter));
    // Passa il nuovo valore direttamente alla ricerca
    handleSearch(filter, null, null);
  };

  // 🎯 Gestisce click su micro-filtro
  const handleMicroFilterChange = (filter) => {
    dispatch(setActiveMicroFilter(filter));
    // Passa il nuovo valore direttamente alla ricerca
    handleSearch(null, filter, null);
  };

  // 🎯 Gestisce click su anteprima dropdown
  const handlePreviewClick = (item) => {
    dispatch(setSearchQuery(item.title));
    dispatch(setShowPreview(false));
    handleSearch();
  };

  // 🎯 Gestisce espansione card
  const handleCardClick = (cardId) => {
    dispatch(setExpandedCardId(cardId));
  };

  return (
    <div>
      {/* INPUT DI RICERCA */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Cerca esperienze o eventi..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={() => {
            // Reset micro-filtro ad "all" quando faccio nuova ricerca
            dispatch(setActiveMicroFilter("all"));
            handleSearch(null, "all", null);
          }}
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#2c5aa0",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          <Search size={16} />
        </button>

        {/* DROPDOWN ANTEPRIMA */}
        {showPreview && previewResults.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              zIndex: 1000,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {previewResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handlePreviewClick(item)}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <div>
                  {item.icon} {item.title}
                </div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {item.costo} XP • {item.modalita}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FILTRI PRINCIPALI */}
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => handleMainFilterChange("esperienze")}
          style={{
            padding: "10px 20px",
            marginRight: "8px",
            border: "2px solid #2c5aa0",
            borderRadius: "20px",
            background:
              activeMainFilter === "esperienze" ? "#2c5aa0" : "transparent",
            color: activeMainFilter === "esperienze" ? "white" : "#2c5aa0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ESPERIENZE
        </button>

        <button
          onClick={() => handleMainFilterChange("eventi")}
          style={{
            padding: "10px 20px",
            border: "2px solid #e67e22",
            borderRadius: "20px",
            background:
              activeMainFilter === "eventi" ? "#e67e22" : "transparent",
            color: activeMainFilter === "eventi" ? "white" : "#e67e22",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          EVENTI
        </button>
      </div>

      {/* MICRO-FILTRI */}
      <div style={{ marginBottom: "20px" }}>
        {microFilters[activeMainFilter].map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleMicroFilterChange(filter.value)}
            style={{
              padding: "6px 12px",
              marginRight: "8px",
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "16px",
              background:
                activeMicroFilter === filter.value ? "#f0f0f0" : "transparent",
              color: activeMicroFilter === filter.value ? "#333" : "#666",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* LISTA RISULTATI */}
      {isSearchActive && (
        <div>
          <h3>Risultati ({searchResults.length})</h3>

          {searchResults.length === 0 ? (
            <p style={{ color: "#999", fontStyle: "italic" }}>
              Nessun risultato trovato per "{searchQuery}"
            </p>
          ) : (
            searchResults.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  overflow: "hidden",
                }}
              >
                {/* HEADER CARD (sempre visibile) */}
                <div
                  onClick={() => handleCardClick(item.id)}
                  style={{
                    padding: "16px",
                    cursor: "pointer",
                    backgroundColor: "#fafafa",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#fafafa")
                  }
                >
                  <h4 style={{ margin: 0, color: "#2c5aa0" }}>
                    {item.icon} {item.title}
                  </h4>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginTop: "4px",
                    }}
                  >
                    {item.costo} XP • {item.lezioni} lezioni • {item.modalita} •
                    Status: {item.status}
                  </div>
                </div>

                {/* DETTAGLI ESPANSI */}
                {expandedCardId === item.id && (
                  <div
                    style={{
                      padding: "16px",
                      borderTop: "1px solid #eee",
                      backgroundColor: "white",
                    }}
                  >
                    <p style={{ margin: "0 0 12px 0" }}>{item.descrizione}</p>

                    <div style={{ fontSize: "14px", color: "#666" }}>
                      <div>⏰ Durata: {item.durataLezione}</div>
                      <div>🗣️ Lingua: {item.lingua}</div>
                      <div>
                        ⭐ Rating: {item.rating} ({item.totalBookings}{" "}
                        prenotazioni)
                      </div>
                      <div>
                        📅 Creato:{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAdvanced;
