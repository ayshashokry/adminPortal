import { api } from "@/lib/utils";

export const FetchDetails = async ({
  endPoint,
  token,
  id,
}: {
  endPoint: string;
  token: string | null;
  id: string;
}) => {
  if (!token) {
    console.warn("No token provided");
    return null;
  }

  try {
    const res = await api.get(`v2/${endPoint}/${id}`, {
      headers: {
        "Accept-Language": "en",
        Authorization: `${token}`,
        "Content-Type": "application/json",

      },
    });
        return { success: true, data:  res.data };
  } catch (error: any) {
       const backendMessage =
      error?.response?.data?.message || error?.message || "Unknown error";
    return { success: false, message: backendMessage };
  }
};
