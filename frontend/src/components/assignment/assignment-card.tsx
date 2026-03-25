"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAssignment } from "@/lib/api";

export default function AssignmentCard({ data }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isCompleted = data.status === "completed";

  const handleDelete = async () => {
    await deleteAssignment(data.jobId);
    window.location.reload(); // simple refresh
  };

  return (
    <div className="relative bg-white border border-[#EDEDED] rounded-[18px] p-5 hover:shadow-md transition cursor-pointer">

    {/* TITLE */}
    <h3
      onClick={() => router.push(`/assignment/${data.jobId}`)}
      className="text-[16px] font-semibold text-black leading-snug"
    >
      {data.status === "completed"
        ? data?.result?.sections?.[0]?.title || "Assignment"
        : data.status === "processing"
        ? "Processing Assignment..."
        : "Queued Assignment..."}
    </h3>

    {/* DATES */}
    <div className="mt-4 flex justify-between text-[12px] text-[#6B6B6B]">
      <span>
        Assigned on:{" "}
        {new Date(data.createdAt).toLocaleDateString()}
      </span>

      <span>
        Due:{" "}
        {data.input?.dueDate
          ? new Date(data.input.dueDate).toLocaleDateString()
          : "-"}
      </span>
    </div>

    {/* STATUS */}
    <div className="mt-2 text-[12px] font-medium">
      <span
        className={`capitalize ${
          data.status === "completed"
            ? "text-green-600"
            : data.status === "processing"
            ? "text-yellow-600"
            : "text-gray-500"
        }`}
      >
        {data.status}
      </span>
    </div>

    {/* MENU */}
    <div className="absolute top-4 right-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-[#6B6B6B]"
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[140px] bg-white border border-[#EDEDED] rounded-[10px] shadow-md z-10">
          <button
            onClick={() => router.push(`/assignment/${data.jobId}`)}
            className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-100"
          >
            View Assignment
          </button>

          <button
            onClick={handleDelete}
            className="w-full text-left px-3 py-2 text-[13px] text-red-500 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  </div>
  );
}