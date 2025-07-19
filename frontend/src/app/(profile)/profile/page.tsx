"use client";
import { useGetUser } from "@/hooks/useAuth";
import toLocaleDateString from "@/utils/dateFormatter";
import PaymentTable from "./_/components/PaymentTable";
import Link from "next/link";

function ProfilePage() {
  const { user, payments, isLaodingUser } = useGetUser();

  if (isLaodingUser) return <p>Loading...</p>;
  return (
    <div>
      <h1>{user.name} خوش آمدی !</h1>
      <span>
        تاریخ پیوستن :
        {toLocaleDateString(user.createdAt, "fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <div className="border rounded-xl p-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">آخرین سفارشات کاربر</h2>
          <Link
            href="/profile/payments"
            className="text-primary-900 hover:underline"
          >
            مشاهده همه سفارشات
          </Link>
        </div>
        <PaymentTable
          payments={payments
            .sort(
              (a, b) =>
                Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
            )
            .slice(0, 1)}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
