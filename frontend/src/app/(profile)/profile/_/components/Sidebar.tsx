import Link from "next/link";

function Sidebar() {
  return (
    <div>
      <ul className="flex flex-col space-y-8">
        <li>
          <Link href="/">خانه</Link>
        </li>
        <li>
          <Link href="/profile/me">اطلاعات کاربری</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
