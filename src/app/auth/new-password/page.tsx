"use client";
import AuthLayout from "@/app/auth/AuthLayout";
import dynamic from "next/dynamic";

const CreateNewPasswordForm = dynamic(
  () => import("@components/forms/CreateNewPassword"),
  { ssr: false }
);
export default function NewPasswordPage() {
  return <CreateNewPasswordForm />;
}