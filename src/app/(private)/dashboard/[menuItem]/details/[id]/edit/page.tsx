"use client";
import CustomForm from "@/components/forms/CustomForm";
import MessageToaster from "@/components/modals/MessageToaster";
import { dataKeys } from "@/data/MenuItemDetailsKeys";
import useEditItem from "@/hooks/dashboard/useEditItem";
import useAuthStore from "@/store/authStore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Loading from "@/components/layout/Loading";
import { getParam } from "@/lib/utils";
import { FetchDetails } from "@/api/fetchDetails";
import { capitalizeString, convertDateFormat } from "@/utils/helpers";

const EditItem: React.FC = () => {
  const { token } = useAuthStore();
  const params = useParams();
  const menuItem = params?.menuItem;
  const id = getParam(params?.id);
  const menuItemObj = dataKeys.find((item) => item.editType === menuItem);
  const schema = menuItemObj?.editSchema;

  if (!schema) return <div>Invalid form type</div>;
  type SchemaType = typeof schema;
  type FormValuesInterface = z.infer<SchemaType>;

  const [message, setMessage] = useState("");

  const router = useRouter();
  const [detailsValues, setDetailsValues] = useState<any>([]);
  const [isDetailsLoading, setIsDetailsLoading] = useState(true);
  const { methods, error, onSubmit, isLoading } = useEditItem<
    SchemaType,
    FormValuesInterface
  >({
    endPoint: menuItemObj?.endPoint || "",
    defaultValues: detailsValues as any,
    token,
    id,
    schema,
  });
  const [imgUUIDValue, setImgUUID] = useState("");
  useEffect(() => {
    const fetchDataDetails = async () => {
      const result = await FetchDetails({
        endPoint: menuItemObj?.endPoint as string,
        token,
        id: params.id as string,
      });
      setDetailsValues(result?.data?.data);
      if (result?.data?.data) {
        methods.reset({
          adminRoleId: result?.data?.data.adminRoleId,
          dateOfBirth: convertDateFormat(result?.data?.data.dateOfBirth),
          email: result?.data?.data.email,
          name: result?.data?.data.name,
          status:
            result?.data?.data.status == "AdminInvited"
              ? ""
              : result?.data?.data.status,
          profileImageId: result?.data?.data.fileUrl,
          mobileNumber: result?.data?.data.mobileNumber,
        });
      }
      setIsDetailsLoading(false);
    };
    if (id && menuItemObj?.endPoint) {
      fetchDataDetails();
    }
  }, [id, menuItemObj?.endPoint, token]);
  const getImgValue = (imgUUID: string) => {
    setImgUUID(imgUUID);
  };
  const onSubmitFunc = async (data: FormValuesInterface) => {
    const updatedEntries = Object.entries(data).reduce((acc, [key, value]) => {
      if (key === "profileImageId") {
        if (imgUUIDValue === "") {
          return acc;
        } else {
          acc.push([key, imgUUIDValue]);
        }
      } else if (
        (key === "dateOfBirth" && value === "-") ||
        (key == "mobileNumber" && value == "")
      ) {
        return acc;
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
        router.back();
      }, 1000);
    } else if (error?.status == 403) {
      setTimeout(() => {
        router.replace(`/dashboard/${menuItemObj?.detailsType}`);
      }, 1000);
    }
  };
  const { watch } = methods;
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const subscription = watch((currentData) => {

      // Check if the profile image has changed (either through the uploaded image or form data)
      const isProfileImageChanged =
        currentData?.profileImageId !== detailsValues?.fileUrl ||
        imgUUIDValue !== "";

      const isDateOfBirthChanged =
        currentData?.dateOfBirth !==
        convertDateFormat(detailsValues?.dateOfBirth);

      const isChanged =
        isProfileImageChanged ||
        currentData?.adminRoleId !== detailsValues?.adminRoleId ||
        currentData?.email !== detailsValues?.email ||
        currentData?.mobileNumber !== detailsValues?.mobileNumber ||
        currentData?.name !== detailsValues?.name ||
        currentData?.status !== detailsValues?.status ||
        isDateOfBirthChanged;

      setButtonDisabled(!isChanged);
    });

    return () => subscription.unsubscribe();
  }, [watch, detailsValues, imgUUIDValue]); // Listen to imgUUIDValue changes

  return isLoading || isDetailsLoading ? (
    <Loading />
  ) : (
    <div className="rounded-lg border-[1px] bg-white border-gray2 p-5 mt-5">
      {error && (
        <MessageToaster
          toastStyle="border-red4 bg-red2"
          title="Failed!"
          description={error?.data?.message}
          isSucceed={false}
          imgBg="bg-red2"
          imgBorder="border-red4"
        />
      )}
      {/* <CustomForm
        getImgValue={getImgValue}
        buttonTitle={capitalizeString("submit")}
        formType="editItemForm"
        fields={menuItemObj?.editFields ? [...menuItemObj?.editFields] : []}
        onSubmitFunc={onSubmitFunc}
        methods={methods}
        buttonDisabled={buttonDisabled}
        detailsValues={detailsValues}
      /> */}
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
    </div>
  );
};

export default EditItem;
