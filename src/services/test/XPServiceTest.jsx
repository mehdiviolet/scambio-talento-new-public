// src/test/xpServiceTest.js - COMPONENTE DI TEST
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addXP,
  spendXP,
  setCurrentUser,
  addUser,
  recordSlotSpin,
  calculateSlotReward,
  selectCurrentUserXP,
  selectUserById,
  selectTotalDisplayXP,
  selectDemoState,
} from "@/services/xpService";

const XPServiceTest = () => {
  const dispatch = useDispatch();

  // Selectors
  const currentUserXP = useSelector(selectCurrentUserXP);
  const saraUser = useSelector(selectUserById("sara"));
  const totalDisplayXP = useSelector(selectTotalDisplayXP);
  const demoState = useSelector(selectDemoState);
  const currentUserId = useSelector((state) => state.xp.currentUserId);

  // Test functions
  const testAddXP = () => {
    dispatch(
      addXP({
        userId: currentUserId,
        amount: 25,
        source: "test",
        metadata: { test: true },
      })
    );
  };

  const testSpendXP = () => {
    const currentXP = currentUserXP;
    if (currentXP >= 10) {
      dispatch(
        spendXP({
          userId: currentUserId,
          amount: 10,
          source: "test_purchase",
          metadata: { item: "test_course" },
        })
      );
    } else {
      alert(`Insufficient XP! You have ${currentXP}, need 10`);
    }
  };

  const testSlotSpin = () => {
    const symbols = ["🍒", "🍒", "🍒"]; // Winning combination
    const xpWon = calculateSlotReward(symbols);

    dispatch(
      recordSlotSpin({
        userId: currentUserId,
        result: symbols,
        xpWon,
      })
    );
  };

  const testUserSwitch = () => {
    const newUserId = currentUserId === "currentUser" ? "sara" : "currentUser";
    dispatch(setCurrentUser({ userId: newUserId }));
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #007acc",
        borderRadius: "8px",
        margin: "20px",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h2>🧪 XP Service Test Panel</h2>

      {/* Current State Display */}
      <div style={{ marginBottom: "20px" }}>
        <h3>📊 Current State:</h3>
        <p>
          <strong>Current User:</strong> {currentUserId}
        </p>
        <p>
          <strong>Current User XP:</strong> {currentUserXP}
        </p>
        <p>
          <strong>Total Display XP:</strong> {totalDisplayXP} (includes demo
          bonus)
        </p>
        <p>
          <strong>Sara XP:</strong> {saraUser?.xp || "Not found"}
        </p>
        <p>
          <strong>Demo Day:</strong> {demoState.currentDay} (Bonus: +
          {demoState.dayXP})
        </p>
      </div>

      {/* Test Buttons */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={testAddXP}
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ➕ Add 25 XP
        </button>

        <button
          onClick={testSpendXP}
          style={{
            padding: "10px 15px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ➖ Spend 10 XP
        </button>

        <button
          onClick={testSlotSpin}
          style={{
            padding: "10px 15px",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🎰 Slot Win (30 XP)
        </button>

        <button
          onClick={testUserSwitch}
          style={{
            padding: "10px 15px",
            backgroundColor: "#6f42c1",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🔄 Switch User
        </button>
      </div>

      {/* Instructions */}
      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <h4>🔍 Test Instructions:</h4>
        <ul>
          <li>Click buttons to test XP operations</li>
          <li>Watch XP values update in real-time</li>
          <li>Switch between users to test multi-user system</li>
          <li>Check Redux DevTools for state changes</li>
        </ul>
      </div>
    </div>
  );
};

export default XPServiceTest;
