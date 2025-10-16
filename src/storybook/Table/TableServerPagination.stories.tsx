import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMemo, useState } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import Table from '@/components/ui/Table'
import { generateMockUsers, type TUserRecord } from '@/mock'

const meta: Meta = {
  title: 'UI/Table/ServerPagination',
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

export const DefaultPagination: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(101))
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const data = useMemo(
      () => mockData.slice((page - 1) * pageSize, page * pageSize),
      [mockData, page, pageSize]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Custom Pagination
          </h3>
          <p className="text-sm text-muted-foreground">
            You can customize the pagination by passing a render function.
          </p>
        </div>
        <Table
          data={data}
          columns={basicColumns}
          pagination={
            <Table.TablePagination
              page={page}
              pageSize={pageSize}
              total={mockData.length}
              onPageChange={page => setPage(page)}
              onPageSizeChange={pageSize => {
                setPageSize(pageSize)
                setPage(1)
              }}
            />
          }
        />
      </div>
    )
  },
}

export const PaginationWithoutJumpingToPage: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(50))
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const data = useMemo(
      () => mockData.slice((page - 1) * pageSize, page * pageSize),
      [mockData, page, pageSize]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Grouped Columns (No "Go To Page")
          </h3>
          <p className="text-sm text-muted-foreground">
            Example of grouped columns with pagination, but without the "go to
            page" input.
          </p>
        </div>
        <Table
          data={data}
          columns={groupedColumns}
          pagination={
            <Table.TablePagination
              page={page}
              pageSize={pageSize}
              total={mockData.length}
              showGoToPage={false}
              onPageChange={page => setPage(page)}
              onPageSizeChange={pageSize => {
                setPageSize(pageSize)
                setPage(1)
              }}
            />
          }
        />
      </div>
    )
  },
}

export const PaginationWithoutPageSizeSelector: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(50))
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const data = useMemo(
      () => mockData.slice((page - 1) * pageSize, page * pageSize),
      [mockData, page, pageSize]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Grouped Columns (No "Go To Page")
          </h3>
          <p className="text-sm text-muted-foreground">
            Example of grouped columns with pagination, but without the "go to
            page" input.
          </p>
        </div>
        <Table
          data={data}
          columns={groupedColumns}
          pagination={
            <Table.TablePagination
              page={page}
              pageSize={pageSize}
              total={mockData.length}
              showGoToPage={false}
              onPageChange={page => setPage(page)}
              onPageSizeChange={pageSize => {
                setPageSize(pageSize)
                setPage(1)
              }}
            />
          }
        />
      </div>
    )
  },
}

// ==================== Custom Pagination Options ====================

export const PaginationCustomPageSizeOptions: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(150))
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const data = useMemo(
      () => mockData.slice((page - 1) * pageSize, page * pageSize),
      [mockData, page, pageSize]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Custom Page Size Options
          </h3>
          <p className="text-sm text-muted-foreground">
            Customize available page size options: [5, 10, 25, 50, 100]
          </p>
        </div>
        <Table
          data={data}
          columns={basicColumns}
          pagination={
            <Table.TablePagination
              page={page}
              pageSize={pageSize}
              total={mockData.length}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              onPageChange={page => setPage(page)}
              onPageSizeChange={pageSize => {
                setPageSize(pageSize)
                setPage(1)
              }}
            />
          }
        />
      </div>
    )
  },
}

export const MinimalPagination: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(100))
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const data = useMemo(
      () => mockData.slice((page - 1) * pageSize, page * pageSize),
      [mockData, page, pageSize]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Minimal Pagination</h3>
          <p className="text-sm text-muted-foreground">
            Only basic navigation buttons without extras.
          </p>
        </div>
        <Table
          data={data}
          columns={basicColumns}
          pagination={
            <Table.TablePagination
              page={page}
              pageSize={pageSize}
              total={mockData.length}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              showGoToPage={false}
              showItemsInfo={false}
              showPageSizeSelector={false}
              onPageChange={page => setPage(page)}
              onPageSizeChange={pageSize => {
                setPageSize(pageSize)
                setPage(1)
              }}
            />
          }
        />
      </div>
    )
  },
}

export const PaginationWithInitialPage: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(100))
    const [page, setPage] = useState(3)
    const [pageSize, setPageSize] = useState(10)

    const data = useMemo(
      () => mockData.slice((page - 1) * pageSize, page * pageSize),
      [mockData, page, pageSize]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Initial Page
          </h3>
          <p className="text-sm text-muted-foreground">
            Table starts on page 3 with 10 items per page.
          </p>
        </div>
        <Table
          data={data}
          columns={basicColumns}
          pagination={
            <Table.TablePagination
              page={page}
              pageSize={pageSize}
              total={mockData.length}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              onPageChange={page => setPage(page)}
              onPageSizeChange={pageSize => {
                setPageSize(pageSize)
                setPage(1)
              }}
            />
          }
        />
      </div>
    )
  },
}

export const PaginationWithRenderProp: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(100))
    const [page, setPage] = useState(3)
    const [pageSize] = useState(10)

    const data = useMemo(
      () => mockData.slice((page - 1) * pageSize, page * pageSize),
      [mockData, page, pageSize]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Render Prop Pagination
          </h3>
          <p className="text-sm text-muted-foreground">
            Demonstrates using a render prop for custom pagination rendering.
          </p>
        </div>
        <Table
          data={data}
          columns={basicColumns}
          pagination={table => {
            // Example: log the current page index from the table param
            // You can use table.getState().pagination if using TanStack Table
            // For demonstration, we'll just render the pagination and show current page
            return (
              <div className="p-4 bg-secondary/50 rounded-md">
                <div className="mb-2 text-sm text-muted-foreground">
                  Current Row Count: {table.getRowCount() + 1}
                </div>
                <Table.TablePagination
                  page={page}
                  pageSize={pageSize}
                  total={mockData.length}
                  showPageSizeSelector={false}
                  onPageChange={page => setPage(page)}
                />
              </div>
            )
          }}
        />
      </div>
    )
  },
}
