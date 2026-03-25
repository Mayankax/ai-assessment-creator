import { create } from "zustand";

interface Question {
  type: string;
  count: number;   // ✅ FIXED
  marks: number;   // ✅ FIXED
}

interface AssignmentState {
  dueDate: string;
  totalQuestions: number;  // ✅ better
  totalMarks: number;      // ✅ better
  instructions: string;
  questions: Question[];

  file: File | null;

  setField: (field: keyof AssignmentState, value: any) => void;

  addQuestion: () => void;
  removeQuestion: (index: number) => void;

  updateQuestion: (
    index: number,
    field: keyof Question,
    value: string | number
  ) => void;

  setFile: (file: File | null) => void;
}

export const useAssignmentStore = create<AssignmentState>((set) => ({
  dueDate: "",
  totalQuestions: 0,
  totalMarks: 0,
  instructions: "",
  questions: [{ type: "MCQ", count: 1, marks: 1 }],

  file: null,

  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),

  addQuestion: () =>
    set((state) => ({
      questions: [
        ...state.questions,
        { type: "MCQ", count: 1, marks: 1 },
      ],
    })),

  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),

  updateQuestion: (index, field, value) =>
    set((state) => {
      const updated = [...state.questions];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { questions: updated };
    }),

  setFile: (file) => set({ file }),
}));