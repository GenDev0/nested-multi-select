import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  NestedMultiSelect,
  NestedMultiSelectOption,
  NestedMultiSelectValue,
} from "../components/NestedMultiSelect.js";

const options: NestedMultiSelectOption[] = [
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

const meta: Meta<typeof NestedMultiSelect> = {
  title: "Components/NestedMultiSelect",
  component: NestedMultiSelect,
  tags: ["autodocs"],
  argTypes: {
    options: { control: false },
    value: { control: false },
    onChange: { action: "changed" },
    placeholder: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof NestedMultiSelect>;

export const Default: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select items",
  },
  render: (args) => {
    const [value, setValue] = useState<NestedMultiSelectValue>(
      args.value || []
    );

    return (
      <NestedMultiSelect
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange?.(val);
        }}
      />
    );
  },
};
