import { couponListTableTHeads } from "@/constants/tableHeads";
import { Coupon } from "@/types/Coupon";
import toLocaleDateString from "@/utils/dateFormatter";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";
import CouponActions from "./CouponActions";

type Props = {
  coupons: Coupon[];
};

function CouponsTable({ coupons }: Props) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {couponListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => {
            return (
              <tr key={coupon._id}>
                <td className="table__td">{index + 1}</td>
                <td className="table__td  whitespace-nowrap font-bold">
                  {coupon.code}
                </td>
                <td className="table__td">
                  <span className="badge badge--primary">
                    {coupon.type === "fixedPrice" ? "قیمت ثابت" : "درصد"}
                  </span>
                </td>
                <td className="table__td">
                  {toPersianNumbersWithComma(coupon.amount)}
                </td>
                <td className="table__td">
                  <div className="space-y-2 flex flex-col items-center">
                    {coupon.productIds.map((p) => {
                      return (
                        <span key={p._id} className="badge badge--secondary">
                          {p.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td">
                  {toPersianNumbers(coupon.usageCount.toString())}
                </td>
                <td className="table__td">
                  {toPersianNumbers(coupon.usageLimit.toString())}
                </td>
                <td className="table__td">
                  {toLocaleDateString(coupon.expireDate)}
                </td>
                <td className="table__td font-bold text-lg">
                  <CouponActions coupon={coupon} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CouponsTable;
