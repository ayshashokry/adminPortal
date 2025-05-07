import Image from "next/image";
import { ReactNode } from "react";
import logo from "@/assets/images/SalesFine.svg";
import loginImage from "@/assets/images/LoginImage.png";
// import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  headText: string;
  checkEmail?: string;
  i18n:{ language: string; changeLanguage: (lang: string) => void };
}

export default function AuthLayout({
  children,
  title,
  headText,
  checkEmail,i18n
}: AuthLayoutProps) {
  return (
    <div className="grid grid-cols-12 gap-4 w-full min-h-screen py-4">
      {/* Left Side (Image & Branding) */}
      <Globe
        onClick={() => i18n.changeLanguage(i18n.language == "en" ? "ar" : "en")}
        className=" cursor-pointer absolute right-2 top-2 z-50"
      />

      <div className="relative w-full h-full lg:col-span-5 lg:flex hidden lg:block items-center justify-center">
        <div className=" absolute left-[9%] w-[80%] rounded-[30px]">
          <Image
            src={loginImage}
            alt="SalesFine App"

            sizes="75vw"
            priority
            className="rounded-lg  w-[97%] h-[97vh]"
          />
        </div>
      </div>

      <div className="w-full col-span-12 lg:col-span-7 flex flex-col justify-center px-2 lg:px-20">
        <div>
          <Image
            src={logo}
            alt="Logo"
            width={195}
            height={52}
priority            className="pb-5 mb-4"
          />
          <h1 className="text-4xl font-semibold pt-10 pb-3 ">
            {title}
          </h1>
          <p className="pt-2 text-gray pb-4">
            {headText}
            {checkEmail && <span className="font-semibold"> {checkEmail}</span>}
          </p>
          <div className="w-full lg:w-4/5">
            {children}
            {/* <Modal title="Terms and Condition">
              <DialogTrigger className="text-red mt-16 text-center w-[100%] text-sm">
                {t("auth.termsConditions")} <span className="text-gray1"> {t("and")}</span>
                 {t("auth.privacyPolicy")}
              </DialogTrigger>
            </Modal> */}
          </div>
        </div>
      </div>
    </div>
  );
}
