# Table Pagination Feature

This document provides a comprehensive guide to using the pagination feature in the custom Table component.

## Features

The Table component now includes full pagination support with the following features:

- ✅ **Normal page navigation** - Click on page numbers to jump to specific pages
- ✅ **Previous/Next page** - Navigate to adjacent pages
- ✅ **First/Last page** - Jump to the beginning or end of the table
- ✅ **Go to page** - Input field to jump to a specific page number
- ✅ **Items per page selector** - Choose how many rows to display per page
- ✅ **Item count display** - Shows "Showing X to Y of Z items"
- ✅ **Smart ellipsis** - Shows "..." for large page ranges
- ✅ **Keyboard support** - Press Enter in the "Go to page" input to navigate

## Basic Usage

### Simple Pagination

```tsx
import { Table } from '@ui/Table'
import { generateMockUsers } from './mock'
import { columns } from './columns'

function MyComponent() {
  const data = generateMockUsers(100)

  return <Table data={data} columns={columns} pagination={true} pageSize={10} />
}
```

## API Reference

### Table Component Props

| Prop                 | Type                                              | Default     | Description                                              |
| -------------------- | ------------------------------------------------- | ----------- | -------------------------------------------------------- |
| `data`               | `TData[]`                                         | Required    | Array of data to display in the table                    |
| `columns`            | `ColumnDef<TData>[]`                              | Required    | Column definitions for the table                         |
| `pagination`         | `boolean \| ((table: Table<TData>) => ReactNode)` | `false`     | Enable pagination or provide custom pagination component |
| `pageSize`           | `number`                                          | `10`        | Initial number of items per page                         |
| `paginationState`    | `PaginationState`                                 | `undefined` | Controlled pagination state                              |
| `onPaginationChange` | `(state: PaginationState) => void`                | `undefined` | Callback when pagination changes                         |
| `border`             | `boolean`                                         | `true`      | Show table borders                                       |
| `footer`             | `boolean \| ((table: Table<TData>) => ReactNode)` | `false`     | Show table footer                                        |

### TablePagination Component Props

| Prop                   | Type           | Default                | Description                           |
| ---------------------- | -------------- | ---------------------- | ------------------------------------- |
| `table`                | `Table<TData>` | Required               | TanStack Table instance               |
| `showPageSizeSelector` | `boolean`      | `true`                 | Show the items per page dropdown      |
| `pageSizeOptions`      | `number[]`     | `[10, 20, 30, 40, 50]` | Available page size options           |
| `showGoToPage`         | `boolean`      | `true`                 | Show the "Go to page" input field     |
| `showItemsInfo`        | `boolean`      | `true`                 | Show "Showing X to Y of Z items" text |

## Advanced Usage

### Controlled Pagination

You can control the pagination state externally:

```tsx
import { useState } from 'react'
import { Table } from '@ui/Table'
import type { PaginationState } from '@tanstack/react-table'

function MyComponent() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  return (
    <Table
      data={data}
      columns={columns}
      pagination={true}
      paginationState={pagination}
      onPaginationChange={setPagination}
    />
  )
}
```

### Custom Pagination Component

You can provide a custom pagination renderer:

```tsx
import { Table, TablePagination } from '@ui/Table'

function MyComponent() {
  return (
    <Table
      data={data}
      columns={columns}
      pagination={table => (
        <div className="bg-muted p-4 rounded-lg">
          <TablePagination
            table={table}
            showPageSizeSelector={true}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            showGoToPage={true}
            showItemsInfo={true}
          />
        </div>
      )}
      pageSize={15}
    />
  )
}
```

### Custom Pagination UI

Create your own pagination component from scratch:

```tsx
import type { Table } from '@tanstack/react-table'

function MyCustomPagination<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="flex items-center justify-between p-4">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>

      <span>
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </span>

      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
    </div>
  )
}

// Usage
;<Table
  data={data}
  columns={columns}
  pagination={table => <MyCustomPagination table={table} />}
/>
```

## Pagination with Different Page Sizes

```tsx
// Small page size for compact displays
<Table data={data} columns={columns} pagination={true} pageSize={5} />

// Medium page size (default)
<Table data={data} columns={columns} pagination={true} pageSize={10} />

// Large page size for desktop
<Table data={data} columns={columns} pagination={true} pageSize={25} />

// Extra large for reports
<Table data={data} columns={columns} pagination={true} pageSize={100} />
```

## TanStack Table Integration

The pagination feature uses TanStack Table's built-in pagination functionality. You can access the full table API:

```tsx
const MyPaginationComponent = ({ table }: { table: Table<TData> }) => {
  // Access pagination state
  const { pageIndex, pageSize } = table.getState().pagination

  // Pagination methods
  table.setPageIndex(0) // Go to first page
  table.setPageSize(20) // Change page size
  table.previousPage() // Go to previous page
  table.nextPage() // Go to next page
  table.getPageCount() // Get total page count
  table.getCanPreviousPage() // Check if can go to previous page
  table.getCanNextPage() // Check if can go to next page
  table.getRowModel().rows // Get current page rows
  table.getFilteredRowModel().rows.length // Get total filtered items

  return <div>{/* Your custom pagination UI */}</div>
}
```

## Responsive Design

The pagination component is fully responsive:

- **Mobile**: Previous/Next buttons show icons only
- **Desktop**: Previous/Next buttons show text and icons
- **Adaptive layout**: Controls stack vertically on small screens

## Keyboard Shortcuts

- **Enter**: In the "Go to page" input, press Enter to navigate
- **Tab**: Navigate between pagination controls

## Accessibility

The pagination component follows accessibility best practices:

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Disabled state for unavailable actions
- Semantic HTML elements

## Examples

See the `App.tsx` file for complete working examples demonstrating:

1. Table with default pagination
2. Table with custom pagination styling
3. Table without pagination
4. Controlled pagination state

## Styling

The pagination components use the existing design system and can be customized with Tailwind CSS classes through the `className` prop on the wrapper elements.

```tsx
<Table
  data={data}
  columns={columns}
  pagination={table => (
    <div className="mt-6 border-t pt-4">
      <TablePagination table={table} />
    </div>
  )}
/>
```

## Best Practices

1. **Choose appropriate page sizes**: Use 10-25 items for most use cases
2. **Show item counts**: Help users understand the total data scope
3. **Provide multiple page size options**: Let users customize their view
4. **Use controlled state**: For complex scenarios with URL sync or external state management
5. **Optimize large datasets**: Consider server-side pagination for 1000+ items

## Troubleshooting

### Pagination not showing

Make sure `pagination={true}` is set on the Table component.

### Page count incorrect

The page count is automatically calculated from your data length and page size.

### State not updating

If using controlled pagination, ensure you're providing both `paginationState` and `onPaginationChange`.

## License

This component is part of the custom-shadcn-ui project.
