// ==========================================================================
// SISTEMA FILTRI COMPATTO - SCAMBIO DI TALENTO
// Ridurre ingombro mantenendo funzionalità
// ==========================================================================

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Filter, ChevronDown, X, Search } from "lucide-react";

// 🎯 OPZIONE 1: FILTRI COLLAPSIBILI CON CONTATORI INTELLIGENTI
export const SmartFilters = ({
  filters,
  activeFilter,
  onFilterChange,
  showCounts = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mostra solo filtri con contenuto > 0
  const visibleFilters = filters.filter((f) => f.count > 0);
  const activeFilterData = filters.find((f) => f.key === activeFilter);

  return (
    <div className="space-y-3">
      {/* Filtro Attivo + Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 glass-card px-3 py-2 rounded-lg">
            <Filter size={16} className="text-text-muted" />
            <span className="text-sm font-medium text-text-primary">
              {activeFilterData?.label || "Tutti"}
            </span>
            {showCounts && activeFilterData?.count && (
              <span className="bg-glass-bg-light px-2 py-0.5 rounded-full text-xs text-text-secondary">
                {activeFilterData.count}
              </span>
            )}
          </div>

          {/* Toggle Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2"
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Reset se non è "tutti" */}
        {activeFilter !== "all" && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onFilterChange("all")}
            className="px-2"
          >
            <X size={14} />
          </Button>
        )}
      </div>

      {/* Filtri Espansi */}
      {isExpanded && (
        <div className="glass-card p-3 rounded-lg space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {visibleFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => {
                  onFilterChange(filter.key);
                  setIsExpanded(false);
                }}
                className={`
                  p-2 rounded-lg text-sm transition-all text-left
                  ${
                    activeFilter === filter.key
                      ? "bg-gradient-primary text-white"
                      : "bg-glass-bg-light hover:bg-glass-bg text-text-secondary hover:text-text-primary"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{filter.label}</span>
                  <span className="text-xs opacity-75">{filter.count}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 🎯 OPZIONE 2: FILTRI HORIZONTALI SCROLLABILI
// export const ScrollableFilters = ({
//   filters,
//   activeFilter,
//   onFilterChange,
// }) => {
//   return (
//     <div className="space-y-3">
//       {/* Search Bar Compatta */}
//       {/* <div className="relative">
//         <Search
//           size={16}
//           className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
//         />
//         <input
//           type="text"
//           placeholder="Cerca..."
//           className="w-full pl-9 pr-4 py-2 bg-glass-bg backdrop-blur-sm border border-glass-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:border-primary-cyan focus:outline-none"
//         />
//       </div> */}

//       {/* Filtri Scroll Horizontale */}
//       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//         {filters.map((filter) => (
//           <button
//             key={filter.key}
//             onClick={() => onFilterChange(filter.key)}
//             className={`
//               flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all
//               ${
//                 activeFilter === filter.key
//                   ? "bg-gradient-primary text-white shadow-lg"
//                   : "bg-glass-bg border border-glass-border text-text-secondary hover:text-text-primary hover:border-glass-border"
//               }
//             `}
//           >
//             <span>{filter.label}</span>
//             {filter.count > 0 && (
//               <span className="ml-1 opacity-75">({filter.count})</span>
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// ==========================================================================
// SCROLLABLE FILTERS MIGLIORATO - SCAMBIO DI TALENTO
// Design più interessante senza scrollbar visibile
// ==========================================================================

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 🎯 SCROLLABLE FILTERS V2 - No scrollbar, con navigation arrows
export const ScrollableFilters = ({
  filters,
  activeFilter,
  onFilterChange,
  showSearch = true,
  searchPlaceholder = "Cerca...",
  onSearch = null,
}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Controlla se si può scrollare
  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollButtons);
      return () =>
        scrollElement.removeEventListener("scroll", checkScrollButtons);
    }
  }, [filters]);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -120, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 120, behavior: "smooth" });
    }
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Bar Compatta */}
      {showSearch && (
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-10 py-2 bg-glass-bg backdrop-blur-sm border border-glass-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:border-primary-cyan focus:outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* Filtri Container con Navigation */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-glass-bg backdrop-blur-lg border border-glass-border rounded-full flex items-center justify-center hover:bg-glass-bg-light transition-all shadow-lg"
          >
            <ChevronLeft size={16} className="text-text-primary" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-glass-bg backdrop-blur-lg border border-glass-border rounded-full flex items-center justify-center hover:bg-glass-bg-light transition-all shadow-lg"
          >
            <ChevronRight size={16} className="text-text-primary" />
          </button>
        )}

        {/* Gradient Fade Effects */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-app-background to-transparent z-[5] pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-app-background to-transparent z-[5] pointer-events-none" />
        )}

        {/* Scrollable Filters */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-10"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: "none",
          }}
        >
          {filters.map((filter) => (
            <FilterPill
              key={filter.key}
              filter={filter}
              isActive={activeFilter === filter.key}
              onClick={() => onFilterChange(filter.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// 🎨 FILTER PILL COMPONENT - Più interessante
const FilterPill = ({ filter, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden
        ${
          isActive
            ? "bg-gradient-primary text-white shadow-lg transform scale-105"
            : "bg-glass-bg border border-glass-border text-text-secondary hover:text-text-primary hover:border-primary-cyan hover:bg-glass-bg-light"
        }
      `}
    >
      {/* Background Animation on Hover */}
      <div
        className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${
          !isActive
            ? "bg-gradient-to-r from-primary-cyan/10 to-primary-indigo/10"
            : ""
        }
      `}
      />

      {/* Content */}
      <div className="relative flex items-center gap-2">
        <span className="whitespace-nowrap">{filter.label}</span>
        {filter.count > 0 && (
          <span
            className={`
            px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-colors
            ${
              isActive
                ? "bg-white/20 text-white"
                : "bg-glass-bg-light text-text-muted group-hover:text-primary-cyan"
            }
          `}
          >
            {filter.count}
          </span>
        )}
      </div>

      {/* Active indicator line */}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white/60 rounded-full" />
      )}
    </button>
  );
};

// 🎯 VARIANTE COMPATTA - Ancora più piccola
export const CompactScrollableFilters = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const scrollRef = useRef(null);

  return (
    <div className="relative">
      {/* Compact Pills */}
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto scrollbar-hide py-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filters
          .filter((f) => f.count > 0)
          .map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`
              flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium transition-all duration-200
              ${
                activeFilter === filter.key
                  ? "bg-gradient-primary text-white shadow-md"
                  : "bg-glass-bg-light text-text-muted hover:text-text-primary hover:bg-primary-cyan/20"
              }
            `}
            >
              <span>{filter.label}</span>
              <span className="ml-1 opacity-75">({filter.count})</span>
            </button>
          ))}
      </div>
    </div>
  );
};

