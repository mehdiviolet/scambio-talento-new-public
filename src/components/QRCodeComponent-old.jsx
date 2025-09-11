// components/QRCodeComponent.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  simulateQRScan,
  selectQRState,
  selectEventState,
  selectCheckInList,
  selectParticipants,
} from "../store/slices/sharedEventSlice";

const QRCodeComponent = ({ isOwner = false, size = 80 }) => {
  const dispatch = useDispatch();
  const qrState = useSelector(selectQRState);
  const eventState = useSelector(selectEventState);

  // ✅ NUOVI SELECTORS
  const checkInList = useSelector(selectCheckInList);
  const participants = useSelector(selectParticipants);
  const firstName = useSelector(
    (state) => state.quickSetup.profileData.firstName
  );

  const handleQRClick = (e) => {
    e.stopPropagation();

    if (!isOwner) return; // Solo owner può simulare scan

    // ✅ CHECK: Se già tutti i partecipanti hanno fatto check-in
    if (checkInList.length >= participants.length) {
      console.log("🚫 Tutti i partecipanti hanno già fatto check-in");
      return;
    }

    if (
      qrState.state === "active" &&
      (eventState === "confirmed" || eventState === "in svolgimento")
    ) {
      // ✅ LISTA SMART: Solo partecipanti che non hanno ancora fatto check-in
      const availableNames = participants
        .map((p) => p.name)
        .filter((name) => !checkInList.some((c) => c.participantName === name));

      if (availableNames.length === 0) {
        console.log("🚫 Nessun partecipante disponibile per check-in");
        return;
      }

      // ✅ PRIORITÀ: Se firstName presente e non ancora scansionato, usalo
      let nextName;
      if (firstName && availableNames.includes(firstName)) {
        nextName = firstName;
      } else {
        // Altrimenti prendi il primo disponibile
        nextName = availableNames[0];
      }

      dispatch(
        simulateQRScan({
          participantName: nextName,
          myFirstName: firstName,
        })
      );
    }
  };

  const getQRContent = () => {
    // ✅ AGGIUNTO: Info su quanti scan rimanenti
    const remainingScans = Math.max(
      0,
      participants.length - checkInList.length
    );

    switch (eventState) {
      case "idle":
        return {
          bg: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
          content: <span style={{ fontSize: "14px", color: "#999" }}>QR</span>,
          cursor: "default",
          title: "QR non ancora disponibile",
        };

      case "waiting":
        return {
          bg: "linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)",
          content: (
            <span style={{ fontSize: "12px", color: "#856404" }}>
              In attesa
              <br />
              conferma
            </span>
          ),
          cursor: "default",
          title: "In attesa conferma organizzatore",
        };

      case "confirmed":
      case "in svolgimento":
        const isActive = qrState.state === "active" && remainingScans > 0;

        return {
          bg: isActive
            ? "linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)"
            : "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
          content: isActive ? (
            <div
              style={{
                width: "60%",
                height: "60%",
                background: `
                  radial-gradient(circle at 20% 20%, #000 2px, transparent 2px),
                  radial-gradient(circle at 80% 20%, #000 2px, transparent 2px),
                  radial-gradient(circle at 20% 80%, #000 2px, transparent 2px),
                  radial-gradient(circle at 80% 80%, #000 2px, transparent 2px),
                  linear-gradient(45deg, #000 1px, transparent 1px),
                  linear-gradient(-45deg, #000 1px, transparent 1px)
                `,
                backgroundSize:
                  "8px 8px, 8px 8px, 8px 8px, 8px 8px, 4px 4px, 4px 4px",
                border: "2px solid #000",
                borderRadius: "4px",
              }}
            />
          ) : (
            <span style={{ fontSize: "12px", color: "#666" }}>
              {remainingScans === 0 ? "Tutti\npresenti" : "QR\nInattivo"}
            </span>
          ),
          cursor: isOwner && isActive ? "pointer" : "default",
          title:
            isOwner && isActive
              ? `Click per scan (${remainingScans} rimanenti)`
              : remainingScans === 0
              ? "Tutti i partecipanti hanno fatto check-in"
              : "QR Code non attivo",
        };

      case "fatto":
        return {
          bg: "linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)",
          content: (
            <span style={{ fontSize: "12px", color: "#721c24" }}>
              Evento
              <br />
              concluso
            </span>
          ),
          cursor: "default",
          title: "Evento terminato",
        };

      default:
        return {
          bg: "#f5f5f5",
          content: <span style={{ fontSize: "14px", color: "#999" }}>QR</span>,
          cursor: "default",
          title: "QR Code",
        };
    }
  };

  const qrContent = getQRContent();

  return (
    <div
      onClick={handleQRClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: qrContent.bg,
        border:
          eventState === "confirmed" || eventState === "in svolgimento"
            ? "2px solid #28a745"
            : "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: qrContent.cursor,
        transition: "all 0.3s ease",
        position: "relative",
        fontSize: "10px",
        textAlign: "center",
        lineHeight: "1.2",
        userSelect: "none",
      }}
      title={qrContent.title}
      onMouseEnter={(e) => {
        if (qrContent.cursor === "pointer") {
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (qrContent.cursor === "pointer") {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "none";
        }
      }}
    >
      {qrContent.content}

      {/* ✅ INDICATORE DINAMICO */}
      {isOwner && qrContent.cursor === "pointer" && (
        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "16px",
            height: "16px",
            backgroundColor: "#28a745",
            borderRadius: "50%",
            border: "2px solid white",
            animation: "pulse 2s infinite",
            fontSize: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {Math.max(0, participants.length - checkInList.length)}
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default QRCodeComponent;
