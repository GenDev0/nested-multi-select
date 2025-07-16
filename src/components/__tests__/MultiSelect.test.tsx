import { render, screen, fireEvent } from "@testing-library/react";
import { MultiSelect } from "../MultiSelect";

describe("<MultiSelect />", () => {
  it("renders with placeholder", () => {
    render(
      <MultiSelect
        options={[{ label: "One", value: "1" }]}
        value={[]}
        onChange={() => {}}
        placeholder='Select...'
      />
    );
    expect(screen.getByText(/Select/i)).toBeInTheDocument();
  });

  it("calls onChange when option is clicked", () => {
    const handleChange = jest.fn();
    render(
      <MultiSelect
        options={[{ label: "One", value: "1" }]}
        value={[]}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByRole("button")); // open dropdown
    fireEvent.click(screen.getByText("One"));
    expect(handleChange).toHaveBeenCalledWith(["1"]);
  });
});
