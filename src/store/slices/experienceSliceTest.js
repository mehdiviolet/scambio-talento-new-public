// store/experienceSliceTest.js
import { createSlice } from "@reduxjs/toolkit";

// 🆕 FUNZIONE HELPER per dati mock dinamici
const getPeopleMockData = (personName) => {
  const mockDataByPerson = {
    "Sara Dormand": {
      skills: [
        {
          id: "photography-sara",
          name: "Fotografia",
          icon: "📸",
          detail: "Street Photography Avanzata",
          description: "Esperta in fotografia urbana e ritratti spontanei.",
          gems: 45,
          createdAt: "2023-05-10T14:30:00Z",
          updatedAt: "2024-01-15T09:15:00Z",
          photo: "/images/people/sara-dormand.jpg",
        },
        {
          id: "cooking-sara",
          name: "Cucina",
          icon: "🍳",
          detail: "Cucina Francese",
          description: "Specialista in cucina francese e pasticceria.",
          gems: 120,
          createdAt: "2022-08-20T16:45:00Z",
          updatedAt: "2024-01-10T11:20:00Z",
        },
      ],
      experiences: [
        {
          id: "exp-photography-sara-001",
          skillId: "photography-sara",
          icon: "📸",
          title: "Fotografia / Street Avanzata",
          modalita: "presenza",
          lingua: "🇮🇹",
          partecipanti: 2,
          lezioni: 5,
          durataLezione: "2 Ore",
          costo: 70,
          descrizione:
            "Corso avanzato di street photography con tecniche professionali e post-produzione.",
        },
        {
          id: "exp-cooking-sara-002",
          skillId: "cooking-sara",
          icon: "🍳",
          title: "Cucina / Francese",
          modalita: "presenza",
          lingua: "🇫🇷",
          partecipanti: 3,
          lezioni: 6,
          durataLezione: "3 Ore",
          costo: 90,
          descrizione:
            "Ricette della tradizione francese con tecniche raffinate e presentazione elegante.",
        },
      ],
    },

    "Marco Rossi": {
      skills: [
        {
          id: "programming-marco",
          name: "Coding",
          icon: "💻",
          detail: "React & Node.js",
          description:
            "Sviluppatore full-stack specializzato in React e backend Node.js.",
          gems: 85,
          createdAt: "2023-02-15T10:00:00Z",
          updatedAt: "2024-01-20T15:30:00Z",
        },
        {
          id: "design-marco",
          name: "Design",
          icon: "🎨",
          detail: "UI/UX Design",
          description:
            "Designer esperto in interfacce moderne e user experience.",
          gems: 62,
          createdAt: "2023-04-01T12:15:00Z",
          updatedAt: "2024-01-18T14:45:00Z",
        },
      ],
      experiences: [
        {
          id: "exp-programming-marco-001",
          skillId: "programming-marco",
          icon: "💻",
          title: "React / Full-Stack",
          modalita: "online",
          lingua: "🇬🇧",
          partecipanti: 6,
          lezioni: 8,
          durataLezione: "1.5 Ore",
          costo: 55,
          descrizione:
            "Corso completo React + Node.js per diventare full-stack developer.",
        },
        {
          id: "exp-design-marco-002",
          skillId: "design-marco",
          icon: "🎨",
          title: "Design / Modern UI",
          modalita: "online",
          lingua: "🇮🇹",
          partecipanti: 4,
          lezioni: 6,
          durataLezione: "2 Ore",
          costo: 65,
          descrizione:
            "Principi di design moderno con Figma e prototipazione avanzata.",
        },
      ],
    },
    "Marco Neri": {
      skills: [
        {
          id: "programming-marco",
          name: "Coding",
          icon: "💻",
          detail: "React & Node.js",
          description:
            "Sviluppatore full-stack specializzato in React e backend Node.js.",
          gems: 85,
          createdAt: "2023-02-15T10:00:00Z",
          updatedAt: "2024-01-20T15:30:00Z",
        },
        {
          id: "design-marco",
          name: "Design",
          icon: "🎨",
          detail: "UI/UX Design",
          description:
            "Designer esperto in interfacce moderne e user experience.",
          gems: 62,
          createdAt: "2023-04-01T12:15:00Z",
          updatedAt: "2024-01-18T14:45:00Z",
        },
      ],
      experiences: [
        {
          id: "exp-programming-marco-001",
          skillId: "programming-marco",
          icon: "💻",
          title: "React / Full-Stack",
          modalita: "online",
          lingua: "🇬🇧",
          partecipanti: 6,
          lezioni: 8,
          durataLezione: "1.5 Ore",
          costo: 55,
          descrizione:
            "Corso completo React + Node.js per diventare full-stack developer.",
        },
        {
          id: "exp-design-marco-002",
          skillId: "design-marco",
          icon: "🎨",
          title: "Design / Modern UI",
          modalita: "online",
          lingua: "🇮🇹",
          partecipanti: 4,
          lezioni: 6,
          durataLezione: "2 Ore",
          costo: 65,
          descrizione:
            "Principi di design moderno con Figma e prototipazione avanzata.",
        },
      ],
    },
    "Sara Bianchi": {
      skills: [
        {
          id: "programming-sara",
          name: "Coding",
          icon: "💻",
          detail: "React & Node.js",
          description:
            "Sviluppatore full-stack specializzato in React e backend Node.js.",
          gems: 15,
          createdAt: "2023-02-15T10:00:00Z",
          updatedAt: "2024-01-20T15:30:00Z",
        },
        {
          id: "design-sara",
          name: "Design",
          icon: "🎨",
          detail: "UI/UX Design",
          description:
            "Designer esperto in interfacce moderne e user experience.",
          gems: 62,
          createdAt: "2023-04-01T12:15:00Z",
          updatedAt: "2024-01-18T14:45:00Z",
        },
      ],
      experiences: [
        {
          id: "exp-programming-sara-001",
          skillId: "programming-sara",
          icon: "💻",
          title: "React / Full-Stack",
          modalita: "online",
          lingua: "🇬🇧",
          partecipanti: 6,
          lezioni: 8,
          durataLezione: "1.5 Ore",
          costo: 55,
          descrizione:
            "Corso completo React + Node.js per diventare full-stack developer.",
        },
        {
          id: "exp-design-sara-002",
          skillId: "design-sara",
          icon: "🎨",
          title: "Design / Modern UI",
          modalita: "online",
          lingua: "🇮🇹",
          partecipanti: 4,
          lezioni: 6,
          durataLezione: "2 Ore",
          costo: 65,
          descrizione:
            "Principi di design moderno con Figma e prototipazione avanzata.",
        },
      ],
    },
  };

  return mockDataByPerson[personName] || { skills: [], experiences: [] };
};

