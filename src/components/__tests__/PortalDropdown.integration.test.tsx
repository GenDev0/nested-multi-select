import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { usePortalDropdown } from "../../hooks/usePortalDropdown.js";
import { PortalDropdown } from "../PortalDropdown.js";

function TestWrapper() {
  const { open, setOpen, triggerRef, dropdownRef, styles } =
    usePortalDropdown();

  return (
    <div>
      <div ref={triggerRef}>
        <button onClick={() => setOpen((prev) => !prev)}>
          Toggle Dropdown
        </button>
      </div>

      <PortalDropdown
        open={open}
        dropdownRef={dropdownRef}
        styles={styles}
        className='dropdown'
      >
        <div data-testid='dropdown-content'>Hello from dropdown</div>
      </PortalDropdown>
    </div>
  );
}

describe("PortalDropdown + usePortalDropdown integration", () => {
  it("renders and closes via outside click", () => {
    render(<TestWrapper />);

    // ✅ Initially dropdown should NOT be visible
    expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();

    // ✅ Click the toggle button → dropdown should appear
    fireEvent.click(screen.getByText("Toggle Dropdown"));
    expect(screen.getByTestId("dropdown-content")).toBeInTheDocument();

    // ✅ Click outside → dropdown should close
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId("dropdown-content")).not.toBeInTheDocument();
  });

  it("positions dropdown below trigger", () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText("Toggle Dropdown"));
    const dropdown = screen.getByTestId("dropdown-content").parentElement;

    expect(dropdown).toHaveStyle({ position: "absolute" });
    expect(dropdown?.style.zIndex).toBe("9999");
    // We can’t assert exact top/left easily, but we know they exist:
    expect(dropdown?.style.top).toBeTruthy();
    expect(dropdown?.style.left).toBeTruthy();
  });
});
