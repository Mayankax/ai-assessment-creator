import { z } from "zod";

export const assignmentOutputSchema = z.object({
  sections: z.array(
    z.object({
      title: z.string(),
      instruction: z.string(),
      questions: z.array(
        z.object({
          question: z.string(),
          answer: z.string(), // ✅ NEW
          options: z.array(z.string()).optional(),
          difficulty: z.enum(["easy", "medium", "hard"]),
          marks: z.number(),
        })
      ),
    })
  ),
});