const autoRemoveFromBookmarks = (state, experienceId) => {
  // Rimuovi da tutti gli utenti che hanno questo corso bookmarkato
  Object.keys(state.bookmarkedCourses).forEach((userId) => {
    state.bookmarkedCourses[userId] = state.bookmarkedCourses[userId].filter(
      (bookmark) => bookmark.experienceId !== experienceId
    );
  });
};

const experienceSliceTest = createSlice({
  name: "experienceSliceTest",
  initialState: {
    bookmarkedCourses: {
      // userId: [experienceId1, experienceId2, ...]
      currentUser: [],
    },
    courseStates: {
      // Aggiungi questi campi per ogni corso:
      // experienceId: {
      //   status: "idle",
      //   requestMessage: "",
      //   isRequestSent: false,
      //   xpPaid: 0,
      //   finishClicks: [],
      //   showFinishWaiting: false,
      //   rejectData: null,
      //   completionTriggered: false,
      //
      //   // 🆕 AGGIUNGI QUESTI:
      //   showRejectModal: false,
      //   rejectComments: [], // Array di commenti del rifiuto
      //   rejectionInitiatedBy: null, // chi ha iniziato il rifiuto
      // }
    },
    instructorNotifications: {},
    experienceFeedbacks: {
      // experienceId: [{ id, user, avatar, rating, comment, date, gems }]
    },
    completedCourses: {
      // userId: [{ experienceId, title, completedAt, duration, cost, etc... }]
    },
    gemHistory: {
      // instructorId: [experienceId1, experienceId2, ...]
    },
    currentUserId: "currentUser",
    skillGemBonus: {
      // skillId: totalBonusGems
      // "photography": 15,
      // "cooking": 8
    },
    socialConnections: {
      currentUser: {
        followers: [],
        following: [],
      },
    },
    selectedPersonData: {
      profile: {
        firstName: "",
        lastName: "",
        profilePhoto: null,
        location: "Torino",
        zone: "Santa Rita",
        joinedDate: "Luglio 2024",
      },
      social: {
        followers: ["loo", "moo", "yio"],
        following: ["MizoGucci", "Tarkovsky"],
      },
      skills: [
        {
          id: "photography",
          name: "Fotografia",
          icon: "📸",
          detail: "Street Photography",
          description:
            "Ho iniziato a fotografare 3 anni fa durante un viaggio a Parigi. Mi affascina catturare momenti spontanei della vita urbana, dalle espressioni delle persone ai giochi di luce sui palazzi. Ho sviluppato un occhio particolare per la composizione e l'uso della luce naturale.",
          gems: 15,
          createdAt: "2023-06-15T14:30:00Z",
          updatedAt: "2024-01-20T09:15:00Z",
        },
        {
          id: "cooking",
          name: "Cucina",
          icon: "🍳",
          detail: "Cucina Italiana Tradizionale",
          description:
            "La passione per la cucina nasce in famiglia. Ho imparato i segreti della pasta fresca dalla nonna e ho perfezionato le tecniche dei risotti piemontesi. Amo sperimentare con ingredienti locali e creare piatti che raccontano il territorio.",
          gems: 89,
          createdAt: "2022-11-08T16:45:00Z",
          updatedAt: "2024-01-18T11:20:00Z",
        },
        {
          id: "programming",
          name: "Coding",
          icon: "💻",
          detail: "Frontend Development",
          description:
            "Specializzata in React e JavaScript moderno. Mi piace creare interfacce intuitive e responsive che offrono un'esperienza utente eccellente. Ho lavorato su diversi progetti web, dalla progettazione UI/UX all'implementazione completa.",
          gems: 156,
          createdAt: "2023-01-20T10:00:00Z",
          updatedAt: "2024-01-25T15:30:00Z",
        },
        {
          id: "painting",
          name: "Pittura",
          icon: "🎨",
          detail: "Acquerello e Tecniche Miste",
          description:
            "L'arte è sempre stata la mia forma di espressione preferita. Dipingo principalmente con acquerelli, catturando paesaggi urbani e nature morte. Ogni dipinto racconta una storia e trasmette emozioni attraverso colori e forme.",
          gems: 73,
          createdAt: "2023-03-12T18:20:00Z",
          updatedAt: "2024-01-15T14:10:00Z",
        },
        {
          id: "languages",
          name: "Lingue",
          icon: "🗣️",
          detail: "Inglese e Francese",
          description:
            "Parlo fluentemente inglese e francese oltre all'italiano. Ho vissuto 6 mesi a Londra per migliorare il mio inglese e frequento regolarmente corsi di conversazione francese. Le lingue aprono porte a nuove culture e opportunità.",
          gems: 94,
          createdAt: "2022-09-05T12:30:00Z",
          updatedAt: "2024-01-22T16:45:00Z",
        },
      ],
      experiences: [], // 👈 AGGIUNGI QUESTO
    },
  },

  reducers: {
    bookmarkCourse: (state, action) => {
      const {
        experienceId,
        userId = "currentUser",
        experienceData,
        istruttore,
        instructorPhoto,
        skillGems,
        selectedPersonData, // 🆕 AGGIUNGI QUESTO
      } = action.payload;

      if (!state.bookmarkedCourses[userId]) {
        state.bookmarkedCourses[userId] = [];
      }

      // Verifica se già bookmarkato
      const isAlreadyBookmarked = state.bookmarkedCourses[userId].some(
        (bookmark) => bookmark.experienceId === experienceId
      );

      if (!isAlreadyBookmarked) {
        state.bookmarkedCourses[userId].push({
          experienceId,
          bookmarkedAt: new Date().toISOString(),
          experienceData,

          // 🆕 SALVA TUTTI I DATI NECESSARI:
          istruttore,
          instructorPhoto:
            action.payload.selectedPersonData?.profile?.profilePhoto ||
            instructorPhoto,
          instructorId: action.payload.selectedPersonData?.profile?.id,
          instructorFirstName:
            action.payload.selectedPersonData?.profile?.firstName,
          instructorLastName:
            action.payload.selectedPersonData?.profile?.lastName,

          // GEM della skill AL MOMENTO del bookmark
          skillGemsAtBookmark: skillGems,
          skillId: experienceData?.skillId,

          // 🆕 CAMPO CHE SI AGGIORNA CON I FEEDBACK:
          currentSkillGems: skillGems, // Questo verrà aggiornato
        });
      }
    },

    updateBookmarkSkillGems: (state, action) => {
      const { userId, skillId, newGemTotal } = action.payload;

      if (state.bookmarkedCourses[userId]) {
        state.bookmarkedCourses[userId].forEach((bookmark) => {
          if (bookmark.skillId === skillId) {
            bookmark.currentSkillGems = newGemTotal;
          }
        });
      }
    },

    unbookmarkCourse: (state, action) => {
      const { experienceId, userId = "currentUser" } = action.payload;

      if (state.bookmarkedCourses[userId]) {
        state.bookmarkedCourses[userId] = state.bookmarkedCourses[
          userId
        ].filter((bookmark) => bookmark.experienceId !== experienceId);
      }
    },

    // STUDENT ACTIONS (pannello destro)
    sendRequest: (state, action) => {
      const { experienceId, message } = action.payload;

      if (!state.courseStates[experienceId]) {
        state.courseStates[experienceId] = {
          status: "idle",
          requestMessage: "",
          isRequestSent: false,
          xpPaid: 0,
          finishClicks: [],
          showFinishWaiting: false,
          rejectData: null,
          completionTriggered: false,
          // 🆕 AGGIUNGI QUESTI:
          showRejectModal: false,
          rejectComments: [],
          rejectionInitiatedBy: null,
        };
      }

      state.courseStates[experienceId].status = "requested";
      state.courseStates[experienceId].requestMessage = message;
      state.courseStates[experienceId].isRequestSent = true;

      state.instructorNotifications[experienceId] = {
        hasNewRequest: true,
        requestMessage: message,
        shouldCreateChat: true,
        studentData: action.payload.studentData || null,
        experienceData: action.payload.experienceData || null,
      };
    },

    // 1. MODIFICA acceptCourse per dare firstPayment all'instructor subito:
    acceptCourse: (state, action) => {
      const { experienceId } = action.payload;

      // Student accetta e paga
      state.courseStates[experienceId].status = "active";
      // state.courseStates[experienceId].xpPaid = firstPayment;
      // autoRemoveFromBookmarks(state, experienceId); // 👈 AGGIUNGI QUESTA RIGA

      // 🆕 AGGIUNGI FLAG che instructor ha ricevuto firstPayment
      // state.courseStates[experienceId].instructorReceived = firstPayment;
      // state.courseStates[experienceId].instructorPaidAt =
      //   new Date().toISOString();
    },

    studentFinishCourse: (state, action) => {
      const { experienceId } = action.payload;
      const courseState = state.courseStates[experienceId];

      if (!courseState.finishClicks.includes("student")) {
        courseState.finishClicks.push("student");

        if (courseState.finishClicks.length === 1) {
          courseState.showFinishWaiting = true;
        } else if (courseState.finishClicks.length === 2) {
          courseState.status = "pending_feedback";
          courseState.showFinishWaiting = false;
        }
      }
    },

    addGemsToSkill: (state, action) => {
      const { skillId, gems } = action.payload;
      if (!state.skillGemBonus[skillId]) {
        state.skillGemBonus[skillId] = 0;
      }
      state.skillGemBonus[skillId] += gems;
    },
    // INSTRUCTOR ACTIONS (pannello sinistro)
    instructorAcceptRequest: (state, action) => {
      const { experienceId } = action.payload;

      state.courseStates[experienceId].status = "ready";

      if (!state.instructorNotifications[experienceId]) {
        state.instructorNotifications[experienceId] = {};
      }

      state.instructorNotifications[experienceId].hasNewRequest = false;
      state.instructorNotifications[
        experienceId
      ].shouldSendAcceptNotification = true;
    },

    instructorRejectRequest: (state, action) => {
      const { experienceId } = action.payload;

      state.courseStates[experienceId] = {
        status: "idle",
        requestMessage: "",
        isRequestSent: false,
        xpPaid: 0,
        finishClicks: [],
        showFinishWaiting: false,
        rejectData: null,
      };

      if (state.instructorNotifications[experienceId]) {
        state.instructorNotifications[
          experienceId
        ].shouldSendRejectNotification = {
          reason: "Nessun motivo specificato",
        };
      }
    },

    startCourse: (state, action) => {
      const { experienceId } = action.payload;
      state.courseStates[experienceId].status = "waiting";
      // autoRemoveFromBookmarks(state, experienceId); // 👈 AGGIUNGI QUESTA RIGA
    },

    instructorFinishCourse: (state, action) => {
      const { experienceId } = action.payload;
      const courseState = state.courseStates[experienceId];

      if (!courseState.finishClicks.includes("instructor")) {
        courseState.finishClicks.push("instructor");

        if (courseState.finishClicks.length === 1) {
          courseState.showFinishWaiting = true;
        } else if (courseState.finishClicks.length === 2) {
          courseState.status = "pending_feedback";
          courseState.showFinishWaiting = false;
        }
      }
    },

    followUser: (state, action) => {
      const { followerId, followedId } = action.payload;

      // Assicurati che socialConnections esista
      if (!state.socialConnections) {
        state.socialConnections = {};
      }

      // Inizializza currentUser se non esiste
      if (!state.socialConnections[followerId]) {
        state.socialConnections[followerId] = { followers: [], following: [] };
      }

      // Per la persona seguita, usa il sistema diverso (non socialConnections)
      // Aggiorna solo selectedPersonData.social e currentUser

      const isAlreadyFollowing =
        state.socialConnections[followerId].following.includes(followedId);

      if (isAlreadyFollowing) {
        // UNFOLLOW
        state.socialConnections[followerId].following = state.socialConnections[
          followerId
        ].following.filter((id) => id !== followedId);
        // Rimuovi da selectedPersonData.social
        state.selectedPersonData.social.followers =
          state.selectedPersonData.social.followers.filter(
            (id) => id !== followerId
          );
      } else {
        // FOLLOW
        state.socialConnections[followerId].following.push(followedId);
        // Aggiungi a selectedPersonData.social
        state.selectedPersonData.social.followers.push(followerId);
      }
    },

    setSelectedPersonData: (state, action) => {
      const { firstName, lastName, photo } = action.payload;
      state.selectedPersonData.profile.firstName = firstName;
      state.selectedPersonData.profile.lastName = lastName;
      state.selectedPersonData.profile.profilePhoto = photo;
      const personName = `${firstName} ${lastName}`;
      const mockData = getPeopleMockData(personName);

      state.selectedPersonData.skills = mockData.skills; // 👈 AGGIORNA SKILLS
      state.selectedPersonData.experiences = mockData.experiences; // 👈 AGGIUNGI EXPERIENCES
    },

    unfollowUser: (state, action) => {
      // logica opposta
    },

    // SHARED ACTIONS (entrambi i pannelli)
    // completeCourse: (state, action) => {
    //   const {
    //     experienceId,
    //     secondPayment,
    //     title,
    //     lezioni,
    //     durataLezione,
    //     costo,
    //     istruttore,
    //     studentName,
    //     isInstructor,
    //     role,
    //   } = action.payload;

    //   const courseState = state.courseStates[experienceId];
    //   courseState.xpPaid += secondPayment;
    //   courseState.showFinishWaiting = false;
    //   courseState.completionTriggered = true;

    //   // 🆕 LOGICA CONDIZIONALE
    //   if (isInstructor) {
    //     courseState.status = "completed"; // Instructor → completed subito
    //   } else {
    //     courseState.status = "pending_feedback"; // 🆕 Student → aspetta feedback
    //   }

    //   // if (isInstructor) {
    //   //   autoRemoveFromBookmarks(state, experienceId); // 👈 AGGIUNGI QUESTA RIGA
    //   // }

    //   // Salva completion card
    //   const completionCard = {
    //     experienceId,
    //     completionId: `${experienceId}-${role}`,
    //     title,
    //     completedAt: new Date().toISOString(),
    //     duration: `${lezioni} lezioni di ${durataLezione}`,
    //     cost: costo,
    //     participant: isInstructor ? studentName : istruttore,
    //     feedback: null,
    //     gems: 0,
    //     role,
    //   };

    //   const userId = state.currentUserId;
    //   const bookmark = state.bookmarkedCourses[userId]?.find(
    //     (b) => b.experienceId === experienceId
    //   );

    //   if (!state.completedCourses[userId]) {
    //     state.completedCourses[userId] = [];
    //   }
    //   state.completedCourses[userId].push(completionCard);

    //   courseState.shouldSendCompletionNotification = true;
    // },

    completeCourse: (state, action) => {
      const {
        experienceId,
        secondPayment,
        title,
        lezioni,
        durataLezione,
        costo,
        istruttore,
        studentName,
        isInstructor,
        role,
      } = action.payload;

      const courseState = state.courseStates[experienceId];
      courseState.xpPaid += secondPayment;
      courseState.showFinishWaiting = false;
      courseState.completionTriggered = true;

      if (isInstructor) {
        courseState.status = "completed";
      } else {
        courseState.status = "pending_feedback";
      }

      // 🆕 TROVA IL BOOKMARK PER RECUPERARE I DATI DELL'ISTRUTTORE
      const userId = state.currentUserId;
      const bookmark = state.bookmarkedCourses[userId]?.find(
        (b) => b.experienceId === experienceId
      );

      // Salva completion card con TUTTI i dati necessari
      const completionCard = {
        experienceId,
        completionId: `${experienceId}-${role}`,
        title,
        completedAt: new Date().toISOString(),
        duration: `${lezioni} lezioni di ${durataLezione}`,
        cost: costo,
        participant: isInstructor ? studentName : istruttore,
        feedback: null,
        gems: 0,
        role,

        // 🆕 SALVA TUTTI I DATI DELL'ISTRUTTORE DAL BOOKMARK
        instructorPhoto: bookmark?.instructorPhoto || null,
        instructorFirstName: bookmark?.instructorFirstName || "",
        instructorLastName: bookmark?.instructorLastName || "",
        currentSkillGems: bookmark?.currentSkillGems || 0,
        skillGemsAtBookmark: bookmark?.skillGemsAtBookmark || 0,
        skillId: bookmark?.skillId || null,
        skillIcon: bookmark?.experienceData?.icon || "📚", // Fallback generico
      };

      if (!state.completedCourses[userId]) {
        state.completedCourses[userId] = [];
      }
      state.completedCourses[userId].push(completionCard);

      courseState.shouldSendCompletionNotification = true;
    },
    markCourseAsCompleted: (state, action) => {
      const { experienceId } = action.payload;
      const courseState = state.courseStates[experienceId];

      if (courseState && courseState.status === "pending_feedback") {
        courseState.status = "completed";
        // autoRemoveFromBookmarks(state, experienceId); // Ora rimuovi dai bookmark
      }
    },

    // 2. MODIFICA rejectActiveCourse per tracciare meglio il rifiuto:
    rejectActiveCourse: (state, action) => {
      const { experienceId, comment, rejectedBy } = action.payload;
      const courseState = state.courseStates[experienceId];

      courseState.rejectData = { comment, rejectedBy };
      courseState.status = "rejected";
      courseState.finishClicks = [];
      courseState.showFinishWaiting = false;

      // 🆕 TRACCIA INFO PER RIMBORSI
      courseState.rejectionInfo = {
        rejectedBy,
        comment: comment || "",
        rejectedAt: new Date().toISOString(),
        studentPaidAmount: courseState.xpPaid || 0, // Quanto ha pagato student
        instructorReceivedAmount: courseState.instructorReceived || 0, // Quanto ha ricevuto instructor
      };

      // Reset pagamenti (gestiti da XP service)
      courseState.xpPaid = 0;
      courseState.instructorReceived = 0;

      // 🆕 LOGICA MODAL
      courseState.rejectionInitiatedBy = rejectedBy;

      if (!courseState.rejectComments) {
        courseState.rejectComments = [];
      }

      if (comment?.trim()) {
        courseState.rejectComments.push({
          author: rejectedBy,
          comment: comment,
          timestamp: new Date().toISOString(),
          isResponse: false,
        });
      }

      courseState.showRejectModal = true;

      courseState.shouldSendRejectNotification = {
        rejectedBy,
        comment: comment || "Nessun motivo specificato",
      };
    },

    respondToRejection: (state, action) => {
      const { experienceId, comment, respondedBy } = action.payload;
      const courseState = state.courseStates[experienceId];

      if (!courseState.rejectComments) {
        courseState.rejectComments = [];
      }

      // Aggiungi risposta al rifiuto
      if (comment?.trim()) {
        courseState.rejectComments.push({
          author: respondedBy,
          comment: comment,
          timestamp: new Date().toISOString(),
          isResponse: true,
        });
      }

      // Chiudi il modal
      courseState.showRejectModal = false;
    },

    // 4. Aggiungi reducer per chiudere modal senza rispondere
    closeRejectModal: (state, action) => {
      const { experienceId } = action.payload;
      const courseState = state.courseStates[experienceId];

      if (courseState) {
        courseState.showRejectModal = false;
      }
    },

    recordGemGiven: (state, action) => {
      const { instructorId, experienceId } = action.payload;

      if (!state.gemHistory[instructorId]) {
        state.gemHistory[instructorId] = [];
      }

      if (!state.gemHistory[instructorId].includes(experienceId)) {
        state.gemHistory[instructorId].push(experienceId);
      }
    },

    updateCompletionCardFeedback: (state, action) => {
      const { experienceId, feedback, gems } = action.payload;
      const userId = state.currentUserId;

      if (state.completedCourses[userId]) {
        const card = state.completedCourses[userId].find(
          (c) => c.experienceId === experienceId
        );
        if (card) {
          card.feedback = feedback;
          card.gems = gems;
        }
      }
      // 👈 AGGIUNGI QUESTA RIGA:
      autoRemoveFromBookmarks(state, experienceId);
    },

    resetExperience: (state, action) => {
      const { experienceId } = action.payload;

      if (state.courseStates[experienceId]) {
        state.courseStates[experienceId] = {
          status: "idle",
          requestMessage: "",
          isRequestSent: false,
          xpPaid: 0,
          finishClicks: [],
          showFinishWaiting: false,
          rejectData: null,
        };
      }

      delete state.instructorNotifications[experienceId];
    },

    saveFeedback: (state, action) => {
      const { experienceId, comment, gemsAssigned, userName, userAvatar } =
        action.payload;

      if (!state.experienceFeedbacks[experienceId]) {
        state.experienceFeedbacks[experienceId] = [];
      }

      state.experienceFeedbacks[experienceId].push({
        id: Date.now(),
        user: userName,
        avatar: userAvatar,
        comment,
        gems: gemsAssigned,
        date: "Ora",
      });
    },
  },
});

export const {
  sendRequest,
  acceptCourse,
  studentFinishCourse,
  instructorAcceptRequest,
  instructorRejectRequest,
  startCourse,
  instructorFinishCourse,
  completeCourse,
  rejectActiveCourse,
  updateCompletionCardFeedback,
  resetExperience,
  markCourseAsCompleted,
  saveFeedback,
  recordGemGiven,
  addGemsToSkill,
  followUser,
  unfollowUser,
  bookmarkCourse,
  unbookmarkCourse,
  setSelectedPersonData,
  updateBookmarkSkillGems,
  closeRejectModal,
  respondToRejection,
} = experienceSliceTest.actions;

export default experienceSliceTest.reducer;
