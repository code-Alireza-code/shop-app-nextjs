"use client";

import { useParams } from "next/navigation";

function SinglePaymentPage() {
  const { paymentId } = useParams();
  console.log(paymentId);
  return <div>single payment page</div>;
}

export default SinglePaymentPage;
