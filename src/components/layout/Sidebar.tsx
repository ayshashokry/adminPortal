"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

import Image, { StaticImageData } from "next/image";
import { links } from "../../data/SidebarLinks";
import { usePathname } from "next/navigation";
import { useState } from "react";
interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ collapsed, toggleSidebar }: SidebarProps) {
  const [isDropLinksOpen, setDropOpen] = useState<number | null>(null);
  const openLinks = (id: number) => {
    isDropLinksOpen == id ? setDropOpen(null) : setDropOpen(id);
  };
  const linkElement = (
    name: string,
    href: string,
    isActive: boolean,
    icon?: StaticImageData
  ) => {
    return (
      <Link
        key={href}
        href={href}
        className={`flex items-center py-2 px-1 rounded hover:bg-grayBasic-800 font-medium transition-all ${
          collapsed ? "justify-center" : ""
        } 
          ${isActive ? "bg-gray5 rounded-md" : "hover:bg-grayBasic-800"}`}
      >
        {icon && (
          <Image
            alt="icon"
            width={15}
            height={15}
            loading="lazy"
            src={icon}
            className="w-6 h-6"
          />
        )}
        <span
          className={`transition-all ${collapsed ? "hidden" : "mx-2"} ${
            isActive ? "text-black4" : "text-gray14 "
          }`}
        >
          {name}
        </span>
      </Link>
    );
  };
  const pathname = usePathname();
  return (
    <div
      className={`z-[50] max-h-screen overflow-y-scroll overflow-x-hidden rounded-lg border border-gray-200 bg-white shadow-sm  p-2 transition-all ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <Image
        src="/images/SalesFine.webp"
        alt="Logo"
        width={137}
        height={37}
        // className="pl-3 mb-4"
        priority
      />
      {/* Toggle Button */}
      <div className="flex mb-4">
        {!collapsed && <span className="text-gray4 text-xs pt-1">Menu</span>}
        <button
          className={`bg-grayBasic-800 rounded w-full flex focus-visible:ring-0 focus-visible:shadow-none focus:outline-none ${
            collapsed ? "justify-center" : "justify-end"
          } text-gray3`}
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={25} /> : <ChevronLeft size={25} />}
        </button>
      </div>
      {/* Links */}

      <nav className="space-y-2">
        {links.map(({ name, href, icon, dropDownLinks, id }) => {
          if (dropDownLinks) {
            return (
              <div key={id} className="mb-4">
                <p
                  className="flex cursor-pointer text-gray14 font-medium"
                  onClick={() => openLinks(id)}
                >
                  <Image
                    alt="icon"
                    width={15}
                    height={15}
                    loading="lazy"
                    src={icon}
                    className="w-6 h-6 ml-1 mr-2"
                  />
                  {name}{" "}
                  {id == isDropLinksOpen ? (
                    <ChevronUp className="ml-auto" />
                  ) : (
                    <ChevronDown className="ml-auto" />
                  )}
                </p>

                <ul className="ml-3 mt-2 ">
                  {id == isDropLinksOpen
                    ? dropDownLinks?.map((d, index) => (
                        <li className="" key={index}>
                          {linkElement(d.name, d.href, pathname == d.href)}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            );
          }

          return linkElement(name, href ?? "", pathname == href, icon);
        })}
      </nav>
    </div>
  );
}
