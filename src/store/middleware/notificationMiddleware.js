// store/middleware/notificationMiddleware.js
import {
  generateNotificationFromAction,
  shouldGenerateNotification,
} from "../notificationMapping.js";
import { addNotification } from "../slices/notificationSlice.js";

/**
 * Middleware RTK che intercetta azioni specifiche e genera notifiche automaticamente
 */
export const notificationMiddleware = (store) => (next) => (action) => {
  // Prima esegui l'azione originale
  const result = next(action);

  // Poi controlla se deve generare notifiche
  if (shouldGenerateNotification(action.type)) {
    const notificationData = generateNotificationFromAction(action);

    if (notificationData) {
      console.log(
        `🔔 Generando notifica per: ${action.type}`,
        notificationData
      );

      // Gestione speciale per notifiche che vanno a entrambi i ruoli
      if (notificationData.targetRole === "both") {
        handleBothRoleNotification(store, notificationData, action);
      }
      // Gestione per casi con targetRole dinamico (es. rejectActiveCourse)
      else if (notificationData.actionData?.actualTargetRole) {
        store.dispatch(
          addNotification({
            ...notificationData,
            targetRole: notificationData.actionData.actualTargetRole,
          })
        );
      }
      // Gestione normale per un solo ruolo
      else {
        store.dispatch(addNotification(notificationData));
      }
    }
  }

  return result;
};

/**
 * Gestisce notifiche che devono andare a entrambi i ruoli
 * Crea versioni personalizzate per owner e viewer
 */
const handleBothRoleNotification = (
  store,
  notificationData,
  originalAction
) => {
  const { type, actionData } = notificationData;

  switch (type) {
    case "course_completed":
      // Versione per owner (istruttore)
      store.dispatch(
        addNotification({
          ...notificationData,
          targetRole: "owner",
          title: "Corso completato!",
          message: `Il corso "${actionData.title}" con ${
            originalAction.payload.studentName || "lo studente"
          } è stato completato. Lascia un feedback!`,
        })
      );

      // Versione per viewer (studente)
      store.dispatch(
        addNotification({
          ...notificationData,
          targetRole: "viewer",
          title: "Corso completato!",
          message: `Hai completato il corso "${actionData.title}" con ${
            originalAction.payload.istruttore || "l'istruttore"
          }. Lascia un feedback!`,
        })
      );
      break;

    case "course_rejected":
      // Già gestito tramite actualTargetRole nel mapping
      break;

    default:
      // Fallback: duplica per entrambi i ruoli
      store.dispatch(
        addNotification({
          ...notificationData,
          targetRole: "owner",
        })
      );
      store.dispatch(
        addNotification({
          ...notificationData,
          targetRole: "viewer",
        })
      );
  }
};

/**
 * Funzione helper per debugging - mostra tutte le azioni intercettate
 */
export const debugNotificationMiddleware = (store) => (next) => (action) => {
  console.log(`🔍 Azione intercettata: ${action.type}`, action.payload);

  if (shouldGenerateNotification(action.type)) {
    console.log(`✅ Genererà notifica per: ${action.type}`);
  } else {
    console.log(`❌ Nessuna notifica per: ${action.type}`);
  }

  return notificationMiddleware(store)(next)(action);
};

/**
 * Setup del middleware nel store
 *
 * // store/index.js
 * import { configureStore } from '@reduxjs/toolkit';
 * import { notificationMiddleware } from './middleware/notificationMiddleware';
 *
 * export const store = configureStore({
 *   reducer: {
 *     notifications: notificationReducer,
 *     experienceSliceTest: experienceReducer,
 *     events: eventsReducer,
 *   },
 *   middleware: (getDefaultMiddleware) =>
 *     getDefaultMiddleware().concat(notificationMiddleware),
 * });
 */

// =============== ESEMPI DI UTILIZZO ===============

/**
 * ESEMPIO 1: Studente invia richiesta
 *
 * dispatch(sendRequest({
 *   experienceId: 'exp-123',
 *   message: 'Vorrei partecipare al corso',
 *   studentData: { name: 'Marco Rossi' },
 *   experienceData: { title: 'React Avanzato' }
 * }));
 *
 * → Automaticamente genera:
 * {
 *   type: 'request_received',
 *   title: 'Nuova richiesta corso',
 *   message: 'Marco Rossi ha richiesto accesso al corso "React Avanzato"',
 *   targetRole: 'owner',
 *   fromRole: 'viewer',
 *   category: 'course'
 * }
 */

/**
 * ESEMPIO 2: Istruttore accetta richiesta
 *
 * dispatch(instructorAcceptRequest({
 *   experienceId: 'exp-123'
 * }));
 *
 * → Automaticamente genera notifica per lo studente:
 * "La tua richiesta per il corso è stata accettata. Puoi procedere con il pagamento."
 */

/**
 * ESEMPIO 3: Corso completato da entrambi
 *
 * dispatch(completeCourse({
 *   experienceId: 'exp-123',
 *   title: 'React Avanzato',
 *   studentName: 'Marco Rossi',
 *   istruttore: 'Prof. Milano'
 * }));
 *
 * → Genera DUE notifiche personalizzate:
 * - Owner: "Il corso "React Avanzato" con Marco Rossi è stato completato..."
 * - Viewer: "Hai completato il corso "React Avanzato" con Prof. Milano..."
 */
