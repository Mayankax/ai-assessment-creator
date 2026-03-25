import { Queue } from "bullmq";
import { redisConnection } from "./redis.js";

export const assignmentQueue = new Queue("assignment-queue", {
  connection: redisConnection,
});