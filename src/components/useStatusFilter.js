import { useState, useMemo } from "react";
import { useSelector } from "react-redux";

/**
 * Custom hook per gestire il sistema di filtri per stato
 * @param {Array} items - Array di elementi da filtrare
 * @param {string} statusPath - Path Redux per gli stati (es: 'experienceSliceTest.courseStates')
 * @param {Object} filterConfig - Configurazione dei filtri disponibili
 */
export const useStatusFilter = (items, statusPath, filterConfig = null) => {
  const [statusFilter, setStatusFilter] = useState("all");

  // Selector Redux per gli stati
  // const allStates = useSelector((state) => {
  //   const pathParts = statusPath.split(".");
  //   return pathParts.reduce((obj, part) => obj?.[part], state) || {};
  // });
  // ✅ FIX
  const allStates = useSelector((state) => {
    if (!statusPath) return {}; // ← GESTISCI NULL
    const pathParts = statusPath.split(".");
    return pathParts.reduce((obj, part) => obj?.[part], state) || {};
  });
  // Configurazione default dei filtri
  const defaultFilterConfig = {
    idle: {
      label: "Idle",
      icon: "BookmarkCheckIcon",
      statuses: ["idle"],
    },
    active: {
      label: "Active",
      icon: "Hourglass",
      statuses: ["requested", "ready", "waiting", "active", "pending_feedback"],
    },
    completed: {
      label: "Completed",
      icon: "Flame",
      statuses: ["completed"],
    },
    all: {
      label: "Tutti",
      icon: null,
      statuses: null, // null significa tutti tranne completed (logica speciale)
    },
    rejected: {
      label: "Rejected",
      icon: "X", // o "XCircle"
      statuses: ["rejected", "declined", "cancelled"],
    },
  };

  const config = filterConfig || defaultFilterConfig;

  // Logica di filtro
  const filteredItems = useMemo(() => {
    if (!items) return [];

    return items.filter((item) => {
      // const itemState = allStates[item.id];
      // const currentStatus = itemState?.status || "idle";
      const currentStatus = item.status || allStates[item.id]?.status || "idle";

      if (statusFilter === "all") {
        return currentStatus; // Mostra tutti
      }

      const filterSettings = config[statusFilter];
      if (!filterSettings) return false;

      return filterSettings.statuses.includes(currentStatus);
    });
  }, [items, allStates, statusFilter, config]);

  // Contatori per ogni filtro
  const filterCounts = useMemo(() => {
    if (!items) return {};

    const counts = {};

    Object.keys(config).forEach((filterKey) => {
      const filterSettings = config[filterKey];

      counts[filterKey] = items.filter((item) => {
        // const itemState = allStates[item.id];
        // const currentStatus = itemState?.status || "idle";
        const currentStatus =
          item.status || allStates[item.id]?.status || "idle";

        if (filterKey === "all") {
          return currentStatus; // Conta tutti
        }

        return filterSettings.statuses.includes(currentStatus);
      }).length;
    });

    return counts;
  }, [items, allStates, config]);

  return {
    statusFilter,
    setStatusFilter,
    filteredItems,
    filterCounts,
    filterConfig: config,
  };
};
