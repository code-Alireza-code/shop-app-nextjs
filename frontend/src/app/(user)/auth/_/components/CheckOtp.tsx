"use client";

import TextField from "@/ui/TextField";
import { toPersianNumbers } from "@/utils/numberFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { z } from "zod/v4";
import { useCheckOtp, useGetOtp } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

const COUNTER_TIME = 90;

const validationSchema = z.object({
  otp: z
    .string()
    .nonempty({ error: "لطفا این قسمت را خالی نگذارید !" })
    .length(6, { error: "کد تایید باید ۶ رقم باشد !" }),
});

export type CheckOtpformData = z.infer<typeof validationSchema>;

type CheckOtpProps = {
  setFormStep: Dispatch<SetStateAction<1 | 2>>;
  phoneNumber: string;
};

function CheckOtp({ setFormStep, phoneNumber }: CheckOtpProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<CheckOtpformData>({ resolver: zodResolver(validationSchema) });
  const [counter, setCounter] = useState(COUNTER_TIME);
  const { getOtp } = useGetOtp();
  const { checkOtp, isCheckingOtp } = useCheckOtp();
  const router = useRouter();

  useEffect(() => {
    setFocus("otp");
  }, [setFocus]);

  useEffect(() => {
    if (counter > 0)
      setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
  }, [counter]);

  const handleResendOtp = async () => {
    await getOtp(
      { phoneNumber },
      { onSuccess: () => setCounter(COUNTER_TIME) }
    );
  };

  const handleCheckOtp = async (formdata: CheckOtpformData) => {
    await checkOtp(
      { ...formdata, phoneNumber },
      {
        onSuccess: ({ user }) => {
          if (user.isActive) {
            router.push("/");
            return window.location.reload();
          }
          router.push("/complete-profile");
        },
      }
    );
  };

  return (
    <div className="border flex flex-col border-gray-200 rounded-lg py-8 px-6">
      <div className="flex items-center justify-center relative">
        <div className="font-bold text-2xl mb-6">نکس شاپ</div>
        <button
          className="absolute right-0 top-2"
          onClick={() => setFormStep(1)}
        >
          <FaArrowRight className="size-4" />
        </button>
      </div>
      <h1 className="text-right font-black mb-6 text-lg">
        کد تایید را وارد کنید
      </h1>
      <p className="text-black/60 text-sm mb-4">
        کد تایید برای شماره {toPersianNumbers(phoneNumber)} پیامک شد
      </p>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={handleSubmit(handleCheckOtp)}
      >
        <TextField {...register("otp")} errors={errors} />
        {counter > 0 ? (
          <p className="text-center text-sm text-black/70">
            {`${Math.floor(counter / 60)}:${String(counter % 60).padStart(
              2,
              "0"
            )} `}
            مانده تا دریافت مجدد کد
          </p>
        ) : (
          <button
            onClick={handleResendOtp}
            type="button"
            className="underline underline-offset-4 text-sm text-primary-800"
          >
            دریافت مجدد کد تایید
          </button>
        )}
        <button
          type="submit"
          className="btn btn--primary w-full"
          disabled={isCheckingOtp}
        >
          {isCheckingOtp ? "در حال بررسی" : "تایید"}
        </button>
      </form>
    </div>
  );
}

export default CheckOtp;
