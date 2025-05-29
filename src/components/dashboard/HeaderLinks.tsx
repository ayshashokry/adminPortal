import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Home, PenSquare } from "lucide-react";
import {
  camelCaseToSpace,
  capitalizeString,
  cleanURL,
  convertURLToArray,
  convertWordToSingular,
} from "@/utils/helpers";
import i18n from "@/lib/i18n";
import { approveRejectRequest } from "@/api/approveRejectRequest";
import useAuthStore from "@/store/authStore";
import Loading from "../layout/Loading";
import MessageToaster from "../modals/MessageToaster";
import { approveRejectConfigs } from "@/data/approveRejectConfigs";
import ConfirmationModal from "../modals/ConfirmationModal";
type ApproveRejectHandler = (
  type: "approve" | "reject",
  reason?: string
) => void | Promise<void>;

type HeaderLinksProps = {
  details?: any;
};
const HeaderLinks: React.FC<HeaderLinksProps> = ({ details }) => {
  const { token } = useAuthStore();
  const pathname = usePathname();
  const pathSegments: any = convertURLToArray(pathname);
  const pathItem = pathSegments[1]
    ? convertWordToSingular(pathSegments[1])
    : "";

  const router = useRouter();
  const pathSegmentsSliced =
    pathname?.includes("details") && !pathname.includes("edit")
      ? [...pathSegments].slice(0, -1) // Copy and slice
      : pathname.includes("edit")
      ? [...pathSegments].slice(0, -3).concat(pathSegments.slice(-1))
      : pathSegments;

  let headerTitle;
  if (pathname.includes("add")) {
    headerTitle = `Add ${convertWordToSingular(pathSegments[1])}`;
  } else if (pathname.includes("edit")) {
    headerTitle = `Edit ${convertWordToSingular(pathSegments[1])}`;
  } else if (pathname.includes("details")) {
    headerTitle = `${camelCaseToSpace(
      convertWordToSingular(pathSegments[1])
    )} Details`;
  } else {
    headerTitle = `${camelCaseToSpace(pathSegments[1])} List`;
  }
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let config =
    approveRejectConfigs[pathSegments[1] as keyof typeof approveRejectConfigs];
  const [isOpenApproveConfirm, setOpenApproveConfirm] = useState(false);
  const [isOpenRejectConfirm, setOpenRejectConfirm] = useState(false);
  const openApproveReject = (type: string) => {
    type == "reject"
      ? setOpenRejectConfirm(!isOpenRejectConfirm)
      : setOpenApproveConfirm(!isOpenApproveConfirm);
  };
  const approveRejectFunc = async (
    type: "approve" | "reject",
    reason?: string
  ) => {
    setIsLoading(true);
    const endPoint = config?.endPoint;
    const payload = config?.getPayload(type, reason);
    try {
      const result = await approveRejectRequest({
        endPoint: `v2/${endPoint}/${pathSegments.slice(-1)[0]}`,
        token,
        data: payload,
      });
      if (result?.data) {
        setMessage(result.data?.message);
        setTimeout(() => {
          router.back();
        }, 1000);
        setIsLoading(false);
      } else {
        setError(result?.message);
      }
    } catch (error) {
    } finally {
      setOpenApproveConfirm(false);
      setOpenRejectConfirm(false);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="rounded-md border-[1px] bg-white border-gray2 p-5">
      <div className="header flex">
        {error && (
          <MessageToaster
            toastStyle="border-red4 bg-red2"
            title="Failed!"
            description={error}
            isSucceed={false}
            imgBg="bg-red2"
            imgBorder="border-red4"
          />
        )}{" "}
        {message && (
          <MessageToaster
            toastStyle="border-green bg-green1"
            title="Success!"
            description={message}
            isSucceed={true}
            imgBg="bg-green3"
            imgBorder="border-green2"
          />
        )}{" "}
        <div>
          <div className="flex gap-2">
            <Home className="text-gray3" />
            {pathSegmentsSliced
              ?.slice(1)
              ?.map((segment: string, index: number) => (
                <div key={index} className="flex">
                  {i18n.language == "ar" ? (
                    <ChevronLeft className="text-gray6" />
                  ) : (
                    <ChevronRight className="text-gray6" />
                  )}
                  <span
                    onClick={() =>
                      pathSegmentsSliced.at(-1) == segment
                        ? ""
                        : router.push(
                            `/dashboard/${pathSegmentsSliced
                              .slice(1, index + 2)
                              .join("/")}${
                              segment.includes("details")
                                ? "/" + pathSegments.at(-1)
                                : " "
                            }`
                          )
                    }
                    className={` text-[14px] text-black2 font-semibold mx-2 cursor-pointer ${
                      pathSegmentsSliced.at(-1) == segment
                        ? "bg-gray5 p-1 rounded-md"
                        : " p-1"
                    }`}
                  >
                    {camelCaseToSpace(decodeURIComponent(segment))}
                  </span>
                </div>
              ))}
          </div>
          <h4 className="text-black3 text-lg font-semibold pt-4">
            {headerTitle}
          </h4>
        </div>
        {pathSegments.length > 2 ? (
          pathname.includes("details") &&
          !pathname.includes("edit") &&
          !config ? (
          details?.data?.adminRoleName=="Super Admin"?null:  <Button
              variant={"lightGray"}
              className="ml-auto mt-auto"
              onClick={() => router.push(`${pathname}/edit`)}
            >
              <PenSquare /> Edit
            </Button>
          ) : config && pathname?.includes("details") ? (
            <div className="ml-auto mt-auto">
              <Button
                variant={"red"}
                className="mx-1"
                onClick={() => openApproveReject("reject")}
              >
                Reject
              </Button>{" "}
              <Button
                variant={"black"}
                className="mx-1"
                onClick={() => openApproveReject("approve")}
              >
                Approve
              </Button>
            </div>
          ) : null
        ) : (
          !pathname.includes("Deletion") && (
            <Button
              className="ml-auto mt-auto"
              onClick={() => {
                if (pathname.includes("add")) {
                  router.push(`${pathname}/`);
                } else {
                  router.push(`${pathname}/add${cleanURL(pathItem)}`);
                }
              }}
            >
              Add {capitalizeString(pathItem)}
            </Button>
          )
        )}
      </div>
      <ConfirmationModal
        type="approve"
        title="Approve the request?"
        content="You are about to approve the request"
        isOpen={isOpenApproveConfirm}
        onClose={() => openApproveReject("approve")}
        confirmTitle="Approve"
        cancelTitle="Cancel"
        onConfirm={approveRejectFunc}
      />
      <ConfirmationModal
        type="reject"
        title="Reject the request?"
        content="You are about to reject the request."
        isOpen={isOpenRejectConfirm}
        onClose={() => openApproveReject("reject")}
        confirmTitle="Reject"
        cancelTitle="Cancel"
        onConfirm={approveRejectFunc}
      />
    </div>
  );
};

export default HeaderLinks;
