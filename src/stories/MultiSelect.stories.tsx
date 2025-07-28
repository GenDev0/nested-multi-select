import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect, MultiSelectOption } from "../components/MultiSelect.js";

const options: MultiSelectOption[] = [
  { label: "Option One", value: "1" },
  { label: "Option Two", value: "2" },
  { label: "Option Three", value: "3" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  argTypes: {
    options: { control: false }, // don't control options in storybook controls panel
    value: {
      control: { type: "multi-select" },
      description: "Selected option values",
    },
    onChange: { action: "changed" },
    placeholder: { control: "text" },
    showSelectAll: { control: "boolean" },
    layout: {
      control: { type: "radio" },
      options: ["list", "grid-cols-2", "grid-cols-3"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  args: {
    options,
    value: [],
    placeholder: "Select options",
    showSelectAll: true,
    layout: "list",
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(args.value || []);

    return (
      <MultiSelect
        {...args}
        value={selected}
        onChange={(val) => {
          setSelected(val);
          args.onChange?.(val);
        }}
      />
    );
  },
};

export const GridLayout: Story = {
  args: {
    options,
    value: ["1", "3"],
    placeholder: "Select options",
    showSelectAll: false,
    layout: "grid-cols-3",
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(args.value || []);

    return (
      <MultiSelect
        {...args}
        value={selected}
        onChange={(val) => {
          setSelected(val);
          args.onChange?.(val);
        }}
      />
    );
  },
};
