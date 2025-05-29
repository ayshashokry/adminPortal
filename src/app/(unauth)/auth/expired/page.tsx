"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AuthLayout from "../AuthLayout";

export default function Expired() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [urlEmail, setUrlEmail] = useState("");
  useEffect(() => {
    if (searchParams) {
      const param = searchParams.get("email");
      if (param) setUrlEmail(param);
    }
  }, [searchParams]);
  return (
    <AuthLayout
      title="Link is no longer found"
      headText={`Click on the below button then add your email address to resend you a new link`}
    >
      <div className="mt-5">
        <Button
          className="bg-btnBlack rounded-lg text-white w-full text-center block"
          onClick={() => router.push("/auth/forget-password")}
        >
          Go to forget password
        </Button>
      </div>
    </AuthLayout>

  );
}
