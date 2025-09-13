import React, { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendRequest,
  acceptCourse,
  studentFinishCourse,
  instructorAcceptRequest,
  instructorRejectRequest,
  startCourse,
  instructorFinishCourse,
  completeCourse,
  rejectActiveCourse,
  // updateUserXP,
  saveFeedback,
  updateCompletionCardFeedback,
  recordGemGiven,
  addGemsToSkill,
  unbookmarkCourse,
  bookmarkCourse,
  respondToRejection,
  closeRejectModal,
  markCourseAsCompleted,
  updateBookmarkSkillGems,
} from "@/store/slices/experienceSliceTest";
import {
  MonitorSpeaker,
  Users,
  Type,
  User,
  Clock,
  Gem,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Edit,
  Share,
  Heart,
  Bookmark,
  Trash2,
  MessageCircle,
  Star,
  Send,
  CheckCircle,
  Globe2,
  GlassWaterIcon,
  GlobeIcon,
  Home,
} from "lucide-react";
import styles from "./TestCard.module.css";
import {
  createConversationFromRequest,
  addSystemMessage,
} from "@/store/slices/chatSlice";
// import { useNotifications } from "@/hooks/useNotifications";

// import {
//   addAsyncNotification,
//   selectNotificationsByRole,
// } from "@/store/slices/notificationSlice";

import {
  selectCurrentUserXP,
  calculateCoursePayments,
  payCourseFirst,
  payCourseSecond,
  addFeedbackBonus, // 🆕 AGGIUNGI
  handleCourseRejection, // 🆕 AGGIUNGI
} from "@/services/xpService";
import {
  getUserAvatar,
  getUserDisplayName,
  selectCurrentUser,
  selectCurrentUserProfile,
  // refundStudent,             // 🆕 Opzionale se vuoi usarlo
  // applyRejectionPenalty,     // 🆕 Opzionale se vuoi usarlo
} from "@/services/userService";
import { useQuickSetup } from "@/hooks/useQuickSetup";
import { createSelector } from "@reduxjs/toolkit";

