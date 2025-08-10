"use client";

import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-y-4">
      <h1 className="text-7xl font-bold">404</h1>
      <h2 className="text-2xl ">صفحه ای که دنبالش بودید پیدا نشد !</h2>
      <div className="flex items-center justify-center gap-x-3">
        <button className="btn btn--primary" onClick={() => router.push("/")}>
          خانه
        </button>
        <button onClick={router.back} className="btn btn--secondary">
          برگشت به صفحه قبل
        </button>
      </div>
    </div>
  );
}

export default NotFound;
