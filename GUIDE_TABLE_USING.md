# Table Component - Comprehensive Usage Guide

A powerful, flexible table component built on TanStack Table with built-in support for server-side operations, making it perfect for enterprise portals and admin dashboards.

## Table of Contents

1. [Overview](#overview)
2. [Installation & Setup](#installation--setup)
3. [Server-Side Operations (Priority)](#server-side-operations-priority)
4. [Common Portal Use Cases](#common-portal-use-cases)
5. [Props API Reference](#props-api-reference)
6. [Best Practices](#best-practices)

---

## Overview

### What is the Table Component?

The Table component is a feature-rich data table solution designed specifically for modern web portals. It provides seamless integration with server-side APIs for pagination, sorting, and filtering, making it ideal for handling large datasets efficiently.

### Key Features

✅ **Server-Side First** - Optimized for server-side pagination, sorting, and filtering  
✅ **Performance** - Virtual scrolling support for ultra-large datasets  
✅ **Flexibility** - Column pinning, grouping, expandable rows  
✅ **Customization** - Custom cell renderers, row actions, bulk operations  
✅ **Accessibility** - ARIA labels, keyboard navigation  
✅ **Responsive** - Mobile-friendly with horizontal scroll  
✅ **Loading States** - Built-in skeleton loaders and empty states

### When to Use What?

| Mode                          | Best For                       | Data Size   | Network  |
| ----------------------------- | ------------------------------ | ----------- | -------- |
| **Server-Side** (Recommended) | Portals, admin panels, reports | 1000+ rows  | Required |
| **Client-Side**               | Simple tables, static data     | < 1000 rows | Optional |

---

## Installation & Setup

### Dependencies

The Table component requires the following packages:

```bash
npm install @tanstack/react-table @tanstack/react-virtual
npm install @emotion/css lodash-es
```

### Import

```tsx
import Table from '@/components/ui/Table'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
```

### Basic Setup

```tsx
// Define your data type
type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

// Create column helper
const columnHelper = createColumnHelper<User>()

// Define columns
const columns = [
  columnHelper.accessor('firstName', {
    header: () => <span>First Name</span>,
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: () => <span>Last Name</span>,
    cell: info => info.getValue(),
  }),
  // ... more columns
]

// Render table
<Table
  data={users}
  columns={columns}
/>
```

---

## Server-Side Operations (Priority)

### 1. Server-Side Pagination

The most common use case in portals - handle large datasets by fetching only what's displayed.

#### Basic Implementation With React Query (Recommended)

```tsx
import { useQuery } from '@tanstack/react-query'

const useGetUsersList = (params: { page: 1; pageSize: 10 }) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  })
}

function UserManagementTable() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  })

  const { data, isLoading } = useGetUsersList(pagination)

  return (
    <>
      <Table
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          type: 'controlled',
          page: pagination.page,
          pageSize: pagination.pageSize,
          total: data?.total || 0,
          onPageChange: page => setPagination(prev => ({ ...prev, page })),
          onPageSizeChange: pageSize => setPagination({ page: 1, pageSize }),
        }}
      />
    </>
  )
}
```

#### API Response Format

Your server should return data in this format:

```json
{
  "data": [
    { "id": "1", "firstName": "John", "lastName": "Doe", ... },
    { "id": "2", "firstName": "Jane", "lastName": "Smith", ... }
  ],
  "total": 1234,
  "page": 1, // No needed
  "pageSize": 10, // No needed
  "totalPages": 124 // No needed
}
```

### 2. Server-Side Sorting

Enable users to sort data by clicking column headers - data sorting happens on the server.

#### Implementation With React Query (Recommended)

```tsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { SortingState } from '@tanstack/react-table'

// API function
const fetchUsers = async ({ sorting, ...params }: {
  page: number
  pageSize: number
  sorting: SortingState = []
}) => {
  // Convert sorting state to API parameters
  const sortParam =
    sorting.length > 0
      ? sorting.reduce((prev, curr) => prev[curr.id] = curr.desc ? 'desc' : 'asc', {})
      : null

  const queryParams = qs({
    ...params,
    sort: sortParam,
  }, { skipNulls: true, skipEmpty: false })

  return HttpService.get(`/api/users?${queryParams}`)
}

// Custom hook
const useGetUsersList = (params: {
  page: number
  pageSize: number
  sorting: SortingState
}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  })
}

function SortableUserTable() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const { data, isLoading, error } = useGetUsersList({
    ...pagination,
    sorting,
  })

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
          Error: {error.message}
        </div>
      )}

      <Table
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          type: 'controlled',
          page: pagination.page,
          pageSize: pagination.pageSize,
          total: data?.total || 0,
          onPageChange: page => setPagination(prev => ({ ...prev, page })),
          onPageSizeChange: pageSize => setPagination({ page: 1, pageSize }),
        }}
        sorting={{
          sortingState: sorting,
          onSortingChange: newSorting => setSorting(newSorting),
          enableMultiSort: false, // Single column sort
        }}
      />
    </>
  )
}
```

#### Multi-Column Sorting

```tsx
<Table
  data={users}
  columns={columns}
  sorting={{
    sortingState: sorting,
    onSortingChange: newSorting => setSorting(newSorting),
    enableMultiSort: true, // Enable Ctrl/Cmd + Click for multi-sort
  }}
/>
```

#### API Format for Sorting

```
GET /api/users?page=1&pageSize=10&sort.firstName=asc,sort.age=desc
```

### 3. Server-Side Filtering

Combine pagination and sorting with filtering for complete server-side data management.

#### Implementation With React Query (Recommended)

```tsx
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

interface UserFilters {
  firstName: string
  lastName: string
  email: string
  role: string
}

// API function
const fetchUsers = async (params: {
  page: number
  pageSize: number
  filters: UserFilters
}) => {
  const queryParams = qs(params, { skipNulls: true, skipEmpty: false })

  return HttpService.get(`/api/users?${queryParams}`)
}

// Custom hook with debouncing
const useGetUsersList = (params: {
  page: number
  pageSize: number
  filters: UserFilters
}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  })
}

function FilterableUserTable() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  })
  const [filters, setFilters] = useState<UserFilters>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  })

  const { data, isLoading, error } = useGetUsersList({
    ...pagination,
    filters,
  })

  const handleFilterChange = (field: keyof UserFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
    setPagination(prev => ({ ...prev, page: 1 })) // Reset to first page
  }

  return (
    <div>
      {/* Error State */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
          Error: {error.message}
        </div>
      )}

      {/* Filter Controls */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Filter by first name"
          value={filters.firstName}
          onChange={e => handleFilterChange('firstName', e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by email"
          value={filters.email}
          onChange={e => handleFilterChange('email', e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      <Table
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          type: 'controlled',
          page: pagination.page,
          pageSize: pagination.pageSize,
          total: data?.total || 0,
          onPageChange: page => setPagination(prev => ({ ...prev, page })),
          onPageSizeChange: pageSize => setPagination({ page: 1, pageSize }),
        }}
      />
    </div>
  )
}
```

### 4. Combined Server Operations

Real-world example combining pagination, sorting, and filtering with React Query best practices.

#### Implementation With React Query (Recommended)

```tsx
import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash-es'
import type { SortingState } from '@tanstack/react-table'

interface UserFilters {
  search?: string
  role?: string
  status?: 'active' | 'inactive'
  dateFrom?: string
  dateTo?: string
}

interface UserTableParams {
  page: number
  pageSize: number
  sorting: SortingState
  filters: UserFilters
}

// API function - separate for reusability
const fetchUsers = async ({ sorting, ...params }: UserTableParams) => {
  const sortParam =
    sorting.length > 0
      ? sorting.reduce(
          (prev, curr) => (prev[curr.id] = curr.desc ? 'desc' : 'asc'),
          {}
        )
      : null

  const queryParams = qs(
    {
      ...params,
      sort: sortParam,
    },
    { skipNulls: true, skipEmpty: false }
  )

  return HttpService.get(`/api/users?${queryParams}`)
}

// Custom hook
const useGetUsersList = (params: UserTableParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  })
}

function CompleteUserManagementTable() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  // Separate immediate and debounced filter states
  const [inputFilters, setInputFilters] = useState<UserFilters>({})

  // Fetch data with all parameters
  const { data, isLoading, error, refetch } = useGetUsersList({
    ...pagination,
    sorting,
    filters: inputFilters,
  })

  const handleFilterChange = (field: keyof UserFilters, value: string) => {
    const newFilters = { ...inputFilters, [field]: value }
    setInputFilters(newFilters) // Update input immediately
  }

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting)
    setPagination(prev => ({ ...prev, page: 1 })) // Reset to page 1
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search users..."
          value={inputFilters.search || ''}
          onChange={e => handleFilterChange('search', e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={inputFilters.role || ''}
          onChange={e => handleFilterChange('role', e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="editor">Editor</option>
        </select>
        <select
          value={inputFilters.status || ''}
          onChange={e =>
            handleFilterChange(
              'status',
              e.target.value as 'active' | 'inactive'
            )
          }
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded flex justify-between items-center">
          <span>Error: {error.message}</span>
          <button
            onClick={() => refetch()}
            className="underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <Table
        data={data?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          type: 'controlled',
          page: pagination.page,
          pageSize: pagination.pageSize,
          total: data?.total || 0,
          onPageChange: page => setPagination(prev => ({ ...prev, page })),
          onPageSizeChange: pageSize => setPagination({ page: 1, pageSize }),
        }}
        sorting={{
          sortingState: sorting,
          onSortingChange: handleSortingChange,
          enableMultiSort: false,
        }}
      />
    </div>
  )
}
```

#### Key Features:

1. **Automatic Page Reset**: Filters and sorting changes reset pagination to page 1
2. **Smooth Transitions**: `keepPreviousData` prevents flickering between page changes
3. **Data Caching**: `staleTime` reduces unnecessary API calls for 30 seconds
4. **Error Handling**: Built-in error state with retry functionality
5. **Type Safety**: Full TypeScript support for all parameters

---

## Common Portal Use Cases

### 1. User Management Table

```tsx
import { Eye, Pencil, Trash, Ban } from 'lucide-react'
import Button from '@/components/ui/Button'

const userColumns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    size: 40,
  }),

  columnHelper.accessor('email', {
    header: () => <span>Email</span>,
    cell: info => info.getValue(),
  }),

  columnHelper.accessor('role', {
    header: () => <span>Role</span>,
    cell: info => (
      <span
        className={`
        px-2 py-1 rounded text-xs
        ${info.getValue() === 'admin' ? 'bg-purple-100 text-purple-700' : ''}
        ${info.getValue() === 'user' ? 'bg-blue-100 text-blue-700' : ''}
      `}
      >
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor('status', {
    header: () => <span>Status</span>,
    cell: info => (
      <span
        className={`
        px-2 py-1 rounded text-xs
        ${info.getValue() === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
      `}
      >
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.display({
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="icon-sm" variant="ghost" title="View">
          <Eye className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" title="Edit">
          <Pencil className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" title="Suspend">
          <Ban className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" title="Delete">
          <Trash className="size-4" />
        </Button>
      </div>
    ),
    size: 160,
  }),
]

function UserManagementPortal() {
  const [selectedRows, setSelectedRows] = useState([])

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedRows.length} users?`)) {
      // API call to delete selected users
    }
  }

  return (
    <div>
      {selectedRows.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded flex justify-between items-center">
          <span>{selectedRows.length} users selected</span>
          <Button variant="destructive" onClick={handleBulkDelete}>
            Delete Selected
          </Button>
        </div>
      )}

      <Table
        data={users}
        columns={userColumns}
        // ... pagination and sorting props
      />
    </div>
  )
}
```

### 2. Transaction/Activity Log Table

```tsx
const transactionColumns = [
  columnHelper.accessor('id', {
    header: () => <span>Transaction ID</span>,
    cell: info => (
      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
        {info.getValue()}
      </code>
    ),
  }),

  columnHelper.accessor('timestamp', {
    header: () => <span>Date & Time</span>,
    cell: info => new Date(info.getValue()).toLocaleString(),
  }),

  columnHelper.accessor('amount', {
    header: () => <span className="block text-right">Amount</span>,
    cell: info => (
      <span className="block text-right font-mono">
        ${info.getValue().toFixed(2)}
      </span>
    ),
  }),

  columnHelper.accessor('status', {
    header: () => <span>Status</span>,
    cell: info => {
      const status = info.getValue()
      const colors = {
        completed: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        failed: 'bg-red-100 text-red-700',
      }
      return (
        <span className={`px-2 py-1 rounded text-xs ${colors[status]}`}>
          {status}
        </span>
      )
    },
  }),

  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => (
      <Button variant="outline" size="sm">
        View Details
      </Button>
    ),
  }),
]

