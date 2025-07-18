# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.1] - 2025-07-18

### Fixed

* 🐛 Allow selecting/deselecting individual sub-items even if parent was not selected previously.
* ♻️ Improved selection logic to automatically create parent entry when selecting a child directly.
* 🧹 General code cleanup and minor UX improvements for nested selection behavior.
* ✅ Updated tests to cover sub-item selection without prior parent selection.

---

## [1.1.0] - 2025-07-18

### Added

* ✨ **`<NestedMultiSelect />` component**

  * Supports nested parent-child multi-selection in a single dropdown.
  * Each parent item behaves as a select-all toggle for its children.
  * Selection result shape:

    ```ts
    { itemId: number, subItemIds: number[] }[]
    ```
  * Supports keyboard navigation and screen reader accessibility.
  * Fully customizable via `classNames` props for container, trigger, item, child, etc.

### Improved

* 🎨 Both `MultiSelect` and `NestedMultiSelect` now accept extended `classNames` for finer styling control.

### Fixed

* 🧪 Improved and stabilized test suite:

  * Fixed tests for indeterminate checkbox state.
  * Added tests for `NestedMultiSelect` selection scenarios and customization.
  * Added missing `data-testid`s and improved test selectors.

---

## [1.0.1] - 2025-07-18

### Fixed

* Correctly sets `indeterminate` state on “Select All” checkbox.
* Adds missing `data-testid` attributes for proper test assertions.
* Removes unnecessary `aria-checked` on native inputs.
* Minor visual style and accessibility tweaks.

### Changed

* Internal code refactoring for readability and maintainability.

---

## [1.0.0] - 2025-07-17

### Added

* Initial release of `MultiSelect` component.
* Supports:

  * Multi-option selection
  * “Select All” / “Deselect All”
  * Indeterminate state when some options are selected
  * Grid layouts
  * Fully customizable via `classNames`
  * Fully tested with Jest and React Testing Library
