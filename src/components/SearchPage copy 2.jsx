// SearchPage.jsx - VERSIONE CORRETTA CON SELEZIONE UNIFICATA
import React, { useState } from "react";
import {
  Search,
  User,
  List,
  Activity,
  Star,
  Cookie,
  ChevronLeft,
  X,
  Gem,
  Shield,
} from "lucide-react";
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
import ActivityModalTest from "./ActivityModalTest";
import CookieModal from "./CookieModal";
import StarModal from "./StarModal";
import { selectDemoState, selectUserXP } from "@/services/xpService";
import SlideDrawerSearch from "./SlideDrawerSearch";

// Lista di persone (come nel codice originale)
const peopleList = [
  {
    firstName: "Sara",
    lastName: "Dormand",
    photo: "/images/people/sarad.jpg",
    gems: 145,
    trustScore: 85,
    participationScore: 92,
    activityStreak: 12,
  },
  {
    firstName: "Marco",
    lastName: "Rossi",
    photo: "/images/people/marcor.png",
    gems: 78,
    trustScore: 72,
    participationScore: 68,
    activityStreak: 5,
  },
  {
    firstName: "Sara",
    lastName: "Bianchi",
    photo: "/images/people/sarab.png",
    gems: 123,
    trustScore: 90,
    participationScore: 85,
    activityStreak: 8,
  },
  {
    firstName: "Sara",
    lastName: "Ferrari",
    photo: "/images/people/saraf.jpg",
    gems: 56,
    trustScore: 65,
    participationScore: 70,
    activityStreak: 3,
  },
  {
    firstName: "Marco",
    lastName: "Verdi",
    photo: "/images/people/marcov.png",
    gems: 91,
    trustScore: 78,
    participationScore: 74,
    activityStreak: 6,
  },
  {
    firstName: "Marco",
    lastName: "Neri",
    photo: "/images/people/marcon.png",
    gems: 102,
    trustScore: 81,
    participationScore: 79,
    activityStreak: 9,
  },
  {
    firstName: "Anna",
    lastName: "Romano",
    photo: "/images/people/annar.png",
    gems: 134,
    trustScore: 88,
    participationScore: 91,
    activityStreak: 11,
  },
  {
    firstName: "Anna",
    lastName: "Conti",
    photo: "/images/people/annac.png",
    gems: 67,
    trustScore: 70,
    participationScore: 66,
    activityStreak: 4,
  },
  {
    firstName: "Luca",
    lastName: "Moretti",
    photo: "/images/people/lucam.png",
    gems: 156,
    trustScore: 93,
    participationScore: 95,
    activityStreak: 15,
  },
  {
    firstName: "Luca",
    lastName: "Ricci",
    photo: "/images/people/lucar.png",
    gems: 45,
    trustScore: 62,
    participationScore: 58,
    activityStreak: 2,
  },
  {
    firstName: "Giulia",
    lastName: "Colombo",
    photo: "/images/people/giuliac.png",
    gems: 118,
    trustScore: 84,
    participationScore: 82,
    activityStreak: 7,
  },
  {
    firstName: "Giulia",
    lastName: "Esposito",
    photo: "/images/people/giuliae.png",
    gems: 89,
    trustScore: 76,
    participationScore: 73,
    activityStreak: 5,
  },
  {
    firstName: "Alessandro",
    lastName: "Gallo",
    photo: "/images/people/alessandrog.png",
    gems: 167,
    trustScore: 95,
    participationScore: 97,
    activityStreak: 18,
  },
  {
    firstName: "Francesca",
    lastName: "Marino",
    photo: "/images/people/francescam.png",
    gems: 73,
    trustScore: 71,
    participationScore: 69,
    activityStreak: 4,
  },
  {
    firstName: "Federico",
    lastName: "De Luca",
    photo: "/images/people/federicod.png",
    gems: 142,
    trustScore: 87,
    participationScore: 89,
    activityStreak: 10,
  },
  {
    firstName: "Chiara",
    lastName: "Santoro",
    photo: "/images/people/chiaras.png",
    gems: 98,
    trustScore: 79,
    participationScore: 77,
    activityStreak: 6,
  },
  {
    firstName: "Matteo",
    lastName: "Caruso",
    photo: "/images/people/matteoc.png",
    gems: 125,
    trustScore: 86,
    participationScore: 84,
    activityStreak: 9,
  },
  {
    firstName: "Elena",
    lastName: "Greco",
    photo: "/images/people/elenag.png",
    gems: 61,
    trustScore: 68,
    participationScore: 64,
    activityStreak: 3,
  },
  {
    firstName: "Andrea",
    lastName: "Leone",
    photo: "/images/people/andreal.png",
    gems: 179,
    trustScore: 96,
    participationScore: 98,
    activityStreak: 20,
  },
  {
    firstName: "Valentina",
    lastName: "Bruno",
    photo: "/images/people/valentinab.png",
    gems: 112,
    trustScore: 83,
    participationScore: 81,
    activityStreak: 8,
  },
];

