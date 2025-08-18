// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   sendRequest,
//   acceptCourse,
//   viewerFinishCourse,
//   ownerAcceptRequest,
//   ownerRejectRequest,
//   startCourse,
//   ownerFinishCourse,
//   completeCourse,
//   rejectActiveCourse,
//   // updateUserXP,
//   saveFeedback,
//   updateCompletionCardFeedback,
//   recordGemGiven,
// } from "@/store/slices/experienceSliceTest";
// import {
//   MonitorSpeaker,
//   Users,
//   Type,
//   User,
//   Clock,
//   Gem,
//   MoreHorizontal,
//   ChevronDown,
//   ChevronUp,
//   Edit,
//   Share,
//   Heart,
//   Bookmark,
//   Trash2,
//   MessageCircle,
//   Star,
//   Send,
//   CheckCircle,
//   Globe2,
//   GlassWaterIcon,
// } from "lucide-react";
// import styles from "./TestCard.module.css";
// import {
//   createConversationFromRequest,
//   addSystemMessage,
// } from "@/store/slices/chatSlice";
// import { useNotifications } from "@/hooks/useNotifications";

// import {
//   addAsyncNotification,
//   selectNotificationsByRole,
// } from "@/store/slices/notificationSlice";

// import {
//   selectCurrentUserXP,
//   calculateCoursePayments,
//   payCourseFirst,
//   payCourseSecond,
//   addFeedbackBonus, // 🆕 AGGIUNGI
//   handleCourseRejection, // 🆕 AGGIUNGI
// } from "@/services/xpService";
// import {
//   getUserAvatar,
//   getUserDisplayName,
//   selectCurrentUser,
//   selectCurrentUserProfile,
// } from "@/services/userService";

// function TestCardRedux({
//   // Identificativo unico dell'esperienza
//   experienceId,

//   // Props esistenti
//   title = "Cinema / Base",
//   lezioni = 4,
//   durataLezione = "1 ora",
//   costo = 50,
//   descrizione = "Un percorso personalizzato per scoprire i fondamenti della pittura a olio.",
//   istruttore = "Serj Tankian",
//   skillGems,
//   ownerPhoto,
//   partecipanti = 3,
//   icon = "_",
//   lingua,
//   modalita,
//   experienceData,
//   onEdit,
//   isOwner = false,
//   onDelete,
//   feedbacks = [
//     {
//       id: 1,
//       user: "Marco",
//       avatar: "👨‍💼",
//       rating: 5,
//       comment: "Esperienza fantastica! Molto professionale e coinvolgente.",
//       date: "2 giorni fa",
//     },
//     {
//       id: 2,
//       user: "Laura",
//       avatar: "👩‍🎨",
//       rating: 4,
//       comment: "Ottima lezione, ho imparato tantissimo. Consigliato!",
//       date: "1 settimana fa",
//     },
//   ],
// }) {
//   const dispatch = useDispatch();

//   // ✅ AGGIUNGI questi selectors Redux:
//   const currentUserData = useSelector(selectCurrentUser);
//   const currentUserProfile = useSelector(selectCurrentUserProfile);

//   // 🎯 REDUX STATE - sostituisce tutto lo state locale del corso
//   const courseState = useSelector(
//     (state) =>
//       state.experienceSliceTest.courseStates[experienceId] || {
//         status: "idle",
//         requestMessage: "",
//         isRequestSent: false,
//         xpPaid: 0,
//         finishClicks: [],
//         showFinishWaiting: false,
//         rejectData: null,
//       }
//   );

//   const { showSuccessToast, showErrorToast, addCourseNotification } =
//     useNotifications();

//   const ownerNotifications = useSelector(selectNotificationsByRole("owner"));
//   const viewerNotifications = useSelector(selectNotificationsByRole("viewer"));
//   const ownerNotification = useSelector(
//     (state) => state.experienceSliceTest.ownerNotifications[experienceId]
//     // این ربطی به تفکیک نوتیف ها نداره
//   );
//   // const userXP = useSelector((state) => state.experienceSliceTest.userXP);
//   const currentXP = useSelector(selectCurrentUserXP);

//   // const userXP = useSelector((state) => state.quickSetup.xp);
//   // 🎯 NUOVO: Controllo GEM già date a questo Owner
//   const hasAlreadyGivenGems = useSelector((state) => {
//     const ownerId = experienceData?.skillId; // o ownerUserId
//     return state.experienceSliceTest.gemHistory?.[ownerId]?.includes(
//       experienceId
//     );
//   });
//   // 🎯 2. AGGIUNGI: Calcola dati utente basati sul ruolo
//   // const currentUser = {
//   //   role: isOwner ? "owner" : "viewer",
//   //   name: isOwner ? "Sara Dormand" : "Marco Rossi",
//   //   avatar: isOwner ? "👩‍🎨" : "👨‍💼",
//   //   id: isOwner ? "owner456" : "user123",
//   // };

