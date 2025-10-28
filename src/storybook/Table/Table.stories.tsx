import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import Table from '@ui/Table'
import { generateMockUsers, type TUserRecord } from '@/mock'
import { useRef } from 'react'
import type { Table as TableType } from '@tanstack/react-table'
import Button from '@ui/Button'
import { Eye, Pencil, RefreshCcw, Trash } from 'lucide-react'

const meta: Meta = {
  title: 'UI/Table',
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
  columnHelper.accessor('progress', {
    header: () => <TableTitle>Profile Progress</TableTitle>,
  }),
  columnHelper.accessor('status', {
    header: () => <TableTitle>Status</TableTitle>,
  }),
  columnHelper.display({
    id: 'actions',
    size: 140,
    header: () => <TableTitle>Actions</TableTitle>,
    cell: () => (
      <div className="flex gap-2 justify-center">
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="View"
          className="rounded-full"
        >
          <Eye />
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Edit"
          className="rounded-full"
        >
          <Pencil />
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Delete"
          className="rounded-full"
        >
          <Trash />
        </Button>
      </div>
    ),
  }),
] as ColumnDef<TUserRecord>[]

const groupedColumns = [
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
  columnHelper.group({
    id: 'hello',
    header: () => (
      <CenterText>
        <TableTitle>Hello</TableTitle>
      </CenterText>
    ),
    columns: [
      columnHelper.accessor('firstName', {
        header: () => <TableTitle>First Name</TableTitle>,
        cell: info => info.getValue(),
      }),
      columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        header: () => <TableTitle>Last Name</TableTitle>,
        cell: info => info.getValue(),
      }),
    ],
  }),
  columnHelper.group({
    id: 'info',
    header: () => (
      <CenterText>
        <TableTitle>Info</TableTitle>
      </CenterText>
    ),
    columns: [
      columnHelper.accessor('age', {
        header: () => <TableTitle>Age</TableTitle>,
        footer: props => props.column.id,
      }),
      columnHelper.group({
        id: 'moreInfo',
        header: () => (
          <CenterText>
            <TableTitle>More Info</TableTitle>
          </CenterText>
        ),
        columns: [
          columnHelper.accessor('visits', {
            header: () => <TableTitle>Visits</TableTitle>,
          }),
          columnHelper.accessor('status', {
            header: () => <TableTitle>Status</TableTitle>,
          }),
          columnHelper.accessor('progress', {
            header: () => <TableTitle>Profile Progress</TableTitle>,
          }),
        ],
      }),
    ],
  }),
]

// ==================== Basic Examples ====================

export const DefaultTable: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(20))

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table without Pagination
          </h3>
          <p className="text-sm text-muted-foreground">
            For comparison, here's a table without pagination (showing 20
            items).
          </p>
        </div>
        <Table data={mockData} columns={basicColumns} pagination={false} />
      </div>
    )
  },
}

export const TableWithGroupedColumns: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(50))

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Grouped Columns
          </h3>
          <p className="text-sm text-muted-foreground">
            Demonstrates column grouping with hierarchical headers.
          </p>
        </div>
        <Table data={mockData} columns={groupedColumns} />
      </div>
    )
  },
}

export const TableWithFooter: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(30))

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Table with Footer</h3>
          <p className="text-sm text-muted-foreground">
            Table displaying footer row with column information.
          </p>
        </div>
        <Table data={mockData} columns={groupedColumns} footer={true} />
      </div>
    )
  },
}

export const EmptyTable: Story = {
  render: () => {
    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Empty Table</h3>
          <p className="text-sm text-muted-foreground">
            Displays an empty state when there's no data.
          </p>
        </div>
        <Table data={[]} columns={basicColumns} />
      </div>
    )
  },
}

// ==================== Styling Variations ====================

export const TableWithoutBorder: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(50))

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Table without Border</h3>
          <p className="text-sm text-muted-foreground">
            Remove outer border by setting border prop to false.
          </p>
        </div>
        <Table data={mockData} columns={basicColumns} border={false} footer />
      </div>
    )
  },
}

// ======================== Loading ========================

export const TableLoading: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(30))
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = () => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Table Loading State</h3>
          <p className="text-sm text-muted-foreground">
            Shows a loading indicator while fetching data.
          </p>
          <Button
            title="Reload"
            onClick={fetchData}
            aria-label="Reload"
            className="rounded-full"
            size="icon"
          >
            <RefreshCcw />
          </Button>
        </div>
        <Table
          data={mockData}
          columns={basicColumns}
          onPaginationChange={() => fetchData()}
          loading={isLoading}
        />
      </div>
    )
  },
}

// ======================== Loading ========================

export const TablePinningColumns: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(30))
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
      fetchData()
    }, [])

    const fetchData = () => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Pinned Columns
          </h3>
          <p className="text-sm text-muted-foreground">
            The <b>No</b> and <b>First Name</b> columns are pinned to the left.
          </p>
        </div>
        <Table
          data={mockData}
          columns={basicColumns}
          onPaginationChange={() => fetchData()}
          loading={isLoading}
          columnPinning={{
            left: ['number', 'firstName'],
            right: ['actions'],
          }}
        />
      </div>
    )
  },
}

// ======================== Using Ref ========================

export const TableUsingRef: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(30))
    const tableRef = useRef<TableType<TUserRecord>>(null)

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Table with Ref</h3>
          <p className="text-sm text-muted-foreground">
            Access the table instance via ref.{' '}
            <button
              className="ml-2 px-2 py-1 bg-primary text-white rounded"
              onClick={() => {
                if (tableRef.current) {
                  alert(
                    `Current page: ${tableRef.current.getState().pagination.pageIndex + 1}\npage count: ${tableRef.current.getPageCount()}\n`
                  )
                }
              }}
            >
              Show Current Page
            </button>
          </p>
        </div>
        <Table ref={tableRef} data={mockData} columns={basicColumns} />
      </div>
    )
  },
}
