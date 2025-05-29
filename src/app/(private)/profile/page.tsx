"use client";
import UserCard from "@components/profile/userCard";
import UserDetailsCard from "@components/profile/userDetailsCard";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
import { FetchDetails } from "@/api/fetchDetails";
import Loading from "@/components/layout/Loading";
import DashboardLayout from "../dashboard/layout";

export default function UserProfile() {
  const { user, token } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["details", "admin/user", user?.id],
    queryFn: () =>
      FetchDetails({
        endPoint: "admin/user" as string,
        token,
        id: user?.id as string,
      }),
    enabled: !!user?.id && !!token,
  });
  return isLoading ? (
    <Loading />
  ) : (
    <DashboardLayout>
      <div className="flex w-full">
        <div className="w-2/5 p-2">
          <UserCard userData={data?.data?.data || {}} />
        </div>
        <div className="w-3/5  p-2">
          <UserDetailsCard userData={data?.data?.data || {}} />
        </div>
      </div>
    </DashboardLayout>
  );
}
