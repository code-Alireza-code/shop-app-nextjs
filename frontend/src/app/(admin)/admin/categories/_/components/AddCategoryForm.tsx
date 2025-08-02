"use client";

import TextField from "@/ui/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { z } from "zod";
import { useAddCategory } from "../hooks/useAddCategory";
import { Category } from "@/types/Category";
import { useEffect } from "react";
import { useEditCategory } from "../hooks/useEditCategory";

const errMessage = "این قسمت نباید خالی باشد !";

const validationSchema = z.object({
  title: z
    .string()
    .nonempty(errMessage)
    .min(4, "عنوان حداقل باید ۴ کاراکتر باشد !"),
  englishTitle: z
    .string()
    .nonempty(errMessage)
    .min(4, "عنوان انگلیسی حداقل باید ۴ کاراکتر باشد !"),
  description: z
    .string()
    .nonempty(errMessage)
    .min(4, "توضیحات حداقل باید ۶ کاراکتر باشد !"),
  type: z.string().nonempty(errMessage),
});

export type AddCategoryDataType = z.infer<typeof validationSchema>;

type Props = {
  category?: Category;
};

function AddCategoryForm({ category }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddCategoryDataType>({
    resolver: zodResolver(validationSchema),
    defaultValues: { type: "product" },
  });

  useEffect(() => {
    if (category) {
      reset({
        description: category.description,
        title: category.title,
        englishTitle: category.englishTitle,
        type: category.type,
      });
    }
  }, [reset, category]);

  const router = useRouter();
  const { addCategory, isAddingCategory } = useAddCategory();
  const { editCategory, isEditingCategory } = useEditCategory();

  const handleAddCategory = async (formData: AddCategoryDataType) => {
    if (category) {
      await editCategory(
        { data: formData, id: category._id },
        {
          onSuccess: () => {
            router.push("/admin/categories");
          },
        }
      );
    } else {
      await addCategory(formData, {
        onSuccess: () => {
          router.push("/admin/categories");
        },
      });
    }
  };
  return (
    <div className="max-w-md">
      <div className="flex items-center justify-between mt-1">
        <h1 className="font-semibold text-lg">افزودن دسته بندی</h1>
        <Link href="/admin/categories" className="p-1">
          <FaArrowLeft className="size-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleAddCategory)}
        className="flex flex-col space-y-6 mt-6"
      >
        <TextField {...register("title")} errors={errors} label="عنوان" />
        <TextField
          {...register("englishTitle")}
          errors={errors}
          label="عنوان انگلیسی"
          dir="ltr"
        />
        <TextField
          {...register("description")}
          errors={errors}
          label="توضیحات"
        />
        <TextField
          {...register("type")}
          errors={errors}
          label="نوع"
          readOnly
          dir="ltr"
          className="read-only:bg-gray-200"
        />
        <button
          type="submit"
          disabled={isAddingCategory || isEditingCategory}
          className="btn btn--primary disabled:bg-gray-400 disabled:shadow-none"
        >
          {category
            ? "ویرایش دسته بندی"
            : isEditingCategory
            ? "درحال ویرایش دسته بندی"
            : isAddingCategory
            ? "درحال ایجاد دسته بندی"
            : "ایجاد دسته بندی"}
        </button>
      </form>
    </div>
  );
}

export default AddCategoryForm;
