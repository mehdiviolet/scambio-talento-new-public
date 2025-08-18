// components/FeedbackModal.jsx
import React, { useState } from "react";
import { X, Star } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  submitFeedback,
  closeFeedbackModal,
  selectOrganizer,
  selectIsLoading,
  setLoading,
} from "../store/slices/sharedEventSlice";
import LoadingSpinner from "./LoadingSpinner";

const FeedbackModal = () => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const organizer = useSelector(selectOrganizer);
  const showModal = useSelector((state) => state.sharedEvent.showFeedbackModal);
  const isSubmittingFeedback = useSelector(selectIsLoading("submitFeedback"));

  const handleStarClick = (starValue) => {
    setSelectedStars(starValue);
  };

  const handleSubmit = async () => {
    if (selectedStars === 0) {
      alert("Seleziona almeno una stella per continuare!");
      return;
    }

    // ✅ INIZIO LOADING
    dispatch(setLoading({ operation: "submitFeedback", isLoading: true }));

    // Simula delay
    setTimeout(() => {
      dispatch(
        submitFeedback({
          stars: selectedStars,
          comment: comment || "Nessun commento aggiuntivo",
        })
      );

      // ✅ FINE LOADING + CHIUDI MODAL
      dispatch(setLoading({ operation: "submitFeedback", isLoading: false }));
      dispatch(closeFeedbackModal());

      setSelectedStars(0);
      setComment("");
    }, 1500);
  };

  const handleClose = () => {
    dispatch(closeFeedbackModal());
    setSelectedStars(0);
    setComment("");
  };

  const getStarDescription = (stars) => {
    const descriptions = {
      0: "Seleziona valutazione",
      1: "😞 Non soddisfatto",
      2: "😐 Nella media",
      3: "🙂 Buono",
      4: "😍 Eccellente",
    };
    return descriptions[stars] || "";
  };

  if (!showModal) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            🎉 Evento Completato!
          </h3>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              display: "flex",
            }}
          >
            <X size={20} color="#666" />
          </button>
        </div>

        {/* Organizer Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            padding: "12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px",
              fontSize: "18px",
            }}
          >
            👤
          </div>
          <div>
            <div style={{ fontWeight: "500", fontSize: "14px" }}>
              Organizzato da
            </div>
            <div style={{ fontSize: "16px", color: "#333" }}>
              {organizer.name}
            </div>
          </div>
        </div>

        {/* Rating Stars */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#333",
            }}
          >
            Valuta l'organizzazione dell'evento:
          </label>

          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            {[1, 2, 3].map((starValue) => (
              <button
                key={starValue}
                onClick={() => handleStarClick(starValue)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "4px",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                <Star
                  size={32}
                  fill={starValue <= selectedStars ? "#ffd700" : "none"}
                  color={starValue <= selectedStars ? "#ffd700" : "#ddd"}
                />
              </button>
            ))}
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#666",
              minHeight: "16px",
            }}
          >
            {getStarDescription(selectedStars)}
          </div>
        </div>

        {/* Comment */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              color: "#333",
            }}
          >
            Commento (opzionale):
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Condividi la tua esperienza..."
            rows={3}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={selectedStars === 0 || isSubmittingFeedback}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor:
              selectedStars > 0 && !isSubmittingFeedback ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "500",
            cursor:
              selectedStars > 0 && !isSubmittingFeedback
                ? "pointer"
                : "not-allowed",
            transition: "background-color 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {isSubmittingFeedback ? (
            <LoadingSpinner
              size={16}
              color="white"
              text="Invio feedback..."
              showText={true}
            />
          ) : (
            "📝 Invia Feedback"
          )}
        </button>

        {/* Footer */}
        <div
          style={{
            marginTop: "16px",
            fontSize: "12px",
            color: "#666",
            textAlign: "center",
          }}
        >
          Il tuo feedback aiuta a migliorare la community! 🚀
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
