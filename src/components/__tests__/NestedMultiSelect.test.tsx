import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  NestedMultiSelect,
  NestedMultiSelectValue,
} from "../NestedMultiSelect.js";

const mockOptions = [
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
    children: [
      { id: 21, name: "Child 3" },
      { id: 22, name: "Child 4" },
    ],
  },
];

function TestWrapper(props: {
  initialValue?: NestedMultiSelectValue;
  classNames?: any;
}) {
  const [value, setValue] = useState<NestedMultiSelectValue>(
    props.initialValue ?? []
  );

  return (
    <NestedMultiSelect
      options={mockOptions}
      value={value}
      onChange={setValue}
      {...props}
    />
  );
}

describe("<NestedMultiSelect />", () => {
  it("renders and opens dropdown", () => {
    render(<TestWrapper />);

    const trigger = screen.getByRole("button");
    expect(trigger).toHaveTextContent("Select…");

    fireEvent.click(trigger);
    expect(screen.getByText("Parent One")).toBeInTheDocument();
    expect(screen.getByText("Parent Two")).toBeInTheDocument();
  });

  it("selects and deselects parent", () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByRole("button"));

    const parentOne = screen.getByText("Parent One");
    fireEvent.click(parentOne);
    expect(screen.getByRole("button")).toHaveTextContent("Parent One");

    fireEvent.click(parentOne);
    expect(screen.getByRole("button")).toHaveTextContent("Select…");
  });

  it("selects subitem under parent", () => {
    render(<TestWrapper initialValue={[{ itemId: 1, subItemIds: [] }]} />);

    fireEvent.click(screen.getByRole("button"));

    const child1 = screen.getByText("Child 1");
    fireEvent.click(child1);

    expect(screen.getByRole("button")).toHaveTextContent("Parent One");
  });

  it("applies custom classNames", () => {
    render(
      <TestWrapper
        classNames={{
          trigger: "custom-trigger",
          dropdown: "custom-dropdown",
          item: "custom-item",
          child: "custom-child",
        }}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    const trigger = screen.getByRole("button");
    expect(trigger).toHaveClass("custom-trigger");

    const dropdown = screen
      .getByTestId("nested-multi-select")
      .querySelector(".custom-dropdown");
    expect(dropdown).toBeInTheDocument();

    const parentOne = screen.getByText("Parent One").parentElement;
    expect(parentOne).toHaveClass("custom-item");

    // open children by clicking parent
    fireEvent.click(screen.getByText("Parent One"));
    const child1 = screen.getByText("Child 1").parentElement;
    expect(child1).toHaveClass("custom-child");
  });
});
