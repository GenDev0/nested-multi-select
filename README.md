# 📦 `@gendev0/shadcn-multi-select`

> A reusable, type-safe Shadcn-style `MultiSelect` and `DataMultiSelect` React components for Next.js with TailwindCSS.

---

## ✨ Features

* ✅ Shadcn-style UI consistency
* ✅ Type-safe generics with flexible nested keys (`children`, `subItems`, etc.)
* ✅ Fully responsive and mobile-first
* ✅ TailwindCSS friendly (`cn` utility included for class merging)

---

## 🚀 Installation

Install the package:

```bash
npm install @gendev0/shadcn-multi-select
# or
yarn add @gendev0/shadcn-multi-select
```

Also install peer dependencies if you don’t have them yet:

```bash
npm install react react-dom clsx lucide-react tailwind-merge
# or
yarn add react react-dom clsx lucide-react tailwind-merge
```

---

## 📖 Usage

### `MultiSelect`

Basic multi-select usage example:

```tsx
import { MultiSelect } from "@gendev0/shadcn-multi-select";

<MultiSelect
  options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ]}
  value={["1"]}
  onChange={(vals) => console.log(vals)}
  placeholder="Select options"
/>
```

---

### `DataMultiSelect`

Generic, type-safe nested multi-select:

```tsx
import { DataMultiSelect } from "@gendev0/shadcn-multi-select";

const categories = [
  {
    id: 1,
    name: "Category 1",
    children: [
      { id: 1, name: "Child 1" },
      { id: 2, name: "Child 2" },
    ],
  },
];

<DataMultiSelect
  items={categories}
  childrenKey="children"
  placeholder="Select category"
/>
```

Or using a different nested key:

```tsx
const groups = [
  {
    id: 1,
    name: "Group 1",
    subItems: [
      { id: 1, name: "Sub 1" },
      { id: 2, name: "Sub 2" },
    ],
  },
];

<DataMultiSelect
  items={groups}
  childrenKey="subItems"
  placeholder="Select group"
/>
```

---

## 🧹 Utilities

Includes `cn` utility (like Shadcn) for convenient className merging:

```tsx
import { cn } from "@gendev0/shadcn-multi-select";

const className = cn("base-class", condition && "conditional-class");
```

---

## 🧪 Running tests

This project uses Jest and React Testing Library for testing:

```bash
npm test
# or
yarn test
```

---

## 📄 License

MIT © [Ahmed Chebbi](https://github.com/gendev0)