//   // ✅ CALCOLA currentUser dinamicamente:
//   const currentUser = React.useMemo(() => {
//     if (!currentUserData || !currentUserProfile) {
//       // Fallback se userService non è ancora caricato
//       return {
//         role: isOwner ? "owner" : "viewer",
//         name: isOwner ? "Sara Dormand" : "Marco Rossi",
//         avatar: isOwner ? "👩‍🎨" : "👨‍💼",
//         id: isOwner ? "sara" : "currentUser",
//       };
//     }

//     return {
//       role: currentUserProfile.role || (isOwner ? "owner" : "viewer"),
//       name: getUserDisplayName(currentUserData),
//       avatar: getUserAvatar(currentUserData),
//       id: currentUserProfile.id || "currentUser",
//       firstName: currentUserProfile.firstName,
//       lastName: currentUserProfile.lastName,
//     };
//   }, [currentUserData, currentUserProfile, isOwner]);

//   // 🎯 STATE LOCALE - solo per UI temporanei (modals, form)
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(false);
//   const [isRequestOpen, setIsRequestOpen] = useState(false);
//   const [requestMessage, setRequestMessage] = useState("");
//   const [showXPWarning, setShowXPWarning] = useState(false);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [rejectComment, setRejectComment] = useState("");
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
//   // const [feedbackRating, setFeedbackRating] = useState(0);
//   const [feedbackComment, setFeedbackComment] = useState("");
//   const [feedbackGems, setFeedbackGems] = useState(0);
//   const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

//   // Nel component, sostituisci props feedbacks con Redux
//   const dynamicFeedbacks = useSelector(
//     (state) => state.experienceSliceTest.experienceFeedbacks[experienceId] || []
//   );

//   // Combina mock + dinamici (o usa solo dinamici)
//   const allFeedbacks = [...feedbacks, ...dynamicFeedbacks];

//   const getXPCosts = () => calculateCoursePayments(costo);

//   const canAffordCourse = () => {
//     const { firstPayment } = getXPCosts();
//     return currentXP >= firstPayment;
//   };
//   // 🎯 REDUX ACTIONS - sostituiscono le funzioni locali

//   const handleRequestClick = () => {
//     setIsRequestOpen(true);
//   };

//   const handleSendRequest = () => {
//     console.log("SEND REqUest", currentUser);

//     if (requestMessage.trim()) {
//       // 🎯 1. Invia richiesta (tuo slice esistente)
//       dispatch(
//         sendRequest({
//           experienceId,
//           message: requestMessage,
//         })
//       );

//       // 🎯 2. Toast immediato per feedback locale
//       showSuccessToast("Richiesta inviata con successo!", 3000, "viewer");

//       // 🎯 3. Crea conversazione in chat automaticamente
//       dispatch(
//         createConversationFromRequest({
//           experienceId,
//           experienceTitle: title,
//           viewerName: currentUser.name,
//           viewerAvatar: currentUser.avatar,
//           message: requestMessage,
//         })
//       );

//       // 🎯 4. Crea notifica asincrona per Owner usando il NUOVO sistema
//       dispatch(
//         addAsyncNotification({
//           title: "Nuova richiesta ricevuta! 📩",
//           message: `${currentUser.name} vuole partecipare a "${title}"`,
//           type: "info",
//           category: "course",
//           targetRole: "owner", // 👈 SOLO OWNER VEDRÀ QUESTA
//           fromRole: "viewer",
//           experienceId: experienceId,
//           conversationId: `exp-${experienceId}`, // 🆕 AGGIUNGI QUESTO
//           actionData: { experienceId, action: "review_request" },
//           requiresAction: true,
//         })
//       );

//       // 🎯 5. Cleanup UI
//       setIsRequestOpen(false);
//       setRequestMessage("");

//       console.log("Richiesta inviata via Redux:", requestMessage);
//     }
//   };

//   const handleOwnerAcceptRequest = () => {
//     console.log("panello sin??", currentUser);

//     dispatch(ownerAcceptRequest({ experienceId }));

//     // Toast per owner
//     showSuccessToast("Richiesta accettata!", 3000, "owner");

