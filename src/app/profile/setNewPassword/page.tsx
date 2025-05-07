"use client";

// import { authInterface } from "@hooks/auth/auth.interface";
// import useAuth from "@hooks/auth/usAuth";
// import { useRouter } from "next/navigation";
// import { emailSchema } from "@utils/validtions/EmailSchema";
import DashboardLayout from "@/app/dashboard/layout";
import { Card, CardHeader } from "@components/ui/card";
import CreateNewPasswordForm from "@/components/forms/CreateNewPassword";

export default function SetNewPassword() {

  // const defaultValues = {
  //   email: "",
  // };

  // const { onSubmit } = useAuth<
  //   typeof emailSchema,
  //   authInterface
  // >({
  //   endPoint: "auth/forget",
  //   schema: emailSchema,    defaultValues,

  // });
  // const router = useRouter();

  // const onSubmitFunc = (data: authInterface) => {
  //   console.log("FOOOR", data);
  //   onSubmit(data);
  //   // router.push(`/auth/otp-verification?email=${data.email}`);
  // };

  return (
    <DashboardLayout>
      <div className="flex justify-center">
        {/* <MessageToaster
          title="Success!"
          description="Congratulations! Password Changed successfully."
        /> */}
        <Card className="w-[30vw] rounded-lg shadow-lg p-5 space-x-2">
          <CardHeader className="flex flex-col pl-0 ml-0">
            <div className=" w-full">
              <h5 className="text-black1 text-3xl font-semibold tracking-[-0.72px]">
                Set New Password
              </h5>
              <p className="text-sm font-normal text-gray pt-1">
                Please enter the details below.
              </p>
            </div>
          </CardHeader>
          <CreateNewPasswordForm profileSetPass={true} />
         
        </Card>
      </div>
    </DashboardLayout>
  );
}
