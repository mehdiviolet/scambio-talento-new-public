import React, { useState } from "react";
import OnboardingApp from "./components/OnboardingApp";
import ViewModeToggle from "./components/ViewModeToggle";
import DayModeToggle from "./components/DayModeToggle";
// import LayoutModeToggle from "./components/LayoutModeToggle";
import MainAppRouterTest from "./components/MainAppRouterTest";
import LayoutModeToggle from "./components/LayoutModeToggle";

function App() {
  // const [layoutMode, setLayoutMode] = useState("");
  const [layoutMode, setLayoutMode] = useState("single");

  return (
    <>
      <div
        className={`screen--test ${
          layoutMode === "single" ? "single-mode" : "dual-mode"
        }`}
      >
        {/* WRAPPER per pannello sinistro */}
        <div
          className={`left-panel ${
            layoutMode === "single" ? "hidden" : "visible"
          }`}
        >
          <MainAppRouterTest />
        </div>

        {/* WRAPPER per pannello destro */}
        <div
          className={`right-panel ${
            layoutMode === "single" ? "centered" : "right"
          }`}
        >
          <OnboardingApp />
        </div>
      </div>

      <ViewModeToggle />
      <DayModeToggle />
      <LayoutModeToggle layoutMode={layoutMode} setLayoutMode={setLayoutMode} />
    </>
  );
}

export default App;
