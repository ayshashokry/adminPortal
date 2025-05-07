"use client";
import { usePathname } from "next/navigation";
import {
  userColumns,
  merchantColumns,
  requestColumns,
  settingColumns,
  roleColumns,
} from "@components/dashboard/TableColumns";


import dynamic from "next/dynamic";
import Loading from "@/components/layout/Loading";
const DashboardTable = dynamic(
  () => import("@/components/dashboard/DashboardTable"),
  { ssr: false, loading: () => <Loading /> }
);
import { ColumnDef } from "@tanstack/react-table";

export default function DynamicDashboard() {
  const pathname = usePathname();

  let columns: ColumnDef<any>[] | undefined;
  let endpoint: string;
  let listName: string;
  let filters: string[];

  switch (pathname) {
    case "/dashboard/user":
      columns = userColumns;
      endpoint = "admin/user";
      listName = "userList";
      filters = ["adminRoleName", "status"];
      break;
    case "/dashboard/merchants":
      columns = merchantColumns;
      endpoint = "merchants";
      listName = "merchantList";
      filters = ["status", "name"];

      break;
    case "/dashboard/requests":
      columns = requestColumns;
      endpoint = "requests";
      listName = "requestList";
      filters = ["email", "name"];

      break;
    case "/dashboard/settings":
      columns = settingColumns;
      endpoint = "settings";
      listName = "settingList";
      filters = ["email", "name"];

      break;
    case "/dashboard/roles":
      columns = roleColumns;
      endpoint = "roles";
      listName = "roleList";
      filters = ["email", "name"];

      break;
    default:
      columns = userColumns; // Default to users
      endpoint = "admin/user";
      listName = "userList";
      filters = ["adminRoleName", "status"];
  }

  return (
    <DashboardTable
      endPoint={endpoint}
      listName={listName}
      columnFiltersProp={[]}
      columnsProps={columns as ColumnDef<Record<string,any>>[]}
      filters={filters}
    />
  );
}

// columnsProps={columns as ColumnDef<User>[]}
