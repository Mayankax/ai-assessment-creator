"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAssignmentStore } from "@/store/assignment-store";

export default function UploadBox() {
  const { setFile } = useAssignmentStore();

  const onDrop = useCallback((files: File[]) => {
    if (files.length > 0) setFile(files[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border border-dashed border-[#DADADA] rounded-[16px] p-10 flex flex-col items-center bg-[#FAFAFA] cursor-pointer">
      <input {...getInputProps()} />

      <p className="text-[14px] font-medium">
        Choose a file or drag & drop it here
      </p>

      <p className="text-[12px] text-[#6B6B6B] mt-1">
        JPEG, PNG, upto 10MB
      </p>

      <button className="mt-3 px-4 py-1.5 bg-[#F1F1F1] rounded-full text-[12px]">
        Browse Files
      </button>

      <p className="text-[11px] text-[#9B9B9B] mt-3">
        Upload images of your preferred document/image
      </p>
    </div>
  );
}