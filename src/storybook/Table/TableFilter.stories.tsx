import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  createColumnHelper,
  type ColumnDef,
  type ColumnFiltersState,
} from '@tanstack/react-table'

import Table from '@ui/Table'
import Input from '@ui/Input'
import Button from '@ui/Button'
import { generateMockUsers, type TUserRecord } from '@/mock'

const meta: Meta = {
  title: 'UI/Table/Filter',
  component: Table,
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// ==================== Column Definitions ====================

const columnHelper = createColumnHelper<TUserRecord>()

const TableTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold">{children}</span>
)

const CenterText = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-center">{children}</div>
)

const basicColumns = [
  columnHelper.display({
    id: 'number',
    header: () => (
      <TableTitle>
        <CenterText>No</CenterText>
      </TableTitle>
    ),
    cell: info => <CenterText>{info.row.index + 1}</CenterText>,
    size: 40,
  }),
  columnHelper.accessor('firstName', {
    header: () => <TableTitle>First Name</TableTitle>,
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    id: 'lastName',
    header: () => <TableTitle>Last Name</TableTitle>,
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: () => <TableTitle>Age</TableTitle>,
  }),
  columnHelper.accessor('visits', {
    header: () => <TableTitle>Visits</TableTitle>,
  }),
  columnHelper.accessor('status', {
    header: () => <TableTitle>Status</TableTitle>,
  }),
  columnHelper.accessor('progress', {
    header: () => <TableTitle>Profile Progress</TableTitle>,
  }),
] as ColumnDef<TUserRecord>[]

const filterSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z.union([z.number(), z.tuple([z.number(), z.number()])]).optional(),
  visits: z.union([z.number(), z.tuple([z.number(), z.number()])]).optional(),
  status: z.array(z.string()).optional(),
  progress: z.union([z.number(), z.tuple([z.number(), z.number()])]).optional(),
})

const FilterForm = ({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof filterSchema>) => void
}) => {
  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      age: undefined,
      visits: undefined,
      status: [],
      progress: undefined,
    },
  })

  return (
    <form id="filter-form" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mb-4 flex gap-6">
        <div className="flex items-center gap-2">
          <label htmlFor="firstName" className="block mb-1">
            First Name:
          </label>
          <Input
            {...form.register('firstName')}
            className="flex-1"
            placeholder="Filter First Name"
            id="firstName"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="lastName" className="block mb-1">
            Last Name:
          </label>
          <Input
            {...form.register('lastName')}
            className="flex-1"
            placeholder="Filter Last Name"
            id="lastName"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit">Search</Button>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="rounded-full"
            onClick={() => {
              form.reset()
            }}
            aria-label="Reset filters"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      </div>
    </form>
  )
}

// ==================== Basic Examples ====================

export const DefaultClientFilter: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(10_000))
    const [filterData, setFilterData] = useState<ColumnFiltersState>([])

    const handleSubmit = (data: z.infer<typeof filterSchema>) => {
      // Implement filtering logic here
      const newFilters: ColumnFiltersState = Object.entries(data)
        .map(([key, value]) => {
          if (value === undefined || value === null || value === '') {
            return null
          }
          return {
            id: key,
            value: value,
          }
        })
        .filter(Boolean) as ColumnFiltersState
      setFilterData(newFilters)
    }

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Default Client Filter
          </h3>
          <p className="text-sm text-muted-foreground">
            This table includes all filtering features: text input for each
            column, multi-select for status, and range sliders for age and
            visits.
          </p>
        </div>

        <FilterForm onSubmit={handleSubmit} />

        <Table
          data={mockData}
          columns={basicColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10 }}
          filter={filterData}
        />
      </div>
    )
  },
}

export const ServerFilter: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(10_000))
    const [filterData, setFilterData] = useState<ColumnFiltersState>([])

    const handleSubmit = (data: z.infer<typeof filterSchema>) => {
      // Implement filtering logic here
      const newFilters: ColumnFiltersState = Object.entries(data)
        .map(([key, value]) => {
          if (value === undefined || value === null || value === '') {
            return null
          }
          return {
            id: key,
            value: value,
          }
        })
        .filter(Boolean) as ColumnFiltersState
      setFilterData(newFilters)
    }

    // fake filter, in real scenario, you would fetch data from server with applied filters
    const data: TUserRecord[] = useMemo(() => {
      // Simulate server-side filtering
      if (!filterData.length) return mockData

      return mockData.filter(row => {
        return filterData.every(filter => {
          const value = row[filter.id as keyof TUserRecord]
          if (
            filter.value === undefined ||
            filter.value === null ||
            filter.value === ''
          ) {
            return true
          }
          if (typeof filter.value === 'string') {
            return String(value)
              .toLowerCase()
              .includes(filter.value.toLowerCase())
          }
          if (Array.isArray(filter.value)) {
            // For status (multi-select)
            return filter.value.length === 0 || filter.value.includes(value)
          }
          if (typeof filter.value === 'number') {
            return value === filter.value
          }
          if (Array.isArray(filter.value) && filter.value.length === 2) {
            // For range filters
            const [min, max] = filter.value
            return value >= min && value <= max
          }
          return true
        })
      })
    }, [filterData, mockData])

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Server-side Filter
          </h3>
          <p className="text-sm text-muted-foreground">
            This table simulates server-side filtering: filters are applied to
            the data before rendering, mimicking a backend query.
          </p>
        </div>

        <FilterForm onSubmit={handleSubmit} />

        <Table
          data={data}
          columns={basicColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10 }}
        />
      </div>
    )
  },
}
