import React, { useState, useMemo, useEffect } from "react";
import StaticEventShowcase from "./StaticEventShowcase";
import styles from "./MyExplorePage.module.css";

const EventiPage = ({ currentUser }) => {
  // State per filtri (solo per eventi)
  const [filtroIcone, setFiltroIcone] = useState([]);
  const [filtroStati, setFiltroStati] = useState([]);

  // Dati mockup degli eventi - estratti da ExplorePage
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

  const tuttiElementi = useMemo(
    () => [
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
      // Puoi aggiungere altri eventi qui seguendo lo stesso pattern
      {
        id: "event3",
        tipo: "eventi",
        categoria: "🎨",
        stato: "idle",
        component: (
          <StaticEventShowcase
            key="event3"
            selectedPersonData={selectedPersonData.saraDormand}
          />
        ),
      },
      {
        id: "event4",
        tipo: "eventi",
        categoria: "🍳",
        stato: "active",
        component: (
          <StaticEventShowcase
            key="event4"
            selectedPersonData={selectedPersonData.saraBianchi}
          />
        ),
      },
    ],
    []
  );

  // Icone disponibili (per eventi)
  const iconeDisponibili = [
    "🎭", // teatro/spettacoli
    "🎵", // musica
    "🎨", // arte
    "🍳", // cucina/food
    "📚", // cultura/libri
    "🎬", // cinema
    "💃", // danza
    "🏛️", // architettura/musei
    "🎪", // intrattenimento
    "🧠", // psicologia/benessere
    "💻", // tech/digitale
    "👗", // fashion/stile
    "💪", // sport/fitness
    "🌱", // natura/ambiente
    "🗣️", // lingue/conversazione
    "🎮", // gaming
    "🎙️", // podcast/radio
  ];

  const statiDisponibili = ["idle", "active"];

  // Logica filtraggio (solo per eventi)
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
        <h1 className={styles.pageTitle}>🎭 Eventi</h1>

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

export default EventiPage;
