import { getAllUsersApi } from "@/services/adminService";
import { UserList } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  const { data, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsersApi,
    retry: 2,
  });

  const { users }: { users: UserList[] } = data || {};

  return { users, isLoadingUsers };
};
