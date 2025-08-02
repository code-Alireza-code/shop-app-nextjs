import { userPaymentTHeads } from "@/constants/tableHeads";
import { UserPayment } from "@/types/Payment";
import toLocaleDateString from "@/utils/dateFormatter";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";

type Props = {
  payments: UserPayment[];
};

function PaymentTable({ payments }: Props) {
  return (
    <div className="shadow-sm overflow-auto my-8">
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
              <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                {payment.description}
              </td>
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

export default PaymentTable;
