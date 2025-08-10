import { removeCouponApi } from "@/services/couponService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRemoveCoupon = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: removeCoupon, isPending: isRemovingCoupon } =
    useMutation({
      mutationFn: removeCouponApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["all-coupons"] });
        toast.success(data?.message || "کد تخفیف با موفقیت حذف شد !");
      },
      onError: (err: unknown) => {
        toast.error(
          (err as BackendError).response.data.message ||
            "خطا هنگام حذف کد تخفیف!"
        );
      },
    });

  return { removeCoupon, isRemovingCoupon };
};
