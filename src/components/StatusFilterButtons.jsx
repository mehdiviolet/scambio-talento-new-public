import React from "react";
import {
  BookmarkCheckIcon,
  Flag,
  Flame,
  Hourglass,
  X,
  Grid3X3,
} from "lucide-react";
import styles from "./StatusFilter.module.css";

// Mapping degli icon
const iconMap = {
  BookmarkCheckIcon,
  Flame,
  Hourglass,
  X,
  Flag,
  Grid3X3, // Per "Tutti"
};

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
  const renderIcon = (iconName) => {
    if (!iconName) return null;
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={16} /> : null;
  };

  const getFilterButtonClass = (filterKey, config, count) => {
    let classes = [styles.filterButton];

    // Stato attivo
    if (activeFilter === filterKey) {
      classes.push(styles.active);
    }

    // Stati speciali basati su config
    if (config.variant) {
      classes.push(styles[config.variant]);
    }

    // Disabilitato se count = 0 (eccetto "tutti")
    if (count === 0 && filterKey !== "all") {
      classes.push(styles.disabled);
    }

    return classes.join(" ");
  };

  return (
    <div className={styles.statusFilterContainer}>
      <div className={`${styles.filterButtons} ${className}`}>
        {/* Filtro "Tutti" */}
        {showAllFilter && (
          <button
            className={getFilterButtonClass(
              "all",
              { icon: "Grid3X3", label: "Tutti" },
              totalCount
            )}
            onClick={() => onFilterChange("all")}
          >
            <div className={styles.filterIconWrapper}>
              {renderIcon("Grid3X3")}
            </div>
            <span className={styles.filterLabel}>Tutti</span>
            <span className={styles.filterCount}>({totalCount})</span>
          </button>
        )}

        {/* Filtri configurati */}
        {Object.entries(filterConfig).map(([filterKey, config]) => {
          const count = filterCounts[filterKey] || 0;

          return (
            <button
              key={filterKey}
              className={getFilterButtonClass(filterKey, config, count)}
              onClick={() => onFilterChange(filterKey)}
              disabled={count === 0}
            >
              <div className={styles.filterIconWrapper}>
                {renderIcon(config.icon)}
              </div>
              <span className={styles.filterLabel}>{config.label}</span>
              <span className={styles.filterCount}>({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusFilterButtons;
