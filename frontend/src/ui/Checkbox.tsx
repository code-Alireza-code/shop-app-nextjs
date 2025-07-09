import { ChangeEvent, InputHTMLAttributes } from "react";

type CheckBoxProps = {
  name: string;
  id?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

function CheckBox({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  ...rest
}: CheckBoxProps) {
  return (
    <div className="flex items-center gap-x-2 text-secondary-600">
      <input
        type="checkbox"
        name={name}
        id={id ?? name}
        checked={checked}
        value={value}
        onChange={onChange}
        className="cursor-pointer rounded-[5px] border-none bg-secondary-100/80 size-4 form-checkbox checked:text-primary-900"
        {...rest}
      />
      <label htmlFor={id ?? name} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}
export default CheckBox;
