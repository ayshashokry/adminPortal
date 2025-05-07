"use client";
import { authInterface } from "@hooks/auth/auth.interface";
import useAuth from "@hooks/auth/usAuth";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { emailSchema } from "@utils/validtions/EmailSchema";
import { useState } from "react";
import CustomForm from "@components/forms/CustomForm";
import DashboardLayout from "@/app/dashboard/layout";
import { Card, CardHeader } from "@components/ui/card";
import { Pencil, UserIcon } from "lucide-react";
import { EnvelopeClosedIcon, MobileIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// type ForgetPasswordFormValues = z.infer<typeof emailSchema>;
export default function EditProfile() {

  const [formFields] = useState([
    {
      id: 1,
      name: "userPhoto",
      label: _.capitalize("user photo"),
      type: "image",
      required: true,
    },
    {
      id: 2,
      name: "name",
      label: _.capitalize("name"),
      placeholder: `Please enter your name`,
      type: "string",
      required: true,
      icon: <UserIcon className="w-5 h-5" />,
    },
    {
      id: 3,
      name: "mobileNumber",
      label: _.capitalize("mobile number"),
      placeholder: `Please enter your mobile number`,
      type: "number",
      required: true,
      icon: <MobileIcon className="w-5 h-5" />,
    },
    {
      id: 4,
      name: "email",
      label: _.capitalize("email"),
      placeholder: `Please enter your email`,
      type: "email",
      required: true,
      icon: <EnvelopeClosedIcon className="w-5 h-5" />,
    },
  ]);
  const defaultValues = {
    email: "h@ll.cc",
    name: "hehehehe",
    mobileNumber: "",
  };

  const { onSubmit, methods } = useAuth<
    typeof emailSchema,
    authInterface
  >({
    endPoint: "auth/forget",
    schema: emailSchema,    defaultValues,

  });
  const router = useRouter();

  const onSubmitFunc = (data: authInterface) => {
    console.log("FOOOR", data);
    onSubmit(data);
    // router.push(`/auth/otp-verification?email=${data.email}`);
  };

  return (
    <DashboardLayout>
      <Card className="w-full  rounded-lg shadow-lg p-4">
        <CardHeader className="flex flex-col pl-0 ml-0">
          <div className=" w-full">
            <h5 className="text-black1 text-2xl font-semibold tracking-[-0.72px]">
              {_.startCase("user details")}
            </h5>
            <p className="text-sm font-normal text-gray pt-1">
              {_.startCase("Update your details here.")}
            </p>
          </div>
        </CardHeader>
        <CustomForm
          buttonTitle={_.capitalize("submit")}
          formType="editUserData"
          fields={[...formFields]}
          onSubmitFunc={onSubmitFunc}
          methods={methods}
          editProfilePass={
            <>
              <Separator className="mb-4" />
              <div className="grid grid-cols-3 gap-6 items-center">
                <div className="w-1/2 text-left">Password</div>
                <div className=" justify-center">
                  <Button
                    className="w-[50%] max-w-sm  text-black2 font-semibold bg-white hover:text-white shadow-xs border border-gray6"
                    onClick={() => router.push("/profile/setNewPassword")}
                  >
                    <Pencil size={16} /> {_.startCase("Set new password")}
                  </Button>
                </div>
              </div>
              <Separator className="mb-4" />

            </>
          }
        />
      </Card>
    </DashboardLayout>
  );
}
