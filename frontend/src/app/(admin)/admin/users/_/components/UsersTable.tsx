import { userListTableHeads } from "@/constants/tableHeads";
import { UserList } from "@/types/User";
import toLocaleDateString from "@/utils/dateFormatter";
import { toPersianNumbers } from "@/utils/numberFormatter";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { IoMdCheckbox, IoMdCloseCircle } from "react-icons/io";

type Props = {
  users: UserList[];
};

function UsersTable({ users }: Props) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {userListTableHeads.map((item) => (
              <th key={item.id} className="whitespace-nowrap table__th">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="table__td">{index + 1}</td>
              <td className="table__td whitespace-nowrap truncate">
                {user.name}
              </td>
              <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                {user.email}
              </td>
              <td className="table__td">
                <div className="flex items-center justify-center">
                  <span>{toPersianNumbers(user.phoneNumber)}</span>
                  <span>
                    {user.isVerifiedPhoneNumber ? (
                      <IoMdCheckbox className="size-5 text-green-500" />
                    ) : (
                      <IoMdCloseCircle className="size-5 text-red-500" />
                    )}
                  </span>
                </div>
              </td>
              <td className="table__td">
                <div className="inline-grid grid-cols-2 gap-2 max-w-content overflow-y-auto max-h-28 items-start">
                  {user.Products.map((product) => (
                    <span key={product._id} className="badge badge--secondary">
                      {product.title}
                    </span>
                  ))}
                </div>
              </td>
              <td className="table__td">
                {toLocaleDateString(user.createdAt)}
              </td>
              <td className="table__td">
                <Link href={`/admin/users/${user._id}`}>
                  <button className="p- rounded-full">
                    <FaEye className="text-primary-900 size-5" />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
