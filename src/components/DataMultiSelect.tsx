"use client";

import { MultiSelect } from "./MultiSelect.js";
import { cn } from "../utils/cn.js";

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
  className?: string;
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
  className,
}: DataMultiSelectProps<T, K>) {
  const handleItemChange = (itemId: string) => {
    const item = items.find((c) => c.id === parseInt(itemId, 10)) || null;
    onSelectedItemChange(item);
    onSelectedSubItemsChange([]); // reset subitems when main item changes
  };

  const handleSubItemsChange = (subItemIds: number[]) => {
    onSelectedSubItemsChange(subItemIds);
  };

  return (
    <div className={cn("space-y-4 w-full max-w-md mx-auto p-4", className)}>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>{label}</label>
        <select
          className='w-full border rounded px-3 py-2 text-sm'
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

        {selectedItem && (
          <div className='mt-4 space-y-2'>
            <label className='text-sm font-medium'>
              {subLabel || `${selectedItem.name} Sub Items`}
            </label>

            <MultiSelect
              options={(
                selectedItem[childrenKey] as { id: number; name: string }[]
              ).map((sub) => ({
                label: sub.name,
                value: sub.id.toString(),
              }))}
              value={selectedSubItems.map(String)}
              onChange={(values: string[]) =>
                handleSubItemsChange(values.map((v) => parseInt(v, 10)))
              }
              placeholder={subPlaceholder}
            />
          </div>
        )}
      </div>
    </div>
  );
}
