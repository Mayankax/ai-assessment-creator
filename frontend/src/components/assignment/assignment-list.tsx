"use client";

import { useEffect, useState } from "react";
import EmptyState from "./empty-state";
import AssignmentCard from "./assignment-card";
import { getAllAssignments } from "@/lib/api";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  // TEMP: later connect to backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAssignments();
        setAssignments(res?.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    // ✅ SOCKET: listen for ANY job update
    socket.onAny(() => {
      console.log("Socket update received → refetching...");
      fetchData();
    });

    // ✅ CLEANUP
    return () => {
      socket.offAny();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center pt-20 gap-3">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-[13px] text-[#6B6B6B]">
          Loading assignments...
        </p>
      </div>
    );
  }

  if (!loading && assignments.length === 0) {
    return <EmptyState />;
  }

  const filteredAssignments = assignments.filter((a) => {
    const matchesSearch =
      a.jobId.toLowerCase().includes(search.toLowerCase()) ||
      a?.result?.sections?.[0]?.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : a.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h2 className="text-[20px] font-semibold">Assignments</h2>
        <p className="text-[14px] text-[#6B6B6B] mt-1">
          Manage and create assignments for your classes
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mt-4">

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-5 h-[40px] border border-[#EDEDED] rounded-full text-[13px] bg-white"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
          <option value="pending">Pending</option>
        </select>

        {/* Search */}
        <input
          placeholder="Search assignment"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-[320px] h-[40px] border border-[#EDEDED] rounded-full px-4 text-[13px] outline-none bg-white"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.map((a, i) => (
          <AssignmentCard key={i} data={a} />
        ))}
      </div>


      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={() => router.push("/create")}
          className="px-6 h-[48px] bg-black text-white rounded-full shadow-lg text-[14px]"
        >
          + Create Assignment
        </button>
      </div>
    </div>
  );
}