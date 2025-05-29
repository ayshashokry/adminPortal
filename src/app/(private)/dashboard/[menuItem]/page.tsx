"use client";
import { useParams } from "next/navigation";
import { dataKeys } from "@/data/MenuItemDetailsKeys";
import DashboardTable from "@/components/dashboard/DashboardTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import useFlashMessageStore from "@/store/useFlashMessageStore";
import MessageToaster from "@/components/modals/MessageToaster";

export default function DynamicDashboard() {
  const params = useParams();
  const menuItem = params?.menuItem;

  let menuObject = dataKeys.find((item) => item.detailsType === menuItem);

  const { message, clearMessage } = useFlashMessageStore();
  useEffect(() => {
    setTimeout(() => {
      clearMessage();
    }, 3000);
  }, [message, clearMessage, menuObject?.endPoint]);
  return (
    <>
      <DashboardTable
        endPoint={menuObject?.endPoint}
        listName={menuObject?.listName}
        columnFiltersProp={[]}
        columnsProps={menuObject?.columns as ColumnDef<Record<string, any>>[]}
        filters={menuObject?.filters}
        searchKey={menuObject?.searchKey}
        isExport={menuObject?.export}
      />
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
    </>
  );
}
