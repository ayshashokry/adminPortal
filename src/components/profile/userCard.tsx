"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { getInitialsChars } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
export default function UserCard({ userData = {} }: any) {
  const { user, hydrated } = useAuthStore();
  const router = useRouter();
  if (!hydrated) return null;

  return (
    <div className="flex flex-col  space-y-2">
      <Card className="w-full max-w-md rounded-lg shadow-lg mx-2">
        <CardHeader className="flex flex-col items-center">
          <Avatar>
            <AvatarImage
              src={userData?.fileUrl}
              width={80}
              height={80}
              className="rounded-full object-cover"
              alt="User"
            />
            <AvatarFallback>
              {getInitialsChars(userData?.name || "")}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg font-semibold mt-2">
            {user?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-gray-600">
          <Separator className="mb-4" />
          <div className="flex w-full justify-between">
            <p className="text-left text-grayBasic text-sm">Mobile Number:</p>
            <p className="text-right text-black1">
              {userData?.mobileNumber !== null
                ? userData?.countryCode + " " + userData?.mobileNumber
                : ""}
            </p>
          </div>

          <div className="flex w-full justify-between pt-2">
            <p className="text-left text-grayBasic">Email Address:</p>
            <p className="text-right text-black1"> {userData?.email}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md rounded-lg border border-gray-300 bg-white shadow-xs p-4 mx-2 text-center">
        <Button
          className="w-full max-w-sm  text-black2 font-semibold bg-white hover:text-white shadow-xs border border-gray6"
          onClick={() => router.push("/profile/setNewPassword")}
        >
          <Pencil size={16} /> Change Password
        </Button>
      </Card>
    </div>
  );
}
