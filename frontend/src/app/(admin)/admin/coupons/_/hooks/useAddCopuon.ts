import { addCouponApi } from "@/services/couponService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddCoupon = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addCoupon, isPending: isAddingCoupon } = useMutation({
    mutationFn: addCouponApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-coupons"] });
      toast.success(data?.message || "کد تخفیف با موفقیت ایجاد شد !");
    },
    onError: (err: unknown) => {
      toast.error(
        (err as BackendError).response.data.message ||
          "خطا هنگام افزودن کد تخفیف!"
      );
    },
  });

  return { addCoupon, isAddingCoupon };
};
