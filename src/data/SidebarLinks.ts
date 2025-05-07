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
  { name: "Requests", href: "/dashboard/requests", icon: requestsIcon,dropDownLinks:[
    {id:1,name:'Merchan Onboarding',icon:requestsIcon,href:'/dashboard/merchantOnBoarging'},
    {id:2,name:'Vendor Onboarding',icon:requestsIcon,href:'/dashboard/vendorOnBoarging'},
    {id:3,name:'Salesman Onboarding',icon:requestsIcon,href:'/dashboard/salesmanOnBoarging'},
    {id:4,name:'Account Deletion',icon:requestsIcon,href:'/dashboard/accountDeletion'}
  ] },
  {
    name: "Merchant Leads",
    href: "/dashboard/merchantLeads",
    icon: merchantLeadsIcon,
  },
  { name: "Merchants", href: "/dashboard/merchants", icon: merchantsIcon },
  { name: "Credit Line", href: "/dashboard/creditLines", icon: creditLineIcon },
  { name: "Vendors", href: "/dashboard/vendors", icon: vendorIcon },
  { name: "Invoices", href: "/dashboard/invoices", icon: invoiceIcon },
  {
    name: "Credit Notes",
    href: "/dashboard/creditNotes",
    icon: creditNotesIcon,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: transactionsIcon,
  },
  {
    name: "Notification Center",
    href: "/dashboard/notificationCenter",
    icon: notificationIcon,
  },
  { name: "Promotions", href: "/dashboard/promotions", icon: promotionsIcon },
  {
    name: "User Settings",
    href: "/dashboard/user",
    icon: userSettingsIcon,
  },
  { name: "Settings", href: "/dashboard/settings", icon: settingsIcon },
];
