import React from "react";

const QRCodeStatic = ({ size = 80 }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        color: "#999",
        userSelect: "none",
      }}
    >
      QR
    </div>
  );
};

export default QRCodeStatic;
