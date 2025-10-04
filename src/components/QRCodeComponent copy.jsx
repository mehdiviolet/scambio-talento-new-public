// components/QRCodeComponent.jsx - REDESIGN MINIMAL CON DESIGN SYSTEM
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
  const checkInList = useSelector(selectCheckInList);
  const participants = useSelector(selectParticipants);
  const firstName = useSelector(
    (state) => state.quickSetup.profileData.firstName
  );

  const handleQRClick = (e) => {
    e.stopPropagation();

    if (!isOwner) return;

    // Check se tutti hanno già fatto check-in
    if (checkInList.length >= participants.length) {
      return;
    }

    if (
      qrState.state === "active" &&
      (eventState === "confirmed" || eventState === "in svolgimento")
    ) {
      // Partecipanti disponibili per check-in
      const availableNames = participants
        .map((p) => p.name)
        .filter((name) => !checkInList.some((c) => c.participantName === name));

      if (availableNames.length === 0) {
        return;
      }

      // Priorità a firstName se disponibile
      let nextName;
      if (firstName && availableNames.includes(firstName)) {
        nextName = firstName;
      } else {
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
    const remainingScans = Math.max(
      0,
      participants.length - checkInList.length
    );

    switch (eventState) {
      case "idle":
        return {
          style: {
            background: "transparent",
            // border: "2px dashed var(--gray-300)",
            // color: "var(--gray-400)",
          },
          // content: "QR",
          // cursor: "default",
          // title: "QR non ancora disponibile",
        };

      case "waiting":
        return {
          style: {
            background: "var(--glass-bg-light)",
            border: "2px solid var(--text-secondary)",
            color: "var(--text-secondary)",
          },
          content: "Attesa",
          cursor: "default",
          title: "In attesa conferma organizzatore",
        };

      case "confirmed":
      case "in svolgimento":
        const isActive = qrState.state === "active" && remainingScans > 0;

        if (isActive) {
          return {
            style: {
              background: "var(--white)",
              border: "2px solid var(--success-green)",
              backdropFilter: "var(--glass-blur)",
            },
            content: (
              <div
                style={{
                  width: "70%",
                  height: "70%",
                  background: `
                    linear-gradient(90deg, var(--text-primary) 50%, transparent 50%),
                    linear-gradient(var(--text-primary) 50%, transparent 50%)
                  `,
                  backgroundSize: "4px 4px",
                  position: "relative",
                }}
              >
                {/* Quadrati angoli QR */}
                <div
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: "2px",
                    width: "8px",
                    height: "8px",
                    background: "var(--text-primary)",
                    border: "1px solid var(--white)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    width: "8px",
                    height: "8px",
                    background: "var(--text-primary)",
                    border: "1px solid var(--white)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    left: "2px",
                    width: "8px",
                    height: "8px",
                    background: "var(--text-primary)",
                    border: "1px solid var(--white)",
                  }}
                />
              </div>
            ),
            cursor: isOwner ? "pointer" : "default",
            title: isOwner
              ? `Click per scan (${remainingScans} rimanenti)`
              : "QR Code attivo",
          };
        } else {
          return {
            style: {
              background: "var(--glass-bg-light)",
              border: "2px solid var(--gray-300)",
              color: "var(--gray-500)",
            },
            content: remainingScans === 0 ? "Completo" : "QR",
            cursor: "default",
            title: remainingScans === 0 ? "Tutti presenti" : "QR Code",
          };
        }

      case "fatto":
        return null;
      //  {
      //   style: {
      //     background: "var(--glass-bg-light)",
      //     border: "2px solid var(--gray-400)",
      //     color: "var(--gray-600)",
      //   },
      //   content: "Finito",
      //   cursor: "default",
      //   title: "Evento terminato",
      // }

      default:
        return {
          style: {
            background: "transparent",
            border: "2px dashed var(--gray-300)",
            color: "var(--gray-400)",
          },
          content: "QR",
          cursor: "default",
          title: "QR Code",
        };
    }
  };

  if (eventState === "fatto") return null;

  const qrContent = getQRContent();

  return (
    <div
      onClick={handleQRClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "var(--radius-md)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: qrContent.cursor,
        transition: "var(--transition-normal)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--font-semibold)",
        textAlign: "center",
        userSelect: "none",
        ...qrContent.style,
      }}
      title={qrContent.title}
      onMouseEnter={(e) => {
        if (qrContent.cursor === "pointer") {
          e.target.style.transform = "scale(1.02)";
        }
      }}
      onMouseLeave={(e) => {
        if (qrContent.cursor === "pointer") {
          e.target.style.transform = "scale(1)";
        }
      }}
    >
      {qrContent.content}
    </div>
  );
};

export default QRCodeComponent;
