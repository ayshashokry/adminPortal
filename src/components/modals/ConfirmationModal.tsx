"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@components/ui/dialog";
import { Button } from "../ui/button";
import { FetchList } from "@/api/fetchList";
import useAuthStore from "@/store/authStore";
interface ModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  confirmTitle: string;
  cancelTitle: string;
  onClose: () => void;
  type?: "approve" | "reject";
  onConfirm?: (
    type: "approve" | "reject",
    reason?: string
  ) => void | Promise<void>;
  onDeleteAccount?: () => void;
  isDeleteAccount?: boolean;
}

const ConfirmationModal: React.FC<ModalProps> = ({
  title,
  content,
  isOpen,
  onClose,
  confirmTitle,
  cancelTitle,
  type,
  onConfirm,
  onDeleteAccount,
  isDeleteAccount,
}) => {
  const [reasonValue, setReasonValue] = useState<string>("");
  const [reasonDescription, setReasonDescription] = useState<string>("");
  const [reasons, setReasons] = useState<any>([]);
  const onConfirmFunc = () => {
    isDeleteAccount
      ? onDeleteAccount?.()
      : type == "approve"
      ? onConfirm?.("approve")
      : onConfirm?.(
          "reject",
          reasonValue == "other" ? reasonDescription : reasonValue
        );
  };
  const { token } = useAuthStore();
  useEffect(() => {
    if (type == "reject") {
      const fetchReasons = async () => {
        const result = await FetchList({
          endPoint: `admin/rejection-reasons`,
          token,
        });

        if (result?.data) {
          setReasons(
            result?.data?.map((d: any) => d.rejectionReasonList).flat()
          );
        }
      };

      fetchReasons();
    }
    if (!isOpen) {
      setReasonValue("");
      setReasonDescription("");
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen}>
      <DialogContent className="p-5 max-w-xl text-left block">
        <DialogTitle className="text-lg font-bold not-italic text-gray7">
          {title}
        </DialogTitle>

        <DialogDescription className="text-sm font-normal not-italic text-gray7 pt-1 tracking-wider">
          {content}
        </DialogDescription>
        {type == "reject" && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
              Select reason
            </label>
            <select
              value={reasonValue || ""}
              className=" p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
              onChange={(e) => setReasonValue(e.target?.value)}
            >
              <option value="" disabled hidden>
                Select a reason
              </option>
              {reasons &&
                reasons?.map((r: any) => (
                  <option key={r?.rejectionReasonId} value={r?.rejectionReason}>
                    {r?.rejectionReason}
                  </option>
                ))}
              <option key={"0"} value={"other"}>
                Other
              </option>
            </select>
            {reasonValue == "other" && (
              <>
                {" "}
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Write the reason
                </label>{" "}
                <textarea
                  placeholder="Enter a description"
                  className="mt-3 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
                  value={reasonDescription}
                  onChange={(e) => setReasonDescription(e.target.value)}
                />
              </>
            )}
          </>
        )}
        <div className="float-right ">
          <Button onClick={onClose} className="mt-2 bg-white text-black">
            {cancelTitle}
          </Button>
          <Button
            onClick={onConfirmFunc}
            disabled={
              type == "reject" &&
              (reasonValue === "" ||
                (reasonValue === "other" && reasonDescription === ""))
            }
            className={`mt-2 mx-1 ${
              confirmTitle.includes("Delete") || type == "reject"
                ? "bg-red1 text-white"
                : ""
            }`}
          >
            {confirmTitle}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
