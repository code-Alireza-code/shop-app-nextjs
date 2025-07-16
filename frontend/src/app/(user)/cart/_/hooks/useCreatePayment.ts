import { createPaymentApi } from "@/services/paymentService";
import { BackendError } from "@/types/Error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createPayment, isPending: isCreatingPayment } =
    useMutation({
      mutationFn: createPaymentApi,
      onSuccess: (data) => {
        toast.success(data.message || "خرید با موفقیت انجام شد!");
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      },
      onError: (err: unknown) => {
        toast.error(
          (err as BackendError).response.data.message ||
            "خطا هنگام تکمیل فرایند خرید !"
        );
      },
    });

  return { createPayment, isCreatingPayment };
};
