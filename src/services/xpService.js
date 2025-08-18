// services/xpService.js - SISTEMA XP UNIFICATO
import { createSlice } from "@reduxjs/toolkit";

// ===== XP SOURCES & CONSTANTS =====
const XP_SOURCES = {
  ONBOARDING: "onboarding",
  SLOT_MACHINE: "slot_machine",
  DAILY_STREAK: "daily_streak",
  COURSE_COMPLETION: "course_completion",
  FEEDBACK_BONUS: "feedback_bonus",
  COURSE_PAYMENT: "course_payment", // Negative XP (student paga)
  COURSE_EARNING: "course_earning", // 🆕 Positive XP (instructor riceve)
  COURSE_REJECTION_PENALTY: "course_rejection_penalty",
  COURSE_REFUND: "course_refund",
};

const XP_AMOUNTS = {
  SLOT_WIN_HIGH: 30, // 3 symbols match
  SLOT_WIN_MID: 10, // 2 symbols match
  SLOT_WIN_LOW: 0, // No match
  FEEDBACK_BONUS: 5, // Per feedback lasciato
  GEM_BONUS: 5, // Per GEM assegnate
  DAILY_STREAK_BASE: 10, // Base per streak
};

// ===== INITIAL STATE =====
const initialState = {
  // Multi-user XP storage
  lastSlotReward: 0, // ✅ AGGIUNGI QUESTO

  users: {
    currentUser: {
      xp: 0,
      totalEarned: 0,
      totalSpent: 0,
      lastSlotSpin: null,
      streakDays: 1,
      achievements: [],
      userId: "me",
    },
    sara: {
      xp: 310,
      totalEarned: 300,
      totalSpent: 0,
      lastSlotSpin: null,
      streakDays: 8,
      achievements: [],
    },
  },

  // XP transaction history
  transactions: [],
  transactionIdCounter: 0,

  // Demo states (moved from demoSlice)
  demo: {
    currentDay: 1,
    viewMode: "day1",
    dayXP: 0, // Bonus XP for demo
  },

  // Current user context
  currentUserId: "currentUser",
};

