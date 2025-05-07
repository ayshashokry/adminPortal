import { api } from "@/lib/utils";

export const FetchList = async ({
  endPoint,
  token,
  params,
}: {
  endPoint: string;
  token: string | null;
  params: { skip: number; limit: number; keyword?: string };
}) => {
  if (!token) {
    console.warn("No token provided");
    return null;
  }

  try {
    const res = await api.get(`v2/${endPoint}`, {
      headers: {
        "Accept-Language": "en",
        Authorization: `${token}`,
      },
      params: params,
    });
    return res.data;
  } catch (error: any) {
    console.log("API Error:", error?.response?.data || error?.message);
    return null;
  }
};
