import React, { useState, useEffect, useRef } from "react";
import { X, Edit3, Trash2, Save } from "lucide-react";

const SkillCardModal = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  onDelete,
  formData,
  mode = "create", // 'create' | 'view' | 'edit'
  existingSkill = null,
}) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Wheel, 2: Detail, 3: Description
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillDetail, setSkillDetail] = useState("");
  const [description, setDescription] = useState("");
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const detailInputRef = useRef(null);
  const descriptionRef = useRef(null);

  // Skills disponibili
  const skillsData = [
    {
      id: "writing",
      name: "Scrittura",
      icon: "✍️",
      suggestions: ["Creativa", "Tecnica", "Giornalistica"],
    },
    {
      id: "cooking",
      name: "Cucina",
      icon: "🍳",
      suggestions: ["Italiana", "Internazionale", "Dolci"],
    },
    {
      id: "photography",
      name: "Fotografia",
      icon: "📸",
      suggestions: ["Ritratti", "Paesaggi", "Eventi"],
    },
    {
      id: "history",
      name: "Storia",
      icon: "📚",
      suggestions: ["Antica", "Moderna", "Locale"],
    },
    {
      id: "music",
      name: "Musica",
      icon: "🎵",
      suggestions: ["Chitarra", "Pianoforte", "Canto"],
    },
    {
      id: "dance",
      name: "Danza",
      icon: "💃",
      suggestions: ["Classica", "Moderna", "Latino"],
    },
    {
      id: "painting",
      name: "Pittura",
      icon: "🎨",
      suggestions: ["Acquerello", "Olio", "Digitale"],
    },
    {
      id: "video",
      name: "Video",
      icon: "🎬",
      suggestions: ["Editing", "Riprese", "Animazione"],
    },
    {
      id: "architecture",
      name: "Architettura",
      icon: "🏛️",
      suggestions: ["Design", "3D", "Storia"],
    },
    {
      id: "graphics",
      name: "Grafica",
      icon: "🎭",
      suggestions: ["Logo", "Web", "Print"],
    },
    {
      id: "theater",
      name: "Teatro",
      icon: "🎪",
      suggestions: ["Recitazione", "Regia", "Scrittura"],
    },
    {
      id: "psychology",
      name: "Psicologia",
      icon: "🧠",
      suggestions: ["Generale", "Infantile", "Sociale"],
    },
    {
      id: "programming",
      name: "Programmazione",
      icon: "💻",
      suggestions: ["Web", "Mobile", "AI"],
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: "👗",
      suggestions: ["Design", "Styling", "Cucito"],
    },
    {
      id: "health",
      name: "Salute",
      icon: "💪",
      suggestions: ["Fitness", "Yoga", "Nutrizione"],
    },
    {
      id: "gardening",
      name: "Giardinaggio",
      icon: "🌱",
      suggestions: ["Ornamentale", "Orto", "Bonsai"],
    },
    {
      id: "languages",
      name: "Lingue",
      icon: "🗣️",
      suggestions: ["Inglese", "Francese", "Spagnolo"],
    },
    {
      id: "videogames",
      name: "Videogiochi",
      icon: "🎮",
      suggestions: ["Sviluppo", "Design", "Streaming"],
    },
    {
      id: "podcast",
      name: "Podcast",
      icon: "🎙️",
      suggestions: ["Audio", "Editing", "Scrittura"],
    },
  ];

  // Reset quando si apre
  useEffect(() => {
    if (isOpen) {
      if (mode === "create") {
        setCurrentStep(1);
        setSelectedSkill(null);
        setSkillDetail("");
        setDescription("");
        setWheelRotation(0);
        setSelectedIndex(0);
        setIsEditing(false);
      } else if (mode === "view" && existingSkill) {
        // Modalità visualizzazione - carica dati esistenti
        const skillIndex = skillsData.findIndex(
          (s) => s.id === existingSkill.id
        );
        setSelectedSkill(skillsData[skillIndex] || existingSkill);
        setSkillDetail(existingSkill.detail || existingSkill.name);
        setDescription(existingSkill.description || "");
        setSelectedIndex(skillIndex >= 0 ? skillIndex : 0);
        setCurrentStep(4); // Step speciale per visualizzazione
        setIsEditing(false);
      }
    }
  }, [isOpen, mode, existingSkill]);

  // Focus automatico sui campi
  useEffect(() => {
    if (currentStep === 2 && detailInputRef.current) {
      detailInputRef.current.focus();
    }
    if (currentStep === 3 && descriptionRef.current) {
      descriptionRef.current.focus();
    }
  }, [currentStep]);

  // Gestione wheel picker verticale
  const handleWheelSpin = (direction) => {
    const itemsCount = skillsData.length;

    let newIndex;
    if (direction === "up") {
      newIndex = selectedIndex > 0 ? selectedIndex - 1 : itemsCount - 1;
    } else {
      newIndex = selectedIndex < itemsCount - 1 ? selectedIndex + 1 : 0;
    }

    setSelectedIndex(newIndex);
  };

  const handleSkillSelect = () => {
    const skill = skillsData[selectedIndex];
    setSelectedSkill(skill);
    setSkillDetail(skill.name + " / ");
    setCurrentStep(2);
  };

  const handleDetailSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (skillDetail.trim()) {
        setCurrentStep(3);
      }
    }
  };

  const handleDescriptionSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (description.trim()) {
        if (mode === "create") {
          const newSkill = {
            id: selectedSkill.id,
            name: selectedSkill.name,
            icon: selectedSkill.icon,
            detail: skillDetail.trim(),
            description: description.trim(),
            gems: 0,
            createdAt: new Date().toISOString(),
          };
          onSave(newSkill);
        } else if (mode === "edit" || isEditing) {
          const updatedSkill = {
            ...existingSkill,
            detail: skillDetail.trim(),
            description: description.trim(),
            updatedAt: new Date().toISOString(),
          };
          onUpdate(updatedSkill);
        }
        onClose();
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCurrentStep(2); // Vai al campo dettaglio
  };

  const handleDelete = () => {
    if (window.confirm("Sei sicuro di voler eliminare questa skill?")) {
      onDelete(existingSkill);
      onClose();
    }
  };

  const handleCancelEdit = () => {
    if (existingSkill) {
      setSkillDetail(existingSkill.detail || existingSkill.name);
      setDescription(existingSkill.description || "");
    }
    setIsEditing(false);
    setCurrentStep(4); // Torna alla visualizzazione
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-purple-100 p-4 rounded-t-2xl relative">
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            {mode === "create" && currentStep === 1 && "Scegli una competenza"}
            {mode === "create" && currentStep === 2 && "Dettaglio skill"}
            {mode === "create" &&
              currentStep === 3 &&
              "Descrivi la tua esperienza"}
            {mode === "view" && !isEditing && "Skill Details"}
            {(mode === "edit" || isEditing) && "Modifica Skill"}
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-purple-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Vertical Wheel Picker (solo per create) */}
          {mode === "create" && currentStep === 1 && (
            <div className="text-center">
              {/* Wheel Container */}
              <div className="relative w-full max-w-xs mx-auto mb-6">
                {/* Selection highlight */}
                <div className="absolute top-1/2 left-0 right-0 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl transform -translate-y-1/2 z-10 border-2 border-purple-300 shadow-sm"></div>

                {/* Fade gradients */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>

                {/* Skills scroll container */}
                <div className="h-80 overflow-hidden relative">
                  <div
                    className="transition-transform duration-300 ease-out py-32"
                    style={{
                      transform: `translateY(${-selectedIndex * 64}px)`,
                    }}
                  >
                    {skillsData.map((skill, index) => {
                      const isSelected = index === selectedIndex;
                      const distance = Math.abs(index - selectedIndex);
                      const opacity =
                        distance === 0 ? 1 : distance === 1 ? 0.6 : 0.3;
                      const scale =
                        distance === 0 ? 1 : distance === 1 ? 0.9 : 0.8;

                      return (
                        <div
                          key={skill.id}
                          className={`h-16 flex items-center justify-center transition-all duration-300 ${
                            isSelected ? "text-purple-700" : "text-gray-600"
                          }`}
                          style={{
                            opacity,
                            transform: `scale(${scale})`,
                          }}
                          onClick={() => {
                            setSelectedIndex(index);
                            // Auto-select dopo un momento
                            setTimeout(() => {
                              if (selectedIndex === index) {
                                handleSkillSelect();
                              }
                            }, 300);
                          }}
                        >
                          <div className="flex items-center space-x-3 cursor-pointer">
                            <span
                              className={`text-3xl transition-all duration-300 ${
                                isSelected ? "scale-110" : ""
                              }`}
                            >
                              {skill.icon}
                            </span>
                            <span
                              className={`font-medium text-lg transition-all duration-300 ${
                                isSelected ? "font-bold text-xl" : ""
                              }`}
                            >
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Scroll controls */}
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => handleWheelSpin("up")}
                  className="px-6 py-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors text-sm font-medium"
                >
                  ↑ Su
                </button>
                <button
                  onClick={() => handleWheelSpin("down")}
                  className="px-6 py-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors text-sm font-medium"
                >
                  ↓ Giù
                </button>
              </div>

              {/* Select button */}
              <button
                onClick={handleSkillSelect}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg transform hover:scale-105"
              >
                Seleziona {skillsData[selectedIndex]?.name}
              </button>

              <p className="text-xs text-gray-500 mt-2">
                Clicca su una skill per selezionarla direttamente
              </p>
            </div>
          )}

          {/* Step 2: Detail Input */}
          {((mode === "create" && currentStep === 2) ||
            (isEditing && currentStep === 2)) &&
            selectedSkill && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <span className="text-4xl">{selectedSkill.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">
                    {selectedSkill.name}
                  </h3>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Specifica il dettaglio:
                  </label>
                  <input
                    ref={detailInputRef}
                    type="text"
                    value={skillDetail}
                    onChange={(e) => setSkillDetail(e.target.value)}
                    onKeyPress={handleDetailSubmit}
                    placeholder={`es. ${selectedSkill.name} / ${selectedSkill.suggestions[0]}`}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors"
                  />
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSkillDetail(`${selectedSkill.name} / ${suggestion}`)
                      }
                      className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleDetailSubmit}
                  disabled={!skillDetail.trim()}
                  className={`w-full py-3 px-6 rounded-lg transition-colors font-semibold ${
                    skillDetail.trim()
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Continua
                </button>
              </div>
            )}

          {/* Step 3: Description */}
          {((mode === "create" && currentStep === 3) ||
            (isEditing && currentStep === 3)) &&
            selectedSkill && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <span className="text-4xl">{selectedSkill.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2">
                    {skillDetail}
                  </h3>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Descrivi la tua esperienza:
                  </label>
                  <textarea
                    ref={descriptionRef}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      e.ctrlKey &&
                      handleDescriptionSubmit(e)
                    }
                    placeholder="Racconta la tua esperienza, cosa puoi insegnare, come hai imparato questa competenza..."
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Premi Ctrl+Invio per salvare
                  </p>
                </div>

                {/* Preview del footer */}
                <div className="bg-orange-50 p-4 rounded-lg border-t-2 border-dashed border-gray-300">
                  <div className="flex items-center space-x-3 relative">
                    <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                      <span className="text-lg">👩‍🎨</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formData?.firstName || "Sara"}{" "}
                      {formData?.lastName || "Dormand"}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <span className="text-sm">⚡</span>
                      <span className="text-sm font-medium">0</span>
                    </div>
                    <div className="absolute bottom-0 right-0 text-2xl opacity-70">
                      {selectedSkill.icon}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDescriptionSubmit}
                  disabled={!description.trim()}
                  className={`w-full py-3 px-6 rounded-lg transition-colors font-semibold ${
                    description.trim()
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isEditing ? "💾 Salva Modifiche" : "🎉 Crea Skill Card"}
                </button>

                {isEditing && (
                  <button
                    onClick={handleCancelEdit}
                    className="w-full mt-3 py-2 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annulla
                  </button>
                )}
              </div>
            )}

          {/* Step 4: View Mode - Visualizzazione dettagliata */}
          {mode === "view" &&
            currentStep === 4 &&
            !isEditing &&
            existingSkill && (
              <div className="space-y-6">
                {/* Header della skill */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-4xl">{existingSkill.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {skillDetail}
                  </h3>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <span>⚡</span>
                      <span>{existingSkill.gems || 0} GEM</span>
                    </span>
                    <span>•</span>
                    <span>
                      Creata{" "}
                      {new Date(existingSkill.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Descrizione completa */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Descrizione:
                  </h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {description || "Nessuna descrizione disponibile"}
                  </p>
                </div>

                {/* Statistiche mock */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-xs text-gray-600">Richieste</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-xs text-gray-600">Completate</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">⭐</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>

                {/* Footer con info utente */}
                <div className="bg-orange-50 p-4 rounded-lg border-t-2 border-dashed border-gray-300">
                  <div className="flex items-center space-x-3 relative">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                      {formData?.profilePhoto ? (
                        <img
                          src={URL.createObjectURL(formData.profilePhoto)}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-xl">👩‍🎨</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {formData?.firstName || "Sara"}{" "}
                        {formData?.lastName || "Dormand"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formData?.location || "Torino"}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <span className="text-sm">⚡</span>
                      <span className="text-sm font-medium">
                        {existingSkill.gems || 0}
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 text-3xl opacity-30">
                      {existingSkill.icon}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleEdit}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Modifica</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Elimina</span>
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SkillCardModal;
