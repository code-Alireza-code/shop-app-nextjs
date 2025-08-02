"use client";

import TextField from "@/ui/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { z } from "zod";
import { useAddCategory } from "../hooks/useAddCategory";

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

function AddCategoryForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddCategoryDataType>({
    resolver: zodResolver(validationSchema),
    defaultValues: { type: "product" },
  });
  const router = useRouter();
  const { addCategory, isAddingCategory } = useAddCategory();

  const handleAddCategory = async (formData: AddCategoryDataType) => {
    await addCategory(formData, {
      onSuccess: () => {
        router.push("/admin/categories");
      },
    });
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
          disabled={isAddingCategory}
          className="btn btn--primary disabled:bg-gray-400 disabled:shadow-none"
        >
          {isAddingCategory ? "درحال ارسال اطلاعات..." : "ایجاد دسته بندی"}
        </button>
      </form>
    </div>
  );
}

export default AddCategoryForm;