//     // 🎯 Aggiungi messaggio di sistema alla chat
//     dispatch(
//       addSystemMessage({
//         conversationId: `exp-${experienceId}`,
//         message:
//           "🎉 Sara ha accettato la tua richiesta! Il corso è pronto per essere avviato.",
//         systemType: "request_accepted",
//       })
//     );
//     console.log("Owner ha accettato la richiesta");
//   };

//   const handleOwnerRejectRequest = () => {
//     dispatch(ownerRejectRequest({ experienceId }));
//     console.log("Owner ha rifiutato la richiesta");
//   };

//   const handleStartCourse = () => {
//     dispatch(startCourse({ experienceId }));
//     // 🎯 Messaggio di sistema: corso avviato
//     dispatch(
//       addSystemMessage({
//         conversationId: `exp-${experienceId}`,
//         message:
//           "🚀 Il corso è stato avviato! In attesa che il partecipante accetti.",
//         systemType: "course_started",
//       })
//     );
//     console.log("Owner ha avviato il corso");
//   };

//   const handleViewerAccepts = () => {
//     const { firstPayment } = getXPCosts();
//     console.log("🔍 Prima del dispatch:", courseState.status);

//     if (!canAffordCourse()) {
//       setShowXPWarning(true);
//       return;
//     }

//     dispatch(
//       payCourseFirst({
//         // userId: "currentUser", // TODO: get from current user
//         userId: currentUser.id,

//         experienceId,
//         amount: firstPayment,
//       })
//     );

//     dispatch(
//       acceptCourse({
//         experienceId,
//         firstPayment,
//       })
//     );

//     console.log(`Viewer ha accettato e pagato ${firstPayment} XP`);

//     // ✅ NOTIFICA ASYNC per Owner (apparirà nel panel sinistro)
//     dispatch(
//       addAsyncNotification({
//         title: "✅ Corso accettato!",
//         message: `${currentUser.name} ha accettato il corso "${title}"`,
//         type: "info",
//         category: "course",
//         targetRole: "owner", // ← Solo owner la vedrà
//         experienceId: experienceId,
//       })
//     );
//   };

//   React.useEffect(() => {
//     console.log("🔍 Stato cambiato:", courseState.status);
//   }, [courseState.status]);

//   const handleFinishCourse = () => {
//     if (isOwner) {
//       dispatch(ownerFinishCourse({ experienceId }));
//     } else {
//       dispatch(viewerFinishCourse({ experienceId }));
//     }
//   };

//   const handleCompleteCourse = () => {
//     const { secondPayment } = getXPCosts();
//     // Solo il viewer paga il secondo pagamento
//     const paymentAmount = isOwner ? 0 : secondPayment;
//     if (!isOwner && paymentAmount > 0) {
//       dispatch(
//         payCourseSecond({
//           // userId: "currentUser", // TODO: get from current user
//           userId: currentUser.id, // TODO: get from current user
//           experienceId,
//           amount: paymentAmount,
//         })
//       );
//     }
//     dispatch(
//       completeCourse({
//         experienceId,
//         // secondPayment: paymentAmount,
//         // Dati per completion card
//         title,
//         lezioni,
//         durataLezione,
//         costo,
//         istruttore,
//         viewerName: currentUser.name, // 🎯 FISSO
//         isOwner,
//         role: currentUser.role, // 🎯 FISSO
//       })
//     );

//     console.log("🎉 Corso completato!");
//     console.log("isOwner:", isOwner); // ← Questo ti dirà se sei owner o viewer

//     if (!isOwner) {
//       console.log("✅ Viewer - mostrerò modal tra 500ms");
//       setTimeout(() => {
//         console.log("🎯 Aprendo modal feedback...");
//         setShowFeedbackModal(true);
//       }, 500);
//     } else {
//       console.log("❌ Owner - nessun modal per te");
//     }
//   };

//   const handleRejectCourse = () => {
//     setShowRejectModal(true);
//   };

//   // const handleConfirmReject = (withComment = true) => {
//   //   let penalty = 0;

//   //   if (!withComment || rejectComment.trim() === "") {
//   //     penalty = 10;
//   //   }

//   //   dispatch(
//   //     rejectActiveCourse({
//   //       experienceId,
//   //       comment: rejectComment,
//   //       penalty,
//   //       refundXP: courseState.xpPaid,
//   //     })
//   //   );

//   //   setShowRejectModal(false);
//   //   setRejectComment("");

//   //   console.log(`Corso rifiutato. Penale: ${penalty} XP`);
//   // };

