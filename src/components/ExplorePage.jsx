import React, { useState, useMemo, useEffect } from "react";
import MockupCard from "./MainApp/Shared/Modals/MockupCard";
import StaticEventShowcase from "./StaticEventShowcase";
import styles from "./MyExplorePage.module.css";

function MyExplorePage() {
  // State per filtri
  const [filtroTipo, setFiltroTipo] = useState("esperienze");
  const [filtroIcone, setFiltroIcone] = useState([]);
  const [filtroStati, setFiltroStati] = useState([]);

  const selectedPersonData = {
    saraDormand: {
      profile: {
        firstName: "Sara",
        lastName: "Dormand",
        profilePhoto: "/images/people/sara-dormand.jpg",
        location: "Torino",
        zone: "Santa Rita",
        joinedDate: "Luglio 2024",
      },
    },
    saraBianchi: {
      profile: {
        firstName: "Sara",
        lastName: "Bianchi",
        profilePhoto: "/images/people/laura-la.jpg",
        location: "Torino",
        zone: "Santa Rita",
        joinedDate: "Luglio 2024",
      },
    },
  };

  // Scroll verticale per le icone
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
  // Dati mockup strutturati - memoizzati per performance
  const tuttiElementi = useMemo(
    () => [
      // Eventi (StaticEventShowcase)
      {
        id: "event1",
        tipo: "eventi",
        categoria: "🎭",
        stato: "idle",
        component: (
          <StaticEventShowcase
            key="event1"
            selectedPersonData={selectedPersonData.saraDormand}
          />
        ),
      },
      {
        id: "event2",
        tipo: "eventi",
        categoria: "🎵",
        stato: "active",
        component: (
          <StaticEventShowcase
            key="event2"
            selectedPersonData={selectedPersonData.saraBianchi}
          />
        ),
      },

      // Esperienze (MockupCard)
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

  // Icone disponibili
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

  // Logica filtraggio
  const elementiFiltered = useMemo(() => {
    return tuttiElementi.filter((elemento) => {
      // Filtro tipo
      if (elemento.tipo !== filtroTipo) return false;

      // Filtro icone (se selezionate)
      if (filtroIcone.length > 0 && !filtroIcone.includes(elemento.categoria))
        return false;

      // Filtro stati (se selezionati)
      if (filtroStati.length > 0 && !filtroStati.includes(elemento.stato))
        return false;

      return true;
    });
  }, [filtroTipo, filtroIcone, filtroStati, tuttiElementi]);

  // Handler filtri
  const handleTipoChange = (tipo) => {
    setFiltroTipo(tipo);
  };

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

  return (
    <>
      <div className={styles.filtersSection}>
        {/* Filtro Tipo */}
        <div className={styles.filterGroup}>
          <div className={styles.filterButtons}>
            <button
              onClick={() => handleTipoChange("esperienze")}
              className={`${styles.filterButton} ${
                filtroTipo === "esperienze" ? styles.active : ""
              }`}
            >
              Esperienze (
              {tuttiElementi.filter((e) => e.tipo === "esperienze").length})
            </button>
            <button
              onClick={() => handleTipoChange("eventi")}
              className={`${styles.filterButton} ${
                filtroTipo === "eventi" ? styles.active : ""
              }`}
            >
              Eventi ({tuttiElementi.filter((e) => e.tipo === "eventi").length})
            </button>
          </div>
        </div>

        {/* Filtro Stati */}
        <div className={styles.filterGroup}>
          <div className={styles.filterButtons}>
            {statiDisponibili.map((stato) => {
              const count = tuttiElementi.filter(
                (e) => e.tipo === filtroTipo && e.stato === stato
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
                  {stato === "idle" ? "Disponibile" : "In corso"}({count})
                </button>
              );
            })}
            <button onClick={resetFiltri} className={styles.resetButton}>
              Reset filtri
            </button>
          </div>
        </div>
        <div className={styles.verticalIconScroll}>
          {iconeDisponibili.map((icon) => {
            const count = tuttiElementi.filter(
              (e) => e.tipo === filtroTipo && e.categoria === icon
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
                <span className={styles.iconCount}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Reset + Counter */}
        <div className={styles.filterFooter}>
          {/* <span className={styles.resultCount}>
                {elementiFiltered.length} risultati
              </span> */}
        </div>
      </div>
      <div className={styles.container}>
        {/* Contenuto principale a sinistra */}

        {/* Sezione Filtri principali - FISSA */}

        {/* Risultati filtrati - SCROLLABILE */}
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
}

export default MyExplorePage;
