import React, { useState } from "react";
import { Search } from "lucide-react";
import searchStyles from "./SearchPage.module.css";
import ProfileHeaderMockup from "./ProfileHeaderMockup";
import SkillMockup from "./SkillMockup";
import ExperiencesMockup from "./ExperiencesMockup";
import { useDispatch, useSelector } from "react-redux"; // 🎯 Import
// import { setSelectedPerson } from "@/store/slices/personSlice"; // 🎯 Import action
import TestCard from "./MainApp/Shared/Modals/TestCard";
import ExperiencesMockupRedux from "./ExperiencesMockupRedux";
import { setSelectedPerson } from "@/services/userService";

// Lista di persone (solo nomi diversi, resto uguale)
const peopleList = [
  { firstName: "Sara", lastName: "Dormand" },
  { firstName: "Sara", lastName: "Rossi" },
  { firstName: "Sara", lastName: "Bianchi" },
  { firstName: "Sara", lastName: "Ferrari" },
  { firstName: "Marco", lastName: "Verdi" },
  { firstName: "Marco", lastName: "Neri" },
  { firstName: "Anna", lastName: "Romano" },
  { firstName: "Anna", lastName: "Conti" },
  { firstName: "Luca", lastName: "Moretti" },
  { firstName: "Luca", lastName: "Ricci" },
  { firstName: "Giulia", lastName: "Colombo" },
  { firstName: "Giulia", lastName: "Esposito" },
  { firstName: "Alessandro", lastName: "Gallo" },
  { firstName: "Francesca", lastName: "Marino" },
  { firstName: "Federico", lastName: "De Luca" },
  { firstName: "Chiara", lastName: "Santoro" },
  { firstName: "Matteo", lastName: "Caruso" },
  { firstName: "Elena", lastName: "Greco" },
  { firstName: "Andrea", lastName: "Leone" },
  { firstName: "Valentina", lastName: "Bruno" },
];

const SearchPage = () => {
  const dispatch = useDispatch(); // 🎯 Hook Redux
  // const selectedPerson = useSelector((state) => state.person.selectedPerson);
  const selectedPersonId = useSelector(
    (state) => state.users.demo.selectedPersonId
  );
  const selectedPerson = useSelector((state) =>
    selectedPersonId ? state.users.users[selectedPersonId]?.profile : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [selectedPerson, setSelectedPerson] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      // Filtra suggerimenti
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
      setSelectedPerson(null);
    }
  };

  const handleSuggestionClick = (person) => {
    dispatch(setSelectedPerson("sara")); // 🎯 Salva in Redux invece che nello state locale
    setSearchQuery(`${person.firstName} ${person.lastName}`);
    setShowSuggestions(false);
  };

  return (
    <div className={searchStyles.searchContainer}>
      {/* Barra di ricerca */}
      <div className={searchStyles.searchInputContainer}>
        <input
          type="text"
          placeholder="Cerca persone o skill..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={searchStyles.searchInput}
          onFocus={() => searchQuery && setShowSuggestions(true)}
        />

        {/* Dropdown suggerimenti */}
        {showSuggestions && suggestions.length > 0 && (
          <div className={searchStyles.suggestionsDropdown}>
            {suggestions.map((person, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(person)}
                className={searchStyles.suggestionItem}
              >
                <div className={searchStyles.suggestionName}>
                  {person.firstName} {person.lastName}
                </div>
                <div className={searchStyles.suggestionUsername}>
                  @{person.firstName.toLowerCase()}
                  {person.lastName.toLowerCase().slice(0, 3)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profilo selezionato */}
      {selectedPerson && (
        <>
          {/* <ProfileHeaderMockup selectedPerson={selectedPerson} /> */}
          {/* <SkillMockup /> */}

          <ExperiencesMockupRedux isOwnerPanel={false} />
        </>
      )}

      {/* NON aggiungere  */}
    </div>
  );
};

export default SearchPage;
