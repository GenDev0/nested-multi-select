# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.1] - 2025-07-18
### Fixed
- Correctly sets `indeterminate` state on “Select All” checkbox.
- Adds missing `data-testid` attributes for proper test assertions.
- Removes unnecessary `aria-checked` on native inputs.
- Minor visual style and accessibility tweaks.

### Changed
- Internal code refactoring for readability and maintainability.

---

## [1.0.0] - 2025-07-17
### Added
- Initial release of `MultiSelect` component.
- Supports:
  - Multi-option selection
  - “Select All” / “Deselect All”
  - Indeterminate state when some options selected
  - Grid layouts
  - Customizable classes
  - Fully tested with Jest and RTL
