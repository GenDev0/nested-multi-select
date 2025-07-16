# @gendev0/shadcn-multi-select

🎯 A reusable **Shadcn-style MultiSelect and DataMultiSelect** components for Next.js, TailwindCSS 3/4, and React 18+.

✅ Includes:
- Generic `<MultiSelect />` for multi-choice lists
- `<DataMultiSelect />` for parent–child (category–subcategory) selection
- Built with TailwindCSS utility classes
- Optional `cn()` utility included
- Mobile-friendly, fully responsive

---

## 📦 Installation

```bash
npm install @gendev0/shadcn-multi-select
````

Or with Yarn:

```bash
yarn add @gendev0/shadcn-multi-select
```

---

## 🧩 Components

### `MultiSelect`

A simple multiselect component.

#### Props:

| Prop          | Type                                  | Description               |
| ------------- | ------------------------------------- | ------------------------- |
| `options`     | `{ label: string; value: string; }[]` | Options to display        |
| `value`       | `string[]`                            | Currently selected values |
| `onChange`    | `(values: string[]) => void`          | Change handler            |
| `placeholder` | `string`                              | Optional placeholder text |
| `className`   | `string`                              | Optional custom classes   |

#### Example:

```tsx
import { MultiSelect } from '@gendev0/shadcn-multi-select'

const [selected, setSelected] = useState<string[]>([])

<MultiSelect
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]}
  value={selected}
  onChange={setSelected}
/>
```

---

### `DataMultiSelect`

For selecting an item and its subitems.

#### Props:

| Prop             | Type                 | Description               |
| ---------------- | -------------------- | ------------------------- |
| `items`          | `ItemWithChildren[]` | Parent + subitems         |
| `label`          | `string`             | Optional main label       |
| `placeholder`    | `string`             | Optional main placeholder |
| `subLabel`       | `string`             | Optional sub label        |
| `subPlaceholder` | `string`             | Optional sub placeholder  |
| `className`      | `string`             | Optional custom classes   |

#### Example:

```tsx
import { DataMultiSelect } from '@gendev0/shadcn-multi-select'

<DataMultiSelect
  items={[
    {
      id: 1,
      name: 'Category 1',
      subItems: [
        { id: 1, name: 'Sub 1' },
        { id: 2, name: 'Sub 2' }
      ]
    }
  ]}
/>
```

---

## 🛠 Utility: `cn`

This package uses the following utility internally, and you can also import it:

```ts
import { cn } from '@gendev0/shadcn-multi-select'

cn('p-2', isActive && 'bg-blue-500')
```

Or copy it to your own project:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 📋 Peer Dependencies

Make sure you have these installed in your project:

* `react` ^18+
* `react-dom` ^18+
* `tailwindcss` ^3+ or ^4+
* `clsx`
* `tailwind-merge`
* `lucide-react`

Install if missing:

```bash
npm install clsx tailwind-merge lucide-react
```

---

## 📜 License

MIT © [Ahmed Chebbi](https://github.com/gendev0)

