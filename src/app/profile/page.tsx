import UserCard from "@components/profile/userCard";
import DashboardLayout from "../dashboard/layout";
import UserDetailsCard from "@components/profile/userDetailsCard";

export default function UserProfile() {
  return (
    <DashboardLayout>
      <div className="flex w-full">
        <div className="w-2/5 p-2">
          <UserCard />
        </div>
        <div className="w-3/5  p-2">
          <UserDetailsCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
