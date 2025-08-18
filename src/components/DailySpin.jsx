import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./DailySpin.module.css";
import { Cherry } from "lucide-react";

// ✨ NUOVO: XP Service invece di useQuickSetup
import { useDispatch, useSelector } from "react-redux";
import {
  recordSlotSpin,
  calculateSlotReward,
  selectCurrentUserId,
  selectCurrentUserXP,
} from "@/services/xpService";

const DailySpin = ({ currentUser }) => {
  const dispatch = useDispatch();

  // ✅ NUOVO: XP Service selectors
  const currentUserId = useSelector(selectCurrentUserId);
  const currentUserXP = useSelector(selectCurrentUserXP);

  // Simboli disponibili nella slot machine
  const symbols = ["🍒", "🍋", "🍊", "🍇", "💎", "⭐", "🍀"];

  // Stati del componente
  const [hasSpunToday, setHasSpunToday] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(["❓", "❓", "❓"]);
  const [xpRewarded, setXpRewarded] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [consecutiveFailures, setConsecutiveFailures] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [slotState, setSlotState] = useState("normal"); // normal, victory, frozen

  const getButtonState = (isBlocked, isSpinning, hasSpunToday) => {
    if (isBlocked) return "blocked";
    if (isSpinning) return "spinning";
    if (hasSpunToday) return "completed";
    return "ready";
  };

  // Controlla lo stato della slot machine
  useEffect(() => {
    const checkDailyStatus = () => {
      // ✅ AGGIORNATO: Usa currentUserId da Redux
      const userId = currentUserId || currentUser?.id || "default";
      const lastSpinDate = localStorage.getItem(`lastSpinDate_${userId}`);
      const blockedUntil = localStorage.getItem(`blockedUntil_${userId}`);
      const failures = parseInt(
        localStorage.getItem(`consecutiveFailures_${userId}`) || "0"
      );
      const today = new Date().toDateString();

      // Controlla se è bloccata (commented out per demo)
      // if (blockedUntil) { ... }

      // Controlla se ha già girato oggi (commented out per demo)
      // if (lastSpinDate === today) { ... }

      setConsecutiveFailures(failures);
    };

    checkDailyStatus();
    const interval = setInterval(checkDailyStatus, 60000);

    return () => clearInterval(interval);
  }, [currentUser, currentUserId]); // ← AGGIUNTO currentUserId

  // ✅ AGGIORNATO: Usa calculateSlotReward da XP Service
  const calculateReward = (slots) => {
    return {
      xp: calculateSlotReward(slots),
      isWin: calculateSlotReward(slots) > 0,
    };
  };

  // Gestisce il giro della slot machine
  const handleSpin = async () => {
    if (hasSpunToday || isSpinning || isBlocked) return;

    setIsSpinning(true);
    setShowReward(false);
    setSlotState("normal");

    // Animazione di rotazione
    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setResult([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      spinCount++;

      if (spinCount > 20) {
        clearInterval(spinInterval);

        // Risultato finale
        const finalResult = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];

        setResult(finalResult);

        // ✅ NUOVO: Usa XP Service per calcolo premio
        const { xp, isWin } = calculateReward(finalResult);
        setXpRewarded(xp);

        // ✅ AGGIORNATO: Usa currentUserId da Redux
        const userId = currentUserId || currentUser?.id || "default";

        if (isWin) {
          localStorage.setItem(`consecutiveFailures_${userId}`, "0");
          setConsecutiveFailures(0);
          setSlotState("victory");

          // ✅ NUOVO: Dispatch a XP Service invece di useQuickSetup
          dispatch(
            recordSlotSpin({
              userId: currentUserId,
              result: finalResult,
              xpWon: xp,
            })
          );

          console.log(`🎰 Slot win! User ${currentUserId} won ${xp} XP`);
        } else {
          // Sconfitta - incrementa i fallimenti
          const newFailures = consecutiveFailures + 1;
          setConsecutiveFailures(newFailures);
          localStorage.setItem(
            `consecutiveFailures_${userId}`,
            newFailures.toString()
          );

          // ✅ NUOVO: Registra anche spin perdenti (0 XP)
          dispatch(
            recordSlotSpin({
              userId: currentUserId,
              result: finalResult,
              xpWon: 0,
            })
          );

          console.log(`🎰 Slot loss! User ${currentUserId} won 0 XP`);
        }

        // Salva la data del giro
        const today = new Date().toDateString();
        localStorage.setItem(`lastSpinDate_${userId}`, today);

        setIsSpinning(false);
        setHasSpunToday(true);
        setShowReward(true);
      }
    }, 100);
  };

  // Animazioni slot 3D (invariate)
  const slotVariants = {
    spinning: {
      rotateX: [0, 360],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
    stopped: {
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={`${styles.slotMachine} ${styles[slotState]}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <motion.div
          className={styles.slotBase}
          animate={
            slotState === "victory"
              ? {
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }
              : {}
          }
          transition={{
            duration: 0.5,
            repeat: slotState === "victory" ? 3 : 0,
          }}
        >
          <div className={styles.slotsContainer}>
            {result.map((symbol, index) => (
              <motion.div
                key={index}
                className={styles.slotWrapper}
                animate={
                  isSpinning
                    ? {
                        y: [0, -10, 0],
                      }
                    : {}
                }
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                }}
              >
                <motion.div
                  className={styles.slot}
                  variants={slotVariants}
                  animate={isSpinning ? "spinning" : "stopped"}
                  style={{ perspective: 200 }}
                >
                  <div className={styles.slotFace}>
                    <span className={styles.symbol}>{symbol}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className={styles.slotShadow} />
        </motion.div>

        {/* Slot button (invariato - solo aggiornato stile) */}
        <motion.button
          className={`${styles.editProfileBtn} ${styles.liquidButton}`}
          onClick={handleSpin}
          disabled={hasSpunToday || isSpinning || isBlocked}
          title={
            isBlocked
              ? "Riprova tra 24 ore"
              : hasSpunToday
              ? "Hai già girato oggi, torna domani!"
              : isSpinning
              ? "La ruota sta girando..."
              : "Clicca per girare la ruota della fortuna e vincere XP!"
          }
          style={{
            background: (() => {
              const state = getButtonState(isBlocked, isSpinning, hasSpunToday);
              switch (state) {
                case "ready":
                  return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                case "spinning":
                  return "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
                case "completed":
                  return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
                case "blocked":
                  return "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)";
                default:
                  return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
              }
            })(),
            boxShadow: (() => {
              const state = getButtonState(isBlocked, isSpinning, hasSpunToday);
              if (state === "ready") {
                return "0 8px 32px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255,255,255,0.1)";
              }
              return "0 4px 16px rgba(0,0,0,0.1)";
            })(),
            filter: isBlocked ? "grayscale(50%)" : "none",
            position: "relative",
            overflow: "hidden",
          }}
          whileHover={
            !hasSpunToday && !isBlocked && !isSpinning
              ? {
                  scale: 1.05,
                  boxShadow: "0 12px 40px rgba(102, 126, 234, 0.6)",
                  transition: { duration: 0.2 },
                }
              : {}
          }
          whileTap={
            !hasSpunToday && !isBlocked && !isSpinning
              ? {
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }
              : {}
          }
          animate={{
            ...(() => {
              const state = getButtonState(isBlocked, isSpinning, hasSpunToday);
              if (state === "ready") {
                return {
                  boxShadow: [
                    "0 8px 32px rgba(102, 126, 234, 0.4)",
                    "0 8px 32px rgba(118, 75, 162, 0.6)",
                    "0 8px 32px rgba(102, 126, 234, 0.4)",
                  ],
                };
              }
              return {};
            })(),
            transition: {
              duration: 2,
              repeat: !hasSpunToday && !isBlocked && !isSpinning ? Infinity : 0,
              ease: "easeInOut",
            },
          }}
        >
          {/* Effetto shimmer animato */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              zIndex: 1,
            }}
            animate={{
              left:
                !hasSpunToday && !isBlocked && !isSpinning
                  ? ["100%", "-100%"]
                  : "-100%",
            }}
            transition={{
              duration: 2,
              repeat: !hasSpunToday && !isBlocked && !isSpinning ? Infinity : 0,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          />

          {/* Contenuto del button (invariato) */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <motion.span
              className={styles.buttonIcon}
              animate={{
                rotate: isSpinning ? [0, 360] : 0,
                scale: hasSpunToday ? [1, 1.2, 1] : 1,
              }}
              transition={{
                rotate: {
                  duration: 0.8,
                  repeat: isSpinning ? Infinity : 0,
                  ease: "linear",
                },
                scale: {
                  duration: 0.5,
                  times: [0, 0.5, 1],
                },
              }}
            >
              {isBlocked ? "🔒" : isSpinning ? "⏳" : hasSpunToday ? "✓" : "🎲"}
            </motion.span>

            <motion.span style={{ fontWeight: "bold" }}>
              {isSpinning ? (
                <motion.span>
                  Girando
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </motion.span>
              ) : (
                <>
                  {isBlocked
                    ? "Bloccato per 1 giorno"
                    : hasSpunToday
                    ? "Torna domani!"
                    : "GIRA ORA"}
                </>
              )}
            </motion.span>

            <motion.div
              animate={{
                rotate: isSpinning ? [0, 360] : 0,
                scale: (() => {
                  const state = getButtonState(
                    isBlocked,
                    isSpinning,
                    hasSpunToday
                  );
                  if (state === "completed") return [1, 1.3, 1];
                  if (state === "ready") return [1, 1.1, 1];
                  return 1;
                })(),
                y: !hasSpunToday && !isBlocked && !isSpinning ? [0, -2, 0] : 0,
              }}
              transition={{
                rotate: {
                  duration: 1.5,
                  repeat: isSpinning ? Infinity : 0,
                  ease: "linear",
                },
                scale: {
                  duration: hasSpunToday ? 0.6 : 2,
                  repeat:
                    !hasSpunToday && !isBlocked && !isSpinning
                      ? Infinity
                      : hasSpunToday
                      ? 1
                      : 0,
                  times: [0, 0.5, 1],
                },
                y: {
                  duration: 1.5,
                  repeat:
                    !hasSpunToday && !isBlocked && !isSpinning ? Infinity : 0,
                  ease: "easeInOut",
                },
              }}
            >
              <Cherry size={16} />
            </motion.div>
          </div>

          {/* Particelle che volano quando è pronto */}
          {!hasSpunToday && !isBlocked && !isSpinning && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "4px",
                    height: "4px",
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: "50%",
                    left: `${20 + i * 25}%`,
                    top: "20%",
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -15, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}

          {/* Effetto glow pulsante quando completato */}
          {hasSpunToday && (
            <motion.div
              style={{
                position: "absolute",
                inset: "-2px",
                background: "linear-gradient(45deg, #00f2fe, #4facfe)",
                borderRadius: "inherit",
                zIndex: -1,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.button>

        {/* Reward message (invariato) */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              className={styles.rewardMessage}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {xpRewarded > 0 ? (
                <>
                  <motion.div
                    className={styles.xpAmount}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className={styles.trophy}>🏆</span>+{xpRewarded} XP
                  </motion.div>
                  <p className={styles.rewardText}>
                    {xpRewarded === 500 ? "JACKPOT! Hai Vinto!" : "Vittoria!"}
                  </p>
                </>
              ) : (
                <>
                  <p className={styles.failText}>Sfortuna!</p>
                  {consecutiveFailures >= 3 && (
                    <p className={styles.blockText}>
                      Dopo 3 tentativi falliti, la lotteria si blocca per un
                      giorno.
                    </p>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.statusInfo}>
          <div className={styles.statusItem}>
            <span>Tentativi falliti: </span>
            <span className={styles.failureCount}>
              {Array.from({ length: 3 }, (_, i) => (
                <span
                  key={i}
                  className={
                    i < consecutiveFailures
                      ? styles.failureFilled
                      : styles.failureEmpty
                  }
                >
                  ●
                </span>
              ))}
            </span>
          </div>

          {/* ✨ DEBUG INFO (temporaneo) */}
          <div
            style={{
              fontSize: "11px",
              color: "#666",
              marginTop: "8px",
              padding: "4px",
              backgroundColor: "#f9f9f9",
              borderRadius: "3px",
            }}
          >
            <div>🆔 Current User: {currentUserId}</div>
            <div>💰 Current XP: {currentUserXP}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DailySpin;