//   const handleConfirmReject = (withComment = true) => {
//     const penalty = !withComment || rejectComment.trim() === "" ? 10 : 0;
//     const refundAmount = courseState.xpPaid || 0;

//     // 🆕 GESTISCI XP TRAMITE SERVICE
//     dispatch(
//       handleCourseRejection({
//         // userId: "currentUser",
//         userId: currentUser.id,
//         penalty,
//         refund: refundAmount,
//         comment: rejectComment,
//       })
//     );

//     // 🆕 REJECT SENZA PENALTY/REFUND
//     dispatch(
//       rejectActiveCourse({
//         experienceId,
//         comment: rejectComment,
//         rejectedBy: isOwner ? "owner" : "viewer",
//       })
//     );

//     setShowRejectModal(false);
//     setRejectComment("");
//   };
//   const handleCancelReject = () => {
//     setShowRejectModal(false);
//     setRejectComment("");
//   };

//   // const handleSubmitFeedback = () => {
//   //   let bonusXP = 0;

//   //   if (feedbackComment.trim()) {
//   //     bonusXP += 5;
//   //   }

//   //   if (costo >= 30 && feedbackGems > 0) {
//   //     bonusXP += 5;
//   //   }

//   //   if (bonusXP > 0) {
//   //     // dispatch(updateUserXP({ amount: bonusXP }));
//   //   }

//   //   // 🎯 NUOVO: Salva feedback nel Redux
//   //   dispatch(
//   //     saveFeedback({
//   //       experienceId,
//   //       // rating: feedbackRating,
//   //       comment: feedbackComment,
//   //       gemsAssigned: feedbackGems,
//   //       userName: currentUser.name, // 🎯 FISSO
//   //       userAvatar: currentUser.avatar, // 🎯 FISSO
//   //     })
//   //   );

//   //   // AGGIUNGI questo:
//   //   dispatch(
//   //     updateCompletionCardFeedback({
//   //       experienceId,
//   //       feedback: feedbackComment,
//   //       gems: feedbackGems,
//   //     })
//   //   );

//   //   setFeedbackSubmitted(true);

//   //   setTimeout(() => {
//   //     setShowFeedbackModal(false);
//   //   }, 2000);

//   //   console.log(`Feedback inviato! Bonus: +${bonusXP} XP`);
//   // };
//   const handleSubmitFeedback = () => {
//     const hasComment = feedbackComment.trim() !== "";
//     const hasGems = costo >= 30 && feedbackGems > 0;

//     // 🆕 BONUS XP TRAMITE SERVICE
//     dispatch(
//       addFeedbackBonus({
//         // userId: "currentUser",
//         userId: currentUser.id,
//         hasComment,
//         hasGems,
//       })
//     );

//     // 🆕 REGISTRA GEM SE ASSEGNATE
//     if (hasGems) {
//       dispatch(
//         recordGemGiven({
//           ownerId: experienceData?.skillId,
//           experienceId,
//         })
//       );
//     }

//     // Salva feedback (invariato)
//     dispatch(
//       saveFeedback({
//         experienceId,
//         comment: feedbackComment,
//         gemsAssigned: feedbackGems,
//         userName: currentUser.name,
//         userAvatar: currentUser.avatar,
//       })
//     );

//     dispatch(
//       updateCompletionCardFeedback({
//         experienceId,
//         feedback: feedbackComment,
//         gems: feedbackGems,
//       })
//     );

//     setFeedbackSubmitted(true);
//     setTimeout(() => {
//       console.log("DADI FEEDBACKO");
//       setShowFeedbackModal(false);
//     }, 2000);
//   };
//   const handleSkipFeedback = () => {
//     setShowFeedbackModal(false);
//     console.log("Feedback saltato");
//   };

//   const handleCancelRequest = () => {
//     setIsRequestOpen(false);
//     setRequestMessage("");
//   };

//   // UI HELPERS (invariate)
//   const toggleExpanded = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const toggleFeedback = () => {
//     setIsFeedbackExpanded(!isFeedbackExpanded);
//   };

//   // const getAverageRating = () => {
//   //   if (!feedbacks || feedbacks.length === 0) return 0;
//   //   const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
//   //   return (total / feedbacks.length).toFixed(1);
//   // };

//   // const renderStars = (rating) => {
//   //   return Array.from({ length: 5 }, (_, index) => (
//   //     <Star
//   //       key={index}
//   //       size={12}
//   //       className={`${styles.star} ${
//   //         index < rating ? styles.starFilled : styles.starEmpty
//   //       }`}
//   //     />
//   //   ));
//   // };

