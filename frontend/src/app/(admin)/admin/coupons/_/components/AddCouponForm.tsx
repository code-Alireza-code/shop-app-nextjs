"use client";

import { useGetAllProducts } from "@/hooks/useProduct";
import Radio from "@/ui/Radio";
import TextField from "@/ui/TextField";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import DatePicker from "react-multi-date-picker";
import solarHijri from "react-date-object/calendars/persian";
import farsi from "react-date-object/locales/persian_fa";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});
import makeAnimated from "react-select/animated";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddCoupon } from "../hooks/useAddCopuon";
import { useRouter } from "next/navigation";
import { Coupon } from "@/types/Coupon";
import { useEffect } from "react";
import { useEditCoupon } from "../hooks/useEditCoupon";

const requiredError = "این قسمت نباید خالی باشد !";
const persianToEnglish = (str: string) =>
  str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

const numberSchema = z
  .string()
  .nonempty(requiredError)
  .regex(/^[\d۰-۹]+$/, { message: "فقط عدد وارد کنید!" })
  .transform((val) => Number(persianToEnglish(val)))
  .transform((val) => val.toString());

const validationSchema = z.object({
  type: z.enum(["fixedPrice", "percent"], {
    invalid_type_error: requiredError,
  }),
  amount: numberSchema,
  code: z.string().nonempty(requiredError),
  usageLimit: numberSchema,
  productIds: z.array(z.string()).nonempty(requiredError),
  expireDate: z.string().nonempty(requiredError),
});

export type AddCouponFormDataType = z.infer<typeof validationSchema>;

type Props = {
  coupon?: Coupon;
};

function AddCouponForm({ coupon }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AddCouponFormDataType>({
    defaultValues: {
      expireDate: new Date().toISOString(),
      productIds: [],
    },
    resolver: zodResolver(validationSchema),
  });
  const { products } = useGetAllProducts();
  const productOptions = products?.map((p) => {
    return { value: p._id, label: p.title };
  });

  useEffect(() => {
    if (coupon) {
      reset({
        amount: coupon.amount.toString(),
        code: coupon.code,
        expireDate: coupon.expireDate,
        productIds: coupon.productIds.map((pId) => pId._id),
        type: coupon.type,
        usageLimit: coupon.usageLimit.toString(),
      });
    }
  }, [reset, coupon]);

  const { addCoupon, isAddingCoupon } = useAddCoupon();
  const { editCoupon, isEditingCoupon } = useEditCoupon();
  const router = useRouter();

  const handleAddCoupon = async (formData: AddCouponFormDataType) => {
    if (coupon) {
      await editCoupon(
        { data: formData, couponId: coupon._id },
        {
          onSuccess: () => {
            router.push("/admin/coupons");
          },
        }
      );
    } else {
      await addCoupon(formData, {
        onSuccess: () => {
          router.push("/admin/coupons");
        },
      });
    }
  };

  return (
    <div className="max-w-md">
      <div className="flex items-center justify-between mt-1">
        <h1 className="font-semibold text-lg">
          {coupon ? "ویرایش کد تخفیف" : "افزودن کد تخفیف"}
        </h1>
        <Link href="/admin/coupons" className="p-1">
          <FaArrowLeft className="size-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleAddCoupon)}
        className="flex flex-col space-y-6 mt-6"
      >
        <div className="flex flex-col">
          <label htmlFor="type">نوع تخفیف:</label>
          <div className="flex items-center justify-around w-full">
            <Radio
              {...register("type")}
              value="percent"
              label="درصد"
              id="percent"
            />
            <Radio
              {...register("type")}
              value="fixedPrice"
              label="قیمت ثابت"
              id="fixedPrice"
            />
          </div>
          {errors && errors.type && (
            <span className="text-error mt-1 text-xs block">
              {errors.type?.message as string}
            </span>
          )}
        </div>
        <TextField
          {...register("amount")}
          label="مقدار تخفیف"
          errors={errors}
        />
        <TextField {...register("code")} label="کد تخفیف" errors={errors} />
        <TextField
          {...register("usageLimit")}
          label="تعداد کوپن ها"
          errors={errors}
        />
        <div className="flex flex-col gap-y-1">
          <div className="flex flex-col gap-y-1">
            <label
              className="text-secondary-900 text-sm"
              htmlFor="react-select-products"
            >
              کالاهای شامل تخفیف
            </label>
            <Controller
              name="productIds"
              control={control}
              render={({ field }) => (
                <Select
                  id="react-select-products"
                  isMulti
                  isSearchable
                  placeholder="افزودن کالا ها ..."
                  components={makeAnimated()}
                  options={productOptions}
                  className="text-sm"
                  classNamePrefix="tw-select"
                  value={
                    productOptions &&
                    productOptions.filter((opt) =>
                      field.value?.includes(opt.value)
                    )
                  }
                  onChange={(selected) => {
                    return field.onChange(
                      selected && Array.isArray(selected)
                        ? selected.map((opt) => opt.value)
                        : []
                    );
                  }}
                />
              )}
            />
            {errors && errors.productIds && (
              <span className="text-error mt-1 text-xs block">
                {errors.productIds?.message as string}
              </span>
            )}
          </div>
          <label className="text-secondary-900 text-sm" htmlFor="date-picker">
            تاریخ انقضا کد تخفیف
          </label>
          <Controller
            name="expireDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={(date) =>
                  field.onChange(
                    date?.isValid ? new Date(date.toDate()).toISOString() : ""
                  )
                }
                calendar={solarHijri}
                locale={farsi}
                calendarPosition="bottom-right"
                inputClass="textField__input"
                id="date-picker"
                format="YYYY/MM/DD"
                placeholder="تاریخ انقضا"
                style={{ direction: "ltr" }}
                portal
                minDate={new Date()}
              />
            )}
          />
          {errors && errors.expireDate && (
            <span className="text-error mt-1 text-xs block">
              {errors.expireDate?.message as string}
            </span>
          )}
        </div>
        <button
          className="btn btn--primary disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
          disabled={isAddingCoupon || isEditingCoupon}
        >
          {coupon
            ? isEditingCoupon
              ? "درحال ویرایش کد تخفیف"
              : "ویرایش کد تخفیف"
            : isAddingCoupon
            ? "درحال ایجاد کد تخفیف"
            : "ایجاد کد تخفیف"}
        </button>
      </form>
    </div>
  );
}
export default AddCouponForm;
