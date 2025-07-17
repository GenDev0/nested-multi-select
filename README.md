# 📦 `@gendev0/nested-multi-select`

> A reusable, type-safe, fully customizable **Nested MultiSelect** React component suite for Next.js & TailwindCSS, in Shadcn style.

---

## ✨ Features

✅ Shadcn-style, accessible UI
✅ Type-safe generics with flexible nested keys (`children`, `subItems`, etc.)
✅ Responsive & mobile-friendly layouts
✅ Supports dark mode out of the box
✅ “Select All” for sub-items
✅ Configurable grid or list display for sub-items
✅ Fully customizable with `classNames` props
✅ TailwindCSS-friendly (`cn` utility included)

---

## 🚀 Installation

Install the package:

```bash
npm install @gendev0/nested-multi-select
# or
yarn add @gendev0/nested-multi-select
```

Peer dependencies (if not already installed):

```bash
npm install react react-dom clsx lucide-react tailwind-merge
# or
yarn add react react-dom clsx lucide-react tailwind-merge
```

---

## 📖 Usage

### 📝 `MultiSelect`

Basic standalone multi-select:

```tsx
import { MultiSelect } from "@gendev0/nested-multi-select";

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

### 📝 `DataMultiSelect`

Nested, type-safe multi-select with parent & sub-items:

```tsx
import { DataMultiSelect } from "@gendev0/nested-multi-select";

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
  selectedItem={null}
  onSelectedItemChange={(item) => console.log(item)}
  selectedSubItems={[]}
  onSelectedSubItemsChange={(ids) => console.log(ids)}
  placeholder="Select category"
/>
```

Or using a different nested key (`subItems`):

```tsx
<DataMultiSelect
  items={groups}
  childrenKey="subItems"
  selectedItem={null}
  onSelectedItemChange={(item) => console.log(item)}
  selectedSubItems={[]}
  onSelectedSubItemsChange={(ids) => console.log(ids)}
  placeholder="Select group"
/>
```

---

## 🎨 Customization

Both components accept `classNames` props to override styles.
For `DataMultiSelect`:

| Prop                          | Description              |
| ----------------------------- | ------------------------ |
| `classNames.container`        | Wrapper container styles |
| `classNames.mainSelect`       | Parent select element    |
| `classNames.subItemContainer` | Sub-item section         |
| `classNames.subItemOption`    | Each sub-item option     |

📐 Layout options for sub-items:

* `"list"` (default)
* `"grid-cols-2"`
* `"grid-cols-3"`

✅ Enable `showSelectAll` to add a “Select All” option for sub-items.

Example:

```tsx
<DataMultiSelect
  items={categories}
  childrenKey="children"
  selectedItem={null}
  onSelectedItemChange={() => {}}
  selectedSubItems={[]}
  onSelectedSubItemsChange={() => {}}
  showSelectAll
  subItemsLayout="grid-cols-2"
  classNames={{
    container: "bg-muted p-4 rounded-md",
    mainSelect: "bg-background border-primary",
    subItemOption: "hover:bg-accent"
  }}
/>
```

---

## 🧹 Utilities

The `cn` utility is included for merging Tailwind classes:

```tsx
import { cn } from "@gendev0/nested-multi-select";

const className = cn("base", condition && "active");
```

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