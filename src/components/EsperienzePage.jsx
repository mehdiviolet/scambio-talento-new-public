import React, { useState, useMemo, useEffect } from "react";
import MockupCard from "./MainApp/Shared/Modals/MockupCard";
import styles from "./MyExplorePage.module.css";

const EsperienzePage = () => {
  // State per filtri (solo per esperienze)
  const [filtroIcone, setFiltroIcone] = useState([]);
  const [filtroStati, setFiltroStati] = useState([]);

  // Dati mockup delle esperienze - estratti da ExplorePage
  const tuttiElementi = useMemo(
    () => [
      {
        id: "exp1",
        tipo: "esperienze",
        categoria: "📸",
        stato: "idle",
        component: <MockupCard key="exp1" />,
      },
      {
        id: "exp2",
        tipo: "esperienze",
        categoria: "📸",
        stato: "active",
        component: (
          <MockupCard
            key="exp2"
            title="Fotografia / ritratti"
            istruttore="Marco Rossi"
            modalita="presenza"
            stato="active"
          />
        ),
      },
      {
        id: "exp3",
        tipo: "esperienze",
        categoria: "🍳",
        stato: "idle",
        component: (
          <MockupCard
            key="exp3"
            title="Cucina / Francese"
            istruttore="Sara Dormand"
            modalita="presenza"
            icon="🍳"
            skillGems={120}
          />
        ),
      },
      {
        id: "exp4",
        tipo: "esperienze",
        categoria: "🎨",
        stato: "idle",
        component: (
          <MockupCard
            key="exp4"
            title="Pittura / Acquerello"
            istruttore="Anna Verdi"
            modalita="online"
            icon="🎨"
            skillGems={65}
            costo={45}
            lezioni={3}
          />
        ),
      },
      {
        id: "exp5",
        tipo: "esperienze",
        categoria: "🎵",
        stato: "active",
        component: (
          <MockupCard
            key="exp5"
            title="Chitarra / Rock"
            istruttore="Luca Metal"
            modalita="presenza"
            icon="🎵"
            skillGems={89}
            costo={60}
            lezioni={6}
            durataLezione="1.5 Ore"
          />
        ),
      },
    ],
    []
  );

  // Icone disponibili (solo per esperienze)
  const iconeDisponibili = [
    "✍️",
    "🍳",
    "📸",
    "📚",
    "🎵",
    "💃",
    "🎨",
    "🎬",
    "🏛️",
    "🎭",
    "🎪",
    "🧠",
    "💻",
    "👗",
    "💪",
    "🌱",
    "🗣️",
    "🎮",
    "🎙️",
  ];

  const statiDisponibili = ["idle", "active"];

  // Logica filtraggio (solo per esperienze)
  const elementiFiltered = useMemo(() => {
    return tuttiElementi.filter((elemento) => {
      // Filtro icone (se selezionate)
      if (filtroIcone.length > 0 && !filtroIcone.includes(elemento.categoria))
        return false;

      // Filtro stati (se selezionati)
      if (filtroStati.length > 0 && !filtroStati.includes(elemento.stato))
        return false;

      return true;
    });
  }, [filtroIcone, filtroStati, tuttiElementi]);

  // Handler filtri
  const handleIconToggle = (icon) => {
    setFiltroIcone((prev) =>
      prev.includes(icon) ? prev.filter((i) => i !== icon) : [...prev, icon]
    );
  };

  const handleStatoToggle = (stato) => {
    setFiltroStati((prev) =>
      prev.includes(stato) ? prev.filter((s) => s !== stato) : [...prev, stato]
    );
  };

  const resetFiltri = () => {
    setFiltroIcone([]);
    setFiltroStati([]);
  };

  // Scroll orizzontale per le icone
  useEffect(() => {
    const slider = document.querySelector(`.${styles.verticalIconScroll}`);
    let isDown = false;
    let startX;
    let scrollLeft;

    if (slider) {
      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener("mouseleave", () => {
        isDown = false;
      });

      slider.addEventListener("mouseup", () => {
        isDown = false;
      });

      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);

  return (
    <>
      <div className={styles.filtersSection}>
        <h1 className={styles.pageTitle}>📚 Esperienze</h1>

        {/* Filtro Stati */}
        <div className={styles.filterGroup}>
          <div className={styles.filterButtons}>
            {statiDisponibili.map((stato) => {
              const count = tuttiElementi.filter(
                (e) => e.stato === stato
              ).length;
              return (
                <button
                  key={stato}
                  onClick={() => handleStatoToggle(stato)}
                  disabled={count === 0}
                  className={`${styles.stateButton} ${
                    filtroStati.includes(stato) ? styles.selected : ""
                  } ${count === 0 ? styles.disabled : ""}`}
                >
                  {stato === "idle" ? "Disponibile" : "In corso"} ({count})
                </button>
              );
            })}
            <button onClick={resetFiltri} className={styles.resetButton}>
              Reset filtri
            </button>
          </div>
          {/* Filtro Icone - Scroll orizzontale */}
          <div className={styles.verticalIconScroll}>
            {iconeDisponibili.map((icon) => {
              const count = tuttiElementi.filter(
                (e) => e.categoria === icon
              ).length;
              return (
                <button
                  key={icon}
                  onClick={() => handleIconToggle(icon)}
                  disabled={count === 0}
                  className={`${styles.verticalIconButton} ${
                    filtroIcone.includes(icon) ? styles.selected : ""
                  } ${count === 0 ? styles.disabled : ""}`}
                >
                  <span className={styles.iconEmoji}>{icon}</span>
                  {/* <span className={styles.iconCount}>({count})</span> */}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Risultati filtrati */}
        <div className={styles.resultsSection}>
          {elementiFiltered.length > 0 ? (
            elementiFiltered.map((elemento) => elemento.component)
          ) : (
            <div className={styles.emptyState}>
              <h3>🔍 Nessun risultato</h3>
              <p>Prova a modificare i filtri per vedere più contenuti</p>
            </div>
          )}

          <p className={styles.hint}>
            💡 Clicca sulla carta per espandere/comprimere
          </p>
        </div>
      </div>
    </>
  );
};

export default EsperienzePage;
