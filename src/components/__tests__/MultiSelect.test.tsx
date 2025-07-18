import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MultiSelect } from "../MultiSelect.js";

const options = [
  { label: "One", value: "1" },
  { label: "Two", value: "2" },
];

describe("<MultiSelect />", () => {
  it("toggles Select All and Deselect All correctly", async () => {
    let value: string[] = [];
    const handleChange = jest.fn((newValue) => {
      value = newValue;
      rerender(
        <MultiSelect
          options={options}
          value={value}
          onChange={handleChange}
          showSelectAll
        />
      );
    });

    const { rerender } = render(
      <MultiSelect
        options={options}
        value={value}
        onChange={handleChange}
        showSelectAll
      />
    );

    const trigger = screen.getByRole("button");

    // Open dropdown
    fireEvent.click(trigger);
    expect(await screen.findByText("Select All")).toBeInTheDocument();

    // Click Select All
    fireEvent.click(screen.getByText("Select All"));
    expect(handleChange).toHaveBeenCalledWith(["1", "2"]);

    await waitFor(() =>
      expect(screen.queryByText("Select All")).not.toBeInTheDocument()
    );

    // Reopen dropdown after value updates
    fireEvent.click(screen.getByRole("button"));

    expect(await screen.findByText("Deselect All")).toBeInTheDocument();

    // Click Deselect All
    fireEvent.click(screen.getByText("Deselect All"));
    expect(handleChange).toHaveBeenCalledWith([]);
  });
});
