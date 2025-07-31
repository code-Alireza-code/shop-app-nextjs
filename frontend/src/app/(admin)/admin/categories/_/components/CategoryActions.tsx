import { Category } from "@/types/Category";
import Link from "next/link";
import { IoMdTrash } from "react-icons/io";
import { MdEdit, MdInfo } from "react-icons/md";

type Props = {
  category: Category;
};

function CategoryActions({ category }: Props) {
  return (
    <div className="flex items-center justify-center gap-x-4">
      <Link
        className="text-primary-900 "
        href={`/admin/categories/${category._id}`}
      >
        <MdInfo className="size-5" />
      </Link>
      <Link
        href={`/admin/categories/edit/${category._id}`}
        className="text-green-500"
      >
        <MdEdit className="size-5" />
      </Link>
      <button className="text-error">
        <IoMdTrash className="size-5" />
      </button>
    </div>
  );
}

export default CategoryActions;
