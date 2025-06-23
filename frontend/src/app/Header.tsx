"use client";

import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";

function Header() {
  const { isLaodingUser, user } = useGetUser();
  return (
    <header
      className={`shadow-md mb-10 sticky top-0 transition-all duration-200 ${
        isLaodingUser ? "blur-md opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav>
        <ul className="flex items-center justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link href="/" className="block py-2">
              خانه
            </Link>
          </li>
          <li>
            <Link href="/products" className="block py-2">
              محصولات
            </Link>
          </li>
          <li>
            <Link href="/cart" className="block py-2">
              سبد خرید
            </Link>
          </li>
          <li>
            {user ? (
              <Link href={user.role === "ADMIN" ? "/admin" : "/profile"}>
                {user.name || "کاربر"}
              </Link>
            ) : (
              <Link href="/auth" className="block py-2">
                ورود
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
