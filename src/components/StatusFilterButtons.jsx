import React from "react";
import { BookmarkCheckIcon, Flag, Flame, Hourglass, X } from "lucide-react";
import styles from "./StatusFilter.module.css";

// Mapping degli icon
const iconMap = {
  BookmarkCheckIcon,
  Flame,
  Hourglass,
  X,
  Flag,
};

/**
 * Componente per i bottoni di filtro per stato
 * @param {string} activeFilter - Filtro attualmente attivo
 * @param {Function} onFilterChange - Callback per il cambio filtro
 * @param {Object} filterCounts - Contatori per ogni filtro
 * @param {Object} filterConfig - Configurazione dei filtri
 * @param {string} className - Classe CSS aggiuntiva
 */
const StatusFilterButtons = ({
  activeFilter,
  onFilterChange,
  filterCounts = {},
  filterConfig,
  className = "",
}) => {
  const renderIcon = (iconName) => {
    if (!iconName) return null;
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={16} /> : null;
  };

  return (
    <div className={styles.me}>
      <div className={`${styles.filterButtons} ${className}`}>
        {Object.entries(filterConfig).map(([filterKey, config]) => (
          <button
            key={filterKey}
            className={`${styles.filterButton} ${
              activeFilter === filterKey ? styles.active : ""
            }`}
            onClick={() => onFilterChange(filterKey)}
          >
            {/* {renderIcon(config.icon)} */}
            <span className={styles.filterLabel}>{config.label}</span>
            <span className={styles.filterCount}>
              ({filterCounts[filterKey] || 0})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilterButtons;