// ===== XP SLICE =====
const xpSlice = createSlice({
  name: "xp",
  initialState,
  reducers: {
    // === USER MANAGEMENT ===
    setCurrentUser: (state, action) => {
      const { userId } = action.payload;
      if (state.users[userId]) {
        state.currentUserId = userId;
      }
    },

    addUser: (state, action) => {
      const { userId, initialXP = 0 } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          xp: initialXP,
          totalEarned: initialXP,
          totalSpent: 0,
          lastSlotSpin: null,
          streakDays: 0,
          achievements: [],
        };
      }
    },
    recordSlotSpin: (state, action) => {
      const { userId, result, xpWon } = action.payload;
      const user = state.users[userId];

      if (user) {
        user.lastSlotSpin = new Date().toISOString();

        // ✅ SALVA SEMPRE il valore xpWon (sia 0 che 10, 30, ecc.)
        state.lastSlotReward = xpWon;

        if (xpWon > 0) {
          user.xp += xpWon;
          user.totalEarned += xpWon;

          state.transactions.push({
            id: state.transactionIdCounter++,
            userId,
            amount: +xpWon,
            source: XP_SOURCES.SLOT_MACHINE,
            metadata: { result, symbols: result },
            timestamp: new Date().toISOString(),
          });
        }
      }
    },

    // === XP TRANSACTIONS ===
    addXP: (state, action) => {
      const { userId, amount, source, metadata = {} } = action.payload;
      const user = state.users[userId];

      if (user && amount > 0) {
        user.xp += amount;
        user.totalEarned += amount;

        // Log transaction
        state.transactions.push({
          id: state.transactionIdCounter++,
          userId,
          amount: +amount,
          source,
          metadata,
          timestamp: new Date().toISOString(),
        });
      }
    },

    spendXP: (state, action) => {
      const { userId, amount, source, metadata = {} } = action.payload;
      const user = state.users[userId];

      if (user && user.xp >= amount && amount > 0) {
        user.xp -= amount;
        user.totalSpent += amount;

        // Log transaction
        state.transactions.push({
          id: state.transactionIdCounter++,
          userId,
          amount: -amount,
          source,
          metadata,
          timestamp: new Date().toISOString(),
        });
      }
      // Note: Redux reducers shouldn't return values
      // Use selectors or middleware for success/failure feedback
    },

    // === SLOT MACHINE ===

    // === DAILY STREAK ===
    updateStreakDays: (state, action) => {
      const { userId, days } = action.payload;
      const user = state.users[userId];

      if (user) {
        const oldStreak = user.streakDays;
        user.streakDays = days;

        // Reward per milestone streak
        if (days > oldStreak && days % 5 === 0) {
          const bonusXP = XP_AMOUNTS.DAILY_STREAK_BASE * (days / 5);
          user.xp += bonusXP;
          user.totalEarned += bonusXP;

          state.transactions.push({
            id: state.transactionIdCounter++,
            userId,
            amount: +bonusXP,
            source: XP_SOURCES.DAILY_STREAK,
            metadata: { streakDays: days, milestone: true },
            timestamp: new Date().toISOString(),
          });
        }
      }
    },

    // === COURSE PAYMENTS ===
    // payCourseFirst: (state, action) => {
    //   const { userId, experienceId, amount } = action.payload;
    //   const user = state.users[userId];

    //   if (user && user.xp >= amount) {
    //     user.xp -= amount;
    //     user.totalSpent += amount;

    //     state.transactions.push({
    //       id: state.transactionIdCounter++,
    //       userId,
    //       amount: -amount,
    //       source: XP_SOURCES.COURSE_PAYMENT,
    //       metadata: { experienceId, paymentType: "first" },
    //       timestamp: new Date().toISOString(),
    //     });
    //   }
    //   // Use selector to check if payment was successful
    // },
    // MODIFICA in xpService.js - reducer payCourseFirst
    payCourseFirst: (state, action) => {
      const { userId, experienceId, amount } = action.payload;
      const student = state.users[userId];
      const instructor = state.users["sara"]; // 👈 INSTRUCTOR FISSO

      // ✅ 1. STUDENT paga se ha abbastanza XP
      if (student && student.xp >= amount) {
        student.xp -= amount;
        student.totalSpent += amount;

        // Log transazione student (spesa)
        state.transactions.push({
          id: state.transactionIdCounter++,
          userId,
          amount: -amount,
          source: XP_SOURCES.COURSE_PAYMENT,
          metadata: { experienceId, paymentType: "first" },
          timestamp: new Date().toISOString(),
        });

        // ✅ 2. INSTRUCTOR riceve XP immediatamente
        if (instructor) {
          instructor.xp += amount;
          instructor.totalEarned += amount;

          // Log transazione instructor (guadagno)
          state.transactions.push({
            id: state.transactionIdCounter++,
            userId: "sara",
            amount: +amount,
            source: "course_earning", // 👈 NUOVO SOURCE
            metadata: {
              experienceId,
              paymentType: "first_received",
              fromStudent: userId,
            },
            timestamp: new Date().toISOString(),
          });
        }
      }
    },

    payCourseSecond: (state, action) => {
      const { userId, experienceId, amount } = action.payload;
      const student = state.users[userId];
      const instructor = state.users["sara"]; // 👈 INSTRUCTOR FISSO

      // ✅ 1. STUDENT paga se ha abbastanza XP
      if (student && student.xp >= amount) {
        student.xp -= amount;
        student.totalSpent += amount;

        // Log transazione student (spesa)
        state.transactions.push({
          id: state.transactionIdCounter++,
          userId,
          amount: -amount,
          source: XP_SOURCES.COURSE_PAYMENT,
          metadata: {
            experienceId,
            paymentType: "second",
            toInstructor: "sara",
          },
          timestamp: new Date().toISOString(),
        });

        // ✅ 2. INSTRUCTOR riceve XP immediatamente
        if (instructor) {
          instructor.xp += amount;
          instructor.totalEarned += amount;

          // Log transazione instructor (guadagno)
          state.transactions.push({
            id: state.transactionIdCounter++,
            userId: "sara",
            amount: +amount,
            source: XP_SOURCES.COURSE_EARNING,
            metadata: {
              experienceId,
              paymentType: "second_received",
              fromStudent: userId,
            },
            timestamp: new Date().toISOString(),
          });
        }
      }
    },

    // === COURSE FEEDBACK & BONUS ===
    addFeedbackBonus: (state, action) => {
      const { userId, hasComment, hasGems } = action.payload;
      const user = state.users[userId];

      if (user) {
        let bonusXP = 0;

        if (hasComment) bonusXP += 5;
        if (hasGems) bonusXP += 5;

        if (bonusXP > 0) {
          user.xp += bonusXP;
          user.totalEarned += bonusXP;

          state.transactions.push({
            id: state.transactionIdCounter++,
            userId,
            amount: +bonusXP,
            source: XP_SOURCES.FEEDBACK_BONUS,
            metadata: { hasComment, hasGems },
            timestamp: new Date().toISOString(),
          });
        }
      }
    },

    handleCourseRejection: (state, action) => {
      const { userId, penalty, refund, comment, experienceId } = action.payload;
      const user = state.users[userId];

      if (user) {
        // 🆕 GESTIONE RIMBORSO (può essere positivo)
        if (refund > 0) {
          user.xp += refund;

          state.transactions.push({
            id: state.transactionIdCounter++,
            userId,
            amount: +refund,
            source: XP_SOURCES.COURSE_REFUND,
            metadata: {
              experienceId,
              type: "rejection_refund",
              hasComment: !!comment,
            },
            timestamp: new Date().toISOString(),
          });
        }

        // 🆕 GESTIONE PENALITÀ (negativo)
        if (penalty > 0) {
          user.xp -= penalty;
          user.totalSpent += penalty;

          state.transactions.push({
            id: state.transactionIdCounter++,
            userId,
            amount: -penalty,
            source: XP_SOURCES.COURSE_REJECTION_PENALTY,
            metadata: {
              experienceId,
              type: "rejection_penalty",
              hasComment: !!comment,
            },
            timestamp: new Date().toISOString(),
          });
        }

        // 🆕 SE È UN RIMBORSO ALLO STUDENT, TOGLI XP ALL'INSTRUCTOR
        if (refund > 0 && userId === "currentUser") {
          const instructor = state.users["sara"];
          if (instructor && instructor.xp >= refund) {
            instructor.xp -= refund;
            instructor.totalSpent += refund; // 👈 Instructor "spende" per il rimborso

            state.transactions.push({
              id: state.transactionIdCounter++,
              userId: "sara",
              amount: -refund,
              source: XP_SOURCES.COURSE_REFUND,
              metadata: {
                experienceId,
                type: "instructor_pays_refund",
                toStudent: userId,
              },
              timestamp: new Date().toISOString(),
            });
          }
        }
      }
    },
    // 2. AGGIUNGI nuovo reducer per rimborso separato (opzionale ma più pulito):
    refundStudent: (state, action) => {
      const { studentId, amount, reason } = action.payload;
      const student = state.users[studentId];

      if (student && amount > 0) {
        student.xp += amount;

        state.transactions.push({
          id: state.transactionIdCounter++,
          userId: studentId,
          amount: +amount,
          source: XP_SOURCES.COURSE_REFUND,
          metadata: { reason: reason || "instructor_rejection" },
          timestamp: new Date().toISOString(),
        });
      }
    },

    // 3. AGGIUNGI reducer per penalità separata:
    applyRejectionPenalty: (state, action) => {
      const { userId, amount, reason } = action.payload;
      const user = state.users[userId];

      if (user && amount > 0) {
        user.xp -= amount;
        user.totalSpent += amount;

        state.transactions.push({
          id: state.transactionIdCounter++,
          userId,
          amount: -amount,
          source: XP_SOURCES.COURSE_REJECTION_PENALTY,
          metadata: { reason: reason || "no_comment_penalty" },
          timestamp: new Date().toISOString(),
        });
      }
    },

    // === DEMO STATES (from demoSlice) ===
    setDemoDay: (state, action) => {
      const dayMode = action.payload;

      state.demo.viewMode = dayMode;

      switch (dayMode) {
        case "day1":
          state.demo.currentDay = 1;
          state.demo.dayXP = 0;
          break;
        case "day8":
          state.demo.currentDay = 8;
          state.demo.dayXP = 50;
          break;
        case "day19":
          state.demo.currentDay = 19;
          state.demo.dayXP = 120;
          break;
        default:
          state.demo.currentDay = 1;
          state.demo.dayXP = 0;
      }
    },

    // === ACHIEVEMENTS ===
    addAchievement: (state, action) => {
      const { userId, achievement } = action.payload;
      const user = state.users[userId];

      if (user) {
        const exists = user.achievements.find((a) => a.id === achievement.id);
        if (!exists) {
          user.achievements.push({
            ...achievement,
            earnedAt: new Date().toISOString(),
          });
        }
      }
    },
  },
});

