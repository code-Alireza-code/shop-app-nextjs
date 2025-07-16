"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { MdHome, MdPayments } from "react-icons/md";
import { useLogoutUser } from "../hooks/useLogoutUser";
import { useRouter } from "next/navigation";

function Sidebar() {
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
            href="/profile/me"
            className="flex items-center gap-x-2 px-1 py-2 rounded-lg hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out"
          >
            <FaUser className="size-5" />
            <span>اطلاعات کاربری</span>
          </Link>
        </li>
        <li>
          <Link
            href="/profile/payments"
            className="flex items-center gap-x-2 px-1 py-2 rounded-lg hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out"
          >
            <MdPayments className="size-5" />
            <span>سفارشات</span>
          </Link>
        </li>
        <li>
          <button
            className="flex items-center gap-x-1 text-red-500 disabled:text-gray-400"
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

export default Sidebar;
