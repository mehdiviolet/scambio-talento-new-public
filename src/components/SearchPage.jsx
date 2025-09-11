// SearchPage.jsx - VERSIONE CORRETTA CON SELEZIONE UNIFICATA
import React, { useState } from "react";
import { Search, User, List } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SlideDrawer from "./SlideDrawer";
import { useSlideDrawer } from "../hooks/useSlideDrawer";
import ProfileHeaderMockup from "./ProfileHeaderMockup";
import SkillMockup from "./SkillMockup";
import ExperiencesMockupRedux from "./ExperiencesMockupRedux";
import ExperiencesSectionStudenteTest from "./ExperiencesSectionStudenteTest";
import EventSectionTest from "./EventSectionTest";
import { setSelectedPersonData } from "@/store/slices/experienceSliceTest";
import { setSelectedOwner } from "@/store/slices/chatSlice";
import searchStyles from "./SearchPage.module.css";

// Lista di persone (come nel codice originale)
const peopleList = [
  {
    firstName: "Sara",
    lastName: "Dormand",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Marco",
    lastName: "Rossi",
    photo: "/images/people/marco-ro.jpg",
  },
  {
    firstName: "Sara",
    lastName: "Bianchi",
    photo: "/images/people/laura-la.jpg",
  },
  {
    firstName: "Sara",
    lastName: "Ferrari",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Marco",
    lastName: "Verdi",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Marco",
    lastName: "Neri",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Anna",
    lastName: "Romano",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Anna",
    lastName: "Conti",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Luca",
    lastName: "Moretti",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Luca",
    lastName: "Ricci",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Giulia",
    lastName: "Colombo",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Giulia",
    lastName: "Esposito",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Alessandro",
    lastName: "Gallo",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Francesca",
    lastName: "Marino",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Federico",
    lastName: "De Luca",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Chiara",
    lastName: "Santoro",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Matteo",
    lastName: "Caruso",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Elena",
    lastName: "Greco",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Andrea",
    lastName: "Leone",
    photo: "/images/people/sara-dormand.jpg",
  },
  {
    firstName: "Valentina",
    lastName: "Bruno",
    photo: "/images/people/sara-dormand.jpg",
  },
];

