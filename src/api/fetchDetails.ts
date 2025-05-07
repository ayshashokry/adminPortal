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
      },
    });
    return res.data;
  } catch (error: any) {
    console.log("API Error:", error?.response?.data || error?.message);
    return null;
  }
};
