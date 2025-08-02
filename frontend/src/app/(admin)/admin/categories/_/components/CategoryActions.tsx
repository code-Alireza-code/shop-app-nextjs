"use client";

import { Category } from "@/types/Category";
import Modal from "@/ui/Modal";
import Link from "next/link";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdEdit, MdInfo } from "react-icons/md";
import { useDeleteCategory } from "../hooks/useDeleteCategory";

type Props = {
  category: Category;
};

function CategoryActions({ category }: Props) {
  const [open, setOpen] = useState(false);
  const { deleteCategory, isDeletingCategory } = useDeleteCategory();
  const handleDeleteCategory = async () => {
    await deleteCategory(category._id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
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
      <button className="text-error" onClick={() => setOpen(true)}>
        <IoMdTrash className="size-5" />
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`آیا از حذف ${category.title} مطمئن هستید ؟`}
      >
        <div className="flex items-center justify-between gap-x-24">
          <button
            className="btn btn--secondary text-error border-error hover:bg-red-500/70 hover:text-white grow disabled:bg-gray-500 disabled:text-white disabled:border-none"
            onClick={handleDeleteCategory}
            disabled={isDeletingCategory}
          >
            {isDeletingCategory ? "در حال حذف" : "حذف شود"}
          </button>
          <button
            className="btn btn--primary grow"
            onClick={() => setOpen(false)}
          >
            لغو
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CategoryActions;