// Use with server-side pagination for millions of records
<Table
  data={transactions}
  columns={transactionColumns}
  pagination={{
    type: 'controlled',
    page: page,
    pageSize: pageSize,
    total: total,
    onPageChange: setPage,
    onPageSizeChange: setPageSize,
  }}
  sorting={{
    sortingState: sorting,
    onSortingChange: setSorting,
  }}
/>
```

### 3. Data Table with Export

```tsx
import { Download, Filter } from 'lucide-react'

function DataTableWithExport() {
  const [state, setState] = useState({
    page: 1,
    pageSize: 10,
    sorting: [],
    filters: {},
  })

  const handleExport = async () => {
    try {
      // Export with current filters and sorting
      const queryParams = new URLSearchParams({
        ...state.filters,
        sort: state.sorting
          .map(s => `${s.id}:${s.desc ? 'desc' : 'asc'}`)
          .join(','),
      })

      const response = await fetch(`/api/users/export?${queryParams}`)
      const blob = await response.blob()

      // Download file
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `users-export-${Date.now()}.csv`
      a.click()
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold">Users</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="size-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <Filter className="size-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <Table
        data={users}
        columns={columns}
        // ... table props
      />
    </div>
  )
}
```

### 4. Expandable Row Details

```tsx
import { ChevronDown, ChevronRight } from 'lucide-react'
import Button from '@ui/Button'
import cn from '@utils/cn'

const expandableColumns = [
  columnHelper.display({
    id: 'expander',
    header: () => null,
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={row.getToggleExpandedHandler()}
          aria-label={row.getIsExpanded() ? 'Collapse' : 'Expand'}
          className="rounded-full"
        >
          <ChevronDown
            className={cn('size-4 transition-transform', {
              'rotate-180': row.getIsExpanded(),
            })}
          />
        </Button>
      ) : null,
    size: 40,
  }),
  // ... other columns
]
```

```tsx
<Table
  data={orders}
  columns={expandableColumns}
  expandable={{
    getRowCanExpand: () => true,
    renderExpanded: ({ row }) => (
      <div className="p-4 bg-gray-50">
        <h4 className="font-semibold mb-2">Order Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600">Order ID:</span> {row.original.id}
          </div>
          <div>
            <span className="text-gray-600">Customer:</span>{' '}
            {row.original.customer}
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">Items:</span>
            <ul className="mt-2 space-y-1">
              {row.original.items.map(item => (
                <li key={item.id}>
                  {item.name} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
  }}
/>
```

### 5. Column Pinning for Wide Tables

```tsx
<Table
  data={data}
  columns={manyColumns}
  columnPinning={{
    left: ['select', 'name'], // Pin checkboxes and name to left
    right: ['actions'], // Pin actions to right
  }}
  scroll={{
    x: 'content', // Enable horizontal scroll
    y: 600, // Fixed height with vertical scroll
    pingingHeader: true, // Sticky header
  }}
/>
```

### 6. Loading and Empty States

```tsx
const Page = () => (
  <Table
    data={users}
    columns={columns}
    loading={isLoading} // Shows skeleton loader
    pagination={paginationConfig}
  />
)

// Custom empty state
{
  users.length === 0 && !isLoading && (
    <div className="text-center py-12">
      <p className="text-gray-500 mb-4">No users found</p>
      <Button onClick={() => openCreateUserModal()}>Create First User</Button>
    </div>
  )
}
```

---

## Props API Reference

### Table Props

```typescript
interface TableProps<TData> {
  // Required
  data: TData[]
  columns: ColumnDef<TData>[]

  // Pagination (Server-side controlled)
  pagination?:
    | {
        type: 'controlled'
        page: number
        pageSize: number
        total: number
        pageSizeOptions?: number[]
        showPageSizeSelector?: boolean
        showGoToPage?: boolean
        showItemsInfo?: boolean
        onPageChange: (page: number) => void
        onPageSizeChange?: (pageSize: number) => void
      }
    | {
        type: 'uncontrolled'
        page: number
        pageSize: number
        pageSizeOptions?: number[]
        showPageSizeSelector?: boolean
        showGoToPage?: boolean
        showItemsInfo?: boolean
      }
    | false

  // Sorting
  sorting?:
    | {
        sortingState: SortingState
        onSortingChange: (sorting: SortingState) => void
        enableMultiSort?: boolean
      }
    | false

  // Other Props
  loading?: boolean
  border?: boolean
  footer?: boolean | ((table: Table<TData>) => React.ReactNode)
  columnPinning?: {
    left?: string[]
    right?: string[]
  }
  expandable?: {
    getSubRows?: (row: TData) => TData[]
    renderExpanded?: ({ row }) => React.ReactNode
    getRowCanExpand?: (row: Row<TData>) => boolean
  }
  virtualized?: boolean
  scroll?: {
    x?: number | 'content'
    y?: number
    pingingHeader?: boolean
  }
  ref?: React.Ref<Table<TData>>
}
```

### Column Definition

```typescript
// Accessor column (for data fields)
columnHelper.accessor('fieldName', {
  header: () => <span>Header</span>,
  cell: (info) => info.getValue(),
  footer: (props) => props.column.id,
  size: 100, // Column width
  enableSorting: true,
})

// Display column (for custom content)
columnHelper.display({
  id: 'actions',
  header: () => <span>Actions</span>,
  cell: ({ row }) => <ActionButtons row={row} />,
  size: 150,
})

// Group column (for hierarchical headers)
columnHelper.group({
  id: 'name',
  header: () => <span>Full Name</span>,
  columns: [
    columnHelper.accessor('firstName', { /* ... */ }),
    columnHelper.accessor('lastName', { /* ... */ }),
  ],
})
```

### Pagination Props (Controlled)

| Prop                   | Type                     | Default                | Description              |
| ---------------------- | ------------------------ | ---------------------- | ------------------------ |
| `type`                 | `'controlled'`           | -                      | Required for server-side |
| `page`                 | `number`                 | -                      | Current page (1-indexed) |
| `pageSize`             | `number`                 | -                      | Items per page           |
| `total`                | `number`                 | -                      | Total number of items    |
| `pageSizeOptions`      | `number[]`               | `[10, 20, 30, 40, 50]` | Available page sizes     |
| `showPageSizeSelector` | `boolean`                | `true`                 | Show page size dropdown  |
| `showGoToPage`         | `boolean`                | `true`                 | Show "go to page" input  |
| `showItemsInfo`        | `boolean`                | `true`                 | Show "1-10 of 100 items" |
| `onPageChange`         | `(page: number) => void` | -                      | Page change handler      |
| `onPageSizeChange`     | `(size: number) => void` | -                      | Page size change handler |

### Sorting Props

| Prop              | Type                              | Default | Description             |
| ----------------- | --------------------------------- | ------- | ----------------------- |
| `sortingState`    | `SortingState`                    | `[]`    | Current sort state      |
| `onSortingChange` | `(sorting: SortingState) => void` | -       | Sort change handler     |
| `enableMultiSort` | `boolean`                         | `false` | Allow multi-column sort |

---

## Best Practices

### Performance Optimization

1. **Use Server-Side Pagination for Large Datasets**

   ```tsx
   // ✅ Good - Fetch only what's needed
   const { data } = useQuery(['users', page], () => fetchUsers(page))

   // ❌ Bad - Fetches all data
   const [allUsers] = useState(fetchAll10000Users())
   ```

2. **Implement Debouncing for Filters**

   ```tsx
   const debouncedSearch = debounce(value => {
     setFilters(prev => ({ ...prev, search: value }))
   }, 300)
   ```

3. **Enable Virtual Scrolling for Very Large Lists**
   ```tsx
   <Table
     data={thousandsOfRows}
     columns={columns}
     virtualized={true}
     scroll={{ y: 600 }}
   />
   ```

### Error Handling

```tsx
const { data, error, isLoading, refetch } = useQuery({
  queryKey: ['users', page],
  queryFn: fetchUsers,
  onError: error => {
    toast.error(`Failed to load users: ${error.message}`)
  },
})

if (error) {
  return (
    <div className="text-center py-12">
      <p className="text-red-600 mb-4">Failed to load data</p>
      <Button onClick={() => refetch()}>Try Again</Button>
    </div>
  )
}
```

### Loading States

```tsx
// Show skeleton loader
const Page = () => (
  <Table data={data?.items || []} columns={columns} loading={isLoading} />
)

// Or custom loading state
{
  isLoading && (
    <div className="flex justify-center py-12">
      <Spinner />
    </div>
  )
}
```

### Accessibility

#### 1. ARIA Labels for Screen Readers

```tsx
// Add ARIA labels to action buttons
const columns = [
  columnHelper.display({
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: ({ row }) => (
      <div role="group" aria-label="User actions">
        <Button aria-label={`Edit ${row.original.name}`}>
          Edit
        </Button>
        <Button aria-label={`Delete ${row.original.name}`}>
          Delete
        </Button>
      </div>
    ),
  }),
]

// The component automatically uses semantic HTML
// <table>, <thead>, <tbody>, <tr>, <th>, <td>
<Table
  data={users}
  columns={columns}
/>
```

#### 2. Table Instance Access via Ref

You can access the TanStack Table instance outside the component using React refs. This is useful for:

- Programmatically controlling table state
- Reading current table state
- Integrating with external controls
- Debugging and testing

```tsx
import { useRef, useState } from 'react'
import type { Table as TableType } from '@tanstack/react-table'

function TableWithRef() {
  const [users] = useState<User[]>(generateMockUsers(30))
  const tableRef = useRef<TableType<User>>(null)

  const handleShowCurrentPage = () => {
    if (tableRef.current) {
      const state = tableRef.current.getState()
      const currentPage = state.pagination.pageIndex + 1
      const pageCount = tableRef.current.getPageCount()
      const rowCount = tableRef.current.getRowModel().rows.length

      alert(
        `Current page: ${currentPage}\nTotal pages: ${pageCount}\nRows on page: ${rowCount}`
      )
    }
  }

  const handleSelectAllRows = () => {
    if (tableRef.current) {
      tableRef.current.toggleAllRowsSelected(true)
    }
  }

  const handleResetSorting = () => {
    if (tableRef.current) {
      tableRef.current.resetSorting()
    }
  }

  return (
    <div>
      {/* External Controls */}
      <div className="mb-4 flex gap-2">
        <Button onClick={handleShowCurrentPage}>Show Current Page</Button>
        <Button onClick={handleSelectAllRows}>Select All Rows</Button>
        <Button onClick={handleResetSorting}>Reset Sorting</Button>
      </div>

      {/* Table with Ref */}
      <Table
        ref={tableRef}
        data={users}
        columns={columns}
        pagination={{
          type: 'uncontrolled',
          page: 1,
          pageSize: 10,
        }}
      />
    </div>
  )
}
```

#### 3. Common Table Instance Methods

```tsx
// Access table state
const state = tableRef.current?.getState()
const pagination = state.pagination
const sorting = state.sorting
const rowSelection = state.rowSelection

// Pagination methods
tableRef.current?.setPageIndex(0) // Go to first page
tableRef.current?.nextPage() // Go to next page
tableRef.current?.previousPage() // Go to previous page
tableRef.current?.getPageCount() // Get total page count
tableRef.current?.getCanNextPage() // Check if can go to next page
tableRef.current?.getCanPreviousPage() // Check if can go to previous page

// Row selection methods
tableRef.current?.toggleAllRowsSelected(true) // Select all rows
tableRef.current?.toggleAllRowsSelected(false) // Deselect all rows
tableRef.current?.getSelectedRowModel() // Get selected rows
tableRef.current?.getIsAllRowsSelected() // Check if all rows selected

// Sorting methods
tableRef.current?.resetSorting() // Clear all sorting
tableRef.current?.setSorting([{ id: 'name', desc: false }]) // Set sorting

// Row expansion methods
tableRef.current?.toggleAllRowsExpanded(true) // Expand all rows
tableRef.current?.toggleAllRowsExpanded(false) // Collapse all rows
tableRef.current?.getExpandedRowModel() // Get expanded rows

// Get data
tableRef.current?.getRowModel().rows // Get current page rows
tableRef.current?.getCoreRowModel().rows // Get all rows
```

### State Management

```tsx
// ✅ Good - Centralized state
interface TableState {
  page: number
  pageSize: number
  sorting: SortingState
  filters: Filters
}

const [state, setState] = useState<TableState>({
  page: 1,
  pageSize: 10,
  sorting: [],
  filters: {},
})

// ❌ Bad - Scattered state
const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)
const [sorting, setSorting] = useState([])
const [filters, setFilters] = useState({})
```

---

## Additional Resources

- [TanStack Table Docs](https://tanstack.com/table/latest)
- [React Query Docs](https://tanstack.com/query/latest)
- [Storybook Examples](./src/storybook/Table/)

---

## Quick Reference

### Server-Side Pagination

```tsx
<Table
  data={data?.items || []}
  columns={columns}
  loading={isLoading}
  pagination={{
    type: 'controlled',
    page: page,
    pageSize: pageSize,
    total: data?.total || 0,
    onPageChange: setPage,
    onPageSizeChange: setPageSize,
  }}
/>
```

### Server-Side Sorting

```tsx
<Table
  data={users}
  columns={columns}
  sorting={{
    sortingState: sorting,
    onSortingChange: setSorting,
  }}
/>
```

### Complete Server-Side Setup

```tsx
const [state, setState] = useState({
  page: 1,
  pageSize: 10,
  sorting: [],
  filters: {},
})

const { data, isLoading } = useQuery({
  queryKey: ['users', state],
  queryFn: () => fetchUsers(state),
  keepPreviousData: true,
})

<Table
  data={data?.items || []}
  columns={columns}
  loading={isLoading}
  pagination={{
    type: 'controlled',
    page: state.page,
    pageSize: state.pageSize,
    total: data?.total || 0,
    onPageChange: (page) => setState(prev => ({ ...prev, page })),
    onPageSizeChange: (pageSize) => setState({ ...state, pageSize, page: 1 }),
  }}
  sorting={{
    sortingState: state.sorting,
    onSortingChange: (sorting) => setState({ ...state, sorting, page: 1 }),
  }}
/>
```

---

**Last Updated**: October 30, 2025  
**Version**: 1.0.0  
**Maintainer**: Weston
