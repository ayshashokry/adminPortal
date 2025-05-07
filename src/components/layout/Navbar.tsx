"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { User, LogOut, ChevronDown, Globe } from "lucide-react";
import { getInitialsChars } from "@utils/helpers";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "./Loading";

export default function Navbar() {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const { i18n, t } = useTranslation("translation");
  const [isLoading, setLoading] = useState(false);
  const LogoutFunc = () => {
    setLoading(true);
    router.push('/auth/login')
    setTimeout(() => {
      setLoading(false);
      logout();
    }, 2000);
  };
  return isLoading ? (
    <Loading />
  ) : (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-[#EAECF0] shadow-sm z-50 py-3">
      <div className=" ml-auto pr-8 flex items-center justify-end">
        {/* Profile Dropdown */}
        <span
          onClick={() =>
            i18n?.changeLanguage(i18n.language == "en" ? "ar" : "en")
          }
          className=" cursor-pointer mx-2 flex"
        >
          {t("language")}
          <Globe className="mx-1" />

        </span>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              className="p-2 hover:bg-transparent focus-visible:ring-0"
            >
              <Avatar>
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>
                  {getInitialsChars(user?.name || "")}
                </AvatarFallback>
              </Avatar>
              <span>{user?.name}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white border rounded-lg shadow-lg w-48 p-2 mt-3 ml-3"
              align="end"
            >
              <DropdownMenu.Item
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <User size={16} />
                Profile
              </DropdownMenu.Item>
              {/* <DropdownMenu.Item className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <Settings size={16} />
                Settings
              </DropdownMenu.Item> */}
              <DropdownMenu.Separator className="h-px bg-gray3 my-1" />
              <DropdownMenu.Item
                className="flex items-center gap-2 p-2 text-red-500 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={LogoutFunc}
              >
                <LogOut size={16} />
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
}