// ===== SELECTORS =====

// Basic user selectors
export const selectCurrentUserId = (state) => state.xp.currentUserId;
export const selectCurrentUser = (state) =>
  state.xp.users[state.xp.currentUserId];
export const selectUserById = (userId) => (state) => state.xp.users[userId];

// XP selectors
export const selectUserXP = (userId) => (state) =>
  state.xp.users[userId]?.xp || 0;
export const selectCurrentUserXP = (state) =>
  selectUserXP(state.xp.currentUserId)(state);

export const selectLastSlotReward = (state) => state.xp.lastSlotReward;

// Demo selectors
export const selectDemoState = (state) => state.xp.demo;
export const selectTotalDisplayXP = (state) => {
  const currentXP = selectCurrentUserXP(state);
  const demoBonus = state.xp.demo.dayXP;
  return currentXP + demoBonus;
};

// Transaction selectors
export const selectUserTransactions = (userId) => (state) =>
  state.xp.transactions.filter((t) => t.userId === userId);

export const selectRecentTransactions =
  (userId, limit = 10) =>
  (state) =>
    selectUserTransactions(userId)(state)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);

// ===== SERVICE FUNCTIONS =====

// XP Operations
export const canAffordAmount = (state, userId, amount) => {
  const user = state.xp.users[userId];
  return user ? user.xp >= amount : false;
};

