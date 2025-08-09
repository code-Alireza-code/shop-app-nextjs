import { editCouponApi } from "@/services/couponService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEditCoupon = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: editCoupon, isPending: isEditingCoupon } = useMutation({
    mutationFn: editCouponApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-coupons"] });
      toast.success(data?.message || "کد تخفیف با موفقیت ویرایش شد !");
    },
    onError: (err: unknown) => {
      toast.error(
        (err as BackendError).response.data.message ||
          "خطا هنگام ویرایش کد تخفیف!"
      );
    },
  });

  return { editCoupon, isEditingCoupon };
};
