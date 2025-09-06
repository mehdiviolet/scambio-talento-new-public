// ==========================================================================
// SISTEMA ICONE SKILLS - ALTERNATIVE PROFESSIONALI
// Sostituire emoji con icone consistenti e scalabili
// ==========================================================================

import React from "react";
import {
  Palette,
  Camera,
  Music,
  Code,
  Utensils,
  Home,
  BookOpen,
  Heart,
  Dumbbell,
  Scissors,
  Car,
  Plane,
  Laptop,
  Briefcase,
  GraduationCap,
  Users,
  Zap,
} from "lucide-react";

// 🎨 OPZIONE 1: LUCIDE REACT + CUSTOM ICONS
// Usa Lucide dove possibile + SVG custom per skills specifiche

// 🎨 OPZIONE 2: ICON COMPONENT UNIFICATO
export const SkillIcon = ({
  skill,
  size = 24,
  variant = "default",
  className = "",
}) => {
  const IconComponent = SKILL_ICONS[skill.toLowerCase()] || Zap;

  const variants = {
    default: "text-text-primary",
    primary: "text-primary-cyan",
    success: "text-green-400",
    warning: "text-yellow-400",
    muted: "text-text-muted",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <IconComponent
        size={size}
        className={variants[variant]}
        strokeWidth={1.5}
      />
    </div>
  );
};

// 🎨 OPZIONE 3: ICON WITH BACKGROUND CIRCLE
export const SkillIconCard = ({
  skill,
  title,
  size = "md",
  variant = "glass",
}) => {
  const sizes = {
    sm: { icon: 16, container: "w-10 h-10" },
    md: { icon: 20, container: "w-12 h-12" },
    lg: { icon: 24, container: "w-16 h-16" },
  };

  const variants = {
    glass: "bg-glass-bg backdrop-blur-sm border border-glass-border",
    solid: "bg-gradient-primary",
    outline: "border-2 border-glass-border bg-transparent",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`
        ${sizes[size].container} 
        ${variants[variant]}
        rounded-xl flex items-center justify-center
        hover:scale-105 transition-transform duration-200
      `}
      >
        <SkillIcon
          skill={skill}
          size={sizes[size].icon}
          variant={variant === "solid" ? "default" : "primary"}
        />
      </div>
      {title && (
        <span className="text-xs text-text-secondary font-medium text-center">
          {title}
        </span>
      )}
    </div>
  );
};

// 🎨 OPZIONE 4: REACT ICONS LIBRARY (Alternative)
// Se vuoi più varietà, puoi usare @react-icons/all-files
/*
npm install @react-icons/all-files

import { FaArchway } from '@react-icons/all-files/fa/FaArchway';
import { FaTheaterMasks } from '@react-icons/all-files/fa/FaTheaterMasks';
import { FaHistory } from '@react-icons/all-files/fa/FaHistory';
import { FaBrain } from '@react-icons/all-files/fa/FaBrain';
*/

// 📋 USAGE EXAMPLES
// export const SkillExamples = () => {
//   return (
//     <div className="space-y-6 p-6">
//       <h3 className="text-lg font-bold">Skill Icons Examples</h3>

//       {/* Grid di skills con icone */}
//       <div className="grid grid-cols-4 gap-4">
//         <SkillIconCard skill="fotografia" title="Fotografia" />
//         <SkillIconCard skill="musica" title="Musica" />
//         <SkillIconCard skill="architettura" title="Architettura" />
//         <SkillIconCard skill="cucina" title="Cucina" />
//         <SkillIconCard skill="storia" title="Storia" />
//         <SkillIconCard skill="psicologia" title="Psicologia" />
//         <SkillIconCard skill="teatro" title="Teatro" />
//         <SkillIconCard skill="coding" title="Programming" />
//       </div>

//       {/* Inline usage */}
//       <div className="flex items-center gap-3">
//         <SkillIcon skill="pittura" size={20} variant="primary" />
//         <span className="text-text-primary">Pittura Moderna</span>
//       </div>
//     </div>
//   );
// };
