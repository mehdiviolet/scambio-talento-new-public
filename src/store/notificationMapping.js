// store/notificationMapping.js
// Mappa che definisce quale azione genera quale notifica

export const NOTIFICATION_MAPPING = {
  // =============== EXPERIENCE FLOW ===============

  "experienceSliceTest/sendRequest": {
    type: "request_received",
    targetRole: "owner",
    fromRole: "viewer",
    category: "course",
    generateNotification: (action) => ({
      title: "Nuova richiesta corso",
      message: `${
        action.payload.studentData?.name || "Uno studente"
      } ha richiesto accesso al corso "${
        action.payload.experienceData?.title || "un corso"
      }"`,
      actionData: {
        experienceId: action.payload.experienceId,
        studentName: action.payload.studentData?.name,
        courseTitle: action.payload.experienceData?.title,
        requestMessage: action.payload.message,
      },
    }),
  },

  "experienceSliceTest/instructorAcceptRequest": {
    type: "request_accepted",
    targetRole: "viewer",
    fromRole: "owner",
    category: "course",
    generateNotification: (action) => ({
      title: "Richiesta accettata!",
      message: `La tua richiesta per il corso è stata accettata. Puoi procedere con il pagamento.`,
      actionData: {
        experienceId: action.payload.experienceId,
        canProceedToPayment: true,
      },
    }),
  },

  "experienceSliceTest/instructorRejectRequest": {
    type: "request_rejected",
    targetRole: "viewer",
    fromRole: "owner",
    category: "course",
    generateNotification: (action) => ({
      title: "Richiesta non accettata",
      message: `La tua richiesta per il corso non è stata accettata.`,
      actionData: {
        experienceId: action.payload.experienceId,
        reason: action.payload.reason || "Nessun motivo specificato",
      },
    }),
  },

  "experienceSliceTest/startCourse": {
    type: "course_started",
    targetRole: "viewer",
    fromRole: "owner",
    category: "course",
    generateNotification: (action) => ({
      title: "Corso iniziato",
      message: `Il tuo corso è ora attivo. Buono studio!`,
      actionData: {
        experienceId: action.payload.experienceId,
      },
    }),
  },

  "experienceSliceTest/studentFinishCourse": {
    type: "student_completed",
    targetRole: "owner",
    fromRole: "viewer",
    category: "course",
    generateNotification: (action) => ({
      title: "Studente ha completato",
      message: `Lo studente ha segnalato il completamento del corso. Conferma anche tu per finalizzare.`,
      actionData: {
        experienceId: action.payload.experienceId,
        needsConfirmation: true,
      },
    }),
  },

  "experienceSliceTest/instructorFinishCourse": {
    type: "instructor_completed",
    targetRole: "viewer",
    fromRole: "owner",
    category: "course",
    generateNotification: (action) => ({
      title: "Istruttore ha completato",
      message: `L'istruttore ha segnalato il completamento del corso. Conferma anche tu per finalizzare.`,
      actionData: {
        experienceId: action.payload.experienceId,
        needsConfirmation: true,
      },
    }),
  },

  "experienceSliceTest/completeCourse": {
    type: "course_completed",
    // Genera notifica per ENTRAMBI i ruoli
    targetRole: "both", // Verrà gestito nel middleware
    fromRole: "system",
    category: "course",
    generateNotification: (action) => ({
      title: "Corso completato!",
      message: `Il corso "${action.payload.title}" è stato completato con successo. Lascia un feedback!`,
      actionData: {
        experienceId: action.payload.experienceId,
        title: action.payload.title,
        needsFeedback: true,
      },
    }),
  },

  "experienceSliceTest/rejectActiveCourse": {
    type: "course_rejected",
    targetRole: "both", // Chi non ha rifiutato riceve la notifica
    fromRole: "system",
    category: "course",
    generateNotification: (action) => {
      const rejectedBy = action.payload.rejectedBy;
      const otherRole = rejectedBy === "owner" ? "viewer" : "owner";

      return {
        title: "Corso rifiutato",
        message: `Il corso è stato rifiutato da ${
          rejectedBy === "owner" ? "istruttore" : "studente"
        }. Motivo: ${action.payload.comment || "Non specificato"}`,
        actionData: {
          experienceId: action.payload.experienceId,
          rejectedBy,
          comment: action.payload.comment,
          actualTargetRole: otherRole, // Per il middleware
        },
      };
    },
  },

  "experienceSliceTest/saveFeedback": {
    type: "feedback_received",
    targetRole: "owner",
    fromRole: "viewer",
    category: "course",
    generateNotification: (action) => ({
      title: "Nuovo feedback ricevuto",
      message: `${action.payload.userName} ha lasciato un feedback per il tuo corso (${action.payload.gemsAssigned} gems assegnate)`,
      actionData: {
        experienceId: action.payload.experienceId,
        userName: action.payload.userName,
        gemsReceived: action.payload.gemsAssigned,
        comment: action.payload.comment,
      },
    }),
  },

  // =============== EVENTS FLOW ===============

  "events/joinEvent": {
    type: "event_join",
    targetRole: "owner",
    fromRole: "viewer",
    category: "event",
    generateNotification: (action) => ({
      title: "Nuova iscrizione evento",
      message: `${
        action.payload.userInfo?.name || "Qualcuno"
      } si è iscritto al tuo evento`,
      actionData: {
        eventId: action.payload.eventId,
        userId: action.payload.userId,
        userInfo: action.payload.userInfo,
      },
    }),
  },

  "events/leaveEvent": {
    type: "event_leave",
    targetRole: "owner",
    fromRole: "viewer",
    category: "event",
    generateNotification: (action) => ({
      title: "Cancellazione iscrizione",
      message: `Un partecipante ha annullato l'iscrizione al tuo evento`,
      actionData: {
        eventId: action.payload.eventId,
        userId: action.payload.userId,
      },
    }),
  },

  "events/updateEventStatus": {
    type: "event_updated",
    targetRole: "viewer", // Partecipanti ricevono notifica
    fromRole: "owner",
    category: "event",
    generateNotification: (action) => ({
      title: "Evento aggiornato",
      message: `Un evento a cui sei iscritto è stato aggiornato (${action.payload.status})`,
      actionData: {
        eventId: action.payload.eventId,
        newStatus: action.payload.status,
      },
    }),
  },

  // =============== SOCIAL FLOW ===============

  "experienceSliceTest/followUser": {
    type: "new_follower",
    targetRole: "owner", // Chi viene seguito riceve notifica
    fromRole: "viewer",
    category: "social",
    generateNotification: (action) => ({
      title: "Nuovo follower",
      message: `Hai un nuovo follower!`,
      actionData: {
        followerId: action.payload.followerId,
        followedId: action.payload.followedId,
      },
    }),
  },

  "experienceSliceTest/bookmarkCourse": {
    type: "course_bookmarked",
    targetRole: "owner",
    fromRole: "viewer",
    category: "course",
    generateNotification: (action) => ({
      title: "Corso salvato",
      message: `Il tuo corso "${
        action.payload.experienceData?.title || "un corso"
      }" è stato salvato da qualcuno`,
      actionData: {
        experienceId: action.payload.experienceId,
        userId: action.payload.userId,
        courseTitle: action.payload.experienceData?.title,
      },
    }),
  },
};

// =============== HELPER FUNCTIONS ===============

// Funzione per ottenere la configurazione notifica per un'azione
export const getNotificationConfig = (actionType) => {
  return NOTIFICATION_MAPPING[actionType] || null;
};

// Funzione per verificare se un'azione dovrebbe generare notifiche
export const shouldGenerateNotification = (actionType) => {
  return actionType in NOTIFICATION_MAPPING;
};

// Funzione per generare la notifica finale data un'azione Redux
export const generateNotificationFromAction = (action) => {
  const config = getNotificationConfig(action.type);

  if (!config) return null;

  const baseNotification = config.generateNotification(action);

  return {
    type: config.type,
    targetRole: config.targetRole,
    fromRole: config.fromRole,
    category: config.category,
    ...baseNotification,
  };
};
