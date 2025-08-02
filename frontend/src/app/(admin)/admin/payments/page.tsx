"use client";
import { useGetAllPayments } from "@/hooks/usePayment";
import Loading from "@/ui/Loading";
import PaymentListTable from "./_/components/PaymentsListTable";

function AdminPaymentsPage() {
  const { payments, isLoadingPayments } = useGetAllPayments();

  if (isLoadingPayments) return <Loading />;
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold mb-5">سفارشات</h1>
      </div>
      <PaymentListTable payments={payments} />
    </div>
  );
}

export default AdminPaymentsPage;
