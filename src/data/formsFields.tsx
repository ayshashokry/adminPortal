import { FormFieldInterface } from "@/hooks/auth/auth.interface";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  MobileIcon,
} from "@radix-ui/react-icons";
import { statusInfo } from "./MenuItemDetailsKeys";
import {
  dashboardFieldsInterface,
  statusesInterface,
} from "@/components/dashboard/dashboard.interface";
import { capitalizeString } from "@/utils/helpers";
import i18n from "@/lib/i18n";
import { UserIcon } from "lucide-react";

// Login form field configuration
export const loginFormFields: FormFieldInterface[] = [
  {
    id: 1,
    name: "email",
    label: capitalizeString(i18n.t("auth.email")),
    placeholder: i18n.t("auth.enterEmail"),
    type: "email",
    required: true,
    icon: <EnvelopeClosedIcon className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "password",
    label: capitalizeString(i18n.t("auth.password")),
    placeholder: i18n.t("auth.enterLogPassword"),
    type: "password",
    required: true,
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
];
//forget password fields
export const forgetPassFields: FormFieldInterface[] = [
  {
    id: 1,
    name: "email",
    label: capitalizeString("email"),
    placeholder: `Please enter your email`,
    type: "email",
    required: true,
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
];
//profile set password fields
export const profileSetPassFields: FormFieldInterface[] = [
  {
    id: 1,
    name: "oldPassword",
    label: "old password",
    placeholder: `Please enter your old password`,
    type: "password",
    required: true,
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "newPassword",
    label: "New Password",
    placeholder: `Please enter yout new password`,
    type: "password",
    required: true,
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: `Please enter confirm password`,
    type: "password",
    required: true,
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
];

//profile set password fields
export const unAuthSetPassFields: FormFieldInterface[] = [
  {
    id: 1,
    name: "newPassword",
    label: "Password",
    placeholder: `Please enter your password`,
    type: "password",
    required: true,
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "confirmPassword",
    label: "Rewrite Password",
    placeholder: `Please Rewrite Password`,
    type: "password",
    required: true,
    icon: <LockClosedIcon className="w-5 h-5" />,
  },
];
//otp Verification fields
export const editProfileFields: FormFieldInterface[] = [
  {
    id: 1,
    name: "profileImageId",
    label: capitalizeString("user photo"),
    type: "image",
    required: true,
  },
  {
    id: 2,
    name: "name",
    label: capitalizeString("name"),
    placeholder: `Please enter your name`,
    type: "text",
    required: true,
    icon: <UserIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "mobileNumber",
    label: capitalizeString("mobile number"),
    placeholder: `Please enter your mobile number`,
    type: "number",
    required: false,
    icon: <MobileIcon className="w-5 h-5" />,
  },
  {
    id: 4,
    name: "email",
    label: capitalizeString("email"),
    placeholder: `Please enter your email`,
    type: "email",
    required: false,
    icon: <EnvelopeClosedIcon className="w-5 h-5" />,
  },
  {
    id: 5,
    name: "dateOfBirth",
    label: capitalizeString("Date of birth"),
    placeholder: `Please enter your DOB`,
    type: "date",
    required: false,
  },
];
//add user
export const addUserFields: dashboardFieldsInterface[] = [
  {
    screenNumber: 1,
    screenName: "Company information",
    fields: [
      {
        id: 1,
        name: "name",
        label: "name",
        placeholder: "Please enter your name",
        type: "text",
        required: true,
        fullWidth: true,
      },
      {
        id: 2,
        name: "email",
        label: capitalizeString("email"),
        placeholder: "Please enter your email",
        type: "email",
        required: true,
      },

      {
        id: 3,
        name: "adminRoleId",
        label: "role",
        placeholder: "Please enter your role",
        type: "select",
        required: true,
        endPoint: "/admin/admin-roles",
        labelKey: "role",
        valueKey: "id",
      },
    ],
  },
];
export const statuses: statusesInterface[] = [
  { name: "Active", id: "Active" },
  { name: "Inactive", id: "Inactive" },
  { name: "AdminInvited", id: "AdminInvited" },
  { name: "Pending", id: "Pending" },
];
//edit user
export const editUserFields: dashboardFieldsInterface[] = [
  {
    screenNumber: 1,
    screenName: "",
    fields: [
      {
        id: 1,
        name: "profileImageId",
        label: "Proile picture",
        placeholder: "This will be displayed in your profile",
        type: "image",
        required: false,
        fullWidth: true,
      },
      {
        id: 2,
        name: "name",
        label: "name",
        placeholder: "Please enter your name",
        type: "text",
        required: true,
      },
      {
        id: 3,
        name: "email",
        label: capitalizeString("email"),
        placeholder: "Please enter your email",
        type: "email",
        required: true,
      },
      {
        id: 4,
        name: "mobileNumber",
        label: "Mobile number",
        placeholder: "Please enter mobile number",
        type: "text",
        required: false,
      },
      {
        id: 5,
        name: "adminRoleId",
        label: "role",
        placeholder: "Please enter your role",
        type: "select",
        required: true,
        endPoint: "/admin/admin-roles",
        labelKey: "role",
        valueKey: "id",
      },
      {
        id: 6,
        name: "status",
        label: "status",
        placeholder: "Please enter your status",
        type: "select",
        required: true,
        labelKey: "name",
        valueKey: "name",
        selectData: [...statuses].splice(0, 2),
      },
      {
        id: 7,
        name: "dateOfBirth",
        label: "date of birth",
        placeholder: "Please enter your date of birth",
        type: "date",
        required: false,
      },
    ],
  },
];

//add merchant
export const addMerchantFields: dashboardFieldsInterface[] = [
  {
    screenNumber: 1,
    screenName: "Company information",
    fields: [
      {
        id: 1,
        name: "crNumber",
        label: "CR number",
        placeholder: "Enter Commercial Registration Number",
        type: "text",
        required: false,
        fullWidth: true,
      },
      {
        id: 2,
        name: "taxId",
        label: "Tax ID",
        placeholder: "Enter your tax id",
        type: "text",
        required: true,
      },
      {
        id: 3,
        name: "companyName",
        label: "Company name",
        placeholder: "Enter Company name",
        type: "text",
        required: true,
      },

      {
        id: 4,
        name: "sector",
        label: "Sector",
        placeholder: "Select sector",
        type: "select",
        required: true,
        endPoint: "/admin/sectors",
        labelKey: "sector",
        valueKey: "id",
      },
      {
        id: 5,
        name: "companyEmail",
        label: "Company Email address",
        placeholder: "Enter Company Email Address",
        type: "email",
        required: true,
      },
      {
        id: 5,
        name: "billingEmail",
        label: "Billing Email address",
        placeholder: "Enter Billing Email Address",
        type: "email",
        required: true,
      },
    ],
  },
  {
    screenNumber: 2,
    screenName: "Address",
    fields: [
      {
        id: 1,
        name: "address",
        label: "Registered office address",
        placeholder: "Enter Registered office address",
        type: "text",
        required: false,
        fullWidth: true,
      },

      {
        id: 2,
        name: "region",
        label: "Region",
        placeholder: "Select region",
        type: "select",
        required: true,
        endPoint: "/admin/regions",
        labelKey: "region",
        valueKey: "id",
      },

      {
        id: 3,
        name: "district",
        label: "District",
        placeholder: "Select district",
        type: "select",
        required: true,
        endPoint: "/admin/districts",
        labelKey: "district",
        valueKey: "id",
      },

      {
        id: 4,
        name: "city",
        label: "City",
        placeholder: "Select city",
        type: "select",
        required: true,
        endPoint: "/admin/cities",
        labelKey: "city",
        valueKey: "id",
      },
      {
        id: 5,
        name: "map",
        label: "Select your location",
        placeholder: "",
        type: "map",
        required: false,
        endPoint: "",
      },
    ],
  },
  {
    screenNumber: 3,
    screenName: "Owner information",
    fields: [
      {
        id: 1,
        name: "nationalId",
        label: "National ID",
        placeholder: "Enter national ID",
        type: "text",
        required: true,
      },

      {
        id: 2,
        name: "dateOfBirth",
        label: "Date of birth",
        placeholder: "Select your DOB",
        type: "date",
        required: true,
      },

      {
        id: 3,
        name: "ownerName",
        label: "Owner Name",
        placeholder: "Enter owner name",
        type: "text",
        required: true,
      },

      {
        id: 4,
        name: "mobileNumber",
        label: "Mobile Number",
        placeholder: "Enter mobile number",
        type: "text",
        required: false,
      },
      {
        id: 5,
        name: "email",
        label: "Email Address",
        placeholder: "Enter Email Address",
        type: "email",
        required: false,
      },
    ],
  },
];
