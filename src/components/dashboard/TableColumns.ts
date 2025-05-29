import { ColumnDef } from "@tanstack/react-table";
import {
  Merchant,
  Request,
  User,
  Setting,
  Role,
  AccountDeletion,
  MerchantOnBoarding,
} from "./dashboard.interface"; // Import types from an interface file

// Column Definitions for User
export const userColumns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "adminRoleName",
    header: "Role",
    filterFn: (row, columnId, filterValue) => {
      return filterValue === "" || row.getValue(columnId) === filterValue;
    },
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
];


export const accountDeletionColumns: ColumnDef<AccountDeletion>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "requestedBy", header: "Requested By" },
  { accessorKey: "roleName", header: "Role" },
  { accessorKey: "RequestedAt", header: "Requested At" },
  { accessorKey: "status", header: "Status" },
];
export const merchantOnBoardingColumns: ColumnDef<MerchantOnBoarding>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "companyName", header: "Company Name" },
  { accessorKey: "crNumber", header: "CR Number" },
  { accessorKey: "ownerName", header: "Owner Name" },
  { accessorKey: "nationalIqamaId", header: "Nationail ID" },
  { accessorKey: "status", header: "Status" },
];