// 🌊 VARIANTE WAVE - Design più creativo
export const WaveFilters = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="relative">
      {/* Wave Background */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 Q100,10 200,30 T400,30 L400,60 L0,60 Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(34, 211, 238, 0.2)" />
              <stop offset="50%" stopColor="rgba(99, 102, 241, 0.2)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Filters over wave */}
      <div className="relative flex gap-2 overflow-x-auto scrollbar-hide py-3 px-2">
        {filters.map((filter, index) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300
              transform hover:scale-105 hover:-translate-y-1
              ${
                activeFilter === filter.key
                  ? "bg-white text-primary-indigo shadow-xl scale-105 -translate-y-1"
                  : "bg-glass-bg backdrop-blur-sm border border-glass-border text-text-primary hover:bg-white/90 hover:text-primary-indigo"
              }
            `}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <span>{filter.label}</span>
            {filter.count > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary-cyan/20 text-primary-cyan rounded-full text-xs">
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// 📱 CSS per nascondere scrollbar
// const scrollbarHideCSS = `
// .scrollbar-hide {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;
// }

// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
// `;

// Usage Examples
// export const FilterExamples = () => {
//   const [activeFilter, setActiveFilter] = useState("all");

//   const sampleFilters = [
//     { key: "all", label: "Tutti", count: 47 },
//     { key: "idle", label: "Disponibile", count: 12 },
//     { key: "waiting", label: "In attesa", count: 8 },
//     { key: "active", label: "In corso", count: 15 },
//     { key: "completed", label: "Completati", count: 12 },
//     { key: "extra1", label: "Extra Lungo Nome", count: 5 },
//     { key: "extra2", label: "Altro", count: 3 },
//   ];

//   return (
//     <div className="space-y-8 p-6">
//       <style>{scrollbarHideCSS}</style>

//       <h3 className="text-lg font-bold">Scrollable Filters Variants</h3>

//       {/* Versione Principale */}
//       <div>
//         <h4 className="text-sm font-medium mb-3 text-text-secondary">
//           Main Version (Raccomandato)
//         </h4>
//         <ScrollableFilters
//           filters={sampleFilters}
//           activeFilter={activeFilter}
//           onFilterChange={setActiveFilter}
//           onSearch={(term) => console.log("Search:", term)}
//         />
//       </div>

//       {/* Versione Compatta */}
//       <div>
//         <h4 className="text-sm font-medium mb-3 text-text-secondary">
//           Compact Version
//         </h4>
//         <CompactScrollableFilters
//           filters={sampleFilters}
//           activeFilter={activeFilter}
//           onFilterChange={setActiveFilter}
//         />
//       </div>

//       {/* Versione Wave */}
//       <div>
//         <h4 className="text-sm font-medium mb-3 text-text-secondary">
//           Wave Version (Creative)
//         </h4>
//         <WaveFilters
//           filters={sampleFilters}
//           activeFilter={activeFilter}
//           onFilterChange={setActiveFilter}
//         />
//       </div>
//     </div>
//   );
// };

// 🎯 OPZIONE 3: FILTRI COME DROPDOWN COMPATTO
export const DropdownFilters = ({ filters, activeFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeFilterData = filters.find((f) => f.key === activeFilter);

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between glass-card px-4 py-2 rounded-lg hover:bg-glass-bg-light transition-all"
      >
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-text-muted" />
          <span className="text-sm font-medium text-text-primary">
            {activeFilterData?.label || "Tutti"}
          </span>
          {activeFilterData?.count && (
            <span className="bg-gradient-primary  px-2 py-0.5 rounded-full text-xs">
              {activeFilterData.count}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-lg shadow-strong z-50 overflow-hidden">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                onFilterChange(filter.key);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center justify-between px-4 py-3 text-sm transition-all
                ${
                  activeFilter === filter.key
                    ? "bg-gradient-primary text-white"
                    : "text-text-secondary hover:text-text-primary hover:bg-glass-bg-light"
                }
              `}
            >
              <span>{filter.label}</span>
              <span className="opacity-75">{filter.count}</span>
            </button>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

// 🎯 OPZIONE 4: FILTRI MINIMAL CON SOLO CONTATORI
export const MinimalFilters = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {filters
        .filter((f) => f.count > 0)
        .map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`
            flex-shrink-0 px-2 py-1 rounded-md text-xs transition-all
            ${
              activeFilter === filter.key
                ? "bg-gradient-primary text-white"
                : "text-text-muted hover:text-text-primary hover:bg-glass-bg-light"
            }
          `}
          >
            {filter.count}
          </button>
        ))}
    </div>
  );
};

// 🎯 OPZIONE 5: FILTRI CON SEGMENTED CONTROL
export const SegmentedFilters = ({ filters, activeFilter, onFilterChange }) => {
  // Mostra solo i 3-4 filtri più importanti
  const mainFilters = filters.slice(0, 4);

  return (
    <div className="glass-card p-1 rounded-lg">
      <div className="grid grid-cols-4 gap-1">
        {mainFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`
              px-3 py-2 rounded-md text-xs font-medium transition-all text-center
              ${
                activeFilter === filter.key
                  ? "bg-gradient-primary text-white shadow-md"
                  : "text-text-secondary hover:text-text-primary hover:bg-glass-bg-light"
              }
            `}
          >
            <div className="truncate">{filter.label}</div>
            <div className="text-[10px] opacity-75 mt-0.5">{filter.count}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// 📱 USAGE EXAMPLES WITH FILTER DATA
export const FilterExamples = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const sampleFilters = [
    { key: "all", label: "Tutti", count: 47 },
    { key: "idle", label: "Disponibile", count: 12 },
    { key: "waiting", label: "In attesa", count: 8 },
    { key: "active", label: "In corso", count: 15 },
    { key: "completed", label: "Completati", count: 12 },
  ];

  return (
    <div className="space-y-8 p-6">
      <h3 className="text-lg font-bold">Filter Options</h3>

      {/* Smart Filters - Raccomandato */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-text-secondary">
          Smart Filters (Raccomandato)
        </h4>
        <SmartFilters
          filters={sampleFilters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Scrollable Filters */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-text-secondary">
          Scrollable Filters
        </h4>
        <ScrollableFilters
          filters={sampleFilters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Segmented Control */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-text-secondary">
          Segmented Control
        </h4>
        <SegmentedFilters
          filters={sampleFilters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    </div>
  );
};
