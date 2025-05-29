"use client";
import { api } from "@/lib/utils";
import useAuthStore from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AuthProps<T extends z.ZodType<any, any>, D> {
  endPoint: string;
  schema: T;
  defaultValues?: z.infer<T>;
  token?: string | null;
}
export default function useAuth<T extends z.ZodType<any, any>, D>({
  endPoint,
  schema,
  defaultValues,
  token,
}: AuthProps<T, D>) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues,
  });
  const onSubmit = async (data: D) => {
    if (typeof window === "undefined") return;
    setLoading(true);
    setError("");
    try {
      const res = await api.post(
        `${
          endPoint.includes("set-password") ||
          endPoint.includes("change-password")
            ? `/v2/${endPoint}`
            : `public/v2/${endPoint}`
        }`,
        data,
        {
          headers: {
            "Accept-Language": "en",
            "Content-Type": "application/json",
            ...(token ? { Authorization: token } : {}),
          },
        }
      );

      return res;
    } catch (error: any) {
      setError(error?.response);
      setLoading(false);
    } finally {
      if (!endPoint.includes("login")) {
        setLoading(false);
      }
    }
  };

  return { methods, error, onSubmit, isLoading, setLoading };
}
