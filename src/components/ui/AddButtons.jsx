import React from "react";
import { Plus, Star, BookOpen, Users, Camera, Calendar } from "lucide-react";

// Header Add Button - Piccolo per section headers
export const HeaderAddButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-8 h-8 rounded-full
        bg-glass-bg-light border border-glass-border
        flex items-center justify-center
        hover:bg-primary-cyan hover:border-primary-cyan hover:scale-110
        active:scale-95
        transition-all duration-200
        group
        ${className}
      `}
    >
      <Plus size={16} className="text-text-muted  transition-colors" />
    </button>
  );
};

// Contextual Add per Skills
export const AddSkillButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group w-full glass-card p-4 rounded-xl border-2 border-dashed border-glass-border hover:border-primary-cyan hover:bg-glass-bg-light transition-all duration-300"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-warning flex items-center justify-center group-hover:scale-110 transition-transform">
        <Star size={20} className="text-white" />
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-text-primary">
          Aggiungi Skill
        </div>
        <div className="text-xs text-text-muted">Mostra le tue competenze</div>
      </div>
    </div>
  </button>
);

// 📚 ADD EXPERIENCE BUTTON - Per sezione esperienze
export const AddExperienceButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group w-full glass-card p-4 rounded-xl border-2 border-dashed border-glass-border hover:border-primary-cyan hover:bg-glass-bg-light transition-all duration-300"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
        <BookOpen size={20} className="text-white" />
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-text-primary">
          Crea Esperienza
        </div>
        <div className="text-xs text-text-muted">Insegna qualcosa di nuovo</div>
      </div>
    </div>
  </button>
);

// 🎯 ADD SKILL FIRST BUTTON - Per quando servono prima le skills
export const AddSkillFirstButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group w-full glass-card p-4 rounded-xl border-2 border-dashed border-glass-border hover:border-primary-cyan hover:bg-glass-bg-light transition-all duration-300"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-warning flex items-center justify-center group-hover:scale-110 transition-transform">
        <Star size={20} className="text-white" />
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-text-primary">
          Aggiungi prima una skill
        </div>
        <div className="text-xs text-text-muted">
          Le esperienze si basano sulle tue competenze
        </div>
      </div>
    </div>
  </button>
);

// 🎪 ADD EVENT BUTTON - Per sezione eventi
export const AddEventButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group w-full glass-card p-4 rounded-xl border-2 border-dashed border-glass-border hover:border-primary-cyan hover:bg-glass-bg-light transition-all duration-300"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-error flex items-center justify-center group-hover:scale-110 transition-transform">
        <Calendar size={20} className="text-white" />
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-text-primary">
          Organizza Evento
        </div>
        <div className="text-xs text-text-muted">Riunisci la community</div>
      </div>
    </div>
  </button>
);

// 📷 ADD PHOTOS BUTTON - Per gallery
export const AddPhotosButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group w-full glass-card p-6 rounded-xl border-2 border-dashed border-glass-border hover:border-primary-cyan hover:bg-glass-bg-light transition-all duration-300"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="w-16 h-16 rounded-xl bg-gradient-info flex items-center justify-center group-hover:scale-110 transition-transform">
        <Camera size={24} className="text-white" />
      </div>
      <div className="text-center">
        <div className="text-base font-medium text-text-primary">
          Aggiungi Foto
        </div>
        <div className="text-sm text-text-muted">
          Condividi i tuoi lavori creativi
        </div>
      </div>
    </div>
  </button>
);
