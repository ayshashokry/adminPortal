import { api } from "@/lib/utils";
export const UploadImage = async ({
  token,
  file,
  imageType,
}: {
  token: string | null;
  file: File;
  imageType: string;
}) => {
  if (!token) {
    console.warn("No token provided");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("file", file); // المفتاح لازم يكون اسمه "file"

    const res = await api.post(`public/file?type=${imageType}`, formData, {
      headers: {
        "Accept-Language": "en",
        Authorization: token,
      },
    });

    return { success: true, data: res.data };
  } catch (error: any) {
    const backendMessage =
      error?.response?.data?.message || error?.message || "Unknown error";
    return { success: false, message: backendMessage };
  }
};
