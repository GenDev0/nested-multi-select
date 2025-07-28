import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataMultiSelect } from "../components/DataMultiSelect.js";

type Item = {
  id: number;
  name: string;
  children: { id: number; name: string }[];
};

const items: Item[] = [
  {
    id: 1,
    name: "Fruits",
    children: [
      { id: 101, name: "Apple" },
      { id: 102, name: "Banana" },
      { id: 103, name: "Orange" },
    ],
  },
  {
    id: 2,
    name: "Vegetables",
    children: [
      { id: 201, name: "Carrot" },
      { id: 202, name: "Broccoli" },
    ],
  },
];

const meta: Meta<typeof DataMultiSelect<Item, "children">> = {
  title: "Components/DataMultiSelect",
  component: DataMultiSelect,
  tags: ["autodocs"],
  argTypes: {
    items: { control: false }, // static in this story
    childrenKey: {
      control: "text",
      description: "Key in the item object that contains the children array",
    },
    selectedItem: { control: false },
    selectedSubItems: { control: false },
    onSelectedItemChange: { action: "selected item changed" },
    onSelectedSubItemsChange: { action: "selected sub items changed" },
    label: { control: "text" },
    placeholder: { control: "text" },
    subLabel: { control: "text" },
    subPlaceholder: { control: "text" },
    showSelectAll: { control: "boolean" },
    subItemsLayout: {
      control: { type: "radio" },
      options: ["list", "grid-cols-2", "grid-cols-3"],
    },
    classNames: { control: false }, // classNames is a nested object
  },
};

export default meta;
type Story = StoryObj<typeof DataMultiSelect<Item, "children">>;

export const Default: Story = {
  args: {
    items,
    childrenKey: "children", // ✅ REQUIRED for DataMultiSelect to find sub-items
    selectedItem: null,
    selectedSubItems: [],
    label: "Category",
    placeholder: "Select a category",
    subLabel: "Select sub-items",
    subPlaceholder: "Select sub-items...",
    showSelectAll: true,
    subItemsLayout: "list",
    classNames: {
      container: "space-y-4 w-full max-w-md mx-auto p-4",
      mainSelect: "border border-gray-300",
      subItemContainer: "border border-gray-200 rounded-md p-2",
      subItemOption: "text-sm text-gray-700",
    },
  },
  render: (args) => {
    const [selectedItem, setSelectedItem] = useState(args.selectedItem);
    const [selectedSubItems, setSelectedSubItems] = useState<number[]>(
      args.selectedSubItems
    );

    return (
      <DataMultiSelect
        {...args}
        selectedItem={selectedItem}
        onSelectedItemChange={(item) => {
          setSelectedItem(item);
          args.onSelectedItemChange?.(item);
        }}
        selectedSubItems={selectedSubItems}
        onSelectedSubItemsChange={(subIds) => {
          setSelectedSubItems(subIds);
          args.onSelectedSubItemsChange?.(subIds);
        }}
      />
    );
  },
};
