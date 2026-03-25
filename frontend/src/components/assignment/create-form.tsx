"use client";

import { useState, useEffect } from "react";
import UploadBox from "@/components/assignment/upload-box";
import OutputPaper from "@/components/assignment/output-paper";
import { useAssignmentStore } from "@/store/assignment-store";
import { assignmentSchema } from "@/lib/validation";
import { createAssignment, getAssignment } from "@/lib/api";
import { socket } from "@/lib/socket";

export default function CreateForm() {
  const {
    dueDate,
    totalQuestions,
    totalMarks,
    instructions,
    questions,
    setField,
    addQuestion,
    updateQuestion,
    removeQuestion,
  } = useAssignmentStore();

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [jobId, setJobId] = useState("");

  // ✅ CLEANUP ALL SOCKET LISTENERS ON UNMOUNT
  useEffect(() => {
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const totalQ = questions.reduce((sum, q) => sum + q.count, 0);
    const totalM = questions.reduce((sum, q) => sum + q.count * q.marks, 0);

    setField("totalQuestions", totalQ);
    setField("totalMarks", totalM);
  }, [questions]);

  const handleSubmit = async () => {
    const data = {
      dueDate,
      totalQuestions,
      totalMarks,
      instructions,
      questions,
    };

    const result = assignmentSchema.safeParse(data);
    
    if (!result.success) {
      console.log("VALIDATION ERROR:", result.error);

      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path.join(".")] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }
    
    setLoading(true);

    const res = await createAssignment(data);

    // ✅ FIXED: use local variable (no async bug)
    const newJobId = res.jobId;
    setJobId(newJobId);

    // ✅ PREVENT MULTIPLE LISTENERS
    socket.off(`job:${newJobId}`);

    // ✅ SOCKET REAL-TIME
    socket.on(`job:${newJobId}`, (data) => {
      console.log("REALTIME RESULT:", data);

      setResultData(data);
      setLoading(false);

      clearInterval(interval); // stop polling
    });

    // ✅ POLLING FALLBACK (IMPORTANT)
    const interval = setInterval(async () => {
      try {
        const res = await getAssignment(newJobId);

        if (res.status === "completed") {
          console.log("POLLING RESULT:", res.data);

          setResultData(res.data);
          setLoading(false);

          clearInterval(interval);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);

    console.log(data);
  };

  // ✅ LOADING UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-[120px] gap-3">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-[14px] text-[#6B6B6B]">
          Generating your assignment...
        </p>
      </div>
    );
  }

  // ✅ OUTPUT PAGE
  if (resultData) {
    return <OutputPaper data={resultData} jobId={jobId} />;
  }

  return (
    <div className="w-full flex justify-center pt-6">
      <div className="w-full max-w-[950px] bg-[#F7F7F7] rounded-[20px] p-6">
        
        <div className="bg-white rounded-[20px] border border-[#EDEDED] p-6 shadow-sm">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-[16px] font-semibold">
              Assignment Details
            </h2>
            <p className="text-[12px] text-[#6B6B6B] mt-1">
              Basic information about your assignment
            </p>
          </div>

          <UploadBox />

          {/* Due Date */}
          <div className="mt-6">
            <label className="text-[12px] text-[#6B6B6B]">
              Due Date
            </label>

            <div className="mt-1 flex items-center border border-[#EDEDED] rounded-full px-4 h-[40px]">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setField("dueDate", e.target.value)}
                className="flex-1 outline-none text-[14px]"
              />
              <span>📅</span>
            </div>
          </div>

          {/* Header Row */}
          <div className="mt-6 flex justify-between text-[12px] text-[#6B6B6B]">
            <span className="w-[55%]">Question Type</span>
            <div className="flex gap-16 pr-6">
              <span>No. of Questions</span>
              <span>Marks</span>
            </div>
          </div>

          {/* Question Rows */}
          {questions.map((q, index) => (
            <div
              key={index}
              className="flex items-center justify-between mt-3"
            >
              
              {/* LEFT */}
              <div className="flex items-center gap-3 w-[55%]">
                
                <select
                  value={q.type}
                  onChange={(e) =>
                    updateQuestion(index, "type", e.target.value)
                  }
                  className="w-full px-4 h-[44px] border border-[#EDEDED] rounded-full text-[14px] bg-white outline-none"
                >
                  <option value="MCQ">Multiple Choice Questions</option>
                  <option value="Short">Short Questions</option>
                  <option value="Diagram">Diagram/Graph-Based Questions</option>
                  <option value="Numerical">Numerical Problems</option>
                </select>

                <button
                  onClick={() => removeQuestion(index)}
                  className="text-[#6B6B6B] text-[16px]"
                >
                  ×
                </button>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-6">
                
                {/* COUNT */}
                <div className="flex items-center gap-4 px-4 h-[40px] border border-[#EDEDED] rounded-full">
                  <button
                    onClick={() =>
                      updateQuestion(index, "count", Math.max(1, q.count - 1))
                    }
                  >
                    -
                  </button>
                  <span>{q.count}</span>
                  <button
                    onClick={() =>
                      updateQuestion(index, "count", q.count + 1)
                    }
                  >
                    +
                  </button>
                </div>

                {/* MARKS */}
                <div className="flex items-center gap-4 px-4 h-[40px] border border-[#EDEDED] rounded-full">
                  <button
                    onClick={() =>
                      updateQuestion(index, "marks", Math.max(1, q.marks - 1))
                    }
                  >
                    -
                  </button>
                  <span>{q.marks}</span>
                  <button
                    onClick={() =>
                      updateQuestion(index, "marks", q.marks + 1)
                    }
                  >
                    +
                  </button>
                </div>

              </div>
            </div>
          ))}

          {/* Add Button */}
          <div
            onClick={addQuestion}
            className="flex items-center gap-3 mt-4 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-[18px]">
              +
            </div>
            <span className="text-[14px] font-medium">
              Add Question Type
            </span>
          </div>

          {/* Totals */}
          <div className="mt-4 text-right text-[13px] text-[#6B6B6B]">
            <p>Total Questions: {totalQuestions}</p>
            <p>Total Marks: {totalMarks}</p>
          </div>

          {/* Instructions */}
          <div className="mt-6">
            <label className="text-[12px] text-[#6B6B6B]">
              Additional Information
            </label>

            <textarea
              value={instructions}
              onChange={(e) => setField("instructions", e.target.value)}
              className="mt-2 w-full min-h-[100px] border border-dashed border-[#DADADA] rounded-[16px] p-4 bg-[#FAFAFA]"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button className="px-5 h-[40px] rounded-full border">
              ← Previous
            </button>

            <button
              onClick={handleSubmit}
              className="px-6 h-[40px] bg-black text-white rounded-full"
            >
              Next →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}