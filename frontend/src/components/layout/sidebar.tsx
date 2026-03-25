"use client";

import { LayoutDashboard, PlusSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-[260px] bg-white border-r border-[#EDEDED] flex flex-col justify-between px-4 py-5">
      
      {/* TOP */}
      <div>
        
        {/* LOGO */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center text-[16px] font-semibold shadow-sm">
            V
          </div>
          <span className="text-[18px] font-semibold tracking-tight">
            VedaAI
          </span>
        </div>

        {/* CTA BUTTON */}
        <Link href="/create">
          <div className="mb-8 px-4 py-3 rounded-[14px] bg-black text-white text-[14px] font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition">
            <PlusSquare size={16} />
            Create Assignment
          </div>
        </Link>

        {/* NAV */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[14px] font-medium transition-all",
                  isActive
                    ? "bg-[#F3F3F3] text-black shadow-sm"
                    : "text-[#6B6B6B] hover:bg-[#F7F7F7]"
                )}
              >
                <Icon size={18} strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM PROFILE */}
      <div className="flex items-center gap-3 p-3 rounded-[14px] bg-[#F7F7F7] hover:bg-[#F1F1F1] transition">
        
        <div className="w-10 h-10 rounded-full bg-gray-300" />

        <div className="flex flex-col">
          <span className="text-[14px] font-medium">
            Delhi Public School
          </span>
          <span className="text-[12px] text-[#6B6B6B]">
            Bokaro Steel City
          </span>
        </div>

      </div>

    </aside>
  );
}