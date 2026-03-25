import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.js";
import { generateQuestions } from "../services/gemini.service.js";
import { safeJsonParse } from "../utils/parse.js";
import { assignmentOutputSchema } from "../types/assignment.schema.js";
import { io } from "../index.js";
import { Assignment } from "../models/assignment.model.js";
import { safeValidate } from "../utils/parse.js";


export const assignmentWorker = new Worker(
  "assignment-queue",
  async (job) => {
    const jobId = job.id as string;

    try {
      console.log(`Processing job ${jobId}`);

      await Assignment.updateOne(
        { jobId },
        { status: "processing" }
      );

      // simulate processing delay (2–4 sec)
      await new Promise((res) => setTimeout(res, 3000));

      const aiResponse = await generateQuestions(job.data);

      const parsed = safeJsonParse(aiResponse);

      const validated = safeValidate(assignmentOutputSchema, parsed);

      await Assignment.updateOne(
        { jobId },
        {
          status: "completed",
          result: validated,
        }
      );

      io.emit(`job:${jobId}`, validated);

      console.log(`Job ${jobId} completed`);

      return validated;
    } catch (error: any) {
      console.error(`Job ${jobId} failed`, error);

      await Assignment.updateOne(
        { jobId },
        {
          status: "failed",
          error: error?.message || "Unknown error",
        }
      );

      throw error;
    }
  },
  {
    connection: redisConnection,
  }
);