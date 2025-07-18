"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Minus } from "lucide-react";
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
  const selectAllRef = useRef<HTMLInputElement>(null);

  const allSelected = value.length === options.length && options.length > 0;
  const noneSelected = value.length === 0;
  const someSelected = !allSelected && !noneSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  const toggleValue = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const toggleAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(options.map((opt) => opt.value));
    }
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
    <div ref={containerRef} className='relative' data-testid='multi-select'>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup='listbox'
        aria-expanded={open}
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
          role='listbox'
          tabIndex={-1}
          className={cn(
            "absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md p-2 space-y-1",
            classNames?.dropdown
          )}
        >
          {showSelectAll && (
            <label
              htmlFor='select-all-checkbox'
              className='flex items-center gap-2 cursor-pointer px-2 py-1 rounded text-sm hover:bg-muted select-none'
            >
              <input
                type='checkbox'
                id='select-all-checkbox'
                ref={selectAllRef}
                checked={allSelected}
                onChange={toggleAll}
                className='sr-only'
              />
              <span
                className={cn(
                  "inline-flex h-4 w-4 items-center justify-center border rounded-sm",
                  allSelected || someSelected
                    ? "bg-primary text-primary-foreground"
                    : ""
                )}
                aria-hidden='true'
              >
                {allSelected ? (
                  <Check size={16} data-testid='check-icon' />
                ) : someSelected ? (
                  <Minus size={16} data-testid='minus-icon' />
                ) : null}
              </span>
              <span>Select All</span>
            </label>
          )}

          <div
            className={cn(
              "gap-2",
              layout !== "list" && "grid",
              layout === "grid-cols-2" && "grid-cols-2",
              layout === "grid-cols-3" && "grid-cols-3"
            )}
          >
            {options.map((opt) => {
              const isSelected = value.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  htmlFor={`option-${opt.value}`}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer px-2 py-1 rounded text-sm hover:bg-muted select-none",
                    classNames?.option
                  )}
                >
                  <input
                    id={`option-${opt.value}`}
                    type='checkbox'
                    checked={isSelected}
                    onChange={() => toggleValue(opt.value)}
                    className='sr-only'
                  />
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-4 h-4 border rounded-sm",
                      isSelected ? "bg-primary text-primary-foreground" : ""
                    )}
                    aria-hidden='true'
                  >
                    {isSelected && <Check size={16} />}
                  </span>
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
