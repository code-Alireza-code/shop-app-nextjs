import { getAllCouponsApi } from "@/services/couponService";
import { Coupon } from "@/types/Coupon";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () => {
  const { data, isLoading: isLoadingCoupons } = useQuery({
    queryKey: ["all-coupons"],
    queryFn: getAllCouponsApi,
    retry: 2,
  });

  const { coupons }: { coupons: Coupon[] } = data || {};

  return { coupons, isLoadingCoupons };
};
