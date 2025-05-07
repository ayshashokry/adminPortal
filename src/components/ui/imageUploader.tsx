"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import uploadCloudImg from "@/assets/images/upload-cloud.svg";
export default function ImageUploader() {
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      // setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-left">
      <label
        htmlFor="image-upload"
        className={cn(
          "w-[170px] h-[170px] flex flex-col items-center justify-center gap-2 border rounded-xl cursor-pointer",
          "border border-gray-200 bg-white shadow-sm p-4 hover:bg-gray-50"
        )}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <div className="bg-gray-100 p-2 rounded-full">
              <Image
               
                src={uploadCloudImg}
                alt="Logo"
                width={30}
                height={30}
                className="rounded-[28px] border-[6px] border-[#F9FAFB] bg-[#F2F4F7] h-fit"
                priority
                loading="eager"
              />
            </div>
            <span className=" font-semibold text-sm text-red">
              Click to upload
            </span>
            <span className="text-gray text-xs text-center">
              using camera and from gallery
            </span>
            <span className="text-gray text-xs">PNG, JPG (max. 5 MB)</span>
          </>
        )}
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
}
