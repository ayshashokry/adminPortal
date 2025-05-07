import { ColumnDef } from "@tanstack/react-table";
import { Merchant, Request, User, Setting, Role } from "./dashboard.interface"; // Import types from an interface file

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

// Column Definitions for Merchant
export const merchantColumns: ColumnDef<Merchant>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "company", header: "Company" },
];

// Column Definitions for Request
export const requestColumns: ColumnDef<Request>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "status", header: "Status" },
];

// Column Definitions for Settings (Example)
export const settingColumns: ColumnDef<Setting>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "settingName", header: "Setting Name" },
  { accessorKey: "value", header: "Value" },
];

// Column Definitions for Role (Example)
export const roleColumns: ColumnDef<Role>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "roleName", header: "Role Name" },
  { accessorKey: "permissions", header: "Permissions" },
];
