import { productListTableTHeads } from "@/constants/tableHeads";
import { Product } from "@/types/Product";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";
import Link from "next/link";

type Props = { products: Product[] };

function ProductsTable({ products }: Props) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {productListTableTHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td className="table__td">{index + 1}</td>
              <td className="table__td whitespace-nowrap truncate">
                {product.title}
              </td>
              <td className="table__td">{product.category.title}</td>
              <td className="table__td">
                {toPersianNumbersWithComma(product.price)}
              </td>
              <td className="table__td">
                <span className="badge badge--secondary">
                  {toPersianNumbers(product.discount.toString())} %
                </span>
              </td>
              <td className="table__td">
                {toPersianNumbersWithComma(product.offPrice)}
              </td>
              <td className="table__td">
                {toPersianNumbers(product.countInStock.toString())}
              </td>
              <td className="table__td">
                <Link
                  className="text-primary-900 hover:underline"
                  href={`/admin/products/${product._id}`}
                >
                  مشاهده جزئیات
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
