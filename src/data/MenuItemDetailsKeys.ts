// sidebarLinks.ts

export const dataKeys = [
  {
    id: 1,
    detailsType: "user",
    detailsKeys: [
      {
        title: "User Details",
        keys: [
          "profileImg",
          "name",
          "email",
          "adminRoleName",
          "mobileNumber",
          "dateOfBirth",
          "status",
        ],
      },
      { keys: ["createdAt", "createdByName"] },
    ],
    addFields: [],
    endPoint: "/admin/user",
  },

  {
    id: 2,
    detailsType: "merchantRequests",
    detailsKeys: [
      {
        title: "Company Information",
        keys: ["company name", "Cr number", "email address", "Tax id"],
      },
    ],
  },
];

export const statusInfo = [
  { name: "Active", bg: "#ECFDF3", color: "#067647", border: "#ABEFC6" },
  { name: "Invited", bg: "#FFFAEB", color: "#B54708", border: "#FEDF89" },
  { name: "AdminInvited", bg: "#FFFAEB", color: "#B54708", border: "#FEDF89" },
  { name: "InActive", bg: "#FEF3F2", color: "#B42318", border: "#FECDCA" },
  { name: "Inactive", bg: "#FEF3F2", color: "#B42318", border: "#FECDCA" },

];
