"use client";

import { useGetUser } from "@/hooks/useAuth";
import Loading from "@/ui/Loading";
import PaymentTable from "../_/components/PaymentTable";

function PaymentsPage() {
  const { payments, isLaodingUser } = useGetUser();

  if (isLaodingUser) return <Loading />;
  return (
    <div>
      <h1>سفارشات کاربر</h1>
      <PaymentTable payments={payments} />
    </div>
  );
}

export default PaymentsPage;
