import React, { useRef, useState, useEffect } from "react";
import styles from "./StatusFilter.module.css";

/**
 * Componente per i bottoni di filtro per stato
 * @param {string} activeFilter - Filtro attualmente attivo
 * @param {Function} onFilterChange - Callback per il cambio filtro
 * @param {Object} filterCounts - Contatori per ogni filtro
 * @param {Object} filterConfig - Configurazione dei filtri
 * @param {string} className - Classe CSS aggiuntiva
 * @param {boolean} showAllFilter - Se mostrare il filtro "Tutti" (default: true)
 * @param {number} totalCount - Contatore totale per il filtro "Tutti"
 */
const StatusFilterButtons = ({
  activeFilter,
  onFilterChange,
  filterCounts = {},
  filterConfig,
  className = "",
  showAllFilter = true,
  totalCount = 0,
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Gestione mouse events per desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Previeni click sui bottoni durante drag
  const handleButtonClick = (callback) => (e) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    callback();
  };
  const getFilterButtonClass = (filterKey, config, count) => {
    let classes = [styles.filterButton];

    // Dimensione (sempre md per i filtri)
    classes.push(styles.md);

    // Variant dal config o default neutral
    const variant = config.variant || "neutral";
    classes.push(styles[variant]);

    // Mode sempre outline per i filtri non attivi, solid per quello attivo
    const mode = activeFilter === filterKey ? "solid" : "outline";
    classes.push(styles[mode]);

    return classes.join(" ");
  };

  return (
    <div className={styles.statusFilterContainer}>
      <div
        ref={containerRef}
        className={`${styles.filterButtons} ${className}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* Filtro "Tutti" */}
        {showAllFilter && (
          <button
            className={getFilterButtonClass(
              "all",
              { label: "Tutti", variant: "neutral" },
              totalCount
            )}
            onClick={handleButtonClick(() => onFilterChange("all"))}
            disabled={totalCount === 0}
          >
            Tutti: {totalCount}
          </button>
        )}

        {/* Filtri configurati */}
        {Object.entries(filterConfig).map(([filterKey, config]) => {
          const count = filterCounts[filterKey] || 0;

          return (
            <button
              key={filterKey}
              className={getFilterButtonClass(filterKey, config, count)}
              onClick={handleButtonClick(() => onFilterChange(filterKey))}
              disabled={count === 0}
              data-disabled-message={count === 0 ? "Nessun elemento" : ""}
            >
              {config.label}: {count}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusFilterButtons;
