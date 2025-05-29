"use client";
import { api } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Schema, z } from "zod";

interface ItemProps<T extends z.ZodType<any, any>, D> {
  endPoint: string;
  defaultValues?: z.infer<T>;
  token?: string | null;
  schema:T
}
export default function useAddItem<T extends z.ZodType<any, any>, D>({
  endPoint,
  defaultValues,
  token,schema
}: ItemProps<T, D>) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const methods = useForm<z.infer<T>>({
    resolver:zodResolver(schema),
    mode: "all",
    defaultValues,
  });
  const onSubmit = async (data: D) => {
    setLoading(true);

    try {
      const res = await api.post(`/v2/${endPoint}`, data, {
        headers: {
          "Accept-Language": "en",
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
      });
      return res;
    } catch (error: any) {

      setError(error?.response);
    } finally {
      setLoading(false);
    }
  };

  return { methods, error, onSubmit, isLoading };
}
