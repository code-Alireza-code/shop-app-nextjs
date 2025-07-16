"use client";

import { userPaymentTHeads } from "@/constants/tableHeads";
import { useGetUser } from "@/hooks/useAuth";
import Loading from "@/ui/Loading";
import toLocaleDateString from "@/utils/dateFormatter";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";

function PaymentsPage() {
  const { user, payments, isLaodingUser } = useGetUser();

  if (isLaodingUser) return <Loading />;
  return (
    <div>
      <h1>سفارشات کاربر</h1>
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {userPaymentTHeads.map((item) => (
              <th className="whitespace-nowrap table__th" key={item.id}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td className="table__td">
                {toPersianNumbers((index + 1).toString())}
              </td>
              <td className="table__td">
                {toPersianNumbers(payment.invoiceNumber)}
              </td>
              <td className="table__td">{payment.description}</td>
              <td className="table__td">
                <div className="flex flex-col gap-y-1 items-start">
                  {payment.cart.productDetail.map((product) => (
                    <span
                      className="whitespace-nowrap-nowrap px-2 py-0.5 rounded-xl bg-secondary-700 text-white"
                      key={product._id}
                    >
                      {product.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="table__td">
                {toPersianNumbersWithComma(payment.amount)}
              </td>
              <td className="table__td">
                {toLocaleDateString(payment.createdAt)}
              </td>
              <td className="table__td">
                {payment.status === "COMPLETED" ? (
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded-xl">
                    موفق
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-xl">
                    ناموفق
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsPage;
