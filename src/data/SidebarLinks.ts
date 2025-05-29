// sidebarLinks.ts
import requestsIcon from "@/assets/images/sidemenu/folder-info.svg";
import merchantLeadsIcon from "@/assets/images/sidemenu/file-download.svg";
import merchantsIcon from "@/assets/images/sidemenu/merchant.svg";
import creditLineIcon from "@/assets/images/sidemenu/log-in.svg";
import vendorIcon from "@/assets/images/sidemenu/shopping-bag.svg";
import invoiceIcon from "@/assets/images/sidemenu/file.svg";
import creditNotesIcon from "@/assets/images/sidemenu/list.svg";
import transactionsIcon from "@/assets/images/sidemenu/book-closed.svg";
import notificationIcon from "@/assets/images/sidemenu/bell.svg";
import promotionsIcon from "@/assets/images/sidemenu/message-chat-square.svg";
import userSettingsIcon from "@/assets/images/sidemenu/users.svg";
import settingsIcon from "@/assets/images/sidemenu/settings.svg";

export const links = [
  {
    id: 0,
    name: "Requests",
    icon: requestsIcon,
    href: "",
    dropDownLinks: [
      {
        id: 1,
        name: "Merchan Onboarding",
        href: "/dashboard/merchantOnBoarging",
      },
      // {
      //   id: 2,
      //   name: "Vendor Onboarding",
      //   href: "/dashboard/vendorOnBoarging",
      // },
      // {
      //   id: 3,
      //   name: "Salesman Onboarding",
      //   href: "/dashboard/salesmanOnBoarging",
      // },
      {
        id: 4,
        name: "Account Deletion",
        href: "/dashboard/accountDeletion",
      },
    ],
  },
  {
    id: 2,
    name: "Merchants",
    icon: merchantsIcon,
    href: "/dashboard/merchant",
  },
  // {
  //   id: 1,
  //   name: "Merchant Leads",
  //   href: "/dashboard/merchantLeads",
  //   icon: merchantLeadsIcon,
  // },
  
  // {
  //   id: 3,
  //   name: "Credit Line",
  //   href: "/dashboard/creditLines",
  //   icon: creditLineIcon,
  // },
  // { id: 4, name: "Vendors", href: "/dashboard/vendors", icon: vendorIcon },
  // { id: 5, name: "Invoices", href: "/dashboard/invoices", icon: invoiceIcon },
  // {
  //   id: 6,
  //   name: "Credit Notes",
  //   href: "/dashboard/creditNotes",
  //   icon: creditNotesIcon,
  // },
  // {
  //   id: 7,
  //   name: "Transactions",
  //   href: "/dashboard/transactions",
  //   icon: transactionsIcon,
  // },
  // {
  //   id: 8,
  //   name: "Notification Center",
  //   href: "/dashboard/notificationCenter",
  //   icon: notificationIcon,
  // },
  // {
  //   id: 9,
  //   name: "Promotions",
  //   href: "/dashboard/promotions",
  //   icon: promotionsIcon,
  // },
  {
    id: 10,
    name: "User Settings",
    icon: userSettingsIcon,
    dropDownLinks: [
      {
        id: 1,
        name: "User Management",
        href: "/dashboard/user",
      },
      // {
      //   id: 2,
      //   name: "Roles and permessions",
      //   href: "/dashboard/roles",
      // },
    ],
  },
  // { id: 11, name: "Settings", href: "/dashboard/settings", icon: settingsIcon },
];
