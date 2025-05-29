import { FormFieldInterface } from "@/hooks/auth/auth.interface";
import { ColumnDef } from "@tanstack/react-table";

// types/dataTypes.ts

export interface dashboardFieldsInterface {
  screenNumber: number;
  screenName: string;
  fields: FormFieldInterface[];
}
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Merchant {
  id: number;
  storeName: string;
  owner: string;
}

export interface Request {
  id: number;
  status: string;
  type: string;
}

export interface AccountDeletion {
  id: number;
  status: string;
  requestedBy: string;
  RequestedAt: string;
  roleName: string;
}

export interface MerchantOnBoarding {
  id: number;
  companyName: string;
  crNumber: string;
  ownerName: string;
  nationalIqamaId: string;
  status: string;
}
export interface Setting {
  id: number;
  key: string;
  value: string;
}

export interface Role {
  id: number;
  roleName: string;
  permissions: string[];
}

export type DataMap = {
  user: User;
  merchants: Merchant;
  requests: Request;
  settings: Setting;
  roles: Role;
};

export interface statusesInterface {
  name: string;
  id: string;
}

export interface menuItemsKeysInterface {
  columns: ColumnDef<any>[] | undefined;
  listName: string | undefined;
  export: boolean;
  filters: {
    name: string;
    endPoint?: string;
    data?: any[];
    paramType?: string;
    paramName?: string;
    placeholder: string;
    paramWithID?: boolean;
  }[];
  searchKey: string;
  id: number;
  detailsType: string;
  endPoint: string;
  detailsEndPoint: string;
  addType?: string;
  editType?: string;
  addFields?: dashboardFieldsInterface[];
  editFields?: dashboardFieldsInterface[];
  detailsKeys?: {
    title?: string;
    keys: { title: string; accessor: string }[];
  }[];
  defaultValuesAdd?: any;
  defaultValuesEdit?: any;
  addSchema?: any;
  editSchema?: any;
}
