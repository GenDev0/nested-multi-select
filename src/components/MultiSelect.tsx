"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export type MultiSelectOption = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className={`w-full border rounded px-3 py-2 text-left text-sm ${
          value.length === 0 ? "text-gray-400" : ""
        }`}
      >
        {value.length > 0
          ? options
              .filter((opt) => value.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ")
          : placeholder || "Select…"}
      </button>

      {open && (
        <div className='absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded border bg-white p-2 shadow'>
          {options.map((opt) => (
            <div
              key={opt.value}
              className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded'
              onClick={() => handleToggle(opt.value)}
            >
              <span
                className={`inline-flex h-4 w-4 items-center justify-center border rounded-sm ${
                  value.includes(opt.value) ? "bg-blue-500 text-white" : ""
                }`}
              >
                {value.includes(opt.value) && <Check size={12} />}
              </span>
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
