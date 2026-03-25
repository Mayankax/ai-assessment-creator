"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAssignment } from "@/lib/api";
import OutputPaper from "@/components/assignment/output-paper";
import AppLayout from "@/components/layout/app-layout";
import { socket } from "@/lib/socket";

export default function AssignmentPage() {
  const { jobId } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAssignment(jobId as string);

        setStatus(res.status);

        if (res.status === "completed") {
          setData(res.data);
          setLoading(false);
        }

        if (res.status === "failed") {
          setError(res.error);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    // ✅ REAL-TIME UPDATE
    socket.on(`job:${jobId}`, (result) => {
      setData(result);
      setStatus("completed");
      setLoading(false);
    });

    return () => {
      socket.off(`job:${jobId}`);
    };
  }, [jobId]);

  // LOADING
  if (loading || status === "processing" || status === "pending") {
    return (
      <AppLayout>
        <div className="flex flex-col items-center pt-20 gap-3">
          <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-[14px] text-[#6B6B6B]">
            Generating assignment...
          </p>
        </div>
      </AppLayout>
    );
  }

  // ERROR
  if (status === "failed") {
    return (
      <AppLayout>
        <div className="flex flex-col items-center pt-20 gap-3 text-red-500">
          <p>Failed to generate assignment</p>
          <p className="text-sm">{error}</p>
        </div>
      </AppLayout>
    );
  }

  // SUCCESS
  return (
    <AppLayout>
      <OutputPaper data={data} jobId={jobId as string} />
    </AppLayout>
  );
}