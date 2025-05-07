"use client";
import {  Pencil, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";
import _ from "lodash";
import { useRouter } from "next/navigation";

export default function UserDetailsCard() {

  const userData = [
    {
      keyValue: "Name",
      value: "Aysha Shokry",
    },
    {
      keyValue: "Mobile number",
      value: "Aysha Shokry",
    },
    {
      keyValue: "Email address",
      value: "Aysha Shokry",
    },
    {
      keyValue: "User role",
      value: "admin",
    },
    {
      keyValue: "Date of birth",
      value: "Aysha Shokry",
    },
  ];
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between w-full ">
          <h6 className="flex items-center text-black3 tracking-normal">
            User Details:
          </h6>
          <Button
            className="  text-black2 font-semibold bg-white hover:text-white shadow-xs border border-gray6"
            onClick={() => router.push("/profile/edit")}
          >
            <Pencil size={16} /> Edit
          </Button>
        </CardTitle>
      </CardHeader>
      <Separator className="mb-4" />

      <CardContent>
        <ul>
          {userData.map((user, index) => (
            <div key={index}>
              <li className="grid grid-cols-2 w-full items-center">
                <p className="text-black3 text-sm font-semibold">
                  {_.startCase(user.keyValue)}:
                </p>
                <p className="text-gray3 text-sm font-normal text-left">
                  {user.value}
                </p>
              </li>
              <Separator className="my-4" />
            </div>
          ))}
        </ul>
        <h6 className="text-red font-medium flex cursor-pointer text-md">
          <Trash
            className="mr-1 mt-[3px]"

            width={20}
            height={20}
          />
          {_.startCase("delete my account")}
        </h6>
      </CardContent>
    </Card>
  );
}
