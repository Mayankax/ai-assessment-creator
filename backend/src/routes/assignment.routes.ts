import { Router } from "express";
import { assignmentQueue } from "../config/queue.js";
import { generatePDF } from "../services/pdf.service.js";
import { Assignment } from "../models/assignment.model.js";

const router = Router();

/**
 * CREATE ASSIGNMENT
 */
router.post("/create", async (req, res) => {
  try {
    const job = await assignmentQueue.add("generate-assignment", {
      data: req.body,
    });

    await Assignment.create({
      jobId: job.id,
      status: "pending",
      input: req.body,
    });

    res.json({
      message: "Job added",
      jobId: job.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create assignment" });
  }
});

/**
 * GET ALL ASSIGNMENTS
 */
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });

    res.json({
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
});

/**
 * GET SINGLE ASSIGNMENT
 */
router.get("/:jobId", async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      jobId: req.params.jobId,
    });

    if (!assignment) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      status: assignment.status,
      data: assignment.result,
      error: assignment.error,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignment" });
  }
});

/**
 * DOWNLOAD PDF
 */
router.get("/:jobId/pdf", async (req, res) => {
  try {
    const { jobId } = req.params;

    const assignment = await Assignment.findOne({ jobId });

    if (!assignment || assignment.status !== "completed") {
      return res.status(404).json({ message: "Not ready" });
    }

    const data = assignment.result;

    if (!data) {
      return res.status(404).json({ message: "Result not ready" });
    }

    const html = `
      <html>
        <body>
          <h1>AI Generated Assignment</h1>
          ${data.sections
            .map(
              (s: any) => `
            <h2>${s.title}</h2>
            <p>${s.instruction}</p>
            ${s.questions
              .map(
                (q: any, i: number) =>
                  `<p>${i + 1}. ${q.question} (${q.marks} marks)</p>`
              )
              .join("")}
          `
            )
            .join("")}
        </body>
      </html>
    `;

    const pdf = await generatePDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=assignment.pdf",
    });

    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "PDF generation failed" });
  }
});


/**
 * DELETE ASSIGNMENT
 */
router.delete("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;

    await Assignment.deleteOne({ jobId });

    res.json({
      message: "Assignment deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});


export default router;