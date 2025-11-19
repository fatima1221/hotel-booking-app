import { ChangeEvent } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
  className?: string;
};

export function SelectField({
  value,
  onChange,
  placeholder = "Select...",
  options,
  className = "",
}: SelectFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`w-full px-3 py-2 bg-white/10 border border-luxe-purple/50 rounded text-sm text-white 
        focus:outline-none focus:ring-2 focus:ring-luxe-purple transition ${className}`}
    >
      <option value="" className="text-black">
        {placeholder}
      </option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-black">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
