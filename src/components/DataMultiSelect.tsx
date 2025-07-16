"use client";

import { useState } from "react";
import { MultiSelect } from "./MultiSelect";
import { cn } from "../utils/cn";

export type ItemWithChildren = {
  id: number;
  name: string;
  subItems: {
    id: number;
    name: string;
  }[];
};

type DataMultiSelectProps = {
  items: ItemWithChildren[];
  label?: string;
  placeholder?: string;
  subLabel?: string;
  subPlaceholder?: string;
  className?: string;
};

export function DataMultiSelect({
  items,
  label,
  placeholder,
  subLabel,
  subPlaceholder,
  className,
}: DataMultiSelectProps) {
  const [selectedItem, setSelectedItem] = useState<ItemWithChildren | null>(
    null
  );
  const [selectedSubItems, setSelectedSubItems] = useState<number[]>([]);

  const handleItemChange = (itemId: string) => {
    const item = items.find((c) => c.id === parseInt(itemId, 10));
    setSelectedItem(item || null);
    setSelectedSubItems([]); // reset on item change
  };

  const handleSubItemsChange = (subItemIds: number[]) => {
    setSelectedSubItems(subItemIds);
  };

  return (
    <div className={cn("space-y-4 w-full max-w-md mx-auto p-4", className)}>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>{label}</label>
        <select
          className='w-full border rounded px-3 py-2 text-sm'
          onChange={(e) => handleItemChange(e.target.value)}
          value={selectedItem?.id || ""}
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
              options={selectedItem.subItems.map((sub) => ({
                label: sub.name,
                value: sub.id.toString(),
              }))}
              value={selectedSubItems.map(String)}
              onChange={(values) =>
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
