"use client";
import { Pencil, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";
import { useRouter } from "next/navigation";
import { convertDateFormat } from "@/utils/helpers";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useState } from "react";
import { result, startCase } from "lodash";
import { DeleteRequest } from "@/api/DeleteRequest";
import useAuthStore from "@/store/authStore";
import MessageToaster from "../modals/MessageToaster";
import Loading from "../layout/Loading";

export default function UserDetailsCard({ userData = {} }: any) {
  const { token } = useAuthStore();
  const userDataKeys = [
    {
      keyValue: "name",
      label: "admin name",
    },
    {
      keyValue: "mobileNumber",
    },
    {
      keyValue: "email",
      label: "email address",
    },
    {
      keyValue: "adminRoleName",
      label: "user role",
    },
    {
      keyValue: "dateOfBirth",
    },
  ];
  const router = useRouter();

  const [isConfirmOpen, setIsopen] = useState(false);

  const closeConfirmModal = () => {
    setIsopen(false);
  };
  const openSuccessModal = () => {
    setIsopen(true);
  };
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const onDeleteAccount = async () => {
    setLoading(true);
    try {
      const result = await DeleteRequest({
        token,
        endPoint: "v2/delete-account",
      });
      if (result?.data) {
        setMessage(result.data?.message);
        router.push("/profile");
      } else {
        setError(result?.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
      closeConfirmModal()
    }
  };
  return (
    <Card>
      {isLoading && <Loading />}
      {error && (
        <MessageToaster
          toastStyle="border-red4 bg-red2"
          title="Failed!"
          description={error}
          isSucceed={false}
          imgBg="bg-red2"
          imgBorder="border-red4"
        />
      )}
      {message && (
        <MessageToaster           key={message}

          toastStyle="border-green bg-green1"
          title="Success!"
          description={message}
          isSucceed={true}
          imgBg="bg-green3"
          imgBorder="border-green2"
        />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between w-full ">
          <h6 className="flex items-center text-black3 tracking-normal">
            User Details:
          </h6>
          <Button
            className="  text-black2 font-semibold bg-white hover:text-white shadow-xs border border-gray6"
            onClick={() => router.replace("/profile/edit")}
          >
            <Pencil size={16} /> Edit
          </Button>
        </CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <ul>
          {userDataKeys?.map((user, index) => (
            <div key={index}>
              <li className="grid grid-cols-2 w-full items-center">
                <p className="text-black3 text-sm font-semibold">
                  {startCase(user?.label || user?.keyValue)} :
                </p>
                <p className="text-gray3 text-sm font-normal text-left">
                  {user.label?.includes("data")
                    ? convertDateFormat(userData[user?.keyValue])
                    : userData[user?.keyValue]}
                </p>
              </li>
              <Separator className="my-4" />
            </div>
          ))}
        </ul>
        <h6
          className="text-red font-medium flex cursor-pointer text-md"
          onClick={openSuccessModal}
        >
          <Trash className="mr-1 mt-[3px]" width={20} height={20} />
          {startCase("delete my account")}
        </h6>
        <ConfirmationModal
          title="Delete account"
          content="You are about to request for the deletion of your account. Would you like to proceed?"
          isOpen={isConfirmOpen}
          onClose={closeConfirmModal}
          confirmTitle="Delete"
          cancelTitle="Cancel"
          isDeleteAccount={true}
          onDeleteAccount={onDeleteAccount}
        />
      </CardContent>
    </Card>
  );
}