//   const handleEditClick = (e) => {
//     e.stopPropagation();
//     if (onEdit && experienceData) {
//       onEdit(experienceData);
//     }
//   };

//   const handleDeleteClick = (e) => {
//     e.stopPropagation();
//     if (onDelete && experienceData) {
//       onDelete(experienceData);
//     }
//   };

//   const handleShareClick = (e) => {
//     e.stopPropagation();
//     console.log("Condividi esperienza:", title);
//   };

//   const handleLikeClick = (e) => {
//     e.stopPropagation();
//     console.log("Like esperienza:", title);
//   };

//   const handleBookmarkClick = (e) => {
//     e.stopPropagation();
//     console.log("Bookmark esperienza:", title);
//   };

//   // const generateAvatars = () => {
//   //   const maxAvatars = Math.min(partecipanti, 4);
//   //   const avatarEmojis = ["👨‍🎨", "👩‍🎨", "👨‍🏫", "👩‍🏫"];
//   //   const avatarColors = ["#ff8c42", "#6c5ce7", "#fd79a8", "#00cec9"];

//   //   return Array.from({ length: maxAvatars }, (_, index) => (
//   //     <li key={index}>
//   //       <div
//   //         className={styles.avatarPlaceholder}
//   //         style={{ background: avatarColors[index] }}
//   //       >
//   //         {avatarEmojis[index]}
//   //       </div>
//   //     </li>
//   //   ));
//   // };

//   const getDisplayGems = () => {
//     return skillGems !== undefined && skillGems !== null ? skillGems : 0;
//   };

//   React.useEffect(() => {
//     if (
//       courseState.status === "completed" &&
//       courseState.finishClicks.length === 2 &&
//       !courseState.completionTriggered // ← PREVIENE DOPPIO TRIGGER

//       // !courseState.hasCompletedOnce
//     ) {
//       handleCompleteCourse();
//       console.log("HAHA....USEEFFECT");
//     } else {
//       console.log("USEEFFECT NON PArte!");
//     }
//   }, [
//     courseState.status,
//     courseState.finishClicks.length,
//     courseState.completionTriggered,
//   ]);

//   const getStatusStyles = () => {
//     switch (courseState.status) {
//       case "requested":
//         return { border: "2px solid red" };
//       case "ready":
//         return { border: "2px solid blue" };
//       case "waiting":
//         return { border: "2px solid gray" };
//       case "completed":
//         return { border: "2px solid black", backgroundColor: "gray" };
//       default:
//         return {};
//     }
//   };

//   return (
//     <div className={styles.testCard} style={getStatusStyles()}>
//       <div className={styles.nav} onClick={toggleExpanded}>
//         <h4 className={styles.navTitle}>{title}</h4>
//         <div className={styles.navRight}>
//           <ul className={styles.navUl}>
//             <li>
//               {modalita === "online" ? (
//                 <MonitorSpeaker size={20} />
//               ) : (
//                 <Globe2 />
//               )}
//             </li>
//             <li>{lingua}</li>
//             <li>
//               <Clock size={20} />
//             </li>
//           </ul>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className={styles.cardContentSperienza}>
//           <div className={styles.infoLezione}>
//             <div className={styles.infoItem}>
//               <span className={styles.infoLabel}>Lezioni:</span>
//               <span className={styles.infoValue}>{lezioni}</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoLabel}>Durata lezione:</span>
//               <span className={styles.infoValue}>{durataLezione}</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoLabel}>Costo:</span>
//               <span className={styles.infoValue}>{costo} XP</span>
//             </div>
//           </div>

//           <div className={styles.descAvat}>
//             <div className={styles.descriptionBox}>{descrizione}</div>
//             <div className={styles.requestSection}>
//               {!courseState.isRequestSent && !isOwner ? (
//                 <button
//                   className={styles.requestButton}
//                   onClick={handleRequestClick}
//                 >
//                   <Send size={16} />
//                 </button>
//               ) : (
//                 <div className={styles.ownerPhotoContainer}>
//                   {ownerPhoto ? (
//                     <img
//                       src={ownerPhoto}
//                       alt={`Foto profilo ${istruttore}`}
//                       className={styles.ownerPhotoSmall}
//                     />
//                   ) : (
//                     <div className={styles.ownerPlaceholder}>
//                       <User size={20} />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//           {/* 🎯 SEZIONE UNIFICATA - Gestione esplicita di tutti gli stati */}
//           {/* Form di richiesta temporaneo */}
//           {isRequestOpen && (
//             <div className={styles.unifiedSection}>
//               <div className={styles.requestForm}>
//                 <textarea
//                   value={requestMessage}
//                   onChange={(e) => setRequestMessage(e.target.value)}
//                   placeholder="Scrivi la tua disponibilità per l'esperienza..."
//                   className={styles.requestTextarea}
//                   rows={3}
//                 />
//                 <div className={styles.requestActions}>
//                   <button
//                     onClick={handleCancelRequest}
//                     className={styles.requestCancel}
//                   >
//                     Annulla
//                   </button>
//                   <button
//                     onClick={handleSendRequest}
//                     className={styles.requestSend}
//                     disabled={!requestMessage.trim()}
//                   >
//                     <Send size={14} /> Invia
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Stati del corso - Gestione esplicita */}
//           {!isRequestOpen && (
//             <div className={styles.unifiedSection}>
//               {/* STATO: idle */}
//               {/* {courseState.status === "idle" && !isOwner && (
//                 <div className={styles.idleState}>
//                   <p>💡 Clicca per inviare una richiesta di partecipazione</p>
//                 </div>
//               )} */}

