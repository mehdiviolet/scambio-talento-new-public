// constants/achievements.js
export const ACHIEVEMENTS = {
  FIRST_SKILL: {
    id: "first_skill",
    name: "Primo Talento",
    description: "Hai aggiunto la tua prima competenza! 🎯",
    icon: "🌟",
    type: "skill",
    confetti: false,
  },

  SKILL_MASTER: {
    id: "skill_master",
    name: "Maestro delle Abilità",
    description: "3+ competenze sbloccate! Sei inarrestabile! 💪",
    icon: "🏆",
    type: "skill",
    confetti: true,
  },

  POLYGLOT: {
    id: "polyglot",
    name: "Cittadino del Mondo",
    description: "Parli 3+ lingue! Il mondo è tuo! 🌍",
    icon: "🗣️",
    type: "skill",
    confetti: true,
  },

  LEARNER: {
    id: "learner",
    name: "Studente Leggendario",
    description: "5+ cose da imparare! La curiosità ti guida! 📚",
    icon: "🧠",
    type: "skill",
    confetti: false,
  },

  LEVEL_UP: {
    id: "level_up",
    name: "Level Up!",
    description: "Hai raggiunto un nuovo livello! 🚀",
    icon: "🆙",
    type: "level",
    confetti: true,
  },

  PROFILE_COMPLETE: {
    id: "profile_complete",
    name: "Profilo Leggendario",
    description: "Hai creato un profilo da vero campione! 👑",
    icon: "🎉",
    type: "completion",
    confetti: true,
  },
};
