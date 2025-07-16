import { render, screen, fireEvent } from "@testing-library/react";
import { DataMultiSelect } from "../DataMultiSelect";

describe("<DataMultiSelect />", () => {
  const mockDataChildren = [
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

  const mockDataSubItems = [
    {
      id: 1,
      name: "Group 1",
      subItems: [
        { id: 1, name: "Sub 1" },
        { id: 2, name: "Sub 2" },
      ],
    },
  ];

  it("renders placeholder and allows selection with 'children' key", () => {
    render(
      <DataMultiSelect
        items={mockDataChildren}
        childrenKey='children'
        placeholder='Select category'
      />
    );

    expect(screen.getByText("Select category")).toBeInTheDocument();

    // select first category
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "1" },
    });

    // now open the MultiSelect dropdown
    const multiSelectButton = screen.getByRole("button");
    fireEvent.click(multiSelectButton);

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("works with different children key", () => {
    render(
      <DataMultiSelect
        items={mockDataSubItems}
        childrenKey='subItems'
        placeholder='Select group'
      />
    );

    expect(screen.getByText("Select group")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "1" },
    });

    const multiSelectButton = screen.getByRole("button");
    fireEvent.click(multiSelectButton);

    expect(screen.getByText("Sub 1")).toBeInTheDocument();
    expect(screen.getByText("Sub 2")).toBeInTheDocument();
  });
});
