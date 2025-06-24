"use client";

import { useCompleteProfile } from "@/app/(user)/auth/_/hooks/useAuth";
import TextField from "@/ui/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

const validationSchema = z.object({
  name: z.string().nonempty({ error: "لطفا این قسمت را خالی نگذارید !" }),
  email: z
    .string()
    .nonempty({ error: "لطفا این قسمت را خالی نگذارید !" })
    .email({ error: "ایمیل نامعتبر است‌ !" }),
});

export type CompleteProfileFormDataType = z.infer<typeof validationSchema>;

function CompleteProfileForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CompleteProfileFormDataType>({
    resolver: zodResolver(validationSchema),
  });
  const router = useRouter();
  const { completeProfile, isCompletingProfile } = useCompleteProfile();

  const handleCompleteProfile = async (
    formData: CompleteProfileFormDataType
  ) => {
    await completeProfile(formData, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <div className="border flex flex-col border-gray-200 rounded-lg py-8 px-6">
      <h1 className="text-center text-lg font-bold mb-8">تکمیل حساب کاربری</h1>
      <p className="text-sm text-black/70 mb-6">
        لطفا اطلاعات حساب خود را تکمیل کنید
      </p>
      <form
        className="flex flex-col gap-y-8"
        onSubmit={handleSubmit(handleCompleteProfile)}
      >
        <TextField
          {...register("name")}
          errors={errors}
          label="نام و نام خانوادگی"
        />
        <TextField {...register("email")} errors={errors} label="ایمیل" />
        <button
          type="submit"
          className="btn btn--primary"
          disabled={isCompletingProfile}
        >
          {isCompletingProfile ? "در حال ارسال اطلاعات" : "تایید"}
        </button>
      </form>
    </div>
  );
}

export default CompleteProfileForm;
