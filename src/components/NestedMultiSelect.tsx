"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../utils/cn.js";

export type NestedMultiSelectOption = {
  id: number;
  name: string;
  children?: NestedMultiSelectOption[];
};

export type NestedMultiSelectValue = {
  itemId: number;
  subItemIds: number[];
}[];

type NestedMultiSelectProps = {
  options: NestedMultiSelectOption[];
  value: NestedMultiSelectValue;
  onChange: (value: NestedMultiSelectValue) => void;
  placeholder?: string;
  classNames?: {
    container?: string;
    trigger?: string;
    dropdown?: string;
    item?: string;
    itemCheckbox?: string;
    itemLabel?: string;
    childrenContainer?: string;
    child?: string;
    childCheckbox?: string;
    childLabel?: string;
  };
};

export function NestedMultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select…",
  classNames = {},
}: NestedMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (itemId: number) => {
    const found = value.find((v) => v.itemId === itemId);
    if (found) {
      onChange(value.filter((v) => v.itemId !== itemId));
    } else {
      onChange([...value, { itemId, subItemIds: [] }]);
    }
  };

  const toggleSubItem = (itemId: number, subId: number) => {
    const updated = value.map((v) => {
      if (v.itemId !== itemId) return v;

      const isSelected = v.subItemIds.includes(subId);
      const subItemIds = isSelected
        ? v.subItemIds.filter((id) => id !== subId)
        : [...v.subItemIds, subId];

      return { ...v, subItemIds };
    });
    onChange(updated);
  };

  const isItemSelected = (itemId: number) =>
    value.some((v) => v.itemId === itemId);

  const isSubItemSelected = (itemId: number, subId: number) =>
    value.find((v) => v.itemId === itemId)?.subItemIds.includes(subId);

  const isSomeSubSelected = (itemId: number, subIds: number[]) => {
    const selected = value.find((v) => v.itemId === itemId);
    if (!selected) return false;
    return (
      selected.subItemIds.length > 0 &&
      selected.subItemIds.length < subIds.length
    );
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

  const displayValue =
    value.length > 0
      ? value
          .map((v) => {
            const item = options.find((o) => o.id === v.itemId);
            return item?.name || "";
          })
          .join(", ")
      : placeholder;

  return (
    <div
      ref={containerRef}
      className={cn("relative", classNames.container)}
      data-testid='nested-multi-select'
    >
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-full border rounded-md px-3 py-2 text-left text-sm bg-background text-foreground border-input shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          value.length === 0 ? "text-muted-foreground" : "",
          classNames.trigger
        )}
      >
        {displayValue}
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md p-2 space-y-1",
            classNames.dropdown
          )}
        >
          {options.map((item) => {
            const itemSelected = isItemSelected(item.id);
            const hasChildren = item.children && item.children.length > 0;
            const subIds = item.children?.map((c) => c.id) ?? [];
            const someSubSelected =
              hasChildren && isSomeSubSelected(item.id, subIds);

            return (
              <div key={item.id} className='space-y-1'>
                <div
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-muted text-sm",
                    classNames.item
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-4 w-4 items-center justify-center border rounded-sm",
                      itemSelected
                        ? "bg-primary text-primary-foreground"
                        : someSubSelected
                        ? "bg-primary/30 text-primary-foreground"
                        : "",
                      classNames.itemCheckbox
                    )}
                  >
                    {itemSelected ? (
                      <Check size={12} />
                    ) : someSubSelected ? (
                      <Minus size={12} />
                    ) : null}
                  </span>
                  <span className={classNames.itemLabel}>{item.name}</span>
                </div>

                {hasChildren && itemSelected && (
                  <div className={cn("pl-4", classNames.childrenContainer)}>
                    {item.children!.map((child) => {
                      const subSelected = isSubItemSelected(item.id, child.id);
                      return (
                        <div
                          key={child.id}
                          onClick={() => toggleSubItem(item.id, child.id)}
                          className={cn(
                            "flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-muted text-sm",
                            classNames.child
                          )}
                        >
                          <span
                            className={cn(
                              "inline-flex h-4 w-4 items-center justify-center border rounded-sm",
                              subSelected
                                ? "bg-primary text-primary-foreground"
                                : "",
                              classNames.childCheckbox
                            )}
                          >
                            {subSelected && <Check size={12} />}
                          </span>
                          <span className={classNames.childLabel}>
                            {child.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
