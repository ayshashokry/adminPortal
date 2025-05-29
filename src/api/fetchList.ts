import { api } from "@/lib/utils";

export const FetchList = async ({
  endPoint,
  token,
  params,
  logout,
  filtersObj,
}: {
  endPoint: string | undefined;
  token: string | null;
  params?: {
    skip: number;
    limit: number;
    keyword?: string;
  };
  filtersObj?: any;
  logout?: () => void;
}) => {
  if (!token) {
    console.warn("No token provided");
    return null;
  }
 const filterParams = filtersObj?.reduce((acc: any, filter: any) => {
  const isArray = Array.isArray(filter?.value);
  const isCommaSeparated =
    typeof filter?.value === "string" && filter.value.includes(",");

  acc[filter?.id] = isArray
    ? filter.value
    : isCommaSeparated
    ? filter.value.split(",")
    : filter.value;

  return acc;
}, {});
  const finalParams = { ...params, ...(filterParams || {}) };
  try {
    const res = await api.get(`${endPoint}`, {
      headers: {
        "Accept-Language": "en",
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      params: finalParams,
    });
    return { success: true, data: res.data?.data };
  } catch (error: any) {
    const backendMessage =
      error?.response?.data?.message || error?.message || "Unknown error";

    if (error.response?.data?.code == "SESSION_TIME_OUT") {
      //       logout();
      // window.location.href = "/auth/login";
    }
    return { success: false, message: backendMessage, data: [] };
  }
};
