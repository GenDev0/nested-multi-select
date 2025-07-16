# 📦 `@gendev0/shadcn-multi-select`

> A reusable, type-safe ShadCN-style `MultiSelect` and `DataMultiSelect` components for React/Next.js with TailwindCSS.

---

## ✨ Features

✅ ShadCN-style
✅ Type-safe generics
✅ Works with any nested key (`children`, `subItems`, etc.)
✅ Fully responsive
✅ TailwindCSS friendly (`cn` util included)

---

## 🚀 Installation

```bash
npm install @gendev0/shadcn-multi-select
```

or

```bash
yarn add @gendev0/shadcn-multi-select
```

You also need peer dependencies:

```bash
npm install react react-dom clsx lucide-react tailwind-merge
```

---

## 📖 Usage

### `MultiSelect`

Basic multi-select:

```tsx
import { MultiSelect } from "@gendev0/shadcn-multi-select"

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

Type-safe, generic, nested multi-select:

```tsx
import { DataMultiSelect } from "@gendev0/shadcn-multi-select"

const categories = [
  {
    id: 1,
    name: "Category 1",
    children: [
      { id: 1, name: "Child 1" },
      { id: 2, name: "Child 2" },
    ],
  },
]

<DataMultiSelect
  items={categories}
  childrenKey="children"
  placeholder="Select category"
/>
```

Or with different nested key:

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
]

<DataMultiSelect
  items={groups}
  childrenKey="subItems"
  placeholder="Select group"
/>
```

---

## 🧹 Utilities

This package exports `cn` (like ShadCN):

```tsx
import { cn } from "@gendev0/shadcn-multi-select"

const className = cn("base-class", condition && "conditional-class")
```

---

## 🧪 Running tests

This project uses `jest` + `@testing-library/react`.

```bash
npm test
```

---

## 📄 License

MIT © [Ahmed Chebbi](https://github.com/gendev0)
