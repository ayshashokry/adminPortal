"use client";
import {  api } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AuthProps<T extends z.ZodType<any, any>, D> {
  endPoint: string;
  schema: T;  defaultValues?: z.infer<T>;

}
export default function useAuth<T extends z.ZodType<any, any>, D>({
  endPoint,
  schema,
  defaultValues,

}: AuthProps<T, D>) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues,
  });
  const onSubmit = async (data: D) => {
    setLoading(true);
    console.log(data);

    try {
      const res = await api.post(`public/v2/${endPoint}`, data, {
        headers: {
          "Accept-Language": "en",
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error: any) {
      setError(error?.response);
    } finally {
      setLoading(false);
    }
  };

  return { methods, error, onSubmit ,isLoading};
}
