import Link from "next/link";
import AddProductForm from "../../_/components/AddProductForm";
import { FaArrowLeft } from "react-icons/fa";

function page() {
  return (
    <div>
      <div className="flex items-center justify-between max-w-md mt-1">
        <h1 className="font-semibold text-lg">اضافه کردن محصول</h1>
        <Link href="/admin/products" className="p-1">
          <FaArrowLeft className="size-4" />
        </Link>
      </div>
      <AddProductForm />
    </div>
  );
}

export default page;
