"use client";

import Loading from "@/ui/Loading";
import { useGetAllUsers } from "../_/hooks/useGetAllUsers";
import UsersTable from "../_/components/UsersTable";

function UsersPage() {
  const { users, isLoadingUsers } = useGetAllUsers();

  if (isLoadingUsers) return <Loading />;
  return (
    <div>
      <h1>اطلاعات کاربران</h1>
      <UsersTable users={users}/>
    </div>
  );
}

export default UsersPage;
