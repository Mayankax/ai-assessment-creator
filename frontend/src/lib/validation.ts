import { z } from "zod";

export const assignmentSchema = z.object({
  dueDate: z.string().min(1, "Due date is required"),

  totalQuestions: z
    .number()
    .min(1, "Must be > 0"),

  totalMarks: z
    .number()
    .min(1, "Must be > 0"),

  instructions: z.string().optional(),

  questions: z.array(
    z.object({
      type: z.string().min(1),

      count: z
        .number()
        .min(1, "Must be > 0"),

      marks: z
        .number()
        .min(1, "Must be > 0"),
    })
  ),
});