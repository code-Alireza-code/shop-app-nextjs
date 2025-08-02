"use client";

import { useLogoutUser } from "@/app/(profile)/profile/_/hooks/useLogoutUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBoxOpen, FaUser } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { MdCategory, MdDashboard, MdHome, MdPayments } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";

function AdminSidebar() {
  const { logout, isLogingOut } = useLogoutUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(undefined, {
      onSuccess: () => {
        setTimeout(() => {
          router.push("/");
        }, 1500);
      },
    });
  };

  return (
    <div>
      <ul className="flex flex-col space-y-4">
        <li>
          <Link
            href="/"
            className="flex items-center gap-x-1 px-1 py-2 rounded-lg  hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out"
          >
            <MdHome className="size-5" />
            <span>خانه</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin"
            className="flex items-center gap-x-1 px-1 py-2 rounded-lg  hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out"
          >
            <MdDashboard className="size-5" />
            <span>داشبورد</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/users"
            className="flex items-center gap-x-2 px-1 py-2 rounded-lg hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out"
          >
            <FaUser className="size-5" />
            <span>کاربران</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/products"
            className="flex items-center gap-x-2 px-1 py-2 rounded-lg hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out"
          >
            <FaBoxOpen className="size-5" />
            <span>محصولات</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/categories"
            className="flex items-center gap-x-2 px-1 py-2 rounded-lg hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out"
          >
            <MdCategory className="size-5" />
            <span>دسته بندی ها</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/coupons"
            className="flex items-center gap-x-2 px-1 py-2 rounded-lg hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out"
          >
            <RiCoupon3Fill className="size-5" />
            <span>کدهای تخفیف</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/payments"
            className="flex items-center gap-x-2 px-1 py-2 rounded-lg hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out"
          >
            <MdPayments className="size-5" />
            <span>سفارشات</span>
          </Link>
        </li>
        <li>
          <button
            className="flex items-center gap-x-2 text-red-500 disabled:text-gray-400 px-1 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all w-full duration-300 ease-out"
            type="button"
            onClick={handleLogout}
            disabled={isLogingOut}
          >
            <IoExit className="size-5" />
            <span>خروج از حساب</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
