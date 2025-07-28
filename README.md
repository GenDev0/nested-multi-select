# 📦 `@gendev0/nested-multi-select`

> A reusable, type-safe, fully customizable **Nested MultiSelect** React component suite for Next.js & TailwindCSS, in Shadcn style.

---

## 📚 Live Storybook

Explore the interactive documentation and examples on [Storybook](https://gendev0.github.io/nested-multi-select/?path=/docs/components-datamultiselect--docs).

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://gendev0.github.io/nested-multi-select/?path=/docs/components-datamultiselect--docs)

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-blue?logo=github&style=flat-square)](https://github.com/GenDev0/nested-multi-select)

---

## 🚀 Installation

Install the package:

```bash
npm install @gendev0/nested-multi-select
# or
yarn add @gendev0/nested-multi-select
```

Also install peer dependencies if you don’t have them yet:

```bash
npm install react react-dom clsx lucide-react tailwind-merge
# or
yarn add react react-dom clsx lucide-react tailwind-merge
```

---

## ✨ Features

* ✅ Shadcn-style, accessible UI (ARIA-friendly, keyboard navigation)
* ✅ Dropdown rendered via **React Portal** for correct layering (no clipping in modals/containers)
* ✅ Type-safe generics with flexible nested keys (`children`, `subItems`, etc.)
* ✅ Responsive & mobile-friendly layouts
* ✅ Supports dark mode out of the box
* ✅ **Nested multi-select with parent/child toggles**
* ✅ “Select All” for parents & sub-items
* ✅ Configurable grid or list display for sub-items
* ✅ Fully customizable with `classNames` props
* ✅ TailwindCSS-friendly (`cn` utility included)
* ✅ Fully tested with Jest + React Testing Library

---

## 📖 Usage

### 📝 `MultiSelect`

Basic standalone multi-select:

```tsx
import { MultiSelect } from "@gendev0/nested-multi-select";

<MultiSelect
  options={[{ label: "Option 1", value: "1" }]}
  value={["1"]}
  onChange={(vals) => console.log(vals)}
  placeholder="Select options"
/>
```

---

### 📝 `DataMultiSelect`

Type-safe two-step multi-select (parent + sub-items):

```tsx
import { DataMultiSelect } from "@gendev0/nested-multi-select";

<DataMultiSelect
  items={categories}
  childrenKey="children"
  selectedItem={null}
  onSelectedItemChange={(item) => {}}
  selectedSubItems={[]}
  onSelectedSubItemsChange={(ids) => {}}
/>
```

---

### 📝 `NestedMultiSelect`

✅ Single-dropdown **nested parent-child multi-select**:
Each parent row can select/deselect all its children, and children can be toggled individually.
The resulting value has the shape:

```ts
{ itemId: number, subItemIds: number[] }[]
```

```tsx
import { NestedMultiSelect } from "@gendev0/nested-multi-select";

<NestedMultiSelect
  items={[
    {
      id: 1,
      name: "Parent 1",
      children: [
        { id: 1, name: "Child 1" },
        { id: 2, name: "Child 2" }
      ]
    }
  ]}
  value={[]}
  onChange={(val) => console.log(val)}
  childrenKey="children"
  placeholder="Select options"
/>
```

---

## 🎨 Customization

All components accept `classNames` props for fine-grained styling.

For `NestedMultiSelect`:

| Prop                  | Description                    |
| --------------------- | ------------------------------ |
| `classNames.trigger`  | Dropdown button trigger styles |
| `classNames.dropdown` | Dropdown panel styles          |
| `classNames.item`     | Parent row styles              |
| `classNames.child`    | Child row styles               |

For `DataMultiSelect`:

| Prop                          | Description              |
| ----------------------------- | ------------------------ |
| `classNames.container`        | Wrapper container styles |
| `classNames.mainSelect`       | Parent select element    |
| `classNames.subItemContainer` | Sub-item section         |
| `classNames.subItemOption`    | Each sub-item option     |

📐 Layout options:

* `"list"` (default)
* `"grid-cols-2"`
* `"grid-cols-3"`

✅ Enable `showSelectAll` to add “Select All” for sub-items or children.

---

## 🧪 Tests

Run tests with:

```bash
npm test
# or
yarn test
```

---

## 🌙 Dark Mode

Fully compatible with Tailwind’s `dark:` styles — integrates seamlessly into Shadcn-style dark mode themes.

---

## 📄 License

MIT © [Ahmed Chebbi](https://github.com/gendev0)