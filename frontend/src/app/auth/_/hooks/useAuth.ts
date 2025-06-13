import { getOtpApi } from "@/services/authService";
import { BackendError } from "@/types/Error";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetOtp = () => {
  const { mutateAsync: getOtp, isPending: isGettingOtp } = useMutation({
    mutationFn: getOtpApi,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message, { duration: 15000 });
    },
    onError: (err: unknown) => {
      toast.success(
        (err as BackendError).response.data.message ||
          "خطا هنگام دریافت کد تایید"
      );
    },
  });

  return { getOtp, isGettingOtp };
};
