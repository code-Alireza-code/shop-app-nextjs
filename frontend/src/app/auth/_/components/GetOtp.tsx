"use client";

import TextField from "@/ui/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useGetOtp } from "../hooks/useAuth";

const persianToEnglish = (str: string) =>
  str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

const validationSchema = z.object({
  phoneNumber: z
    .string()
    .nonempty({ error: "لطفا این قسمت را خالی نگذارید !" })
    .transform(persianToEnglish)
    .refine((val) => /^09\d{9}$/.test(val), {
      message: "شماره موبایل نامعتبر است !",
    }),
});

export type GetOtpformData = z.infer<typeof validationSchema>;

export type UseGetOtpResponseDataType = {
  message: string;
  expiresIn: number;
  phoneNumber: string;
};

type GetOtpProps = {
  setFormStep: Dispatch<SetStateAction<1 | 2>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
};
function GetOtp({ setFormStep, setPhoneNumber }: GetOtpProps) {
  const {
    register,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm<GetOtpformData>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    setFocus("phoneNumber");
  }, [setFocus]);

  const { getOtp, isGettingOtp } = useGetOtp();
  const handleCheckOtp = async (formData: GetOtpformData) => {
    await getOtp(formData, {
      onSuccess: (data: unknown) => {
        setFormStep(2);
        setPhoneNumber((data as UseGetOtpResponseDataType).phoneNumber);
      },
    });
  };

  return (
    <div className="border flex flex-col border-gray-200 rounded-lg py-8 px-6">
      <div className="font-bold text-2xl mb-6 text-center">نکس شاپ</div>
      <h1 className="text-right font-black mb-6 text-lg">ورود | ثبت نام</h1>
      <p className="text-black/60 text-sm">سلام !</p>
      <p className="text-black/60 text-sm mb-4">
        لطفا شماره موبایل خود را وارد کنید
      </p>
      <form
        className="flex flex-col gap-y-7"
        onSubmit={handleSubmit(handleCheckOtp)}
      >
        <TextField {...register("phoneNumber")} errors={errors} />
        <button
          disabled={isGettingOtp}
          type="submit"
          className="btn btn--primary w-full "
        >
          {isGettingOtp ? "درحال دریافت کد تایید" : " تایید"}
        </button>
      </form>
    </div>
  );
}

export default GetOtp;
