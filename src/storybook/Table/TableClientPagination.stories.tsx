import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import Table from '@/components/ui/Table'
import { generateMockUsers, type TUserRecord } from '@/mock'

const meta: Meta = {
  title: 'UI/Table/ClientPagination',
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
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(100))

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Default Pagination
          </h3>
          <p className="text-sm text-muted-foreground">
            This table includes all pagination features: page navigation,
            previous/next, first/last page, go to page input, items per page
            selector, and item count display.
          </p>
        </div>
        <Table
          data={mockData}
          columns={basicColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10 }}
        />
      </div>
    )
  },
}

export const WithoutPagination: Story = {
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

export const PaginationWithoutJumpingToPage: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(50))

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
          data={mockData}
          columns={groupedColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10, showGoToPage: false }}
        />
      </div>
    )
  },
}

export const PaginationWithoutPageSizeSelector: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(50))

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
          data={mockData}
          columns={groupedColumns}
          pagination={true}
          paginationProps={{
            page: 1,
            pageSize: 10,
            showPageSizeSelector: false,
          }}
        />
      </div>
    )
  },
}

// ==================== Different Page Sizes ====================

export const PaginationSmallPageSize: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(50))

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Small Page Size (5 items)
          </h3>
          <p className="text-sm text-muted-foreground">
            Table with 5 items per page.
          </p>
        </div>
        <Table
          data={mockData}
          columns={basicColumns}
          pagination={true}
          paginationProps={{
            page: 1,
            pageSize: 5,
            pageSizeOptions: [5, 10, 25],
          }}
        />
      </div>
    )
  },
}

export const PaginationMediumPageSize: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(100))

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Medium Page Size (25 items)
          </h3>
          <p className="text-sm text-muted-foreground">
            Table with 25 items per page.
          </p>
        </div>
        <Table
          data={mockData}
          columns={basicColumns}
          pagination={true}
          paginationProps={{
            page: 1,
            pageSize: 25,
            pageSizeOptions: [5, 10, 25, 50],
          }}
        />
      </div>
    )
  },
}

export const PaginationLargePageSize: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(200))

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Large Page Size (50 items)
          </h3>
          <p className="text-sm text-muted-foreground">
            Table with 50 items per page.
          </p>
        </div>
        <Table
          data={mockData}
          columns={basicColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 50 }}
        />
      </div>
    )
  },
}

// ==================== Custom Pagination Options ====================

export const PaginationCustomPageSizeOptions: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(150))

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
          data={mockData}
          columns={basicColumns}
          pagination={true}
          paginationProps={{
            page: 1,
            pageSize: 10,
            pageSizeOptions: [5, 10, 25, 50, 100],
          }}
        />
      </div>
    )
  },
}

export const MinimalPagination: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(100))

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Minimal Pagination</h3>
          <p className="text-sm text-muted-foreground">
            Only basic navigation buttons without extras.
          </p>
        </div>
        <Table
          data={mockData}
          columns={basicColumns}
          pagination={true}
          paginationProps={{
            page: 1,
            pageSize: 10,
            showGoToPage: false,
            showItemsInfo: false,
            showPageSizeSelector: false,
          }}
        />
      </div>
    )
  },
}

export const PaginationWithInitialPage: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(100))

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
          data={mockData}
          columns={basicColumns}
          pagination={true}
          paginationProps={{
            page: 2, // 0-indexed, so page 3
            pageSize: 10,
          }}
        />
      </div>
    )
  },
}
