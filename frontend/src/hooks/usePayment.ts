import { getAllPaymentsApi } from "@/services/paymentService";
import { Payment } from "@/types/Payment";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPayments = () => {
  const { data, isLoading: isLoadingPayments } = useQuery({
    queryKey: ["all-payments"],
    queryFn: getAllPaymentsApi,
    retry: 2,
  });

  const { payments }: { payments: Payment[] } = data || {};

  return { payments, isLoadingPayments };
};
