"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import uploadCloudImg from "@/assets/images/upload-cloud.svg";
import { FieldValues, Path } from "react-hook-form";
import useAuthStore from "@/store/authStore";
import { UploadImage } from "@/api/uploadImage";
import MessageToaster from "../modals/MessageToaster";
import Loading from "../layout/Loading";

interface ImageUploaderProps<T extends FieldValues> {
  field?: {
    id: number;
    name: Path<T>; 
    label?: string;
    placeholder?: string;
    type: string;
    required: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
  };
  key: number;
  getImgValue?: (imgUUID: string) => void;
  imageValue: string;
}

export default function ImageUploader<T extends FieldValues>({
  field,
  getImgValue,
  imageValue,
}: ImageUploaderProps<T>) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { token } = useAuthStore();

  // Upload image function
  const onUploadImg = async (file: File) => {
    setIsLoading(true);
    const result = await UploadImage({
      token,
      file,
      imageType: "PROFILE_IMAGE",
    });
    if (result?.data) {
      setIsLoading(false);
      setMessage(result?.data?.message);
      return result.data;
    } else {
      setIsLoading(false);
      setError(result?.message);
    }
  };

  // Effect to update previewUrl whenever imageValue changes
  useEffect(() => {
    if (imageValue) {
      setPreviewUrl(imageValue);
    }
  }, [imageValue]);

  // Handle image change (file selected by user)
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    // Upload the image and get the image UUID
    const result = await onUploadImg(file);
    if (getImgValue !== undefined) {
      getImgValue(result?.data?.id); // Pass image UUID to parent
    }

    // Update the preview URL
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="flex justify-left">
      {isLoading && <Loading />}
      {message && (
        <MessageToaster
          toastStyle="border-green bg-green1"
          title="Success!"
          description={message}
          isSucceed={true}
          imgBg="bg-green3"
          imgBorder="border-green2"
        />
      )}
      {error && (
        <MessageToaster
          toastStyle="border-red4 bg-red2"
          title="Failed!"
          description={error}
          isSucceed={false}
          imgBg="bg-red2"
          imgBorder="border-red4"
        />
      )}
      <p className="mr-3">{field?.placeholder}</p>
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
            width={200}
            height={200}
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
            <span className="font-semibold text-sm text-red">
              Click to upload
            </span>
            <span className="text-grayBasic text-xs text-center">
              using camera and from gallery
            </span>
            <span className="text-grayBasic text-xs">PNG, JPG (max. 5 MB)</span>
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
