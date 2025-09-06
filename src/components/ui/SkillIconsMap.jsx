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

const CustomIcons = {
  // Skills non coperte da Lucide - SVG custom
  Architecture: ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M3 21h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 21V7l8-4v18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 21V11l-6-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9v.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 12v.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 15v.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  History: ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 2v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 2v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  Psychology: ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 15c-4.5 0-8 3.5-8 8h16c0-4.5-3.5-8-8-8z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  ),

  Theater: ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M8 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 18c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 15c1 1 3 1 6 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  Dance: ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <path
        d="M10 8l2 2v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 10l2-2 3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 16l-2 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 16l2 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  Fashion: ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2L8 6v16l4-2 4 2V6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 6l2-1h4l2 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),

  Garden: ({ size = 24, className = "" }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 22c-7 0-10-3-10-10 0-2 2-4 4-4s4 2 4 4v6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 22c7 0 10-3 10-10 0-2-2-4-4-4s-4 2-4 4v6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 10V2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

// 🎯 MAPPING SKILLS TO ICONS
export const SKILL_ICONS = {
  writing: BookOpen,
  cooking: Utensils,
  photography: Camera,
  history: CustomIcons.History,
  music: Music,
  dance: CustomIcons.Dance,
  painting: Palette,
  video: Camera, // o altra icona
  programming: Code,
  architecture: CustomIcons.Architecture,
  graphics: Palette, // o altra icona
  theater: CustomIcons.Theater,
  psychology: CustomIcons.Psychology,
  fashion: CustomIcons.Fashion,
  health: Heart,
  gardening: CustomIcons.Garden,
  languages: Users,
  videogames: Laptop, // o altra icona
  podcast: Music, // o altra icona
  // Lucide React Icons
  pittura: Palette,
  fotografia: Camera,
  musica: Music,
  coding: Code,
  cucina: Utensils,
  scrittura: BookOpen,
  fitness: Dumbbell,
  business: Briefcase,
  lingue: Users,
  salute: Heart,
  auto: Car,
  viaggi: Plane,
  tech: Laptop,
  educazione: GraduationCap,
  bellezza: Scissors,

  // Custom SVG Icons
  architettura: CustomIcons.Architecture,
  storia: CustomIcons.History,
  psicologia: CustomIcons.Psychology,
  teatro: CustomIcons.Theater,
  danza: CustomIcons.Dance,
  giardinaggio: CustomIcons.Garden,
};
