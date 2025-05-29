import { api } from "@/lib/utils";
export const approveRejectRequest = async ({
  token,
  endPoint,
  data,
}: {
  token: string | null;
  endPoint:string;
  data?: any;
}) => {
  if (!token) {
    console.warn("No token provided");
    return null;
  }

  try {
    const res = await api.put(endPoint, data, {
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
