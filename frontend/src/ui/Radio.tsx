import { ChangeEvent, InputHTMLAttributes } from "react";

type RadioProps = {
  name: string;
  id?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Radio({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  ...rest
}: RadioProps) {
  return (
    <div className="flex items-center gap-x-2 text-secondary-600">
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
        className="cursor-pointer rounded-[5px] border-none bg-secondary-100/80 size-4 form-radio checked:text-primary-900"
        {...rest}
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}

export default Radio;
