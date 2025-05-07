import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import CheckImage from "@/assets/images/check.svg";
import failedImage from "@/assets/images/x.svg";
import Image from "next/image";
interface messageToasterProps {
  title?: string;
  description: string;
  toastStyle: string;
  isSucceed: boolean;
  imgBorder: string;
  imgBg: string;
}
export default function MessageToaster({
  title,
  description,
  toastStyle,
  isSucceed,
  imgBg,
  imgBorder,
}: messageToasterProps) {
  return (
    <ToastProvider>
      <Toast className={`rounded-[24px] border ${toastStyle}`}>
        <div className="flex gap-1">
          <Image
            style={{
              borderColor: `${imgBorder}`,
              background: imgBg,
            }}
            className="rounded-[28px] border-[8px] h-fit p-[5px] mt-[5px] mr-[14px]"
            src={isSucceed ? CheckImage : failedImage}
            alt="Logo"
            width={30}
            height={30}
            priority
            loading="eager"
          />{" "}
          <div>
            <ToastTitle className="text-base font-semibold text-gray7">
              {title}
            </ToastTitle>
            <ToastDescription className="text-sm font-normal tex-gray7">
              {description}
            </ToastDescription>
          </div>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
