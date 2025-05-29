export const approveRejectConfigs = {
  accountDeletion: {
    endPoint: "/admin/user-deletion/",
    getPayload: (type: string, reason?: string) =>
      type == "approve"
        ? { status: "Active" }
        : {
            status: "Rejected",
            rejectReason: reason,
          },
  },
  merchantOnBoarding: {
    endPoint: "merchant/",
    getPayload: (type: "approve" | "reject", reason?: string) =>
      type == "approve"
        ? { status: "Active" }
        : {
            status: "Rejected",
            rejectReason: reason,
          },
  },
} as const;