const SearchPage = () => {
  const dispatch = useDispatch();

  // State per la ricerca
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPersonForDrawer, setSelectedPersonForDrawer] = useState(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isStarteModalOpen, setsStarteModalOpen] = useState(false);
  // State per la modalità lista in pagina
  const [showPageList, setShowPageList] = useState(false);
  const [frozenSuggestions, setFrozenSuggestions] = useState([]);

  // Hook per gestire il slide drawer
  const { isOpen, openDrawer, closeDrawer } = useSlideDrawer();

  const saraXP = useSelector(selectUserXP("sara"));
  const demoState = useSelector(selectDemoState);

  const userXP = saraXP + demoState.dayXP;

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

  const renderGameHUD = () => {
    return (
      <div className={searchStyles.gameHud}>
        <div className={searchStyles.hudTop}>
          {/* Lato sinistro - Freccia indietro (solo se drawer aperto) */}
          <div className={searchStyles.hudLeft}>
            {isOpen && (
              <button
                className={searchStyles.drawerBackBtn}
                onClick={handleCloseDrawer}
              >
                <ChevronLeft size={24} />
              </button>
            )}
          </div>

          {/* Centro - Titolo (solo se drawer aperto) */}
          {isOpen && (
            <div className={searchStyles.hudCenter}>
              <h2 className={searchStyles.drawerTitle}>
                {selectedPersonForDrawer
                  ? `${selectedPersonForDrawer.firstName} ${selectedPersonForDrawer.lastName}`
                  : "Profilo"}
              </h2>
            </div>
          )}

          {/* Lato destro - Icone sempre visibili */}
          <div className={searchStyles.hudRight}>
            <div
              className={`${searchStyles.hudLevel} ${searchStyles.clickable}`}
              onClick={() => setIsCookieModalOpen(true)}
            >
              <Cookie style={{ color: "var(--text-secondary)" }} />
            </div>
            <div
              className={`${searchStyles.hudAchievements} ${searchStyles.clickable}`}
              onClick={() => setsStarteModalOpen(true)}
            >
              <Star style={{ color: "var(--text-secondary)" }} />
            </div>
            <div
              className={`${searchStyles.hudAchievements} ${searchStyles.clickable}`}
              onClick={() => setIsActivityModalOpen(true)}
            >
              <Activity style={{ color: "var(--text-secondary)" }} />
            </div>
            {/* {isOpen && (
              <button
                className={searchStyles.drawerCloseBtn}
                onClick={handleCloseDrawer}
              >
                <X size={20} />
              </button>
            )} */}
          </div>
        </div>
      </div>
    );
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
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={`${person.firstName} ${person.lastName}`}
                    className={searchStyles.avatarImage}
                  />
                ) : (
                  <User size={20} />
                )}
              </div>
              <div className={searchStyles.suggestionInfo}>
                <div className={searchStyles.suggestionName}>
                  {person.firstName} {person.lastName}
                </div>
                {/* <div className={searchStyles.suggestionUsername}>
                  @{person.firstName.toLowerCase()}
                  {person.lastName.toLowerCase().slice(0, 3)}
                </div> */}
                <div className={searchStyles.suggestionStats}>
                  <span>
                    <Gem size={12} /> {person.gems}
                  </span>
                  <span>
                    <Star size={12} /> {person.trustScore}
                  </span>
                  <span>
                    <Shield size={12} /> {person.participationScore}
                  </span>
                  <span>
                    <Activity size={12} /> {person.activityStreak}
                  </span>
                </div>
                {/* <div className={searchStyles.suggestionUsername}>
                  <span>coding: 20</span>
                  <span>Design: 85</span>
                </div> */}
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
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={`${person.firstName} ${person.lastName}`}
                      className={searchStyles.avatarImage}
                    />
                  ) : (
                    <User size={24} />
                  )}
                </div>
                <div className={searchStyles.suggestionInfo}>
                  <div className={searchStyles.suggestionName}>
                    {person.firstName} {person.lastName}
                  </div>
                  <div className={searchStyles.suggestionStats}>
                    <span>
                      <Gem size={12} /> {person.gems}
                    </span>
                    <span>
                      <Star size={12} /> {person.trustScore}
                    </span>
                    <span>
                      <Shield size={12} /> {person.participationScore}
                    </span>
                    <span>
                      <Activity size={12} /> {person.activityStreak}
                    </span>
                  </div>
                  {/* <div className={searchStyles.suggestionUsername}>
                    @{person.firstName.toLowerCase()}
                    {person.lastName.toLowerCase().slice(0, 3)}
                  </div> */}
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
      <SlideDrawerSearch
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
          <div className={searchStyles.screenBg}>
            <div className={searchStyles.cardApp}>
              {renderGameHUD()}
              <div className={searchStyles.contentArea}>
                <div className={searchStyles.profilePage}>
                  <div className={searchStyles.profileContainer}>
                    <ProfileHeaderMockup
                      selectedPerson={selectedPersonData.profile}
                      isInstructorPanel={false}
                    />
                    <SkillMockup
                      mockSkills={updatedSkills}
                      selectedPersonData={selectedPersonData}
                      isInstructorPanel={false}
                    />
                    <ExperiencesMockupRedux
                      isInstructorPanel={false}
                      mockSkills={updatedSkills}
                      mockExperiencesNew={selectedPersonData.experiences}
                    />
                    <EventSectionTest
                      isInstructorPanel={false}
                      isOwner={false}
                      selectedPersonData={selectedPersonData}
                    />
                    <ExperiencesSectionStudenteTest />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isOpen && !selectedPersonData.profile.firstName && (
          <div className={searchStyles.loadingState}>
            <p>Caricamento profilo...</p>
          </div>
        )}
      </SlideDrawerSearch>
      {/* Activity Modal */}
      <ActivityModalTest
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />
      <CookieModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
        userXP={userXP}
      />
      <StarModal
        isOpen={isStarteModalOpen}
        onClose={() => setsStarteModalOpen(false)}
        userStars={userXP}
      />
    </div>
  );
};

export default SearchPage;
