"use client";

import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function SelectField({
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none h-[44px] w-full rounded-[8px] border border-[#E5E5E5] px-[12px] text-[14px] outline-none transition-all duration-200 focus:border-black focus:ring-1 focus:ring-black/10 hover:border-[#CFCFCF]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
      />
    </div>
  );
}