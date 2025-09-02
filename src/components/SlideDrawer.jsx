// SlideDrawer.jsx - Componente riusabile per slide drawer
import React from "react";
import { ChevronLeft, X } from "lucide-react";
import "./SlideDrawer.css";

const SlideDrawer = ({
  isOpen,
  onClose,
  title,
  children,
  showBackdrop = true,
  closeOnBackdropClick = true,
}) => {
  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {showBackdrop && isOpen && (
        <div className="slide-drawer-backdrop" onClick={handleBackdropClick} />
      )}

      {/* Slide Drawer */}
      <div className={`slide-drawer ${isOpen ? "slide-drawer--open" : ""}`}>
        {/* Header fisso */}
        <div className="slide-drawer__header">
          <button className="slide-drawer__back-btn" onClick={onClose}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="slide-drawer__title">{title}</h2>
          <button className="slide-drawer__close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content scrollabile */}
        <div className="slide-drawer__content">{children}</div>
      </div>
    </>
  );
};

export default SlideDrawer;
