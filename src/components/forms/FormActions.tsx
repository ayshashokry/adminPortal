"use client";
import { Button } from "@ui/button";
import { ArrowRightCircle, ArrowRightIcon, StopCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormActionsProps {
  formType: string;
  buttonTitle: string;
  openSuccessModal?: () => void;
  buttonDisabled?: boolean;
}

export default function FormActions({
  formType,
  buttonTitle,
  openSuccessModal,
  buttonDisabled,
}: FormActionsProps) {
  const router = useRouter();
  return (
    <>
      {formType !== "editUserData" ? (
        <>
          {formType == "addItemForm" ||
            (formType == "editItemForm" && (
              <Button
                className={`bg-white mr-2 rounded-lg text-black2 border-black2 w-48`}
                onClick={() => router.back()}
              >
                Back
              </Button>
            ))}
          <Button
            disabled={buttonDisabled}
            type="submit"
            className={`bg-btnBlack rounded-lg text-white ${
              formType == "addItemForm" || formType == "editItemForm"
                ? "w-48"
                : "w-full"
            }`}
          >
            {buttonTitle}
            {(formType == "loginForm" ||
              formType == "otpVerify" ||
              formType == "createNewPass") && (
              <ArrowRightIcon className=" h-5 w-5" />
            )}
          </Button>
        </>
      ) : (
        <div className="flex max-w-fit ml-auto">
          <Button
            onClick={() => router.push("/profile")}
            className="bg-gray2 text-black rounded-lg  w-full"
          >
            <StopCircle className=" h-5 w-5" />
            Cancel
          </Button>
          <Button
            disabled={buttonDisabled}
            className="bg-btnBlack rounded-lg text-white w-full mx-2"
            type="submit"
          >
            <ArrowRightCircle className=" h-5 w-5" />
            Save
          </Button>
        </div>
      )}
    </>
  );
}
