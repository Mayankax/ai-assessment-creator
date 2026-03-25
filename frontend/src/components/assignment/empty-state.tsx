"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EmptyState() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center pt-[90px]">
      
      <div className="flex flex-col items-center justify-between min-h-[460px]">
        
        {/* Top Content */}
        <div className="flex flex-col items-center">
          
          {/* Illustration */}
          <Image
            src="/images/empty-state.png"
            alt="empty"
            width={300}
            height={300}
          />

          {/* Title */}
          <h2 className="mt-[16px] text-[20px] font-bold text-black text-center">
            No Assignments Yet
          </h2>

          {/* Subtitle */}
          <p className="mt-[8px] text-[16px] font-normal text-[#5E5E5E]/80 text-center max-w-[420px]">
            Create your first assignment to get started with AI-generated question papers.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => router.push("/create")}
          className="mt-[32px] h-[46px] px-[24px] bg-[#181818] text-white rounded-[8px] text-[14px] font-medium"
        >
          Create Assignment
        </button>
      </div>
    </div>
  );
}