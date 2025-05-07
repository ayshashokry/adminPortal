"use client";
import { useState } from "react";
import Sidebar from "@components/layout/Sidebar";
import Navbar from "@components/layout/Navbar";
import dynamic from "next/dynamic";

const HeaderLinks = dynamic(
  () => import("@/components/dashboard/HeaderLinks"),
  { ssr: false }
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray8">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={() => setCollapsed(!collapsed)}
      />

      {/* Main Content Resizes */}
      <main
        className={`p-6 transition-all ${
          collapsed ? "w-full" : "w-[calc(100%-15rem)]"
        } overflow-y-auto relative`}
      >
        <Navbar />

        <div className="rounded-md border-[1px] bg-white border-gray2 p-5 mt-16 ">
          <HeaderLinks />
          {children}
        </div>
      </main>
    </div>
  );
}
