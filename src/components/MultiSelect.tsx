"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "../utils/cn.js";

export type MultiSelectOption = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  showSelectAll?: boolean;
  layout?: "list" | "grid-cols-2" | "grid-cols-3";
  classNames?: {
    trigger?: string;
    dropdown?: string;
    option?: string;
  };
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  showSelectAll = false,
  layout = "list",
  classNames,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleValue = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const toggleAll = () => {
    if (value.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map((opt) => opt.value));
    }
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-full border rounded-md px-3 py-2 text-left text-sm bg-background text-foreground border-input shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          value.length === 0 ? "text-muted-foreground" : "",
          classNames?.trigger
        )}
      >
        {value.length > 0
          ? options
              .filter((opt) => value.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ")
          : placeholder || "Select…"}
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md p-2 space-y-1",
            classNames?.dropdown
          )}
        >
          {showSelectAll && (
            <div
              onClick={toggleAll}
              className='cursor-pointer text-sm px-2 py-1 rounded hover:bg-muted'
            >
              {value.length === options.length ? "Deselect All" : "Select All"}
            </div>
          )}

          <div
            className={cn(
              "gap-2",
              layout !== "list" && "grid",
              layout === "grid-cols-2" && "grid-cols-2",
              layout === "grid-cols-3" && "grid-cols-3"
            )}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => toggleValue(opt.value)}
                className={cn(
                  "flex items-center gap-2 cursor-pointer px-2 py-1 rounded text-sm hover:bg-muted",
                  classNames?.option
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-4 w-4 items-center justify-center border rounded-sm",
                    value.includes(opt.value)
                      ? "bg-primary text-primary-foreground"
                      : ""
                  )}
                >
                  {value.includes(opt.value) && <Check size={12} />}
                </span>
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