function TestCardRedux({
  // Identificativo unico dell'esperienza
  experienceId,

  // Props esistenti
  title = "Cinema / Base",
  lezioni = 4,
  durataLezione = "1 ora",
  costo = 50,
  descrizione = "Un percorso personalizzato per scoprire i fondamenti della pittura a olio.",
  istruttore = "Serj Tankian",
  skillGems,
  instructorPhoto,
  // partecipanti = 3,
  icon = "_",
  lingua,
  modalita,
  experienceData,
  onEdit,
  // isInstructor = false,
  isInstructor,
  onDelete,
  feedbacks = [
    {
      id: 1,
      user: "Marco",
      avatar: "/images/people/marco-ro.jpg",
      rating: 5,
      comment: "Esperienza fantastica! Molto professionale e coinvolgente.",
      date: "2 giorni fa",
    },
    {
      id: 2,
      user: "Laura",
      avatar: "/images/people/laura-la.jpg",
      rating: 4,
      comment: "Ottima lezione, ho imparato tantissimo. Consigliato!",
      date: "1 settimana fa",
    },
  ],
}) {
  const dispatch = useDispatch();

  // 1. Definisci gli ID dei partecipanti del corso:
  const STUDENT_USER_ID = "currentUser"; // Lo studente è sempre currentUser
  const INSTRUCTOR_USER_ID = "sara";

  // ✅ AGGIUNGI questi selectors Redux:
  const currentUserData = useSelector(selectCurrentUser);
  const currentUserProfile = useSelector(selectCurrentUserProfile);

  const skillGemTotals = useSelector(
    (state) => state.experienceSliceTest.skillGemBonus
  );

  // 🎯 REDUX STATE - sostituisce tutto lo state locale del corso
  const courseState = useSelector(
    (state) =>
      state.experienceSliceTest.courseStates[experienceId] || {
        status: "idle",
        requestMessage: "",
        isRequestSent: false,
        xpPaid: 0,
        finishClicks: [],
        showFinishWaiting: false,
        rejectData: null,
      }
  );

  // const { showSuccessToast, showErrorToast, addCourseNotification } =
  //   useNotifications();

  // 🎯 MEMOIZZA I SELECTORS PROBLEMATICI
  // const instructorNotifications = useSelector(
  //   useMemo(
  //     () =>
  //       createSelector(
  //         [selectNotificationsByRole("instructor")],
  //         (notifications) => notifications
  //       ),
  //     []
  //   )
  // );

  // const studentNotifications = useSelector(
  //   useMemo(
  //     () =>
  //       createSelector(
  //         [selectNotificationsByRole("student")],
  //         (notifications) => notifications
  //       ),
  //     []
  //   )
  // );

  const instructorNotification = useSelector(
    (state) => state.experienceSliceTest.instructorNotifications[experienceId]
    // این ربطی به تفکیک نوتیف ها نداره
  );
  // const userXP = useSelector((state) => state.experienceSliceTest.userXP);
  const currentXP = useSelector(selectCurrentUserXP);

  // const userXP = useSelector((state) => state.quickSetup.xp);
  // 🎯 NUOVO: Controllo GEM già date a questo instructor
  const hasAlreadyGivenGems = useSelector(
    useMemo(
      () =>
        createSelector(
          [(state) => state.experienceSliceTest.gemHistory],
          (gemHistory) => {
            const instructorId = experienceData?.skillId;
            return gemHistory?.[instructorId]?.includes(experienceId) || false;
          }
        ),
      [experienceData?.skillId, experienceId]
    )
  );

  const handleModalBackgroundClick = (e) => {
    // Se clicco sul background (non sul contenuto), conta come "Salta"
    if (e.target === e.currentTarget) {
      handleSkipFeedback();
    }
  };

  console.log("🔍 Debug userService:");
  console.log("currentUserData:", currentUserData);
  console.log("currentUserProfile:", currentUserProfile);
  console.log("isInstructor:", isInstructor);

  const currentUser = React.useMemo(() => {
    if (!currentUserData || !currentUserProfile) {
      // Fallback se userService non è ancora caricato
      return {
        role: isInstructor ? "instructor" : "student",
        name: isInstructor ? "Sara Dormand" : "Marco Rossi",
        avatar: isInstructor ? "👩‍🎨" : "👨‍💼",
        id: isInstructor ? "sara" : "currentUser",
      };
    }

    return {
      role:
        currentUserProfile.role || (isInstructor ? "instructor" : "student"),
      name: getUserDisplayName(currentUserData),
      avatar: getUserAvatar(currentUserData),
      id: currentUserProfile.id || "currentUser",
      firstName: currentUserProfile.firstName,
      lastName: currentUserProfile.lastName,
    };
  }, [currentUserData, currentUserProfile, isInstructor]);

  // 🎯 STATE LOCALE - solo per UI temporanei (modals, form)
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [showXPWarning, setShowXPWarning] = useState(false);
  // const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  // const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackGems, setFeedbackGems] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const [responseToRejectComment, setResponseToRejectComment] = useState("");
  const [showInitiateRejectModal, setShowInitiateRejectModal] = useState(false);

  // 🆕 SELECTOR PER LE SKILLS CON I LORO GEMS
  const selectedPersonData = useSelector(
    (state) => state.experienceSliceTest.selectedPersonData
  );
  const showRejectResponseModal =
    courseState.showRejectModal &&
    courseState.rejectionInitiatedBy !==
      (isInstructor ? "instructor" : "student");

  const handleSkipResponse = () => {
    dispatch(closeRejectModal({ experienceId }));
    setResponseToRejectComment("");
    console.log("Modal di risposta chiuso senza azione");
  };

  // 3. handleRespondToRejection - Chi risponde (senza commento) paga la penalità:
  // SOSTITUISCI handleRespondToRejection nel TestCardRedux.js:

  const handleRespondToRejection = () => {
    const hasComment = responseToRejectComment.trim() !== "";

    // 🎯 ID dei partecipanti
    const STUDENT_USER_ID = "currentUser";
    const INSTRUCTOR_USER_ID = "sara";

    // 🎯 STESSA LOGICA: chi risponde senza commento paga penalità
    if (!hasComment) {
      const userIdToCharge = isInstructor
        ? INSTRUCTOR_USER_ID
        : STUDENT_USER_ID;

      console.log(
        `💬 ${
          isInstructor ? "Instructor" : "Student"
        } risponde senza commento - Penalità: 10 XP`
      );

      dispatch(
        handleCourseRejection({
          userId: userIdToCharge, // 👈 Penalità a chi risponde
          penalty: 10, // ➖ -10 XP per maleducazione
          refund: 0, // 🚫 Nessun rimborso per la risposta
          comment: responseToRejectComment,
        })
      );
    }

    // Salva risposta
    dispatch(
      respondToRejection({
        experienceId,
        comment: responseToRejectComment,
        respondedBy: isInstructor ? "instructor" : "student",
      })
    );

    setResponseToRejectComment("");
  };
  const { profileData } = useQuickSetup();
  // console.log(profileData.profilePhoto);

  // Nel component, sostituisci props feedbacks con Redux
  const dynamicFeedbacks = useSelector(
    (state) => state.experienceSliceTest.experienceFeedbacks[experienceId] || []
  );

  // Combina mock + dinamici (o usa solo dinamici)
  const allFeedbacks = [...feedbacks, ...dynamicFeedbacks];

  const getXPCosts = useCallback(() => {
    return calculateCoursePayments(costo);
  }, [costo]);

  const canAffordCourse = () => {
    const { firstPayment } = getXPCosts();
    return currentXP >= firstPayment;
  };
  // 🎯 REDUX ACTIONS - sostituiscono le funzioni locali

  const canAffordFullCourse = () => {
    return currentXP >= costo; // Controllo XP totale del corso
  };
  const handleRequestClick = () => {
    setIsRequestOpen(true);
  };

  // const handleSendRequest = () => {
  //   console.log("SEND REqUest", currentUser);

  //   if (requestMessage.trim()) {
  //     // 🎯 1. Invia richiesta (tuo slice esistente)
  //     dispatch(
  //       sendRequest({
  //         experienceId,
  //         message: requestMessage,
  //       })
  //     );

  //     // 🎯 2. Toast immediato per feedback locale
  //     showSuccessToast("Richiesta inviata con successo!", 3000, "student");

  //     dispatch(
  //       bookmarkCourse({
  //         experienceId,
  //         userId: currentUser.id,
  //         experienceData: experienceData,
  //         istruttore: istruttore,
  //         instructorPhoto: instructorPhoto,
  //         skillGems: skillGems,
  //         selectedPersonData: selectedPersonData, // 🆕 PASSA TUTTI I DATI PERSONA
  //       })
  //     );

  //     showSuccessToast(
  //       "Richiesta inviata e corso salvato nei bookmark! 📩💾",
  //       4000,
  //       "student"
  //     );

  //     // 🎯 3. Crea conversazione in chat automaticamente
  //     dispatch(
  //       createConversationFromRequest({
  //         experienceId,
  //         experienceTitle: title,
  //         studentName: currentUser.name,
  //         studentAvatar: currentUser.avatar,
  //         message: requestMessage,
  //       })
  //     );

  //     // 🎯 4. Crea notifica asincrona per instructor usando il NUOVO sistema
  //     dispatch(
  //       addAsyncNotification({
  //         title: "Nuova richiesta ricevuta! 📩",
  //         message: `${currentUser.name} vuole partecipare a "${title}"`,
  //         type: "info",
  //         category: "course",
  //         targetRole: "instructor", // 👈 SOLO instructor VEDRÀ QUESTA
  //         fromRole: "student",
  //         experienceId: experienceId,
  //         conversationId: `exp-${experienceId}`, // 🆕 AGGIUNGI QUESTO
  //         actionData: { experienceId, action: "review_request" },
  //         requiresAction: true,
  //       })
  //     );

  //     // 🎯 5. Cleanup UI
  //     setIsRequestOpen(false);
  //     setRequestMessage("");

  //     console.log("Richiesta inviata via Redux:", requestMessage);
  //   }
  // };
  const handleSendRequest = () => {
    console.log("SEND Request", currentUser);

    if (requestMessage.trim()) {
      // 🎯 1. Invia richiesta (tuo slice esistente)
      dispatch(
        sendRequest({
          experienceId,
          message: requestMessage,
          // 🆕 AGGIUNGI DATI STUDENTE per la chat
          studentData: {
            name: currentUser.name,
            avatar: currentUser.avatar,
            id: currentUser.id,
          },
          // 🆕 AGGIUNGI DATI ESPERIENZA per la chat
          experienceData: {
            title: title,
            icon: experienceData.icon,
            skillId: experienceData.skillId,
          },
        })
      );

      // 🎯 2. Toast immediato per feedback locale
      // showSuccessToast("Richiesta inviata con successo!", 3000, "student");

      dispatch(
        bookmarkCourse({
          experienceId,
          userId: currentUser.id,
          experienceData: experienceData,
          istruttore: istruttore,
          instructorPhoto: instructorPhoto,
          skillGems: skillGems,
          selectedPersonData: selectedPersonData, // PASSA TUTTI I DATI PERSONA
        })
      );

      // showSuccessToast(
      //   "Richiesta inviata e corso salvato nei bookmark! 📩💾",
      //   4000,
      //   "student"
      // );

      // 🎯 3. ✅ CREA CONVERSAZIONE CON NUOVA STRUTTURA
      dispatch(
        createConversationFromRequest({
          experienceId,
          experienceTitle: title,

          // ✅ DATI VIEWER (studente)
          viewerName: currentUser.name,
          viewerAvatar: currentUser.avatar,

          // ✅ DATI OWNER (istruttore) - OGGETTO COMPLETO
          ownerData: {
            firstName: selectedPersonData?.profile?.firstName || "Owner",
            lastName: selectedPersonData?.profile?.lastName || "User",
            profilePhoto:
              selectedPersonData?.profile?.profilePhoto || instructorPhoto,
            avatar: instructorPhoto, // fallback
          },

          message: requestMessage,
        })
      );

      // 🎯 4. ✅ CREA NOTIFICA con conversationId CORRETTO
      const conversationId =
        `exp-${experienceId}-${selectedPersonData?.profile?.firstName}_${selectedPersonData?.profile?.lastName}`
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, "");

      // dispatch(
      //   addAsyncNotification({
      //     title: "Nuova richiesta ricevuta! 📩",
      //     message: `${currentUser.name} vuole partecipare a "${title}"`,
      //     type: "info",
      //     category: "course",
      //     targetRole: "instructor",
      //     fromRole: "student",
      //     experienceId: experienceId,
      //     conversationId: conversationId, // ✅ ID CORRETTO
      //     actionData: { experienceId, action: "review_request" },
      //     requiresAction: true,
      //   })
      // );

      // 🎯 5. Cleanup UI
      setIsRequestOpen(false);
      setRequestMessage("");

      console.log("Richiesta inviata via Redux:", requestMessage);
      console.log("Conversation created with ID:", conversationId);
    }
  };
  const handleInstructorAcceptRequest = () => {
    console.log("panello sin??", currentUser);

    dispatch(instructorAcceptRequest({ experienceId }));

    // Toast per instructor
    // showSuccessToast("Richiesta accettata!", 3000, "instructor");

    // 🎯 Aggiungi messaggio di sistema alla chat
    dispatch(
      addSystemMessage({
        conversationId: `exp-${experienceId}`,
        message:
          "🎉 Sara ha accettato la tua richiesta! Il corso è pronto per essere avviato.",
        systemType: "request_accepted",
      })
    );
    console.log("instructor ha accettato la richiesta");
  };

  const handleInstructorRejectRequest = () => {
    dispatch(instructorRejectRequest({ experienceId }));
    console.log("instructor ha rifiutato la richiesta");
  };

  const handleStartCourse = () => {
    dispatch(startCourse({ experienceId }));
    // 🎯 Messaggio di sistema: corso avviato
    dispatch(
      addSystemMessage({
        conversationId: `exp-${experienceId}`,
        message:
          "🚀 Il corso è stato avviato! In attesa che il partecipante accetti.",
        systemType: "course_started",
      })
    );
    console.log("instructor ha avviato il corso");
  };

  const handleStudentAccepts = () => {
    const { firstPayment } = getXPCosts();
    console.log("🔍 Prima del dispatch:", courseState.status);

    if (!canAffordCourse()) {
      setShowXPWarning(true);
      return;
    }

    dispatch(
      payCourseFirst({
        // userId: "currentUser", // TODO: get from current user
        userId: currentUser.id,

        experienceId,
        amount: firstPayment,
      })
    );

    dispatch(
      acceptCourse({
        experienceId,
        firstPayment,
      })
    );

    console.log(`student ha accettato e pagato ${firstPayment} XP`);

    // ✅ NOTIFICA ASYNC per instructor (apparirà nel panel sinistro)
    // dispatch(
    //   addAsyncNotification({
    //     title: "✅ Corso accettato!",
    //     message: `${currentUser.name} ha accettato il corso "${title}"`,
    //     type: "info",
    //     category: "course",
    //     targetRole: "instructor", // ← Solo instructor la vedrà
    //     experienceId: experienceId,
    //   })
    // );
  };

  // Nel TestCardRedux, aggiungi questo useEffect:
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      // Se il modal feedback è aperto e clicco fuori dal contenuto
      if (showFeedbackModal) {
        const modalContent = document.querySelector(
          `.${styles.feedbackModalContent}`
        );
        if (modalContent && !modalContent.contains(e.target)) {
          handleSkipFeedback();
        }
      }
    };

    // Aggiungi listener globale
    if (showFeedbackModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside); // Per mobile
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showFeedbackModal]); // Dipende da showFeedbackModal

  React.useEffect(() => {
    console.log("🔍 Stato cambiato:", courseState.status);
  }, [courseState.status]);

  const handleFinishCourse = () => {
    if (isInstructor) {
      dispatch(instructorFinishCourse({ experienceId }));
    } else {
      dispatch(studentFinishCourse({ experienceId }));
    }
  };

  const handleCompleteCourse = useCallback(() => {
    console.log("🔥 handleCompleteCourse chiamato!");
    const { secondPayment } = getXPCosts();

    // Solo il student paga il secondo pagamento
    // const paymentAmount = isInstructor ? 0 : secondPayment;

    if (!isInstructor && secondPayment > 0) {
      dispatch(
        payCourseSecond({
          // userId: "currentUser", // TODO: get from current user
          userId: currentUser.id, // TODO: get from current user
          experienceId,
          amount: secondPayment,
        })
      );
    }
    dispatch(
      completeCourse({
        experienceId,
        // secondPayment: paymentAmount,
        // Dati per completion card
        title,
        lezioni,
        durataLezione,
        costo,
        istruttore,
        studentName: currentUser.name, // 🎯 FISSO
        isInstructor,
        role: currentUser.role, // 🎯 FISSO
      })
    );

    console.log("🎉 Corso completato!");
    console.log("isInstructor:", isInstructor); // ← Questo ti dirà se sei instructor o student

    if (!isInstructor) {
      console.log("✅ student - mostrerò modal tra 500ms");
      setTimeout(() => {
        console.log("🎯 Aprendo modal feedback...");
        setShowFeedbackModal(true);
      }, 500);
    } else {
      console.log("❌ instructor - nessun modal per te");
    }
  }, [
    dispatch,
    experienceId,
    isInstructor,
    currentUser.id,
    currentUser.name,
    currentUser.role,
    title,
    lezioni,
    durataLezione,
    costo,
    istruttore,
    getXPCosts, // 👈 Assicurati che sia memoizzata
  ]);

  const handleRejectCourse = () => {
    setShowInitiateRejectModal(true);
    console.log("rejected open BUT non è ancora confermato");
  };

  const handleConfirmReject = (withComment = true) => {
    const hasComment = withComment && rejectComment.trim() !== "";

    // 🎯 ID dei partecipanti
    const STUDENT_USER_ID = "currentUser";
    const INSTRUCTOR_USER_ID = "sara";

    // 🎯 LOGICA DIVERSA PER STUDENT E INSTRUCTOR
    if (isInstructor) {
      // ===== INSTRUCTOR RIFIUTA =====
      const refundAmount = courseState.xpPaid || 0; // Sempre rimborsa
      const penalty = hasComment ? 0 : 10; // Penalità solo se no comment

      console.log(
        `🏫 Instructor rifiuta - Commento: ${hasComment}, Rimborso: ${refundAmount} XP, Penalità: ${penalty} XP`
      );

      // Applica rimborso allo studente + penalità all'instructor
      if (refundAmount > 0) {
        dispatch(
          handleCourseRejection({
            userId: STUDENT_USER_ID, // 👈 RIMBORSA ALLO STUDENTE
            penalty: 0,
            refund: refundAmount, // ➕ Studente recupera firstPayment
            comment: rejectComment,
          })
        );
      }

      if (penalty > 0) {
        dispatch(
          handleCourseRejection({
            userId: INSTRUCTOR_USER_ID, // 👈 PENALITÀ ALL'INSTRUCTOR
            penalty: penalty, // ➖ -10 XP se no comment
            refund: 0,
            comment: rejectComment,
          })
        );
      }
    } else {
      // ===== STUDENT RIFIUTA =====
      const penalty = hasComment ? 0 : 10; // Penalità solo se no comment

      console.log(
        `🎓 Student rifiuta - Commento: ${hasComment}, Penalità: ${penalty} XP`
      );

      if (penalty > 0) {
        dispatch(
          handleCourseRejection({
            userId: STUDENT_USER_ID, // 👈 PENALITÀ ALLO STUDENTE
            penalty: penalty, // ➖ -10 XP se no comment
            refund: 0, // 🚫 Nessun rimborso (ha già perso firstPayment)
            comment: rejectComment,
          })
        );
      }
    }

    // Salva rifiuto nel corso
    dispatch(
      rejectActiveCourse({
        experienceId,
        comment: rejectComment,
        rejectedBy: isInstructor ? "instructor" : "student",
      })
    );

    setShowInitiateRejectModal(false);
    setRejectComment("");
  };

  const handleCancelReject = () => {
    setShowInitiateRejectModal(false);
    setRejectComment("");
  };

  const handleSubmitFeedback = () => {
    const hasComment = feedbackComment.trim() !== "";
    const hasGems = costo >= 30 && feedbackGems > 0;

    // 🆕 BONUS XP TRAMITE SERVICE
    dispatch(
      addFeedbackBonus({
        // userId: "currentUser",
        userId: currentUser.id,
        hasComment,
        hasGems,
      })
    );

    // 🆕 REGISTRA GEM SE ASSEGNATE
    if (hasGems) {
      dispatch(
        recordGemGiven({
          instructorId: experienceData?.skillId,
          experienceId,
        })
      );
    }
    // 🆕 AGGIUNGI GEM ALLA SKILL
    dispatch(
      addGemsToSkill({
        skillId: experienceData?.skillId,
        gems: feedbackGems,
      })
    );
    dispatch(
      updateBookmarkSkillGems({
        userId: currentUser.id,
        skillId: experienceData?.skillId,
        newGemTotal:
          (skillGemTotals[experienceData?.skillId] || 0) + feedbackGems,
      })
    );
    // Salva feedback (invariato)
    dispatch(
      saveFeedback({
        experienceId,
        comment: feedbackComment,
        gemsAssigned: feedbackGems,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      })
    );

    dispatch(
      updateCompletionCardFeedback({
        experienceId,
        feedback: feedbackComment,
        gems: feedbackGems,
      })
    );

    dispatch(markCourseAsCompleted({ experienceId }));

    setFeedbackSubmitted(true);
    setTimeout(() => {
      console.log("DADI FEEDBACKO");
      setShowFeedbackModal(false);
    }, 2000);
  };

  const handleSkipFeedback = () => {
    dispatch(markCourseAsCompleted({ experienceId }));

    setShowFeedbackModal(false);
    console.log("Feedback saltato - corso completato");
  };

  const handleCancelRequest = () => {
    setIsRequestOpen(false);
    setRequestMessage("");
  };

  // UI HELPERS (invariate)
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleFeedback = () => {
    setIsFeedbackExpanded(!isFeedbackExpanded);
  };

  // const getAverageRating = () => {
  //   if (!feedbacks || feedbacks.length === 0) return 0;
  //   const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
  //   return (total / feedbacks.length).toFixed(1);
  // };

  // const renderStars = (rating) => {
  //   return Array.from({ length: 5 }, (_, index) => (
  //     <Star
  //       key={index}
  //       size={12}
  //       className={`${styles.star} ${
  //         index < rating ? styles.starFilled : styles.starEmpty
  //       }`}
  //     />
  //   ));
  // };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit && experienceData) {
      onEdit(experienceData);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete && experienceData) {
      onDelete(experienceData);
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    console.log("Condividi esperienza:", title);
  };

  // const handleLikeClick = (e) => {
  //   e.stopPropagation();
  //   console.log("Like esperienza:", title);
  // };

  // 🎯 MEMOIZZA IL SELECTOR BOOKMARKS
  const isBookmarked = useSelector(
    useMemo(
      () =>
        createSelector(
          [
            (state) =>
              state.experienceSliceTest.bookmarkedCourses[currentUser.id],
          ],
          (userBookmarks) => {
            return (
              userBookmarks?.some(
                (bookmark) => bookmark.experienceId === experienceId
              ) || false
            );
          }
        ),
      [currentUser.id, experienceId]
    )
  );

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    console.log("Bookmark esperienza:", title);

    if (isBookmarked) {
      dispatch(unbookmarkCourse({ experienceId, userId: currentUser.id }));
      console.log("Bookmark rimosso:", title);
    } else {
      dispatch(
        bookmarkCourse({
          experienceId,
          userId: currentUser.id,
          experienceData: experienceData,
          istruttore: istruttore,
          instructorPhoto: instructorPhoto,
          skillGems: skillGems,
          selectedPersonData: selectedPersonData, // 🆕 PASSA TUTTI I DATI PERSONA
        })
      );
      console.log("Bookmark aggiunto:", title);
    }
  };

  const getDisplayGems = () => {
    return skillGems !== undefined && skillGems !== null ? skillGems : 0;
  };

  React.useEffect(() => {
    if (
      // courseState.status === "completed" &&
      courseState.finishClicks.length === 2 &&
      !courseState.completionTriggered && // ← PREVIENE DOPPIO TRIGGER
      !isInstructor
    ) {
      handleCompleteCourse();
    } else {
      console.log("USEEFFECT NON PArte!");
    }
  }, [
    // courseState.status,
    courseState.finishClicks.length,
    courseState.completionTriggered,
    isInstructor,
    dispatch,
  ]);

  const getStatusStyles = () => {
    switch (courseState.status) {
      case "requested":
        return { border: "2px solid var(--text-secondary)" };
      case "ready":
        return { border: "2px solid var(--text-primaryLight)" };
      case "waiting":
        return { border: "2px solid var(--text-primaryLight)" };
      case "rejected":
        return { border: "2px solid black", backgroundColor: "red" };
      case "completed":
        return { border: "2px solid black", backgroundColor: "gray" };
      default:
        return {};
    }
  };

  return (
    <div className={styles.testCard} style={getStatusStyles()}>
      <div className={styles.nav} onClick={toggleExpanded}>
        <h4 className={styles.navTitle}>{title}</h4>
        <div className={styles.navRight}>
          <ul className={styles.navUl}>
            <li>
              {modalita === "online" ? <GlobeIcon size={20} /> : <Home />}
            </li>
            <li>{lingua}</li>
            {/* <li>
              <Clock size={20} />
            </li> */}
          </ul>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.cardContentSperienza}>
          <div className={styles.infoLezione}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Lezioni:</span>
              <span className={styles.infoValue}>{lezioni}</span>
            </div>
            <div className={styles.infoItem}>
              {/* <span className={styles.infoLabel}>Durata lezione:</span> */}
              <span className={styles.infoLabel}>Durata:</span>
              <span className={styles.infoValue}>{durataLezione}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Costo:</span>
              <span className={styles.infoValue}>{costo} XP</span>
            </div>
          </div>
          <div className={styles.descAvat}>
            <div className={styles.descriptionBox}>{descrizione}</div>
            <div className={styles.requestSection}>
              {!courseState.isRequestSent && !isInstructor ? (
                <button
                  className={styles.requestButton}
                  onClick={handleRequestClick}
                  disabled={!canAffordFullCourse()} // ← AGGIUNGI QUESTO
                >
                  <Send size={16} />
                </button>
              ) : (
                <div className={styles.ownerPhotoContainer}>
                  {courseState.status === "active" ||
                  courseState.status === "rejected" ||
                  courseState.status === "pending_feedback" ||
                  courseState.status === "completed" ? (
                    profileData.profilePhoto ? (
                      <img
                        src={profileData.profilePhoto}
                        alt={`Foto profilo ${profileData.firstName}`}
                        className={styles.ownerPhotoSmall}
                      />
                    ) : (
                      <div className={styles.ownerPlaceholder}>
                        {profileData.firstName?.charAt(0).toUpperCase() || (
                          <User size={20} />
                        )}
                      </div>
                    )
                  ) : (
                    <div className={styles.ownerPlaceholder}>
                      <User size={20} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* 🎯 SEZIONE UNIFICATA - Gestione esplicita di tutti gli stati */}
          {/* Form di richiesta temporaneo */}
          {isRequestOpen && (
            <div className={styles.unifiedSection}>
              <div className={styles.requestForm}>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Scrivi la tua disponibilità per l'esperienza..."
                  className={styles.requestTextarea}
                  rows={3}
                />
                <div className={styles.requestActions}>
                  <button
                    onClick={handleCancelRequest}
                    className={styles.requestCancel}
                  >
                    Annulla
                  </button>
                  <button
                    onClick={handleSendRequest}
                    className={styles.requestSend}
                    disabled={!requestMessage.trim()}
                  >
                    <Send size={14} /> Invia
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Stati del corso - Gestione esplicita */}
          {(isRequestOpen || courseState.status !== "idle") && (
            <div className={styles.unifiedSection}>
              {/* ========== RIGA MESSAGGI ========== */}
              <div className={styles.messageRow}>
                {/* STATO: requested - Messaggi */}
                {isInstructor && instructorNotification?.hasNewRequest && (
                  <div className={styles.studentWaiting}>
                    <CheckCircle size={16} />
                    <span>Qualcuno interessato al corso.</span>
                    {/* <span>🔔 Qualcuno interessato al corso.</span> */}
                  </div>
                )}

                {!isInstructor && courseState.status === "requested" && (
                  <div className={styles.studentWaiting}>
                    <CheckCircle size={16} />
                    <span>Richiesta inviata! Aspetta la notifica.</span>
                  </div>
                )}

                {/* STATO: ready - Messaggi */}
                {courseState.status === "ready" && !isInstructor && (
                  <div className={styles.studentWaiting}>
                    <span>⏳ L'istruttore sta preparando il corso...</span>
                  </div>
                )}

                {/* STATO: waiting - Messaggi */}
                {courseState.status === "waiting" && isInstructor && (
                  <div className={styles.waitingMessage}>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill}></div>
                    </div>
                    <span>⏳ In attesa del student...</span>
                  </div>
                )}

                {courseState.status === "waiting" && showXPWarning && (
                  <div className={styles.xpWarning}>
                    <span>
                      ⚠️ XP insufficienti! Servono {getXPCosts().firstPayment}{" "}
                      XP
                    </span>
                    <button onClick={() => setShowXPWarning(false)}>OK</button>
                  </div>
                )}

                {/* STATO: active - Messaggi */}
                {courseState.status === "active" && (
                  <>
                    {courseState.showFinishWaiting ? (
                      <div className={styles.finishWaiting}>
                        <p>
                          {courseState.finishClicks.includes(
                            isInstructor ? "instructor" : "student"
                          )
                            ? "⏳ In attesa che l'altro utente clicchi Termina..."
                            : "⏳ L'altro utente ha cliccato Termina. Clicca anche tu!"}
                        </p>
                        <div className={styles.finishStatus}>
                          <span
                            className={
                              courseState.finishClicks.includes("instructor")
                                ? styles.clicked
                                : styles.pending
                            }
                          >
                            instructor:{" "}
                            {courseState.finishClicks.includes("instructor")
                              ? "✅"
                              : "⏳"}
                          </span>
                          <span
                            className={
                              courseState.finishClicks.includes("student")
                                ? styles.clicked
                                : styles.pending
                            }
                          >
                            student:{" "}
                            {courseState.finishClicks.includes("student")
                              ? "✅"
                              : "⏳"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.activeMessage}>
                        <span>🎓 Corso in sessione!</span>
                      </div>
                    )}
                  </>
                )}

                {/* STATO: pending_feedback - Messaggi */}
                {courseState.status === "pending_feedback" && (
                  <>
                    {!isInstructor ? (
                      <div className={styles.pendingFeedbackMessage}>
                        <CheckCircle size={20} />
                        <span>🎉 Corso completato!</span>
                      </div>
                    ) : (
                      <div className={styles.instructorWaitingMessage}>
                        <CheckCircle size={20} />
                        <span>
                          🎉 Complimenti! Aspetti feedback dello studente.
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* STATO: completed - Messaggi */}
                {courseState.status === "completed" && (
                  <div className={styles.completedMessage}>
                    <CheckCircle size={20} />
                    <span>🎉 Corso completato con successo!</span>
                    {isInstructor && (
                      <p className={styles.completedNote}>
                        📈 Complimenti per aver completato un altro corso!
                      </p>
                    )}
                  </div>
                )}

                {/* STATO: rejected - Commenti */}
                {courseState.status === "rejected" &&
                  courseState.rejectComments?.length > 0 && (
                    <div className={styles.rejectCommentsSection}>
                      <h5>💬 Commenti sul rifiuto:</h5>
                      {courseState.rejectComments.map((comment, index) => (
                        <div key={index} className={styles.rejectCommentItem}>
                          <div className={styles.commentHeader}>
                            <strong>
                              {comment.author === "instructor"
                                ? "Istruttore"
                                : "Studente"}
                            </strong>
                            <span className={styles.commentTime}>
                              {new Date(comment.timestamp).toLocaleTimeString()}
                            </span>
                            {comment.isResponse && (
                              <span className={styles.responseTag}>
                                Risposta
                              </span>
                            )}
                          </div>
                          <p className={styles.commentText}>
                            {comment.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* ========== RIGA PULSANTI ========== */}
              <div className={styles.buttonRow}>
                {/* STATO: requested - Pulsanti */}
                {isInstructor && instructorNotification?.hasNewRequest && (
                  <div className={styles.ownerChoices}>
                    <button
                      // className={styles.acceptRequestButton}
                      className={`${styles.actionButton} ${styles.acceptRequestButton}`}
                      onClick={handleInstructorAcceptRequest}
                    >
                      ✅ Accetto
                    </button>
                    <button
                      // className={styles.rejectRequestButton}
                      className={`${styles.actionButton} ${styles.rejectRequestButton}`}
                      onClick={handleInstructorRejectRequest}
                    >
                      ❌ Rifiuto
                    </button>
                  </div>
                )}

                {/* STATO: ready - Pulsanti */}
                {courseState.status === "ready" && isInstructor && (
                  <button
                    className={styles.startCourseButton}
                    onClick={handleStartCourse}
                  >
                    🚀 Avvio Corso!
                  </button>
                )}

                {/* STATO: waiting - Pulsanti */}
                {courseState.status === "waiting" && !isInstructor && (
                  <button
                    className={styles.acceptCourseButton}
                    onClick={handleStudentAccepts}
                    disabled={!canAffordCourse()}
                  >
                    ✅ Accetta Corso - {getXPCosts().firstPayment} XP ora +{" "}
                    {getXPCosts().secondPayment} XP dopo
                  </button>
                )}

                {/* STATO: active - Pulsanti */}
                {courseState.status === "active" && (
                  <div className={styles.courseButtons}>
                    <button
                      className={styles.rejectCourseButton}
                      onClick={handleRejectCourse}
                    >
                      ❌ Rifiuta
                    </button>
                    <button
                      className={styles.finishCourseButton}
                      onClick={handleFinishCourse}
                      disabled={courseState.finishClicks.includes(
                        isInstructor ? "instructor" : "student"
                      )}
                    >
                      ✅{" "}
                      {courseState.finishClicks.includes(
                        isInstructor ? "instructor" : "student"
                      )
                        ? "Terminato!"
                        : "Termina"}
                    </button>
                  </div>
                )}

                {/* STATO: pending_feedback - Pulsanti */}
                {courseState.status === "pending_feedback" && !isInstructor && (
                  <button
                    className={styles.openFeedbackButton}
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    📝 Lascia Feedback
                  </button>
                )}
              </div>
            </div>
          )}
          {/* MODAL PER CHI INIZIA IL RIFIUTO */}
          {showInitiateRejectModal && (
            <div className={styles.rejectModal}>
              <div className={styles.rejectModalContent}>
                <h4>Perché vuoi rifiutare il corso?</h4>
                <textarea
                  value={rejectComment}
                  onChange={(e) => setRejectComment(e.target.value)}
                  placeholder="Spiega il motivo del rifiuto..."
                  className={styles.rejectTextarea}
                  rows={3}
                />
                <div className={styles.rejectActions}>
                  <button
                    onClick={handleCancelReject}
                    className={styles.rejectCancel}
                  >
                    Annulla
                  </button>
                  <button
                    onClick={() => handleConfirmReject(false)}
                    className={styles.rejectNoComment}
                  >
                    No comment (-10 XP)
                  </button>
                  <button
                    onClick={() => handleConfirmReject(true)}
                    className={styles.rejectConfirm}
                  >
                    Invia commento
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* MODAL PER CHI RICEVE LA NOTIFICA DEL RIFIUTO */}
          {showRejectResponseModal && (
            <div className={styles.rejectResponseModal}>
              <div className={styles.rejectModalContent}>
                <h4>
                  Il corso è stato rifiutato da{" "}
                  {courseState.rejectionInitiatedBy === "instructor"
                    ? "istruttore"
                    : "studente"}
                </h4>

                {/* Mostra il commento originale del rifiuto */}
                {courseState.rejectComments?.[0] && (
                  <div className={styles.originalRejectComment}>
                    <strong>Motivo del rifiuto:</strong>
                    <p>"{courseState.rejectComments[0].comment}"</p>
                  </div>
                )}

                <div className={styles.responseSection}>
                  <label>La tua risposta (facoltativa):</label>
                  <textarea
                    value={responseToRejectComment}
                    onChange={(e) => setResponseToRejectComment(e.target.value)}
                    placeholder="Vuoi aggiungere un commento in risposta?"
                    className={styles.rejectTextarea}
                    rows={3}
                  />
                </div>

                <div className={styles.rejectActions}>
                  <button
                    onClick={handleSkipResponse}
                    className={styles.rejectCancel}
                  >
                    Chiudi
                  </button>

                  {/* 🆕 BOTTONE NO COMMENT CON PENALITÀ */}
                  <button
                    onClick={() => {
                      setResponseToRejectComment(""); // Assicura che sia vuoto
                      handleRespondToRejection(); // Applica penalità -10 XP
                    }}
                    className={styles.rejectNoComment}
                  >
                    No comment (-10 XP)
                  </button>
                  <button
                    onClick={handleRespondToRejection}
                    className={styles.rejectConfirm}
                    disabled={!responseToRejectComment.trim()}
                  >
                    Invia Risposta
                  </button>
                </div>
              </div>
            </div>
          )}

          {showFeedbackModal && (
            <div
              className={styles.feedbackModal}
              onClick={handleModalBackgroundClick} // ← AGGIUNGI QUESTO
            >
              <div className={styles.feedbackModalContent}>
                {!feedbackSubmitted ? (
                  <>
                    <h4>🎉 Corso completato! Lascia un feedback</h4>
                    <div className={styles.ratingSection}>
                      <label>Valutazione:</label>
                      {/* <div className={styles.starRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={24}
                            className={`${styles.starClickable} ${
                              star <= feedbackRating
                                ? styles.starFilled
                                : styles.starEmpty
                            }`}
                            onClick={() => setFeedbackRating(star)}
                          />
                        ))}
                      </div> */}
                    </div>
                    <div className={styles.commentSection}>
                      <label>Recensione (+5 XP):</label>
                      <textarea
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        placeholder="Descrivi la tua esperienza..."
                        className={styles.feedbackTextarea}
                        rows={3}
                      />
                    </div>
                    {costo >= 30 && !hasAlreadyGivenGems ? (
                      <div className={styles.gemSection}>
                        <label>Assegna GEM (+5 XP):</label>
                        <div className={styles.gemSelector}>
                          {[1, 2, 3, 4, 5].map((gem) => (
                            <button
                              key={gem}
                              className={`${styles.gemButton} ${
                                gem <= feedbackGems ? styles.gemSelected : ""
                              }`}
                              onClick={() => setFeedbackGems(gem)}
                            >
                              💎 {gem}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : costo >= 30 && hasAlreadyGivenGems ? (
                      <div className={styles.gemSection}>
                        <p className={styles.gemDisabled}>
                          ✅ Hai già dato GEM a questo istruttore
                        </p>
                      </div>
                    ) : null}
                    <div className={styles.feedbackActions}>
                      <button
                        onClick={handleSkipFeedback}
                        className={styles.skipFeedback}
                      >
                        Salta
                      </button>
                      <button
                        onClick={handleSubmitFeedback}
                        className={styles.submitFeedback}
                        // disabled={feedbackRating === 0}
                      >
                        Invia Feedback
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.feedbackSuccess}>
                    <h4>✅ Grazie per il feedback!</h4>
                    <p>Hai ricevuto bonus XP!</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* FEEDBACK SECTION (invariata) */}
          {getDisplayGems() > 0 && allFeedbacks && feedbacks.length > 0 && (
            <div className={styles.feedbackSection}>
              <div className={styles.feedbackHeader} onClick={toggleFeedback}>
                <div className={styles.feedbackTitle}>
                  <MessageCircle size={16} />
                  <span>Feedback ({allFeedbacks.length})</span>
                </div>
                {isFeedbackExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>

              {isFeedbackExpanded && (
                <div className={styles.feedbackContent}>
                  {allFeedbacks.map((feedback) => (
                    <div key={feedback.id} className={styles.feedbackItem}>
                      <div className={styles.feedbackUser}>
                        <div>
                          {/* {feedback.avatar} */}
                          {feedback.avatar ? (
                            <img
                              src={feedback.avatar}
                              alt={`${feedback.firstName} ${feedback.lastName}`}
                              // className={styles.avatar}
                              className={styles.feedbackAvatar}
                            />
                          ) : (
                            <div className={styles.avatarPlaceholder}>
                              {feedback.user?.[0]}
                            </div>
                          )}
                        </div>

                        <div className={styles.feedbackInfo}>
                          <span className={styles.feedbackName}>
                            {feedback.user}
                          </span>
                          {/* <div className={styles.feedbackRating}>
                            {renderStars(feedback.rating)}
                          </div> */}
                        </div>
                        <span className={styles.feedbackDate}>
                          {feedback.date}
                        </span>
                      </div>
                      <p className={styles.feedbackComment}>
                        {feedback.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className={styles.dividere}></div>
          {/* FOOTER USER (invariato) */}
          <div className={styles.footerUser}>
            <ul className={styles.userInfo}>
              <li>
                {instructorPhoto ? (
                  <img
                    src={instructorPhoto}
                    alt={`Foto profilo ${istruttore}`}
                    className={styles.instructorPhoto}
                  />
                ) : (
                  <div className={styles.userAvatar}>👨‍🎤</div>
                )}
              </li>
              <p>{istruttore}</p>
            </ul>
            <div className={styles.userGem}>
              {/* <Gem size={16} /> */}
              <Gem size={18} />
              <span>{skillGems}</span>
              <div className={styles.iconclass}>{icon}</div>
            </div>
          </div>
          {/* ACTION BUTTONS (invariati) */}
          <div className={styles.actionButtons}>
            {isInstructor ? (
              courseState.status === "idle" ? (
                <>
                  <button
                    className={`${styles.actionButton} ${styles.actionButtonEdit}`}
                    onClick={handleEditClick}
                    title="Modifica esperienza"
                  >
                    <Edit size={16} />
                    <span>Modifica</span>
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                    onClick={handleDeleteClick}
                    title="Elimina esperienza"
                  >
                    <Trash2 size={16} />
                    <span>Elimina</span>
                  </button>
                </>
              ) : (
                <div className={styles.actionSpacer}></div>
              )
            ) : (
              <>
                <div className={styles.actionSpacer}></div>
                <button
                  className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                  onClick={handleShareClick}
                  title="Condividi"
                >
                  <Share size={16} />
                </button>
                {/* <button
                  className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
                  onClick={handleLikeClick}
                  title="Mi piace"
                >
                  <Heart size={16} />
                </button> */}
                <button
                  className={`${styles.actionButton} ${
                    styles.actionButtonSecondary
                  } ${isBookmarked ? styles.bookmarked : ""}`}
                  onClick={handleBookmarkClick}
                  title={isBookmarked ? "Rimuovi dai salvati" : "Salva"}
                >
                  <Bookmark
                    size={16}
                    className={
                      isBookmarked
                        ? styles.bookmarkFilled
                        : styles.bookmarkEmpty
                    }
                  />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TestCardRedux;
