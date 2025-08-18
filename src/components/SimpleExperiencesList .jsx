import React from "react";

const SimpleExperiencesList = ({ experiences }) => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "20px", color: "#333" }}>
        Esperienze trovate ({experiences.length})
      </h3>

      {experiences.map((experience) => (
        <div
          key={experience.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* Titolo */}
          <h4 style={{ margin: "0 0 10px 0", color: "#2c5aa0" }}>
            {experience.icon} {experience.title}
          </h4>

          {/* Info base */}
          <div
            style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}
          >
            <span style={{ marginRight: "15px" }}>
              💎 {experience.costo} XP
            </span>
            <span style={{ marginRight: "15px" }}>
              📚 {experience.lezioni} lezioni
            </span>
            <span style={{ marginRight: "15px" }}>
              ⏰ {experience.durataLezione}
            </span>
            <span style={{ marginRight: "15px" }}>
              🌐 {experience.modalita}
            </span>
            <span>🗣️ {experience.lingua}</span>
          </div>

          {/* Descrizione */}
          <p style={{ margin: "0", color: "#555", lineHeight: "1.5" }}>
            {experience.descrizione}
          </p>

          {/* Rating se presente */}
          {experience.rating > 0 && (
            <div
              style={{ marginTop: "10px", fontSize: "14px", color: "#f39c12" }}
            >
              ⭐ {experience.rating} ({experience.totalBookings} prenotazioni)
            </div>
          )}
        </div>
      ))}

      {experiences.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", fontStyle: "italic" }}>
          Nessuna esperienza trovata per questa ricerca.
        </p>
      )}
    </div>
  );
};

export default SimpleExperiencesList;
