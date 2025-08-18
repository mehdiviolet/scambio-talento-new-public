import React, { useState, useEffect } from "react";
import styles from "./CherryComp.module.css";
import { BookOpen, Cherry, Clock, Cookie, Shield, X, Zap } from "lucide-react";

// XP Service
import { useDispatch, useSelector } from "react-redux";
import {
  recordSlotSpin,
  calculateSlotReward,
  selectCurrentUserId,
  selectCurrentUserXP,
  setCurrentUser,
} from "@/services/xpService";

const CherryComp = ({ currentUser = currentUser }) => {
  const dispatch = useDispatch();

  // XP Service selectors
  const currentUserId = useSelector(selectCurrentUserId);
  const currentUserXP = useSelector(selectCurrentUserXP);

  useEffect(() => {
    dispatch(setCurrentUser({ userId: "currentUser" }));
  }, [dispatch]);

  // console.log(currentUser);
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
  const [showInfoModal, setShowInfoModal] = useState(false);

  const getButtonState = (isBlocked, isSpinning, hasSpunToday) => {
    if (isBlocked) return "blocked";
    if (isSpinning) return "spinning";
    if (hasSpunToday) return "completed";
    return "ready";
  };

  console.log(xpRewarded);

  // Controlla lo stato della slot machine
  useEffect(() => {
    const checkDailyStatus = () => {
      const userId = currentUserId || currentUser?.id || "default";
      const lastSpinDate = localStorage.getItem(`lastSpinDate_${userId}`);
      const blockedUntil = localStorage.getItem(`blockedUntil_${userId}`);
      const failures = parseInt(
        localStorage.getItem(`consecutiveFailures_${userId}`) || "0"
      );
      const today = new Date().toDateString();

      setConsecutiveFailures(failures);
    };

    checkDailyStatus();
    const interval = setInterval(checkDailyStatus, 60000);

    return () => clearInterval(interval);
  }, [currentUser, currentUserId]);

  // Calcola la ricompensa
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

        // Calcola premio con XP Service
        const { xp, isWin } = calculateReward(finalResult);
        setXpRewarded(xp);

        const userId = currentUserId || currentUser?.id || "default";

        if (isWin) {
          localStorage.setItem(`consecutiveFailures_${userId}`, "0");
          setConsecutiveFailures(0);

          // Dispatch a XP Service
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

          // Registra anche spin perdenti (0 XP)
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

  return (
    <div className={styles.container}>
      {/* 🆕 HEADER CON BOTTONE INFO */}
      <div className={styles.slotHeader}>
        <h3 className={styles.slotTitle}>
          Slot della Fortuna
          <button
            className={styles.infoButton}
            onClick={() => setShowInfoModal(true)}
            title="Guida completa della slot"
          >
            <BookOpen size={18} />
          </button>
        </h3>
      </div>
      <div className={styles.slotMachine}>
        {/* Area ricompensa - sempre presente */}
        <div className={styles.rewardMessage}>
          {showReward ? (
            <>
              {xpRewarded > 0 ? (
                <>
                  <div className={styles.xpAmount}>
                    <span className={styles.trophy}>
                      <Cookie size={60} />
                    </span>
                    +{xpRewarded} XP
                  </div>
                  <p className={styles.rewardText}>
                    {xpRewarded === 500 ? "WOW!" : "Vittoria!"}
                  </p>
                </>
              ) : (
                <>
                  <>
                    <p className={styles.failText}>Sfortuna!</p>
                    <div className={styles.xpAmount}>
                      <span className={styles.trophy}>
                        <Cookie size={60} />
                      </span>
                      +{xpRewarded} XP
                    </div>
                  </>

                  {consecutiveFailures >= 3 && (
                    <p className={styles.blockText}>
                      Dopo 3 tentativi falliti, la lotteria si blocca per un
                      giorno.
                    </p>
                  )}
                </>
              )}
            </>
          ) : (
            <div className={styles.placeholder}>
              {hasSpunToday ? "Completato per oggi!" : "Clicca per girare!"}
            </div>
          )}
        </div>

        <div className={styles.slotBase}>
          <div className={styles.slotsContainer}>
            {result.map((symbol, index) => (
              <div key={index} className={styles.slotWrapper}>
                <div className={styles.slot}>
                  <div className={styles.slotFace}>
                    <span className={styles.symbol}>{symbol}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.slotShadow} />
        </div>

        {/* Pulsante */}
        <button
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
        >
          <div className={styles.buttonContent}>
            <span className={styles.buttonIcon}>
              {isBlocked ? "🔒" : isSpinning ? "⏳" : hasSpunToday ? "✓" : "🎲"}
            </span>

            <span className={styles.buttonText}>
              {isSpinning ? (
                "Girando..."
              ) : (
                <>
                  {isBlocked
                    ? "Bloccato per 1 giorno"
                    : hasSpunToday
                    ? "Torna domani!"
                    : "GIRA ORA"}
                </>
              )}
            </span>

            <Cherry size={16} />
          </div>
        </button>

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

          {/* DEBUG INFO */}
          {/* <div className={styles.debugInfo}>
            <div>🆔 Current User: {currentUserId}</div>
            <div>💰 Current XP: {currentUserXP}</div>
          </div> */}
        </div>
      </div>
      {/* 🆕 MODAL INFO - Stile identico al settings */}
      {showInfoModal && (
        <>
          {/* Overlay con blur */}
          <div
            className={styles.overlay}
            onClick={() => setShowInfoModal(false)}
          ></div>

          {/* Modal Content */}
          <div className={styles.infoModal}>
            <div className={styles.infoModalContent}>
              {/* Header Modal */}
              <div className={styles.modalHeader}>
                <div className={styles.modalTitleSection}>
                  <div className={styles.modalIcon}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h2 className={styles.modalTitle}>Guida</h2>
                    <p className={styles.modalSubtitle}>
                      Tutto quello che devi sapere
                    </p>
                  </div>
                </div>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowInfoModal(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* 📝 RIASSUNTO BREVE */}
              <div className={styles.summarySection}>
                <h3 className={styles.sectionTitle}>📋 Riassunto Veloce</h3>
                <div className={styles.quickInfo}>
                  <div className={styles.quickInfoItem}>
                    <span className={styles.quickInfoIcon}>🗓️</span>
                    <span>
                      <strong>1 giro al giorno</strong> gratis
                    </span>
                  </div>
                  <div className={styles.quickInfoItem}>
                    <span className={styles.quickInfoIcon}>💰</span>
                    <span>
                      <strong>Fino a 30 XP</strong> per vincita
                    </span>
                  </div>
                  <div className={styles.quickInfoItem}>
                    <span className={styles.quickInfoIcon}>⚠️</span>
                    <span>
                      <strong>3 sconfitte</strong> = blocco 24h
                    </span>
                  </div>
                </div>
              </div>

              {/* Linea tratteggiata */}
              <div className={styles.divider}></div>

              {/* 📖 GUIDA COMPLETA */}
              <div className={styles.detailedSection}>
                <h3 className={styles.sectionTitle}>📖 Guida Completa</h3>

                {/* Sezione 1: Come Funziona */}
                <div className={styles.guideItem}>
                  <div className={styles.guideIcon}>
                    <Zap size={18} />
                  </div>
                  <div className={styles.guideContent}>
                    <h4 className={styles.guideTitle}>Come Funziona</h4>
                    <p className={styles.guideDescription}>
                      Clicca "GIRA ORA" per far girare i 3 rulli. Ogni rullo
                      mostra un simbolo casuale: 🍒🍋🍊🍇💎⭐🍀
                    </p>
                  </div>
                </div>

                {/* Sezione 2: Ricompense */}
                <div className={styles.gridItems}>
                  <div className={styles.guidCookie}>
                    <Cookie size={18} />
                    <span>Ricompense XP</span>
                  </div>
                  <div className={styles.guideContent}>
                    {/* <h4 className={styles.guideTitle}>Ricompense XP</h4> */}
                    <div className={styles.rewardExamples}>
                      <span className={styles.rewardLabel}>
                        3 simboli uguali:
                      </span>
                      <div className={styles.rewardExample}>
                        <span className={styles.symbolsExample}>🍒🍒🍒</span>
                        <span className={styles.xpAmount}>
                          = <strong>30 XP</strong>
                        </span>
                      </div>
                      <span className={styles.rewardLabel}>
                        2 simboli uguali:
                      </span>
                      <div className={styles.rewardExample}>
                        <span className={styles.symbolsExample}>🍋🍋💎</span>
                        <span className={styles.xpAmount}>
                          = <strong>10 XP</strong>
                        </span>
                      </div>
                      <span className={styles.rewardLabel}>Nessun match:</span>
                      <div className={styles.rewardExample}>
                        <span className={styles.symbolsExample}>🍊💎🍀</span>
                        <span className={styles.xpAmount}>
                          = <strong>0 XP</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sezione 3: Sistema Anti-Spam */}
                <div className={styles.guideItem}>
                  <div className={styles.guideIcon}>
                    <Shield size={18} />
                  </div>
                  <div className={styles.guideContent}>
                    <h4 className={styles.guideTitle}>Sistema di Blocco</h4>
                    <p className={styles.guideDescription}>
                      Se perdi <strong>3 volte consecutive</strong>, la slot si
                      blocca per 24 ore. Il contatore si resetta automaticamente
                      quando vinci!
                    </p>
                    <div className={styles.failureIndicator}>
                      <span>Sconfitte consecutive: </span>
                      <div className={styles.failureDots}>
                        <span className={styles.failureDot}>●</span>
                        <span className={styles.failureDot}>●</span>
                        <span className={styles.failureDot}>●</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sezione 4: Limitazioni */}
                <div className={styles.guideItem}>
                  <div className={styles.guideIcon}>
                    <Clock size={18} />
                  </div>
                  <div className={styles.guideContent}>
                    <h4 className={styles.guideTitle}>Limitazioni Temporali</h4>
                    <ul className={styles.limitationsList}>
                      <li>
                        🕐 <strong>1 giro ogni 24 ore</strong> (reset a
                        mezzanotte)
                      </li>
                      <li>
                        🔒 <strong>Blocco temporaneo</strong> dopo 3 sconfitte
                      </li>
                      <li>
                        🔄 <strong>Reset giornaliero</strong> delle opportunità
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Tip finale */}
                <div className={styles.tipSection}>
                  <div className={styles.tipIcon}>💡</div>
                  <div className={styles.tipContent}>
                    <strong>N.B:</strong> L'XP vinto viene aggiunto
                    immediatamente al tuo totale e registrato nella cronologia!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CherryComp;
