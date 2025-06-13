import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { LuEye, LuEyeClosed } from "react-icons/lu";

type TextFieldProps = {
  type?: HTMLInputTypeAttribute;
  label?: string;
  name: string;
  dir?: "ltr" | "rtl";
  className?: string;
  placeholder?: string;
  errors?: FieldErrors | null;
} & InputHTMLAttributes<HTMLInputElement>;

function TextField({
  type = "text",
  label,
  name,
  dir = type === "password" ? "ltr" : "rtl",
  className,
  errors = null,
  placeholder,
  ...rest
}: TextFieldProps) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={name} className="text-secondary-900 text-sm">
        {label}
      </label>
      <input
        type={type === "password" && isShown ? "text" : type}
        name={name}
        id={name}
        dir={type === "password" ? "ltr" : dir}
        placeholder={placeholder}
        className={`textField__input ${
          dir === "ltr" ? "text-left" : "text-right"
        } ${className}`}
        {...rest}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-4 top-4"
          onClick={() => setIsShown((prev) => !prev)}
        >
          {isShown ? (
            <LuEye className="size-5" />
          ) : (
            <LuEyeClosed className="size-5" />
          )}
        </button>
      )}
      {errors && errors[name] && (
        <span className="text-error mt-1 text-xs block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}

export default TextField;
