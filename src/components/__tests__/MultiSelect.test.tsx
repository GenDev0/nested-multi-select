import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiSelect, MultiSelectOption } from "../MultiSelect.js";

const options: MultiSelectOption[] = [
  { label: "One", value: "one" },
  { label: "Two", value: "two" },
  { label: "Three", value: "three" },
];

// Controlled wrapper to handle internal state changes in tests
function ControlledMultiSelect({
  initialValue = [],
  ...props
}: { initialValue?: string[] } & Omit<
  React.ComponentProps<typeof MultiSelect>,
  "value" | "onChange"
>) {
  const [selected, setSelected] = useState<string[]>(initialValue);
  return <MultiSelect {...props} value={selected} onChange={setSelected} />;
}

describe("<MultiSelect />", () => {
  test("renders placeholder when no value selected", () => {
    render(
      <MultiSelect
        options={options}
        value={[]}
        onChange={() => {}}
        placeholder='Select options'
      />
    );
    expect(screen.getByRole("button")).toHaveTextContent("Select options");
  });

  test("selects and deselects single option", () => {
    render(
      <ControlledMultiSelect options={options} placeholder='Select options' />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button); // open dropdown

    const firstOption = screen.getByLabelText("One");
    fireEvent.click(firstOption);
    expect(button).toHaveTextContent("One");

    fireEvent.click(firstOption);
    expect(button).toHaveTextContent("Select options");
  });

  test("select all checkbox selects all and deselects all", () => {
    render(
      <ControlledMultiSelect
        options={options}
        placeholder='Select options'
        showSelectAll
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button); // open dropdown

    const selectAllCheckbox = screen.getByLabelText(/Select All/i);

    // Initially unchecked and no icon
    expect((selectAllCheckbox as HTMLInputElement).checked).toBe(false);
    expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("minus-icon")).not.toBeInTheDocument();

    // Click "Select All"
    fireEvent.click(selectAllCheckbox);
    expect(button).toHaveTextContent("One, Two, Three");
    expect((selectAllCheckbox as HTMLInputElement).checked).toBe(true);
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();

    // Click "Deselect All"
    fireEvent.click(selectAllCheckbox);
    expect(button).toHaveTextContent("Select options");
    expect((selectAllCheckbox as HTMLInputElement).checked).toBe(false);
    expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
  });

  test("select all checkbox shows minus icon when some selected", () => {
    render(
      <ControlledMultiSelect
        options={options}
        placeholder='Select options'
        showSelectAll
        initialValue={["one"]}
      />
    );

    fireEvent.click(screen.getByRole("button")); // open dropdown

    const selectAllLabel = screen.getByLabelText(/Select All/i);

    // Checkbox is unchecked
    expect((selectAllLabel as HTMLInputElement).checked).toBe(false);

    // Minus icon is shown for indeterminate state
    expect(screen.getByTestId("minus-icon")).toBeInTheDocument();

    // Check icon is NOT present
    expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
  });
});
