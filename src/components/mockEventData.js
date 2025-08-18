// mockEventData.js - DATI MOCK PER DEMO PRESENTAZIONE

export const demoEvent = {
  id: "demo_event_001",
  title: "Boardgame Night a San Salvario",
  description:
    "Serata di giochi da tavolo al Café Central! Ambiente rilassato per socializzare e divertirsi insieme.",
  category: "Hobby e passioni",
  language: "italiano",
  startDate: "2024-12-20",
  startTime: "19:30",
  endTime: "22:00",
  maxParticipants: 8,
  type: "presenza",
  placeName: "Café Central",
  placeAddress: "Via Madama Cristina 45, Torino",
  status: "idle", // idle → waiting → confirmed → active → completed
  participantsList: [],
  participantsCount: 0,
  comments: [],
  feedbacks: [],
  qrScanned: [],
  createdAt: "2024-12-18T15:30:00Z",
};

export const mockParticipants = [
  { id: "p1", name: "Mario Rossi", initials: "MR" },
  { id: "p2", name: "Anna Bianchi", initials: "AB" },
  { id: "p3", name: "Luca Verdi", initials: "LV" },
  { id: "p4", name: "Sara Neri", initials: "SN" },
  { id: "p5", name: "Paolo Ferrari", initials: "PF" },
  { id: "p6", name: "Giulia Romano", initials: "GR" },
  { id: "p7", name: "Marco Conti", initials: "MC" },
  { id: "p8", name: "Elena Ricci", initials: "ER" },
];

export const mockComments = [
  {
    author: "Mario Rossi",
    text: "Non vedo l'ora! Porterò Azul 🎲",
    time: "18:30",
  },
  {
    author: "Anna Bianchi",
    text: "Perfetto, ci sarò! Qualcuno ha Wingspan?",
    time: "19:00",
  },
  {
    author: "Luca Verdi",
    text: "Primo boardgame night, sono emozionato!",
    time: "19:15",
  },
  {
    author: "Sara Neri",
    text: "Ottima location, ci sono stata altre volte",
    time: "19:20",
  },
];

export const mockFeedbacks = [
  {
    participantId: "p1",
    participantName: "Mario Rossi",
    stars: 3,
    comment: "Organizzazione perfetta! Sara è molto brava",
  },
  {
    participantId: "p2",
    participantName: "Anna Bianchi",
    stars: 3,
    comment: "Bellissima serata, tutto come promesso",
  },
  {
    participantId: "p3",
    participantName: "Luca Verdi",
    stars: 2,
    comment: "Molto bene, prossima volta altri giochi!",
  },
  {
    participantId: "p4",
    participantName: "Sara Neri",
    stars: 3,
    comment: "Location perfetta, organizzazione top",
  },
  {
    participantId: "p5",
    participantName: "Paolo Ferrari",
    stars: 3,
    comment: "Super esperienza, lo rifarei!",
  },
  {
    participantId: "p6",
    participantName: "Giulia Romano",
    stars: 2,
    comment: "Bello, ma poteva durare di più",
  },
  {
    participantId: "p7",
    participantName: "Marco Conti",
    stars: 3,
    comment: "Fantastico! Sara sa come organizzare",
  },
];

export const eventStates = {
  idle: "Aperto alle iscrizioni",
  waiting: "In attesa conferma (8/8)",
  confirmed: "Confermato - QR attivo",
  active: "In svolgimento",
  completed: "Concluso - Feedback attivo",
};

export const organizer = {
  name: "Sara Dormand",
  trustScore: 47, // ⭐ punteggi fiducia
  participationScore: 126, // 🎯 punteggi partecipazione
};
