"use client";
import { Button } from "@ui/button";
import { ArrowRightCircle, ArrowRightIcon, StopCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormActionsProps {
  formType: string;
  buttonTitle: string;
  openSuccessModal?: () => void;
}

export default function FormActions({
  formType,
  buttonTitle,
  openSuccessModal,
}: FormActionsProps) {
  const router = useRouter();
  return (
    <>
      {formType !== "editUserData" ? (
        <Button
          type="submit"
          className="bg-btnBlack rounded-lg text-white w-full"
          onClick={() => {
            if (formType === "createNewPass" && openSuccessModal) {
              openSuccessModal();
            }
          }}
        >
          {buttonTitle}
          {(formType == "loginForm" ||
            formType == "otpVerify" ||
            formType == "createNewPass") && (
            <ArrowRightIcon className=" h-5 w-5" />
          )}
        </Button>
      ) : (
        <div className="flex max-w-fit ml-auto">
          <Button
            onClick={() => router.push("/profile")}
            className="bg-gray2 text-black rounded-lg  w-full"
          >
            <StopCircle className=" h-5 w-5" />
            Cancel
          </Button>
          <Button className="bg-btnBlack rounded-lg text-white w-full mx-2">
            <ArrowRightCircle className=" h-5 w-5" />
            Save
          </Button>
        </div>
      )}
    </>
  );
}
