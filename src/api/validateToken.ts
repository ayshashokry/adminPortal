import { api } from "@/lib/utils";

export const ValidateTokenRequest = async (token: string | null) => {
  try {
    const result = await api.get("/public/v2/auth/admin/validate-token", {
      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (result) {
      return result?.data;
    }
  } catch {}
};
