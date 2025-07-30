"use client";

import { useGetAllCategories } from "@/hooks/useCategory";
import Select from "@/ui/Select";
import TextField from "@/ui/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import { z } from "zod";
import { useAddProduct } from "../hooks/useAddProduct";
import { useRouter } from "next/navigation";
import { Product } from "@/types/Product";
import { useEditProduct } from "../hooks/useEditProduct";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const errMessage = "این قسمت نباید خالی باشد !";

const persianToEnglish = (str: string) =>
  str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

const numberSchema = z
  .string()
  .nonempty(errMessage)
  .regex(/^[\d۰-۹]+$/, { message: "فقط عدد وارد کنید!" })
  .transform((val) => Number(persianToEnglish(val)))
  .transform((val) => val.toString());

const validationSchema = z.object({
  title: z.string().nonempty(errMessage),
  description: z.string().nonempty(errMessage),
  slug: z
    .string()
    .nonempty(errMessage)
    .regex(/^\/[a-z0-9]+(-[a-z0-9]+)*$/, {
      message:
        "فرمت اسلاگ وارد شده صحیح نیست;باید یک / در ابتدا باشد و همچنین فقط از حروف کوچک انگلیسی و - استفاده کنید !",
    }),
  tags: z.array(z.string()).optional(),
  brand: z.string().nonempty(errMessage),
  price: numberSchema,
  discount: z
    .string()
    .nonempty(errMessage)
    .regex(/^[\d۰-۹]+$/, { message: "فقط عدد وارد کنید!" })
    .transform((val) => Number(persianToEnglish(val)))
    .refine((val) => val >= 0 && val <= 100, {
      message: "تخفیف باید بین ۰ تا ۱۰۰ باشد!",
    })
    .transform((val) => val.toString()),
  offPrice: numberSchema,
  countInStock: numberSchema,
  category: z.string().nonempty("یک دسته بندی انتخاب کنید !"),
  imageLink: z.string().nonempty(errMessage),
});

export type AddProductDataType = z.infer<typeof validationSchema>;

type Props = {
  product?: Product;
};

function AddProductForm({ product }: Props) {
  const isOnEditMode = Boolean(product);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    reset,
  } = useForm<AddProductDataType>({
    resolver: zodResolver(validationSchema),
    defaultValues: { imageLink: `image${Date.now()}.png` },
  });

  useEffect(() => {
    if (isOnEditMode) {
      reset({
        title: product?.title,
        brand: product?.brand,
        category: product?.category._id,
        countInStock: product?.countInStock.toString(),
        description: product?.description,
        discount: product?.discount.toString(),
        imageLink: product?.imageLink,
        offPrice: product?.offPrice.toString(),
        price: product?.price.toString(),
        slug: product?.slug,
        tags: product?.tags,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnEditMode, reset]);
  const router = useRouter();
  const { addProduct, isAddingProduct } = useAddProduct();
  const { editProduct, isEditingProduct } = useEditProduct();

  const { categories } = useGetAllCategories();
  const categoryOptions = categories?.map((category) => ({
    _id: category._id,
    title: category.title,
  }));

  const price = watch("price");
  const discount = watch("discount");

  useEffect(() => {
    const priceNum = Number(price);
    const discountNum = Number(discount);
    if (!isNaN(priceNum) && !isNaN(discountNum)) {
      const offPrice = Math.round(
        priceNum - (priceNum * discountNum) / 100
      ).toString();
      return setValue && setValue("offPrice", offPrice);
    }
  }, [price, discount, setValue]);

  const handleAddProduct = async (formData: AddProductDataType) => {
    if (isOnEditMode) {
      await editProduct(
        { data: formData, productId: product?._id as string },
        {
          onSuccess: () => {
            router.push("/admin/products");
          },
        }
      );
    } else {
      await addProduct(formData, {
        onSuccess: () => {
          router.push("/admin/products");
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between max-w-md mt-1">
        <h1 className="font-semibold text-lg">
          {isOnEditMode ? "ویرایش محصول" : "اضافه کردن محصول"}
        </h1>
        <Link href="/admin/products" className="p-1">
          <FaArrowLeft className="size-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="max-w-md flex flex-col space-y-6 mt-6"
      >
        <TextField {...register("title")} errors={errors} label="عنوان پست" />
        <TextField
          {...register("description")}
          errors={errors}
          label="توضیحات پست"
        />
        <TextField
          {...register("slug")}
          dir="ltr"
          errors={errors}
          label="اسلاگ"
        />
        <TextField {...register("brand")} errors={errors} label="برند" />
        <div>
          <span>تگ ها</span>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagsInput
                value={field.value || []}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
              />
            )}
          />
        </div>
        <TextField
          {...register("price")}
          dir="ltr"
          errors={errors}
          label="قیمت"
        />
        <TextField
          {...register("discount")}
          errors={errors}
          label="تخفیف (به درصد)"
          dir="ltr"
        />
        <TextField
          {...register("offPrice")}
          errors={errors}
          label="قیمت پس از تخفیف"
          readOnly
          className="read-only:bg-gray-200"
          dir="ltr"
        />
        <TextField
          {...register("countInStock")}
          errors={errors}
          label="موجودی"
          dir="ltr"
        />
        <TextField
          {...register("imageLink")}
          errors={errors}
          label="لینک عکس"
          readOnly
          className="read-only:bg-gray-200"
          dir="ltr"
        />
        <Select
          {...register("category")}
          label="دسته بندی"
          defaultOption
          errors={errors}
          options={categoryOptions}
        />
        <button
          className="btn btn--primary disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
          disabled={isAddingProduct || isEditingProduct}
        >
          {isOnEditMode
            ? isEditingProduct
              ? "درحال ویرایش محصول"
              : "ویرایش محصول"
            : isAddingProduct
            ? "در حال ارسال اطلاعات"
            : "افزودن محصول"}
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
