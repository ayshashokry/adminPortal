import { api } from "@/lib/utils";
export const DeleteRequest = async ({
  token,
  endPoint,
}: {
  token: string | null;
  endPoint: string;
}) => {
  if (!token) {
    console.warn("No token provided");
    return null;
  }

  try {
    const res = await api.delete(endPoint, {
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
