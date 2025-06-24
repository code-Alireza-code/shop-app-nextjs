"use client";
import { useGetUser } from "@/hooks/useAuth";
import toLocaleDateString from "@/utils/dateFormatter";

function ProfilePage() {
  const { user, isLaodingUser } = useGetUser();

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
    </div>
  );
}

export default ProfilePage;
