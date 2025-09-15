import React from "react";
import "./SlideDrawerSearch.css";

const SlideDrawerSearch = ({
  isOpen,
  onClose,
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
        <div
          className="slide-drawer-search-backdrop"
          onClick={handleBackdropClick}
        />
      )}

      {/* Slide Drawer */}
      <div
        className={`slide-drawer-search ${
          isOpen ? "slide-drawer-search--open" : ""
        }`}
      >
        {/* Solo content - header gestito dal GameHUD */}
        <div className="slide-drawer-search__content">{children}</div>
      </div>
    </>
  );
};

export default SlideDrawerSearch;