//               {/* STATO: requested */}
//               {courseState.status === "requested" && (
//                 <>
//                   {isOwner && ownerNotification?.hasNewRequest ? (
//                     <div className={styles.ownerNotification}>
//                       <div className={styles.notificationMessage}>
//                         <CheckCircle size={16} />
//                         <span>🔔 Qualcuno interessato al corso.</span>
//                       </div>
//                       <div className={styles.ownerChoices}>
//                         <button
//                           className={styles.acceptRequestButton}
//                           onClick={handleOwnerAcceptRequest}
//                         >
//                           ✅ Accetto
//                         </button>
//                         <button
//                           className={styles.rejectRequestButton}
//                           onClick={handleOwnerRejectRequest}
//                         >
//                           ❌ Rifiuto
//                         </button>
//                       </div>
//                     </div>
//                   ) : !isOwner ? (
//                     <div className={styles.viewerWaiting}>
//                       <CheckCircle size={16} />
//                       <span>Richiesta inviata! Aspetta la notifica.</span>
//                     </div>
//                   ) : null}
//                 </>
//               )}

//               {/* STATO: ready */}
//               {courseState.status === "ready" && (
//                 <>
//                   {isOwner ? (
//                     <button
//                       className={styles.startCourseButton}
//                       onClick={handleStartCourse}
//                     >
//                       🚀 Avvio Corso!
//                     </button>
//                   ) : (
//                     <div className={styles.viewerWaiting}>
//                       <span>⏳ L'istruttore sta preparando il corso...</span>
//                     </div>
//                   )}
//                 </>
//               )}

//               {/* STATO: waiting */}
//               {courseState.status === "waiting" && (
//                 <>
//                   {isOwner ? (
//                     <div className={styles.waitingCourseButton}>
//                       <div className={styles.progressBar}>
//                         <div className={styles.progressFill}></div>
//                       </div>
//                       <span>⏳ In attesa del viewer...</span>
//                     </div>
//                   ) : (
//                     <>
//                       <button
//                         className={styles.acceptCourseButton}
//                         onClick={handleViewerAccepts}
//                         disabled={!canAffordCourse()}
//                       >
//                         ✅ Accetta Corso - {getXPCosts().firstPayment} XP ora +{" "}
//                         {getXPCosts().secondPayment} XP dopo
//                       </button>
//                       {showXPWarning && (
//                         <div className={styles.xpWarning}>
//                           <span>
//                             ⚠️ XP insufficienti! Servono{" "}
//                             {getXPCosts().firstPayment} XP
//                           </span>
//                           <button onClick={() => setShowXPWarning(false)}>
//                             OK
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}

//               {/* STATO: active */}
//               {courseState.status === "active" && (
//                 <div className={styles.courseActions}>
//                   {courseState.showFinishWaiting ? (
//                     <div className={styles.finishWaiting}>
//                       <p>
//                         {courseState.finishClicks.includes(
//                           isOwner ? "owner" : "viewer"
//                         )
//                           ? "⏳ In attesa che l'altro utente clicchi Termina..."
//                           : "⏳ L'altro utente ha cliccato Termina. Clicca anche tu!"}
//                       </p>
//                       <div className={styles.finishStatus}>
//                         <span
//                           className={
//                             courseState.finishClicks.includes("owner")
//                               ? styles.clicked
//                               : styles.pending
//                           }
//                         >
//                           Owner:{" "}
//                           {courseState.finishClicks.includes("owner")
//                             ? "✅"
//                             : "⏳"}
//                         </span>
//                         <span
//                           className={
//                             courseState.finishClicks.includes("viewer")
//                               ? styles.clicked
//                               : styles.pending
//                           }
//                         >
//                           Viewer:{" "}
//                           {courseState.finishClicks.includes("viewer")
//                             ? "✅"
//                             : "⏳"}
//                         </span>
//                       </div>
//                     </div>
//                   ) : (
//                     <p>🎓 Corso in sessione!</p>
//                   )}

