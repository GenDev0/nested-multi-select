"use client";

import { cn } from "../utils/cn.js";
import { usePortalDropdown } from "../hooks/usePortalDropdown.js";
import { PortalDropdown } from "./PortalDropdown.js";
import { Check, Minus } from "lucide-react";
import { useEffect, useRef } from "react";

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
  placeholder = "Select…",
  showSelectAll = false,
  layout = "list",
  classNames = {},
}: MultiSelectProps) {
  const { open, setOpen, triggerRef, dropdownRef, styles } =
    usePortalDropdown();

  const selectAllRef = useRef<HTMLInputElement>(null);

  const allSelected = value.length === options.length && options.length > 0;
  const noneSelected = value.length === 0;
  const someSelected = !allSelected && !noneSelected;

  // ✅ keep "Select All" checkbox visually indeterminate
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

  const toggleSelectAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(options.map((o) => o.value));
    }
  };

  const displayValue =
    value.length > 0
      ? options
          .filter((o) => value.includes(o.value))
          .map((o) => o.label)
          .join(", ")
      : placeholder;

  return (
    <div ref={triggerRef} className='relative'>
      {/* Trigger Button */}
      <button
        type='button'
        onClick={() => setOpen(!open)}
        aria-haspopup='listbox'
        aria-expanded={open}
        className={cn(
          "w-full border rounded-md px-3 py-2 text-left text-sm bg-background text-foreground border-input shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          value.length === 0 ? "text-muted-foreground" : "",
          classNames.trigger
        )}
      >
        {displayValue}
      </button>

      {/* Dropdown via Portal */}
      <PortalDropdown
        open={open}
        dropdownRef={dropdownRef}
        styles={styles}
        className={cn(
          "mt-1 rounded-md border bg-popover text-popover-foreground shadow-md p-2 space-y-1",
          classNames.dropdown
        )}
      >
        {/* ✅ Select All */}
        {showSelectAll && (
          <label
            htmlFor='select-all-checkbox'
            className='flex items-center gap-2 cursor-pointer px-2 py-1 rounded text-sm hover:bg-muted select-none'
          >
            <input
              ref={selectAllRef}
              id='select-all-checkbox'
              type='checkbox'
              checked={allSelected}
              onChange={toggleSelectAll}
              className='sr-only'
            />

            {/* Fake checkbox with icons */}
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

        {/* ✅ Options */}
        <div
          className={cn(
            "grid gap-1",
            layout === "list" ? "grid-cols-1" : layout
          )}
        >
          {options.map((opt) => {
            const isSelected = value.includes(opt.value);

            return (
              <label
                key={opt.value}
                htmlFor={`option-${opt.value}`}
                className={cn(
                  "flex items-center gap-2 cursor-pointer text-sm rounded hover:bg-muted px-2 py-1 select-none",
                  classNames.option
                )}
              >
                <input
                  id={`option-${opt.value}`}
                  type='checkbox'
                  checked={isSelected}
                  onChange={() => toggleValue(opt.value)}
                  className='sr-only'
                />

                {/* Fake checkbox with check icon */}
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
      </PortalDropdown>
    </div>
  );
}
