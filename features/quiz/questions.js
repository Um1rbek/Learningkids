// Matematika darsi uchun 5 ta savol
const mathQuestions = [
  {
    id: 1,
    question: "2 + 3 = ?",
    options: ["4", "5", "6", "7"],
    correct: 1, // index 1 → "5"
    explanation: "2 + 3 = 5"
  },
  {
    id: 2,
    question: "5 - 2 = ?",
    options: ["1", "2", "3", "4"],
    correct: 2, // "3"
    explanation: "5 - 2 = 3"
  },
  {
    id: 3,
    question: "3 × 3 = ?",
    options: ["6", "9", "12", "15"],
    correct: 1, // "9"
    explanation: "3 × 3 = 9"
  },
  {
    id: 4,
    question: "10 ÷ 2 = ?",
    options: ["3", "4", "5", "6"],
    correct: 2, // "5"
    explanation: "10 ÷ 2 = 5"
  },
  {
    id: 5,
    question: "4 + 5 = ?",
    options: ["8", "9", "10", "11"],
    correct: 1, // "9"
    explanation: "4 + 5 = 9"
  },
];

export default mathQuestions;