"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomForm from "@components/forms/CustomForm";
import DashboardLayout from "@/app/(private)/dashboard/layout";
import { Card, CardHeader } from "@components/ui/card";
import { Pencil, UserIcon } from "lucide-react";
import { EnvelopeClosedIcon, MobileIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { capitalizeString, convertDateFormat } from "@/utils/helpers";
import { startCase } from "lodash";
import useEditItem from "@/hooks/dashboard/useEditItem";
import {
  editProfileSchema,
  editUserSchema,
} from "@/hooks/dashboard/dashboardSchemas";
import { FetchDetails } from "@/api/fetchDetails";
import useAuthStore from "@/store/authStore";
import MessageToaster from "@/components/modals/MessageToaster";
import { z } from "zod";
import Loading from "@/components/layout/Loading";
import { editProfileFields } from "@/data/formsFields";
export default function EditProfile() {
  const [imgUUIDValue, setImgUUID] = useState("");
  const getImgValue = (imgUUID: string) => {
    setImgUUID(imgUUID);
  };

  const { user, token } = useAuthStore();
  const [message, setMessage] = useState("");
  const [changeError, setNoChangeError] = useState("");

  const router = useRouter();
  const [detailsValues, setDetailsValues] = useState<any>([]);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  useEffect(() => {
    const fetchDataDetails = async () => {
      const result = await FetchDetails({
        endPoint: "admin/user" as string,
        token,
        id: user?.id as string,
      });
      setDetailsValues(result?.data?.data);
      if (result?.data?.data) {
        methods.reset({
          email: result?.data?.data.email,
          name: result?.data?.data.name,
          profileImageId: result?.data?.data.fileUrl,
          mobileNumber: result?.data?.data?.mobileNumber,
          dateOfBirth: convertDateFormat(result?.data?.data?.dateOfBirth),
        });
      }
      setIsDetailsLoading(false);
    };
    if ((user?.id, "admin/user")) {
      fetchDataDetails();
    }
  }, []);
  type SchemaType = typeof editProfileSchema;
  type FormValuesInterface = z.infer<SchemaType>;
  const { methods, error, onSubmit, isLoading } = useEditItem<
    SchemaType,
    FormValuesInterface
  >({
    endPoint: "/admin/user",
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      profileImageId: "",
      dateOfBirth: "",
    },
    token,
    id: user?.id,
    schema: editProfileSchema,
  });
  const { watch } = methods;
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const subscription = watch((currentData) => {
      const isChanged =
        currentData?.profileImageId !== detailsValues?.fileUrl ||
        currentData?.name !== detailsValues?.name ||
        currentData?.email !== detailsValues?.email ||
        currentData?.mobileNumber !== detailsValues.mobileNumber ||
        currentData?.dateOfBirth !==
          convertDateFormat(detailsValues.dateOfBirth);

      setButtonDisabled(!isChanged);
    });

    return () => subscription.unsubscribe();
  }, [watch, detailsValues]);
  const onSubmitFunc = async (data: FormValuesInterface) => {
    const data1 = {
      ...data,
      adminRoleId: detailsValues?.adminRoleId,
      status: detailsValues?.status,
    };
    const updatedEntries = Object.entries(data1).reduce((acc, [key, value]) => {
      if (key === "profileImageId") {
        if (imgUUIDValue === "") {
          return acc;
        } else {
          acc.push([key, imgUUIDValue]);
        }
      } else {
        acc.push([key, value]);
      }

      return acc;
    }, [] as [string, any][]);
    const updatedData = Object.fromEntries(
      updatedEntries
    ) as FormValuesInterface;

    const result = await onSubmit(updatedData);
    if (result?.data) {
      setMessage(result?.data?.message);

      setTimeout(() => {
        router.replace("/profile");
      }, 1000);
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <DashboardLayout>
      {(error || changeError) && (
        <MessageToaster
          toastStyle="border-red4 bg-red2"
          title="Failed!"
          description={error ? error?.data?.message : changeError}
          isSucceed={false}
          imgBg="bg-red2"
          imgBorder="border-red4"
        />
      )}
      <Card className="w-full  rounded-lg shadow-lg p-4">
        <CardHeader className="flex flex-col pl-0 ml-0">
          <div className=" w-full">
            <h5 className="text-black1 text-2xl font-semibold tracking-[-0.72px]">
              {startCase("user details")}
            </h5>
            <p className="text-sm font-normal text-grayBasic pt-1">
              {startCase("Update your details here.")}
            </p>
          </div>
        </CardHeader>
        <CustomForm
          getImgValue={getImgValue}
          buttonTitle={capitalizeString("submit")}
          formType="editUserData"
          profileDetails={detailsValues}
          fields={[...editProfileFields]}
          onSubmitFunc={onSubmitFunc}
          methods={methods}
          buttonDisabled={buttonDisabled}
          editProfilePass={
            <>
              <Separator className="my-4" />
              <div className="grid grid-cols-3 gap-6 items-center">
                <div className="w-1/2 text-left">Password</div>
                <div className=" justify-center">
                  <Button
                    className="w-[50%] max-w-sm  text-black2 font-semibold bg-white hover:text-white shadow-xs border border-gray6"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/profile/setNewPassword");
                    }}
                  >
                    <Pencil size={16} /> {startCase("Set new password")}
                  </Button>
                </div>
              </div>
              <Separator className="my-4" />
            </>
          }
        />
      </Card>
      {message && (
        <MessageToaster
          toastStyle="border-green bg-green1"
          title="Success!"
          description={message}
          isSucceed={true}
          imgBg="bg-green3"
          imgBorder="border-green2"
        />
      )}
    </DashboardLayout>
  );
}
