// components/QRCodeComponent.jsx - REDESIGN OTTIMIZZATO
import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  simulateQRScan,
  selectQRState,
  selectEventState,
  selectCheckInList,
  selectParticipants,
} from "../store/slices/sharedEventSlice";
import styles from "./QRCodeComponent.module.css";

const QRCodeComponent = ({ isOwner = false, size = 80 }) => {
  const dispatch = useDispatch();
  const qrState = useSelector(selectQRState);
  const eventState = useSelector(selectEventState);
  const checkInList = useSelector(selectCheckInList);
  const participants = useSelector(selectParticipants);
  const firstName = useSelector(
    (state) => state.quickSetup.profileData.firstName
  );

  const remainingScans = useMemo(
    () => Math.max(0, participants.length - checkInList.length),
    [participants.length, checkInList.length]
  );

  const isActive = useMemo(
    () =>
      qrState.state === "active" &&
      (eventState === "confirmed" || eventState === "in svolgimento") &&
      remainingScans > 0,
    [qrState.state, eventState, remainingScans]
  );

  // ✅ Non renderizzare quando evento è finito
  if (eventState === "fatto") return null;

  const handleQRClick = (e) => {
    e.stopPropagation();

    if (!isOwner || !isActive) return;

    const availableNames = participants
      .map((p) => p.name)
      .filter((name) => !checkInList.some((c) => c.participantName === name));

    if (availableNames.length === 0) return;

    const nextName =
      firstName && availableNames.includes(firstName)
        ? firstName
        : availableNames[0];

    dispatch(
      simulateQRScan({ participantName: nextName, myFirstName: firstName })
    );
  };

  // ✅ Determina stato visivo
  const getQRVariant = () => {
    if (eventState === "waiting") return "waiting";
    if (isActive) return "active";
    if (remainingScans === 0) return "complete";
    return "inactive";
  };

  const variant = getQRVariant();

  return (
    <div
      className={`${styles.qrContainer} ${styles[variant]} ${
        isOwner && isActive ? styles.clickable : ""
      }`}
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={handleQRClick}
      title={
        variant === "waiting"
          ? "In attesa conferma"
          : variant === "active"
          ? isOwner
            ? `Click per scan (${remainingScans} rimanenti)`
            : "QR Code attivo"
          : variant === "complete"
          ? "Tutti presenti"
          : "QR Code"
      }
    >
      {/* {variant === "active" ? (
        <div className={styles.qrPattern}>
          <div className={styles.corner} style={{ top: 0, left: 0 }} />
          <div className={styles.corner} style={{ top: 0, right: 0 }} />
          <div className={styles.corner} style={{ bottom: 0, left: 0 }} />
        </div>
      ) : (
        <span className={styles.qrText}>
          {variant === "waiting"
            ? "Attesa"
            : variant === "complete"
            ? "Completo"
            : "QR"}
        </span>
      )} */}
      {variant === "active" ? (
        <div className={styles.qrPattern}>
          <div className={styles.corner} style={{ top: 0, left: 0 }} />
          <div className={styles.corner} style={{ top: 0, right: 0 }} />
          <div className={styles.corner} style={{ bottom: 0, left: 0 }} />
        </div>
      ) : (
        <span className={styles.qrText}>
          {variant === "waiting"
            ? "Attesa"
            : variant === "complete"
            ? "Done!"
            : "QR"}
        </span>
      )}
    </div>
  );
};

export default QRCodeComponent;
