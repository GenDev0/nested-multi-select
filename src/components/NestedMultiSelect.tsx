"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
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
    expandButton?: string;
  };
};

export function NestedMultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select…",
  classNames = {},
}: NestedMultiSelectProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown open/close
  const toggleDropdown = () => setDropdownOpen((open) => !open);

  // Toggle expand/collapse for a specific parent item
  const toggleExpand = (itemId: number) => {
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  // Helper to find option by id
  const findOptionById = (id: number) => options.find((o) => o.id === id);

  // Check if parent is fully selected
  const isAllChildrenSelected = (itemId: number) => {
    const item = findOptionById(itemId);
    if (!item?.children?.length) return false;
    const selectedEntry = value.find((v) => v.itemId === itemId);
    return selectedEntry?.subItemIds.length === item.children.length;
  };

  // Check if parent is partially selected (indeterminate)
  const isIndeterminate = (itemId: number) => {
    const item = findOptionById(itemId);
    if (!item?.children?.length) return false;
    const selectedEntry = value.find((v) => v.itemId === itemId);
    if (!selectedEntry) return false;
    const selectedCount = selectedEntry.subItemIds.length;
    return selectedCount > 0 && selectedCount < item.children.length;
  };

  // Check if a child is selected
  const isSubItemSelected = (itemId: number, subId: number) => {
    const selectedEntry = value.find((v) => v.itemId === itemId);
    return selectedEntry?.subItemIds.includes(subId) ?? false;
  };

  // Select or deselect parent + all its children
  const toggleItemSelection = (itemId: number) => {
    const item = findOptionById(itemId);
    if (!item) return;

    const allSubIds = item.children?.map((c) => c.id) ?? [];
    const selectedEntry = value.find((v) => v.itemId === itemId);
    const allSelected =
      selectedEntry && selectedEntry.subItemIds.length === allSubIds.length;

    if (allSelected) {
      // Deselect parent and all children
      onChange(value.filter((v) => v.itemId !== itemId));
    } else {
      // Select parent with all children
      const newValue = value.filter((v) => v.itemId !== itemId);
      newValue.push({ itemId, subItemIds: allSubIds });
      onChange(newValue);
      // Automatically expand the item when selected
      setExpandedItems((prev) => ({ ...prev, [itemId]: true }));
    }
  };

  // Toggle individual sub-item selection (fixed to add parent entry if missing)
  const toggleSubItem = (itemId: number, subId: number) => {
    const selectedEntry = value.find((v) => v.itemId === itemId);

    if (!selectedEntry) {
      // Parent not selected yet, create entry with one subItem selected
      onChange([...value, { itemId, subItemIds: [subId] }]);
      setExpandedItems((prev) => ({ ...prev, [itemId]: true })); // optionally expand on child selection
      return;
    }

    const isSelected = selectedEntry.subItemIds.includes(subId);
    const subItemIds = isSelected
      ? selectedEntry.subItemIds.filter((id) => id !== subId)
      : [...selectedEntry.subItemIds, subId];

    if (subItemIds.length === 0) {
      // No subitems selected, remove parent entry
      onChange(value.filter((v) => v.itemId !== itemId));
    } else {
      // Update parent's subitems
      onChange(
        value.map((v) => (v.itemId === itemId ? { ...v, subItemIds } : v))
      );
    }
  };

  // Compose display text for selected parents
  const displayValue =
    value.length > 0
      ? value
          .map((v) => {
            const item = findOptionById(v.itemId);
            return item?.name || "";
          })
          .filter(Boolean)
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
        onClick={toggleDropdown}
        className={cn(
          "w-full border rounded-md px-3 py-2 text-left text-sm bg-background text-foreground border-input shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          value.length === 0 ? "text-muted-foreground" : "",
          classNames.trigger
        )}
      >
        {displayValue}
      </button>

      {dropdownOpen && (
        <div
          className={cn(
            "absolute z-10 mt-1 w-full max-h-72 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md p-2 space-y-1",
            classNames.dropdown
          )}
        >
          {options.map((item) => {
            const allSelected = isAllChildrenSelected(item.id);
            const indeterminate = isIndeterminate(item.id);
            const isExpanded = expandedItems[item.id] ?? false;

            return (
              <div key={item.id} className='space-y-1'>
                <div className='flex items-center justify-between px-2 py-1 rounded hover:bg-muted text-sm'>
                  <label
                    className={cn(
                      "flex items-center gap-2 cursor-pointer",
                      classNames.item
                    )}
                    onClick={(e) => e.preventDefault()}
                  >
                    <input
                      type='checkbox'
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = indeterminate;
                      }}
                      onChange={() => toggleItemSelection(item.id)}
                      className={cn(
                        "h-4 w-4 rounded border",
                        classNames.itemCheckbox
                      )}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className={classNames.itemLabel}>{item.name}</span>
                  </label>

                  {item.children && item.children.length > 0 && (
                    <button
                      type='button'
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(item.id);
                      }}
                      className={cn(
                        "p-1 rounded hover:bg-muted focus:outline-none",
                        classNames.expandButton
                      )}
                    >
                      {isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                  )}
                </div>

                {item.children && isExpanded && (
                  <div
                    className={cn(
                      "pl-6 space-y-1",
                      classNames.childrenContainer
                    )}
                  >
                    {item.children.map((child) => {
                      const checked = isSubItemSelected(item.id, child.id);
                      return (
                        <label
                          key={child.id}
                          className={cn(
                            "flex items-center gap-2 cursor-pointer text-sm rounded hover:bg-muted px-2 py-1",
                            classNames.child
                          )}
                        >
                          <input
                            type='checkbox'
                            checked={checked}
                            onChange={() => toggleSubItem(item.id, child.id)}
                            className={cn(
                              "h-4 w-4 rounded border",
                              classNames.childCheckbox
                            )}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className={classNames.childLabel}>
                            {child.name}
                          </span>
                        </label>
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
