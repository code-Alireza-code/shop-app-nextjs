import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-5xl mt-8 font-semibold">فروشگاه نکس شاپ</h1>
      <p className="text-lg">
        اینجا میتونی تمام وسایل الکترونیکی دلخواهت رو با بهترین قیمت بخری😉
      </p>
      <Link href="/products">
        <button className="btn btn--primary ">بزن بریم</button>
      </Link>
    </div>
  );
}
