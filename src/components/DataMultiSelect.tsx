"use client";
import { MultiSelect } from "./MultiSelect.js";
import { cn } from "../utils/cn.js";
import { useMemo } from "react";

type DataMultiSelectProps<
  T extends { id: number; name: string; [key: string]: any },
  K extends keyof T
> = {
  items: T[];
  childrenKey: K;
  selectedItem: T | null;
  onSelectedItemChange: (item: T | null) => void;
  selectedSubItems: number[];
  onSelectedSubItemsChange: (ids: number[]) => void;
  label?: string;
  placeholder?: string;
  subLabel?: string;
  subPlaceholder?: string;
  showSelectAll?: boolean;
  subItemsLayout?: "list" | "grid-cols-2" | "grid-cols-3";
  classNames?: {
    container?: string;
    mainSelect?: string;
    subItemContainer?: string;
    subItemOption?: string;
  };
};

export function DataMultiSelect<
  T extends { id: number; name: string; [key: string]: any },
  K extends keyof T
>({
  items,
  childrenKey,
  selectedItem,
  onSelectedItemChange,
  selectedSubItems,
  onSelectedSubItemsChange,
  label,
  placeholder,
  subLabel,
  subPlaceholder,
  showSelectAll,
  subItemsLayout = "list",
  classNames,
}: DataMultiSelectProps<T, K>) {
  const handleItemChange = (itemId: string) => {
    const item = items.find((c) => c.id === parseInt(itemId, 10)) || null;
    onSelectedItemChange(item);
    onSelectedSubItemsChange([]); // reset when changing parent
  };

  const subItemOptions = useMemo(() => {
    if (!selectedItem) return [];
    const children = selectedItem[childrenKey];
    if (!Array.isArray(children)) return [];
    return children.map((sub: { id: number; name: string }) => ({
      label: sub.name,
      value: sub.id.toString(),
    }));
  }, [selectedItem, childrenKey]);

  return (
    <div
      className={cn(
        "space-y-4 w-full max-w-md mx-auto p-4",
        classNames?.container
      )}
    >
      {/* Parent select */}
      <div className='space-y-2'>
        {label && (
          <label className='text-sm font-medium text-foreground'>{label}</label>
        )}

        <select
          className={cn(
            "w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground border-input shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
            classNames?.mainSelect
          )}
          onChange={(e) => handleItemChange(e.target.value)}
          value={selectedItem?.id ?? ""}
        >
          <option value=''>{placeholder || "Select…"}</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Child MultiSelect */}
        {selectedItem && (
          <div className={cn("mt-4 space-y-2", classNames?.subItemContainer)}>
            <label className='text-sm font-medium text-foreground'>
              {subLabel || `${selectedItem.name} Sub Items`}
            </label>

            <MultiSelect
              options={subItemOptions}
              value={selectedSubItems.map(String)}
              onChange={(values) =>
                onSelectedSubItemsChange(values.map((v) => parseInt(v, 10)))
              }
              placeholder={subPlaceholder}
              showSelectAll={showSelectAll}
              layout={subItemsLayout}
              classNames={{
                option: classNames?.subItemOption,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
