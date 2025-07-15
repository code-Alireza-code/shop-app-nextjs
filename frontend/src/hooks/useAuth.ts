import { getUserApi } from "@/services/authService";
import { Cart, User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, isLoading: isLaodingUser } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUserApi,
    retry: false,
  });

  const { user, cart }: { user: User; cart: Cart } = data || {};

  return { user, cart, isLaodingUser };
};
