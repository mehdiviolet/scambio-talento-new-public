// hooks/useAchievement.js
import { useState, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { ACHIEVEMENTS } from "../constants/achievements";

// Context semplice
const AchievementContext = createContext();

// Provider da mettere in App.js
export const AchievementProvider = ({ children }) => {
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const unlock = useCallback(
    (achievementId, customData = {}) => {
      const achievementDef = ACHIEVEMENTS[achievementId];
      if (!achievementDef || achievements.includes(achievementId)) return;

      setAchievements((prev) => [...prev, achievementId]);
      setShowAchievement({ ...achievementDef, ...customData });

      if (achievementDef.confetti) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }

      setTimeout(() => setShowAchievement(null), 3500);
    },
    [achievements]
  );

  return (
    <AchievementContext.Provider value={{ unlock, achievements }}>
      {children}

      {/* Popup integrato nel provider */}
      <AnimatePresence>
        {showAchievement && (
          <>
            {showConfetti && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={200}
                colors={["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1"]}
              />
            )}

            <motion.div
              className={`achievement-overlay ${showAchievement.type}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAchievement(null)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: getBackgroundForType(showAchievement.type),
                  borderRadius: "2rem",
                  padding: "3rem",
                  textAlign: "center",
                  maxWidth: "400px",
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                  color: "#1a1a1a",
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ fontSize: "4rem", marginBottom: "1rem" }}
                >
                  {showAchievement.icon}
                </motion.div>

                <motion.h4
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    marginBottom: "1rem",
                  }}
                >
                  {showAchievement.name}
                </motion.h4>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ fontSize: "1.25rem", fontWeight: 600 }}
                >
                  {showAchievement.description}
                </motion.p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AchievementContext.Provider>
  );
};

// Hook semplice per usare ovunque
export const useAchievement = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error(
      "useAchievement deve essere usato dentro AchievementProvider"
    );
  }
  return context;
};

// Helper per colori
const getBackgroundForType = (type) => {
  switch (type) {
    case "level":
      return "linear-gradient(145deg, #22D3EE, #3B82F6)";
    case "skill":
      return "linear-gradient(145deg, #22C55E, #16A34A)";
    case "completion":
      return "linear-gradient(145deg, #A855F7, #9333EA)";
    default:
      return "linear-gradient(145deg, #FFD700, #FF8C00)";
  }
};