//                   <div className={styles.courseButtons}>
//                     <button
//                       className={styles.rejectCourseButton}
//                       onClick={handleRejectCourse}
//                     >
//                       ❌ Rifiuta
//                     </button>
//                     <button
//                       className={styles.finishCourseButton}
//                       onClick={handleFinishCourse}
//                       disabled={courseState.finishClicks.includes(
//                         isOwner ? "owner" : "viewer"
//                       )}
//                     >
//                       ✅{" "}
//                       {courseState.finishClicks.includes(
//                         isOwner ? "owner" : "viewer"
//                       )
//                         ? "Terminato!"
//                         : "Termina"}
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* STATO: completed */}
//               {courseState.status === "completed" && (
//                 <div className={styles.completedState}>
//                   <div className={styles.completedMessage}>
//                     <CheckCircle size={20} />
//                     <span>🎉 Corso completato con successo!</span>
//                   </div>
//                   {!isOwner && (
//                     <p className={styles.completedNote}>
//                       💎 Non dimenticare di lasciare una recensione!
//                     </p>
//                   )}
//                   {isOwner && (
//                     <p className={styles.completedNote}>
//                       📈 Complimenti per aver completato un altro corso!
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* MODALS (invariati) */}
//           {showRejectModal && (
//             <div className={styles.rejectModal}>
//               <div className={styles.rejectModalContent}>
//                 <h4>Perché vuoi rifiutare il corso?</h4>
//                 <textarea
//                   value={rejectComment}
//                   onChange={(e) => setRejectComment(e.target.value)}
//                   placeholder="Spiega il motivo del rifiuto..."
//                   className={styles.rejectTextarea}
//                   rows={3}
//                 />
//                 <div className={styles.rejectActions}>
//                   <button
//                     onClick={handleCancelReject}
//                     className={styles.rejectCancel}
//                   >
//                     Annulla
//                   </button>
//                   <button
//                     onClick={() => handleConfirmReject(false)}
//                     className={styles.rejectNoComment}
//                   >
//                     No comment (-10 XP)
//                   </button>
//                   <button
//                     onClick={() => handleConfirmReject(true)}
//                     className={styles.rejectConfirm}
//                   >
//                     Invia commento
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {showFeedbackModal && (
//             <div className={styles.feedbackModal}>
//               <div className={styles.feedbackModalContent}>
//                 {!feedbackSubmitted ? (
//                   <>
//                     <h4>🎉 Corso completato! Lascia un feedback</h4>
//                     <div className={styles.ratingSection}>
//                       <label>Valutazione:</label>
//                       {/* <div className={styles.starRating}>
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <Star
//                             key={star}
//                             size={24}
//                             className={`${styles.starClickable} ${
//                               star <= feedbackRating
//                                 ? styles.starFilled
//                                 : styles.starEmpty
//                             }`}
//                             onClick={() => setFeedbackRating(star)}
//                           />
//                         ))}
//                       </div> */}
//                     </div>
//                     <div className={styles.commentSection}>
//                       <label>Recensione (+5 XP):</label>
//                       <textarea
//                         value={feedbackComment}
//                         onChange={(e) => setFeedbackComment(e.target.value)}
//                         placeholder="Descrivi la tua esperienza..."
//                         className={styles.feedbackTextarea}
//                         rows={3}
//                       />
//                     </div>
//                     {costo >= 30 && !hasAlreadyGivenGems ? (
//                       <div className={styles.gemSection}>
//                         <label>Assegna GEM (+5 XP):</label>
//                         <div className={styles.gemSelector}>
//                           {[1, 2, 3, 4, 5].map((gem) => (
//                             <button
//                               key={gem}
//                               className={`${styles.gemButton} ${
//                                 gem <= feedbackGems ? styles.gemSelected : ""
//                               }`}
//                               onClick={() => setFeedbackGems(gem)}
//                             >
//                               💎 {gem}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     ) : costo >= 30 && hasAlreadyGivenGems ? (
//                       <div className={styles.gemSection}>
//                         <p className={styles.gemDisabled}>
//                           ✅ Hai già dato GEM a questo istruttore
//                         </p>
//                       </div>
//                     ) : null}
//                     <div className={styles.feedbackActions}>
//                       <button
//                         onClick={handleSkipFeedback}
//                         className={styles.skipFeedback}
//                       >
//                         Salta
//                       </button>
//                       <button
//                         onClick={handleSubmitFeedback}
//                         className={styles.submitFeedback}
//                         // disabled={feedbackRating === 0}
//                       >
//                         Invia Feedback
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <div className={styles.feedbackSuccess}>
//                     <h4>✅ Grazie per il feedback!</h4>
//                     <p>Hai ricevuto bonus XP!</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* FEEDBACK SECTION (invariata) */}
//           {getDisplayGems() > 0 && allFeedbacks && feedbacks.length > 0 && (
//             <div className={styles.feedbackSection}>
//               <div className={styles.feedbackHeader} onClick={toggleFeedback}>
//                 <div className={styles.feedbackTitle}>
//                   <MessageCircle size={16} />
//                   <span>Feedback ({allFeedbacks.length})</span>
//                   {/* <div className={styles.ratingBadge}>
//                     <Star size={12} className={styles.starFilled} />
//                     <span>{getAverageRating()}</span>
//                   </div> */}
//                 </div>
//                 {isFeedbackExpanded ? (
//                   <ChevronUp size={16} />
//                 ) : (
//                   <ChevronDown size={16} />
//                 )}
//               </div>

//               {isFeedbackExpanded && (
//                 <div className={styles.feedbackContent}>
//                   {allFeedbacks.map((feedback) => (
//                     <div key={feedback.id} className={styles.feedbackItem}>
//                       <div className={styles.feedbackUser}>
//                         <div className={styles.feedbackAvatar}>
//                           {feedback.avatar}
//                         </div>
//                         <div className={styles.feedbackInfo}>
//                           <span className={styles.feedbackName}>
//                             {feedback.user}
//                           </span>
//                           {/* <div className={styles.feedbackRating}>
//                             {renderStars(feedback.rating)}
//                           </div> */}
//                         </div>
//                         <span className={styles.feedbackDate}>
//                           {feedback.date}
//                         </span>
//                       </div>
//                       <p className={styles.feedbackComment}>
//                         {feedback.comment}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           <div className={styles.dividere}></div>

//           {/* FOOTER USER (invariato) */}
//           <div className={styles.footerUser}>
//             <ul className={styles.userInfo}>
//               <li>
//                 {ownerPhoto ? (
//                   <img
//                     src={ownerPhoto}
//                     alt={`Foto profilo ${istruttore}`}
//                     className={styles.ownerPhoto}
//                   />
//                 ) : (
//                   <div className={styles.userAvatar}>👨‍🎤</div>
//                 )}
//               </li>
//               <p>{istruttore}</p>
//             </ul>
//             <div className={styles.userGem}>
//               <Gem size={16} />
//               <span>{skillGems}</span>
//               <div className={styles.iconclass}>{icon}</div>
//             </div>
//           </div>

//           {/* ACTION BUTTONS (invariati) */}
//           <div className={styles.actionButtons}>
//             {isOwner ? (
//               courseState.status === "idle" ? (
//                 <>
//                   <button
//                     className={`${styles.actionButton} ${styles.actionButtonEdit}`}
//                     onClick={handleEditClick}
//                     title="Modifica esperienza"
//                   >
//                     <Edit size={16} />
//                     <span>Modifica</span>
//                   </button>
//                   <button
//                     className={`${styles.actionButton} ${styles.actionButtonDelete}`}
//                     onClick={handleDeleteClick}
//                     title="Elimina esperienza"
//                   >
//                     <Trash2 size={16} />
//                     <span>Elimina</span>
//                   </button>
//                 </>
//               ) : (
//                 <div className={styles.actionSpacer}></div>
//               )
//             ) : (
//               <>
//                 <div className={styles.actionSpacer}></div>
//                 <button
//                   className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
//                   onClick={handleShareClick}
//                   title="Condividi"
//                 >
//                   <Share size={16} />
//                 </button>
//                 <button
//                   className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
//                   onClick={handleLikeClick}
//                   title="Mi piace"
//                 >
//                   <Heart size={16} />
//                 </button>
//                 <button
//                   className={`${styles.actionButton} ${styles.actionButtonSecondary}`}
//                   onClick={handleBookmarkClick}
//                   title="Salva"
//                 >
//                   <Bookmark size={16} />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TestCardRedux;

function TestCardRedux55() {
  return <div>hi</div>;
}

export default TestCardRedux55;