// Check if last transaction was successful (for payments)
export const wasLastTransactionSuccessful = (state, userId, expectedAmount) => {
  const userTransactions = state.xp.transactions.filter(
    (t) => t.userId === userId
  );
  if (userTransactions.length === 0) return false;

  const lastTransaction = userTransactions[userTransactions.length - 1];
  return Math.abs(lastTransaction.amount) === expectedAmount;
};

export const calculateSlotReward = (symbols) => {
  const [first, second, third] = symbols;

  if (first === second && second === third) {
    return XP_AMOUNTS.SLOT_WIN_HIGH; // 30 XP
  } else if (first === second || second === third || first === third) {
    return XP_AMOUNTS.SLOT_WIN_MID; // 10 XP
  }
  return XP_AMOUNTS.SLOT_WIN_LOW; // 0 XP
};

// Course payment calculations
export const calculateCoursePayments = (totalCost) => ({
  firstPayment: Math.floor(totalCost / 3),
  secondPayment: totalCost - Math.floor(totalCost / 3),
  total: totalCost,
});

// ===== EXPORTS =====
export const {
  setCurrentUser,
  addUser,
  addXP,
  spendXP,
  recordSlotSpin,
  updateStreakDays,
  payCourseFirst,
  payCourseSecond,
  setDemoDay,
  addAchievement,

  // ... existing exports ...
  addFeedbackBonus,
  handleCourseRejection,
  refundStudent,
  applyRejectionPenalty,
} = xpSlice.actions;

export default xpSlice.reducer;
