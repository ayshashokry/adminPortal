"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/images/SalesFine.svg";

import Image, { StaticImageData } from "next/image";
import { links } from "../../data/SidebarLinks";
import { usePathname } from "next/navigation";
interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ collapsed, toggleSidebar }: SidebarProps) {
  const linkElement = (
    name: string,
    href: string,
    icon: StaticImageData,
    isActive: boolean
  ) => {
    return (
      <Link
        key={href}
        href={href}
        className={`flex items-center py-2 px-1 rounded hover:bg-gray-800 transition-all ${
          collapsed ? "justify-center" : ""
        } ${isActive ? "bg-gray5 rounded-md" : "hover:bg-gray-800"}`}
      >
        <Image
          alt="icon"
          width={15}
          height={15}priority
          src={icon}
          className="w-6 h-6"  

        />

        <span
          className={`transition-all ${
            collapsed ? "hidden" : "mx-2"
          } text-black1`}
        >
          {name}
        </span>
      </Link>
    );
  };
  const pathname = usePathname();
  return (
    <div
      className={`z-[100] h-screen rounded-lg border border-gray-200 bg-white shadow-sm  p-4 transition-all ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {!collapsed && (
        <Image
          src={logo}
          alt="Logo"
          width={137}
          height={37}
          className="pl-3 mb-4"
          priority
          loading="eager"
        />
      )}
      {/* Toggle Button */}
      <div className="flex mb-4">
        {!collapsed && <span className="text-gray4 text-xs pt-1">Menu</span>}
        <button
          className={`bg-gray-800 rounded w-full flex focus-visible:ring-0 focus-visible:shadow-none focus:outline-none ${
            collapsed ? "justify-center" : "justify-end"
          } text-gray3`}
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={25} /> : <ChevronLeft size={25} />}
        </button>
      </div>
      {/* Links */}

      <nav className="space-y-2">
        {links.map(({ name, href, icon,dropDownLinks }) => {
          const isActive = pathname.startsWith(href);
          if (name === "Requests" && dropDownLinks) {
            return (
              <DropdownMenu.Root key={name}>
               <DropdownMenu.Trigger asChild>
  <button
    className={`flex items-center w-full py-2 px-1 rounded hover:bg-gray-800 transition-all ${
      collapsed ? "justify-center" : "justify-between"
    } ${isActive ? "bg-gray5 rounded-md" : "hover:bg-gray-800"} text-left`}
  >
    <div className="flex items-center">
      <Image
        alt="icon"
        width={15}
        height={15}
        src={icon}
        className="w-6 h-6"priority
      />
      {!collapsed && <span className="mx-2 text-black1">{name}</span>}
    </div>
    {!collapsed && <ChevronDown size={16} />}
  </button>
</DropdownMenu.Trigger>
        
                <DropdownMenu.Content
                  className="bg-white border rounded-lg shadow-lg w-64 p-2 mt-3 ml-3"
                  align="end"
                >
                  {dropDownLinks.map((dropLink) => (
                    <DropdownMenu.Item asChild key={dropLink.href}>
                      <Link
                        href={dropLink.href}
                        className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-md text-sm"
                      >
                        <Image
                          alt="Icon"
                          width={15}
                          height={15}
                          src={dropLink.icon}
                          className="w-5 h-5"priority
                        />
                        <span>{dropLink.name}</span>
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            );
          }
        
          return linkElement(name, href, icon, isActive);
        })}
      </nav>
    </div>
  );
}
