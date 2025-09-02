import React, { useState } from "react";
import { Search } from "lucide-react";
import searchStyles from "./SearchPage.module.css";
import ProfileHeaderMockup from "./ProfileHeaderMockup";
import SkillMockup from "./SkillMockup";
import ExperiencesMockup from "./ExperiencesMockup";
import { useDispatch, useSelector } from "react-redux"; // 🎯 Import
import TestCard from "./MainApp/Shared/Modals/TestCard";
import ExperiencesMockupRedux from "./ExperiencesMockupRedux";
// import { setSelectedPerson } from "@/services/userService";
import {
  bookmarkCourse,
  setSelectedPersonData,
} from "@/store/slices/experienceSliceTest";
import ExperiencesSectionStudenteTest from "./ExperiencesSectionStudenteTest";
import EventSectionTest from "./EventSectionTest";
// import { followUser, unfollowUser } from "@/store/slices/experienceSliceTest";

// Lista di persone (solo nomi diversi, resto uguale)
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
  const skillGemBonus = useSelector(
    (state) => state.experienceSliceTest.skillGemBonus || {}
  );

  const selectedPersonData = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData
  );

  // Calcola skills con GEM aggiornati:
  const updatedSkills = selectedPersonData.skills.map((skill) => ({
    ...skill,
    gems: skill.gems + (skillGemBonus[skill.id] || 0),
  }));

  const dispatch = useDispatch(); // 🎯 Hook Redux

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
      // setSelectedPersonData(null);
      dispatch(
        setSelectedPersonData({ firstName: "", lastName: "", photo: null })
      );
    }
  };

  const handleSuggestionClick = (person) => {
    dispatch(
      setSelectedPersonData({
        firstName: person.firstName,
        lastName: person.lastName,
        photo: person.photo,
      })
    ); // 🎯 Salva in Redux invece che nello state locale
    setSearchQuery(`${person.firstName} ${person.lastName}`);
    setShowSuggestions(false);
  };

  // Nel componente NotificationDropdown o simile
  const handleNotificationAction = (notification, action) => {
    if (notification.actionData?.action === "bookmark_question") {
      if (action === "accept") {
        // 🎯 ESEGUI BOOKMARK
        dispatch(
          bookmarkCourse({
            experienceId: notification.actionData.experienceId,
            userId: "currentUser", // o currentUser.id
            experienceData: notification.actionData.experienceData,
            istruttore: notification.actionData.istruttore,
            instructorPhoto: notification.actionData.instructorPhoto,
            skillGems: notification.actionData.skillGems,
          })
        );

        // Toast di conferma
        showSuccessToast("Corso salvato nei bookmark!", 2000, "student");
      }

      // 🎯 RIMUOVI NOTIFICA in entrambi i casi
      dispatch(removeAsyncNotification(notification.id));
    }
  };

  return (
    <div className={searchStyles.searchContainer}>
      {/* Barra di ricerca */}
      <div className={searchStyles.searchInputContainer}>
        <input
          type="text"
          placeholder="Cerca persone (ex: Sara)..."
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
      {selectedPersonData.profile.firstName && !showSuggestions && (
        <>
          <ProfileHeaderMockup
            selectedPerson={selectedPersonData.profile}
            isInstructorPanel={false}
          />
          {/* <SkillMockup /> */} {/* AGGIUNGI bottone follow */}
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
        </>
      )}

      {/* NON aggiungere  */}
    </div>
  );
};

export default SearchPage;
