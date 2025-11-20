// src/components/ui/select-field.tsx
import type { SelectHTMLAttributes } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: SelectFieldProps) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="block text-base sm:text-lg font-medium text-white">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 sm:px-4 py-2 sm:py-3
          bg-white/10 border border-luxe-purple/50 rounded-lg 
          text-white text-sm sm:text-base 
          focus:outline-none focus:ring-2 focus:ring-luxe-purple 
          ${className}`}
      >
        {placeholder && (
          <option value="" className="bg-black text-white">
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-black text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
