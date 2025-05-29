import {
  addUserSchema,
  editUserSchema,
} from "@/hooks/dashboard/dashboardSchemas";
import { addUserFields, editUserFields, statuses } from "./formsFields";
import {
  accountDeletionColumns,
  merchantOnBoardingColumns,
  userColumns,
} from "@/components/dashboard/TableColumns";
import { menuItemsKeysInterface } from "@/components/dashboard/dashboard.interface";

// Key mappings for different entity types

export const dataKeys: menuItemsKeysInterface[] = [
  {
    id: 1,
    detailsType: "user",
    endPoint: "admin/user",
    export: false,
    detailsEndPoint: "admin/user",
    columns: userColumns,
    listName: "userList",
    addType: "addUser",
    editType: "user",
    searchKey: "keyword",
    filters: [
      {
        name: "adminRoleName",
        placeholder: "Role",
        endPoint: "admin/admin-roles",
        paramName: "adminRoleIds",
        paramType: "array",
        paramWithID: true,
      },
      {
        name: "status",
        placeholder: "Status",
        data: statuses,
        paramName: "statuses",
        paramType: "array",
      },
    ],
    addFields: addUserFields,
    editFields: editUserFields,
    defaultValuesAdd: { name: "", email: "", adminRoleId: "" },
    defaultValuesEdit: {
      name: "",
      email: "",
      adminRoleId: "",
      status: "",
      dateOfBirth: "",
      profileImageId: "",
      mobileNumber: "",
    },
    addSchema: addUserSchema,
    editSchema: editUserSchema,
    detailsKeys: [
      {
        title: "User Details",
        keys: [
          { title: "", accessor: "profileImageId" },
          { title: "Name", accessor: "name" },
          { title: "Email", accessor: "email" },
          { title: "Role", accessor: "adminRoleName" },
          { title: "Mobile Number", accessor: "mobileNumber" },
          { title: "Date of Birth", accessor: "dateOfBirth" },
          { title: "", accessor: "status" },
        ],
      },
      {
        keys: [
          { title: "Created At", accessor: "createdAt" },
          { title: "Created By", accessor: "createdByName" },
        ],
      },
    ],
  },
  {
    id: 2,
    detailsType: "accountDeletion",
    endPoint: "admin/users-deletion",
    export: true,
    columns: accountDeletionColumns,
    detailsEndPoint: "admin/user-deletion",
    listName: "accountDeletionList",
    searchKey: "search",

    filters: [
      {
        name: "from",
        placeholder: "From",
        paramName: "from",
        paramType: "date",
      },
      {
        name: "to",
        placeholder: "To",
        paramName: "to",
        paramType: "date",
      },
      {
        name: "roleName",
        placeholder: "Role",
        endPoint: "admin/admin-roles",
        paramName: "adminRoleIds",
        paramType: "array",
        paramWithID: true,
      },
    ],
    detailsKeys: [
      {
        title: "Account Details",
        keys: [
          { title: "", accessor: "url" },
          { title: "name", accessor: "name" },
          { title: "National/Iqama ID", accessor: "nationalIqamaId" },
          { title: "Access Type", accessor: "role" },
          { title: "Email Address", accessor: "email" },
          { title: "Birth Date", accessor: "dateOfBirth" },
          { title: "Mobile Number", accessor: "mobileNumber" },
          { title: "Branch", accessor: "branchName" },
          { title: "Status", accessor: "status" },
        ],
      },
      {
        keys: [
          { title: "Created At", accessor: "createdAt" },
          { title: "Requested At", accessor: "RequestedAt" },
        ],
      },
    ],
  },
  {
    id: 3,
    detailsType: "merchantOnBoarging",
    export: true,
    endPoint: "admin/merchants/onboarding",
    columns: merchantOnBoardingColumns,
    detailsEndPoint: "admin/user-deletion",
    listName: "merchantOnBoardingList",
    searchKey: "search",

    filters: [
      {
        name: "from",
        placeholder: "From",
        paramName: "from",
        paramType: "date",
      },
      {
        name: "to",
        placeholder: "To",
        paramName: "to",
        paramType: "date",
      },
    ],
    detailsKeys: [
      {
        title: "Account Details",
        keys: [
          { title: "Mercahant name", accessor: "organisationName" },
          { title: "National/Iqama ID", accessor: "nationalIqamaId" },
          { title: "Access Type", accessor: "role" },
          { title: "Email Address", accessor: "email" },
          { title: "Birth Date", accessor: "dateOfBirth" },
          { title: "Mobile Number", accessor: "mobileNumber" },
          { title: "Branch", accessor: "branchName" },
          { title: "Status", accessor: "status" },
        ],
      },
      {
        keys: [
          { title: "Created At", accessor: "createdAt" },
          { title: "Requested At", accessor: "RequestedAt" },
        ],
      },
    ],
  },
  {
    id: 4,
    detailsType: "merchants",
    endPoint: "admin/merchants",
    export: false,
    detailsEndPoint: "admin/merchants",
    columns: userColumns,
    listName: "merchantList",
    addType: "addMerchant",
    editType: "merchant",
    searchKey: "keyword",
    filters: [
      {
        name: "adminRoleName",
        placeholder: "Role",
        endPoint: "admin/admin-roles",
        paramName: "adminRoleIds",
        paramType: "array",
        paramWithID: true,
      },
      {
        name: "status",
        placeholder: "Status",
        data: statuses,
        paramName: "statuses",
        paramType: "array",
      },
    ],
    addFields: addUserFields,
    editFields: editUserFields,
    defaultValuesAdd: { name: "", email: "", adminRoleId: "" },
    defaultValuesEdit: {
      name: "",
      email: "",
      adminRoleId: "",
      status: "",
      dateOfBirth: "",
      profileImageId: "",
      mobileNumber: "",
    },
    addSchema: addUserSchema,
    editSchema: editUserSchema,
    detailsKeys: [
      {
        title: "Merchant Details",
        keys: [
          { title: "", accessor: "profileImageId" },
          { title: "Name", accessor: "name" },
          { title: "Email", accessor: "email" },
          { title: "Role", accessor: "adminRoleName" },
          { title: "Mobile Number", accessor: "mobileNumber" },
          { title: "Date of Birth", accessor: "dateOfBirth" },
          { title: "", accessor: "status" },
        ],
      },
      {
        keys: [
          { title: "Created At", accessor: "createdAt" },
          { title: "Created By", accessor: "createdByName" },
        ],
      },
    ],
  },
];

// Status color code mapping
export const statusInfo = [
  { name: "Active", bg: "#ECFDF3", color: "#067647", border: "#ABEFC6" },
  { name: "Invited", bg: "#FFFAEB", color: "#B54708", border: "#FEDF89" },
  { name: "AdminInvited", bg: "#FFFAEB", color: "#B54708", border: "#FEDF89" },
  { name: "InActive", bg: "#FEF3F2", color: "#B42318", border: "#FECDCA" },
  { name: "Inactive", bg: "#FEF3F2", color: "#B42318", border: "#FECDCA" },
  { name: "Pending", bg: "#FFFAEB", color: "#B93815", border: "#FEDF89" },
];
