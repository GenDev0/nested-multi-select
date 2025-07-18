import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { NestedMultiSelect } from "../NestedMultiSelect.js";
import { useState } from "react";

const mockData = [
  {
    id: 1,
    name: "Parent One",
    children: [
      { id: 11, name: "Child 1" },
      { id: 12, name: "Child 2" },
    ],
  },
  {
    id: 2,
    name: "Parent Two",
    children: [],
  },
];

describe("<NestedMultiSelect />", () => {
  function ControlledWrapper() {
    const [value, setValue] = useState<
      { itemId: number; subItemIds: number[] }[]
    >([]);
    return (
      <NestedMultiSelect
        options={mockData}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    );
  }

  // Helper to open dropdown
  const openDropdown = () => {
    const trigger = screen
      .getAllByRole("button")
      .find((btn) => !btn.hasAttribute("aria-label"));
    if (!trigger) throw new Error("Trigger button not found");
    fireEvent.click(trigger);
    return trigger;
  };

  test("selects and deselects parent with checkbox and expands children", () => {
    render(<ControlledWrapper />);
    const trigger = openDropdown();

    const parentOneCheckbox = screen.getByLabelText("Parent One");
    fireEvent.click(parentOneCheckbox);
    expect(parentOneCheckbox).toBeChecked();

    expect(trigger).toHaveTextContent("Parent One");

    fireEvent.click(parentOneCheckbox);
    expect(parentOneCheckbox).not.toBeChecked();
  });

  test("selects and deselects subitems independently (after parent selected)", () => {
    render(<ControlledWrapper />);
    const trigger = openDropdown();

    // Select parent (all children selected)
    const parentOneCheckbox = screen.getByLabelText("Parent One");
    fireEvent.click(parentOneCheckbox);
    expect(parentOneCheckbox).toBeChecked();

    const child1Checkbox = screen.getByLabelText("Child 1");
    expect(child1Checkbox).toBeChecked();

    // Deselect a child (parent becomes indeterminate)
    fireEvent.click(child1Checkbox);
    expect(child1Checkbox).not.toBeChecked();

    expect(parentOneCheckbox).not.toBeChecked();
    expect(trigger).toHaveTextContent("Parent One");
  });

  test("selects subitems independently before parent is selected", () => {
    render(<ControlledWrapper />);
    const trigger = openDropdown();

    // Initially parent checkbox is unchecked
    const parentOneCheckbox = screen.getByLabelText("Parent One");
    expect(parentOneCheckbox).not.toBeChecked();

    // Expand parent to see children
    const expandButton = screen.getByLabelText("Expand");
    fireEvent.click(expandButton);

    const child1Checkbox = screen.getByLabelText("Child 1");
    expect(child1Checkbox).not.toBeChecked();

    // Select child 1 directly
    fireEvent.click(child1Checkbox);
    expect(child1Checkbox).toBeChecked();

    // Parent checkbox should be indeterminate now
    expect(parentOneCheckbox).not.toBeChecked();
    expect(parentOneCheckbox).toHaveProperty("indeterminate", true);

    // Trigger should show parent's name because child is selected
    expect(trigger).toHaveTextContent("Parent One");
  });

  test("deselecting last subitem removes parent entry", () => {
    render(<ControlledWrapper />);
    const trigger = openDropdown();

    // Expand and select a child directly
    const expandButton = screen.getByLabelText("Expand");
    fireEvent.click(expandButton);

    const child1Checkbox = screen.getByLabelText("Child 1");
    fireEvent.click(child1Checkbox);
    expect(child1Checkbox).toBeChecked();

    // Deselect child
    fireEvent.click(child1Checkbox);
    expect(child1Checkbox).not.toBeChecked();

    // Parent checkbox unchecked and trigger shows placeholder
    const parentOneCheckbox = screen.getByLabelText("Parent One");
    expect(parentOneCheckbox).not.toBeChecked();
    expect(trigger).toHaveTextContent("Select…");
  });
});
