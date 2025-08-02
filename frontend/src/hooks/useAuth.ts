import { getUserApi } from "@/services/authService";
import { UserPayment } from "@/types/Payment";
import { Cart, User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, isLoading: isLaodingUser } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUserApi,
    retry: false,
  });

  const {
    user,
    cart,
    payments,
  }: { user: User; cart: Cart; payments: UserPayment[] } = data || {};

  return { user, cart, payments, isLaodingUser };
};
