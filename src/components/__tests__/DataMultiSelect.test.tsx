import { render, screen, fireEvent } from "@testing-library/react";
import { DataMultiSelect } from "../DataMultiSelect.js";
import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Category 1",
    children: [
      { id: 1, name: "Child 1" },
      { id: 2, name: "Child 2" },
    ],
  },
  {
    id: 2,
    name: "Category 2",
    children: [
      { id: 3, name: "Child 3" },
      { id: 4, name: "Child 4" },
    ],
  },
];

// Wrapper component to provide controlled props
function ControlledWrapper() {
  const [selectedItem, setSelectedItem] = useState<
    (typeof categories)[0] | null
  >(null);
  const [selectedSubItems, setSelectedSubItems] = useState<number[]>([]);

  return (
    <DataMultiSelect
      items={categories}
      childrenKey='children'
      placeholder='Select category'
      selectedItem={selectedItem}
      onSelectedItemChange={setSelectedItem}
      selectedSubItems={selectedSubItems}
      onSelectedSubItemsChange={setSelectedSubItems}
    />
  );
}

describe("<DataMultiSelect />", () => {
  it("renders placeholder and allows selection with 'children' key", () => {
    render(<ControlledWrapper />);

    // Initially placeholder is shown
    expect(screen.getByText("Select category")).toBeInTheDocument();

    // Select a category from the dropdown
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    // After selection, the sub items label should be visible
    expect(screen.getByText("Category 1 Sub Items")).toBeInTheDocument();

    // The MultiSelect button for sub items should also be present
    expect(
      screen.getByRole("button", { name: /Select…/i })
    ).toBeInTheDocument();
  });
});
