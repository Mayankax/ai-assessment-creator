"use client";

import { ArrowLeft, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="h-[60px] flex items-center justify-between px-6 border-b border-[#E5E5E5] bg-white sticky top-0 z-10">
      
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={18} />
        </button>
        <span className="text-[15px] font-medium">Assignment</span>
      </div>

      <div className="flex items-center gap-4">
        <Bell size={18} />
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>

    </header>
  );
}