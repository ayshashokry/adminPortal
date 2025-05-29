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
import { Button } from "../ui/button";
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

  return (
    <Dialog
      open={isOpen}
      // onOpenChange={onClose}
    >
      <DialogContent className="p-5 max-w-72 text-center block">
        <div className="flex justify-center items-center">
          <Image
            src={DoneImage}
            alt="Logo"
            width={350}
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
        <Button onClick={onClose} className="mt-2">Continue</Button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
