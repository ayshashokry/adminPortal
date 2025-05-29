import DashboardLayout from "@/app/(private)/dashboard/layout";
import { Card, CardHeader } from "@components/ui/card";
import CreateNewPasswordForm from "@components/forms/CreateNewPassword";

export default function SetNewPassword() {
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
              <p className="text-sm font-normal text-grayBasic pt-1">
                Please enter the details below.
              </p>
            </div>
          </CardHeader>

          <CreateNewPasswordForm
            endPoint="auth/admin/change-password"
            profileSetPass={true}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}
