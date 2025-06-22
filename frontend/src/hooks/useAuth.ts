import { getUserApi } from "@/services/authService";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, isLoading: isLaodingUser } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUserApi,
    retry: false,
  });

  const { user }: { user: User } = data || {};

  return { user, isLaodingUser };
};
