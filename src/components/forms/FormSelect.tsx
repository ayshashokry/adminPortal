"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
import { FetchList } from "@/api/fetchList";
import { useMemo } from "react";
import { statusesInterface } from "../dashboard/dashboard.interface";
import { startCase } from "lodash";

interface FormInputProps<T extends FieldValues> {
  field: {
    id: number;
    name: Path<T>;
    type: string;
    label?: string;
    placeholder?: string;
    required: boolean;
    fullWidth?: boolean;
    endPoint?: string;
    labelKey?: string;
    valueKey?: string;
    selectData?: statusesInterface[];
  };
  methods: UseFormReturn<T>;
  formType: string;
}

export default function FormSelect<T extends FieldValues>({
  field,
  methods,
  formType,
}: FormInputProps<T>) {
  const { token,logout } = useAuthStore();

  const fetchList = async () => {
    if (!token || !field.endPoint) return [];
    const res = await FetchList({
      endPoint: field.endPoint,
      token,
      params: { skip: 0, limit: 100 },
      logout
    });
    return res?.data?.result || [];
  };

  const { data, isLoading } = useQuery({
    queryKey: [field.name, field.endPoint],
    queryFn: fetchList,
    enabled: !!token && !!field.endPoint,
  });

  const options = useMemo(() => {
    return (field.endPoint ? data : field.selectData || [])?.map(
      (item: any) => ({
        label: item[field.labelKey || "name"],
        value: item[field.valueKey || "id"],
      })
    );
  }, [data, field.labelKey, field.valueKey]);

  return (
    <FormField
      control={methods.control}
      name={field.name}
      render={({ field: controllerField }) => (
        <div className={`${field?.fullWidth ? "col-span-2" : ""}`}>
          <FormItem
            className={`${
              formType === "editUserData"
                ? `grid grid-cols-3 gap-6 items-center ${
                    field?.type === "image" ? "items-start" : ""
                  }`
                : ""
            }`}
          >
            {field.label && (
              <FormLabel
                className={`${
                  formType === "editUserData" ? "w-1/2 text-left" : ""
                }`}
              >
                {startCase(field.label)}
                {field.required && formType !== "editUserData" && (
                  <span className="text-red">*</span>
                )}
              </FormLabel>
            )}

            <FormControl>
              <Select {...controllerField}
                value={controllerField.value ?? ""}
                onValueChange={controllerField.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field?.placeholder || "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option: any) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        </div>
      )}
    />
  );
}
