"use client";

import TextField from "@/ui/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useGetUser } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const persianToEnglish = (str: string) =>
  str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

const validationSchema = z.object({
  name: z.string().nonempty({ error: "لطفا این قسمت را خالی نگذارید !" }),
  email: z
    .string()
    .nonempty({ error: "لطفا این قسمت را خالی نگذارید !" })
    .email({ error: "ایمیل نامعتبر است‌ !" }),
  phoneNumber: z
    .string()
    .nonempty({ error: "لطفا این قسمت را خالی نگذارید !" })
    .transform(persianToEnglish)
    .refine((val) => /^09\d{9}$/.test(val), {
      message: "شماره موبایل نامعتبر است !",
    }),
  biography: z.string().optional(),
});

export type ProfileFormDataType = z.infer<typeof validationSchema>;

function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormDataType>({ resolver: zodResolver(validationSchema) });
  const { updateUser, isUpdating } = useUpdateUser();
  const { user } = useGetUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        biography: user.biography as string | "",
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, reset]);

  const handleUpdateProfile = async (formData: ProfileFormDataType) => {
    await updateUser(formData, {
      onSuccess: () => {
        router.push("/profile");
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="max-w-md flex flex-col space-y-6 mt-8"
        noValidate
      >
        <TextField
          {...register("name")}
          label="نام و نام خانوادگی"
          errors={errors}
        />
        <TextField {...register("email")} label="ایمیل" errors={errors} />
        <TextField
          {...register("biography")}
          label="بیوگرافی"
          errors={errors}
        />
        <TextField
          {...register("phoneNumber")}
          label="شماره تلفن"
          errors={errors}
        />
        <button type="submit" className="btn btn--primary">
          {isUpdating ? "در حال ویرایش" : "ویرایش اطلاعات"}
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
