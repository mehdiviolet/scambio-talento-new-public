import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  ChefHat,
  Camera,
  GraduationCap,
  Music,
  Zap,
  Palette,
  Film,
  Building,
  Drama,
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
import MockupCard from "./MainApp/Shared/Modals/MockupCard";
import styles from "./MyExplorePage.module.css";

// Mapping icone esperienze (stesso pattern di EventiPage)
const EXPERIENCE_ICONS = {
  writing: BookOpen,
  cooking: ChefHat,
  photography: Camera,
  history: GraduationCap,
  music: Music,
  dance: Zap,
  painting: Palette,
  video: Film,
  architecture: Building,
  theater: Drama,
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
        categoria: "photography",
        stato: "idle",
        component: (
          <MockupCard key="exp1" ownerPhoto="/public/images/people/sarad.jpg" />
        ),
      },
      {
        id: "exp2",
        tipo: "esperienze",
        categoria: "photography",
        stato: "active",
        component: (
          <MockupCard
            key="exp2"
            title="Fotografia / ritratti"
            istruttore="Marco Rossi"
            modalita="presenza"
            stato="active"
            ownerPhoto="/public/images/people/marcor.png"
          />
        ),
      },
      {
        id: "exp3",
        tipo: "esperienze",
        categoria: "cooking",
        stato: "idle",
        component: (
          <MockupCard
            key="exp3"
            title="Cucina / Francese"
            istruttore="Sara Dormand"
            modalita="presenza"
            icon="cooking"
            skillGems={120}
          />
        ),
      },
      {
        id: "exp4",
        tipo: "esperienze",
        categoria: "painting",
        stato: "idle",
        component: (
          <MockupCard
            key="exp4"
            title="Pittura / Acquerello"
            istruttore="Anna Verdi"
            modalita="online"
            icon="painting"
            skillGems={65}
            costo={45}
            lezioni={3}
          />
        ),
      },
      {
        id: "exp5",
        tipo: "esperienze",
        categoria: "music",
        stato: "active",
        component: (
          <MockupCard
            key="exp5"
            title="Chitarra / Rock"
            istruttore="Luca Metal"
            modalita="presenza"
            icon="music"
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

  // Icone disponibili (sostituiscono le emoji)
  const iconeDisponibili = [
    { id: "writing", name: "Scrittura", icon: BookOpen },
    { id: "cooking", name: "Cucina", icon: ChefHat },
    { id: "photography", name: "Fotografia", icon: Camera },
    { id: "history", name: "Storia", icon: GraduationCap },
    { id: "music", name: "Musica", icon: Music },
    { id: "dance", name: "Danza", icon: Zap },
    { id: "painting", name: "Pittura", icon: Palette },
    { id: "video", name: "Video", icon: Film },
    { id: "architecture", name: "Architettura", icon: Building },
    { id: "theater", name: "Teatro", icon: Drama },
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
        <h1 className={styles.pageTitle}>Esperienze</h1>

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

export default EsperienzePage;