const SearchPage = () => {
  const dispatch = useDispatch();

  // State per la ricerca
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPersonForDrawer, setSelectedPersonForDrawer] = useState(null);

  // State per la modalità lista in pagina
  const [showPageList, setShowPageList] = useState(false);
  const [frozenSuggestions, setFrozenSuggestions] = useState([]);

  // Hook per gestire il slide drawer
  const { isOpen, openDrawer, closeDrawer } = useSlideDrawer();

  // Selettori Redux
  const skillGemBonus = useSelector(
    (state) => state.experienceSliceTest.skillGemBonus || {}
  );

  const selectedPersonData = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData
  );

  // Calcola skills con GEM aggiornati
  const updatedSkills = selectedPersonData.skills.map((skill) => ({
    ...skill,
    gems: skill.gems + (skillGemBonus[skill.id] || 0),
  }));

  // Handler per il cambiamento della ricerca
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Se digiti una nuova lettera, esci dalla modalità lista
    if (showPageList) {
      setShowPageList(false);
      setFrozenSuggestions([]);
    }

    if (query.length > 0) {
      const filtered = peopleList.filter(
        (person) =>
          person.firstName.toLowerCase().includes(query.toLowerCase()) ||
          person.lastName.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      // Reset Redux state quando la ricerca è vuota
      handleClearSelection();
    }
  };

  // Handler per il pulsante lista
  const handleListButtonClick = () => {
    if (suggestions.length > 0) {
      // Congela i suggerimenti attuali
      setFrozenSuggestions([...suggestions]);
      // Attiva modalità lista in pagina
      setShowPageList(true);
      // Nascondi dropdown
      setShowSuggestions(false);
    }
  };

  // Handler per click su suggerimento - VERSIONE UNIFICATA
  const handleSuggestionClick = (person) => {
    console.log("Selecting person:", person);

    // 1. Salva la persona selezionata per il drawer
    setSelectedPersonForDrawer(person);

    // 2. UNIFICA LE DUE DISPATCH IN UNA FUNZIONE
    handlePersonSelection(person);

    // 3. Pulisci ricerca e suggerimenti
    setSearchQuery(`${person.firstName} ${person.lastName}`);
    setShowSuggestions(false);
    setShowPageList(false);
    setFrozenSuggestions([]);

    // 4. Apri il slide drawer con animazione
    openDrawer();
  };

  // NUOVA FUNZIONE UNIFICATA per selezione persona
  const handlePersonSelection = (person) => {
    // Validazione input
    if (!person?.firstName || !person?.lastName) {
      console.error("Invalid person data:", person);
      return;
    }

    // 1. Aggiorna experienceSliceTest (per skills e experiences)
    dispatch(
      setSelectedPersonData({
        firstName: person.firstName,
        lastName: person.lastName,
        photo: person.photo,
      })
    );

    // 2. Aggiorna chatSlice (per conversazioni)
    dispatch(
      setSelectedOwner({
        firstName: person.firstName,
        lastName: person.lastName,
        profilePhoto: person.photo,
      })
    );

    console.log("Person selection updated in both slices");
  };

  // NUOVA FUNZIONE per pulire selezione
  const handleClearSelection = () => {
    dispatch(
      setSelectedPersonData({
        firstName: "",
        lastName: "",
        photo: null,
      })
    );

    dispatch(
      setSelectedOwner({
        firstName: "",
        lastName: "",
        profilePhoto: null,
      })
    );

    console.log("Selection cleared from both slices");
  };

  // Handler per chiudere il drawer
  const handleCloseDrawer = () => {
    closeDrawer();

    // Pulisci UI state dopo un delay per evitare flickering
    setTimeout(() => {
      setSelectedPersonForDrawer(null);
      setSearchQuery("");
      setShowPageList(false);
      setFrozenSuggestions([]);

      // OPZIONALE: Pulisci anche Redux state
      // handleClearSelection();
    }, 300);
  };

  return (
    <div className={searchStyles.searchContainer}>
      {/* Barra di ricerca principale con pulsante */}
      <div className={searchStyles.searchInputContainer}>
        <input
          type="text"
          placeholder="Cerca persone..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={searchStyles.searchInput}
          onFocus={() =>
            searchQuery && !showPageList && setShowSuggestions(true)
          }
        />
        <button
          className={searchStyles.listButton}
          onClick={handleListButtonClick}
          disabled={suggestions.length === 0}
        >
          <Search size={20} />
        </button>
      </div>

      {/* Dropdown suggerimenti (solo se NON in modalità lista) */}
      {showSuggestions && !showPageList && suggestions.length > 0 && (
        <div>
          {suggestions.map((person, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(person)}
              className={searchStyles.suggestionItem}
            >
              <div className={searchStyles.suggestionAvatar}>
                <User size={20} />
              </div>
              <div className={searchStyles.suggestionInfo}>
                <div className={searchStyles.suggestionName}>
                  {person.firstName} {person.lastName}
                </div>
                <div className={searchStyles.suggestionUsername}>
                  @{person.firstName.toLowerCase()}
                  {person.lastName.toLowerCase().slice(0, 3)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lista in pagina (modalità congelata) */}
      {showPageList && frozenSuggestions.length > 0 && (
        <div className={searchStyles.pageList}>
          <div className={searchStyles.pageListHeader}>
            <h3>Risultati di ricerca ({frozenSuggestions.length})</h3>
          </div>
          <div className={searchStyles.pageListContent}>
            {frozenSuggestions.map((person, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(person)}
                className={searchStyles.pageListItem}
              >
                <div className={searchStyles.suggestionAvatar}>
                  <User size={24} />
                </div>
                <div className={searchStyles.suggestionInfo}>
                  <div className={searchStyles.suggestionName}>
                    {person.firstName} {person.lastName}
                  </div>
                  <div className={searchStyles.suggestionUsername}>
                    @{person.firstName.toLowerCase()}
                    {person.lastName.toLowerCase().slice(0, 3)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messaggio quando nessun risultato */}
      {showSuggestions &&
        !showPageList &&
        suggestions.length === 0 &&
        searchQuery && (
          <div className={searchStyles.noResults}>
            <p>Nessun risultato trovato per "{searchQuery}"</p>
          </div>
        )}

      {/* Slide Drawer per visualizzare profilo selezionato */}
      <SlideDrawer
        isOpen={isOpen}
        onClose={handleCloseDrawer}
        title={
          selectedPersonForDrawer
            ? `${selectedPersonForDrawer.firstName} ${selectedPersonForDrawer.lastName}`
            : "Profilo"
        }
      >
        {/* Content del drawer - caricato solo quando drawer è aperto */}
        {isOpen && selectedPersonData.profile.firstName && (
          <>
            <div className={searchStyles.profilePage}>
              <div className={searchStyles.profileContainer}>
                <ProfileHeaderMockup
                  selectedPerson={selectedPersonData.profile}
                  isInstructorPanel={false}
                />
                <SkillMockup
                  mockSkills={updatedSkills}
                  selectedPersonData={selectedPersonData}
                />
                <ExperiencesMockupRedux
                  isInstructorPanel={false}
                  mockSkills={updatedSkills}
                  mockExperiencesNew={selectedPersonData.experiences}
                />
                <ExperiencesSectionStudenteTest />
                <EventSectionTest
                  isOwner={false}
                  selectedPersonData={selectedPersonData}
                />
              </div>
            </div>
          </>
        )}

        {/* Loading state */}
        {isOpen && !selectedPersonData.profile.firstName && (
          <div className={searchStyles.loadingState}>
            <p>Caricamento profilo...</p>
          </div>
        )}
      </SlideDrawer>
    </div>
  );
};

export default SearchPage;
