# TableComponent forwardRef Usage Example

The `TableComponent` now supports `forwardRef` with full TypeScript type safety. The ref will correctly point to the `Table<TData>` instance from `@tanstack/react-table`.

## Usage Example

```tsx
import { useRef } from 'react'
import { type Table } from '@tanstack/react-table'
import TableComponent from '@/components/ui/Table/Table'

interface User {
  id: number
  name: string
  email: string
}

function MyComponent() {
  // Create a ref with the correct type
  const tableRef = useRef<Table<User>>(null)

  const columns = [
    // ... your column definitions
  ]

  const data: User[] = [
    // ... your data
  ]

  // Access table instance methods
  const handleAction = () => {
    if (tableRef.current) {
      // Full Table<User> API is available
      console.log(tableRef.current.getRowModel())
      tableRef.current.setPageIndex(0)
      console.log(tableRef.current.getState())
      // ... any other Table methods
    }
  }

  return (
    <div>
      <button onClick={handleAction}>Reset to First Page</button>
      <TableComponent
        ref={tableRef}
        data={data}
        columns={columns}
        pagination={true}
      />
    </div>
  )
}
```

## Key Features

✅ **Generic Type Support**: `<TData extends RowData>`  
✅ **Type-safe ref**: `useRef<Table<TData>>(null)`  
✅ **All TableProps maintained**: No breaking changes to existing props  
✅ **Full Table API**: Access to all `@tanstack/react-table` methods  
✅ **No `any` types**: Complete TypeScript type safety

## Available Table Methods (via ref)

When you access `tableRef.current`, you get the full `Table<TData>` instance with methods like:

- `getRowModel()` - Get the current row model
- `setPageIndex(index)` - Set the current page
- `setPageSize(size)` - Set the page size
- `getState()` - Get the current table state
- `getColumn(id)` - Get a specific column
- `getAllColumns()` - Get all columns
- `resetPagination()` - Reset pagination state
- And many more from the TanStack Table API
