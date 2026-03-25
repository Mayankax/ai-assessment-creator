import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },

    input: {
      dueDate: String,
      totalQuestions: Number,
      totalMarks: Number,
      instructions: String,
      questions: [
        {
          type: {
            type: String,
          },
          count: Number,
          marks: Number,
        },
      ],
    },

    result: {
      sections: [
        {
          title: String,
          instruction: String,
          questions: [
            {
              question: String,
              options: [String],
              answer: String,
              difficulty: String,
              marks: Number,
            },
          ],
        },
      ],
    },

    error: String,
  },
  { timestamps: true }
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);