import { adminPaymentListTableTHeads } from "@/constants/tableHeads";
import { Payment } from "@/types/Payment";
import toLocaleDateString from "@/utils/dateFormatter";
import { toPersianNumbersWithComma } from "@/utils/numberFormatter";
import Link from "next/link";
import { MdInfo } from "react-icons/md";

type Props = {
  payments: Payment[];
};

function PaymentListTable({ payments }: Props) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {adminPaymentListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => {
            return (
              <tr key={payment._id}>
                <td className="table__td">{index + 1}</td>
                <td className="table__td  whitespace-nowrap truncate">
                  {payment.invoiceNumber}
                </td>
                <td className="table__td  max-w-[280px] whitespace-nowrap truncate">
                  {payment.description}
                </td>
                <td className="table__td  whitespace-nowrap truncate">
                  <div className="flex flex-col gap-y-2">
                    <span> {payment.user.name}</span>
                    <span> {payment.user.email}</span>
                    <span className="font-bold">
                      {payment.user.phoneNumber}
                    </span>
                  </div>
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start">
                    {payment.cart.productDetail.map((product) => {
                      return (
                        <span
                          className="badge badge--secondary"
                          key={product._id}
                        >
                          {product.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td font-bold text-lg">
                  {toPersianNumbersWithComma(payment.amount)}
                </td>
                <td className="table__td">
                  {toLocaleDateString(payment.createdAt)}
                </td>
                <td className="table__td">
                  {payment.status === "COMPLETED" ? (
                    <span className="badge badge--success">موفق</span>
                  ) : (
                    <span className="badge badge--error">ناموفق</span>
                  )}
                </td>
                <td className="table__td">
                  <div>
                    <Link
                      href={`/admin/payments/${payment._id}`}
                      className="flex justify-center"
                    >
                      <MdInfo className="size-5 text-primary-900" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default PaymentListTable;
