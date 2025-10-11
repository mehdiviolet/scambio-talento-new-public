import React, { useState, useMemo, useEffect } from "react";
import {
  Drama,
  Music,
  Palette,
  ChefHat,
  BookOpen,
  Film,
  Zap,
  Building,
  Sparkles,
  Brain,
  Monitor,
  Shirt,
  Dumbbell,
  Leaf,
  Languages,
  Gamepad2,
  Mic,
} from "lucide-react";
import StaticEventShowcase from "./StaticEventShowcase";
import styles from "./MyExplorePage.module.css";
import SlideEventCardInCorso from "./SlideEventCardInCorso";
import SlideEventCardCompleted from "./SlideEventCardCompleted";

// Mapping icone eventi (come SKILL_ICONS in AddSkillModal)
const EVENT_ICONS = {
  theater: Drama,
  music: Music,
  art: Palette,
  cooking: ChefHat,
  books: BookOpen,
  cinema: Film,
  dance: Zap,
  architecture: Building,
  entertainment: Sparkles,
  wellness: Brain,
  tech: Monitor,
  fashion: Shirt,
  fitness: Dumbbell,
  nature: Leaf,
  languages: Languages,
  gaming: Gamepad2,
  podcast: Mic,
};

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
        categoria: "theater",
        stato: "idle",
        component: (
          <SlideEventCardInCorso
            key="event1"
            selectedPersonData={selectedPersonData.saraDormand}
          />
        ),
      },
      {
        id: "event2",
        tipo: "eventi",
        categoria: "music",
        stato: "active",
        component: (
          <SlideEventCardCompleted
            key="event2"
            selectedPersonData={selectedPersonData.saraDormand}
          />
        ),
      },
      {
        id: "event3",
        tipo: "eventi",
        categoria: "art",
        stato: "idle",
        component: (
          <SlideEventCardCompleted
            key="event3"
            selectedPersonData={selectedPersonData.saraDormand}
          />
        ),
      },
      {
        id: "event4",
        tipo: "eventi",
        categoria: "cooking",
        stato: "active",
        component: (
          <SlideEventCardInCorso
            key="event4"
            selectedPersonData={selectedPersonData.saraDormand}
          />
        ),
      },
    ],
    []
  );

  // Icone disponibili (sostituiscono le emoji)
  const iconeDisponibili = [
    { id: "theater", name: "Teatro", icon: Drama },
    { id: "music", name: "Musica", icon: Music },
    { id: "art", name: "Arte", icon: Palette },
    { id: "cooking", name: "Cucina", icon: ChefHat },
    { id: "books", name: "Cultura", icon: BookOpen },
    { id: "cinema", name: "Cinema", icon: Film },
    { id: "dance", name: "Danza", icon: Zap },
    { id: "architecture", name: "Architettura", icon: Building },
    { id: "entertainment", name: "Intrattenimento", icon: Sparkles },
    { id: "wellness", name: "Benessere", icon: Brain },
    { id: "tech", name: "Tech", icon: Monitor },
    { id: "fashion", name: "Fashion", icon: Shirt },
    { id: "fitness", name: "Fitness", icon: Dumbbell },
    { id: "nature", name: "Natura", icon: Leaf },
    { id: "languages", name: "Lingue", icon: Languages },
    { id: "gaming", name: "Gaming", icon: Gamepad2 },
    { id: "podcast", name: "Podcast", icon: Mic },
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
  const handleIconToggle = (iconId) => {
    setFiltroIcone((prev) =>
      prev.includes(iconId)
        ? prev.filter((i) => i !== iconId)
        : [...prev, iconId]
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
      const handleMouseDown = (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
      };

      const handleMouseUp = () => {
        isDown = false;
      };

      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      };

      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseleave", handleMouseLeave);
      slider.addEventListener("mouseup", handleMouseUp);
      slider.addEventListener("mousemove", handleMouseMove);

      return () => {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseleave", handleMouseLeave);
        slider.removeEventListener("mouseup", handleMouseUp);
        slider.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <>
      <div className={styles.filtersSection}>
        <h1 className={styles.pageTitle}>Eventi</h1>

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
          <div className={styles.verticalIconScroll}>
            {iconeDisponibili.map((iconItem) => {
              const count = tuttiElementi.filter(
                (e) => e.categoria === iconItem.id
              ).length;
              const IconComponent = iconItem.icon;

              return (
                <button
                  key={iconItem.id}
                  onClick={() => handleIconToggle(iconItem.id)}
                  disabled={count === 0}
                  className={`${styles.verticalIconButton} ${
                    filtroIcone.includes(iconItem.id) ? styles.selected : ""
                  } ${count === 0 ? styles.disabled : ""}`}
                  title={iconItem.name}
                >
                  <IconComponent size={20} className={styles.iconComponent} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtro Icone - Scroll orizzontale */}
      </div>

      <div className={styles.container}>
        {/* Risultati filtrati */}
        <div className={styles.resultsSection}>
          {elementiFiltered.length > 0 ? (
            elementiFiltered.map((elemento) => elemento.component)
          ) : (
            <div className={styles.emptyState}>
              <h3>Nessun risultato</h3>
              <p>Prova a modificare i filtri per vedere più contenuti</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventiPage;
