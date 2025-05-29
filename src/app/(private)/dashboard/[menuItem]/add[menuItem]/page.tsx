"use client";
import CustomForm from "@/components/forms/CustomForm";
import MessageToaster from "@/components/modals/MessageToaster";
// import { addUserFields } from "@/data/formsFields";
import { dataKeys } from "@/data/MenuItemDetailsKeys";
import useAddItem from "@/hooks/dashboard/useAddItem";
import useAuthStore from "@/store/authStore";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Loading from "@/components/layout/Loading";
import { capitalizeString } from "@/utils/helpers";

const AddItem: React.FC = () => {
  const { token } = useAuthStore();
  const params = useParams();
  const menuItem = params?.menuItem;
  const menuItemObj = dataKeys.find((item) => item.addType === menuItem);
  const schema = menuItemObj?.addSchema;
  if (!schema) return <div>Invalid form type</div>;

  type SchemaType = typeof schema;
  type FormValuesInterface = z.infer<SchemaType>;

  const [message, setMessage] = useState("");

  const { methods, error, onSubmit, isLoading } = useAddItem<
    SchemaType,
    FormValuesInterface
  >({
    endPoint: menuItemObj?.endPoint || "",
    defaultValues: menuItemObj?.defaultValuesAdd as any, // optional: type safely later
    token,schema:schema
  });
  const router = useRouter();

  const onSubmitFunc = async (data: FormValuesInterface) => {
    const result = await onSubmit(data);
    if (result?.data) {
      setMessage(result?.data?.message);
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  };
  const [currentTab,setCurrentTab]=useState(1)
  {console.log('menuObject',menuItemObj)}
  return isLoading ? (
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
      {console.log(menuItemObj?.addFields)}
      {/* <CustomForm
        buttonTitle={capitalizeString("submit")}
        formType="addItemForm"
        fields={menuItemObj?.addFields?[...menuItemObj?.addFields]:[]}
        onSubmitFunc={onSubmitFunc}
        methods={methods}
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

export default AddItem;
