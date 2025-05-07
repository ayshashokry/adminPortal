"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@components/ui/dialog";
import DoneImage from "@/assets/images/Done.svg";
import Image from "next/image";
interface ModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<ModalProps> = ({
  title,
  content,
  isOpen,
  onClose,
}) => {

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 7000);

      return clearTimeout(timer);
    }
  }, [isOpen,onClose]);
  return (
    <Dialog
      open={isOpen}
      // onOpenChange={onClose}
    >
      <DialogContent className="p-5 max-w-64 text-center block">
        <div className="flex justify-center items-center">
          <Image
            src={DoneImage}
            alt="Logo"
            width={200}
            height={100}
            className=""
            priority
            loading="eager"
          />
        </div>
        <DialogTitle className="text-lg font-bold not-italic text-gray7">
          {title}
        </DialogTitle>

        <DialogDescription className="text-sm font-normal not-italic text-gray7 pt-1 tracking-wider">
          {content}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
