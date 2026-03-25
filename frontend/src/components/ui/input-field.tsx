"use client";

import clsx from "clsx";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function InputField({ className, ...props }: InputFieldProps) {
  return (
    <input
      {...props}
      className={clsx(
        "h-[44px] w-full rounded-[8px] border border-[#E5E5E5] px-[12px]",
        "text-[14px] text-black placeholder:text-[#9E9E9E]",
        "outline-none transition-all duration-200",
        "focus:border-black focus:ring-1 focus:ring-black/10",
        "hover:border-[#CFCFCF]",
        className
      )}
    />
  );
}