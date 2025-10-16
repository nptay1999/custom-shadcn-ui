import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMemo, useState } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import Table from '@ui/Table'
import { generateMockUsers, type TUserRecord } from '@/mock'
import Button from '@ui/Button'
import { ChevronDown } from 'lucide-react'
import cn from '@/utils/cn'
import { css } from '@emotion/css'

const meta: Meta = {
  title: 'UI/Table/Expandable',
  component: Table,
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// ==================== Mock Data with SubRows ====================

type TUserWithSubRows = TUserRecord & {
  subRows?: TUserRecord[]
}

const generateMockUsersWithSubRows = (count = 20): TUserWithSubRows[] => {
  const users = generateMockUsers(count) as TUserWithSubRows[]

  // Add subRows to some users (e.g., every other user)
  return users.map((user, index) => {
    if (index % 2 === 0) {
      // Generate 2-4 sub-rows for every other user
      const subRowCount = Math.floor(Math.random() * 3) + 2
      return {
        ...user,
        subRows: generateMockUsers(subRowCount),
      }
    }
    return user
  })
}

// ==================== Column Definitions ====================

const columnHelper = createColumnHelper<TUserWithSubRows>()

const TableTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold">{children}</span>
)

const CenterText = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-center">{children}</div>
)

const expandableColumns = [
  columnHelper.display({
    id: 'number',
    header: () => (
      <TableTitle>
        <CenterText>No</CenterText>
      </TableTitle>
    ),
    cell: info =>
      info.row.depth === 0 && <CenterText>{info.row.index + 1}</CenterText>,
    size: 60,
  }),
  columnHelper.accessor('firstName', {
    header: () => <TableTitle>First Name</TableTitle>,
    cell: info => {
      return (
        <div className="flex items-center gap-4 justify-between">
          <div
            className={cn(css`
              padding-left: ${info.row.depth * 2}rem;
            `)}
          >
            {info.getValue()}
          </div>
          {info.row.getCanExpand() && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={info.row.getToggleExpandedHandler()}
              aria-label={info.row.getIsExpanded() ? 'Collapse' : 'Expand'}
              className="rounded-full"
            >
              <ChevronDown
                className={cn('size-4 transition-transform', {
                  'rotate-180': info.row.getIsExpanded(),
                })}
              />
            </Button>
          )}
        </div>
      )
    },
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
] as ColumnDef<TUserWithSubRows>[]

// ==================== Stories ====================

export const BasicExpandableTable: Story = {
  render: () => {
    const [mockData] = useState<TUserWithSubRows[]>(
      generateMockUsersWithSubRows(20)
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Basic Expandable Table</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Click the expand button to show/hide nested rows. Rows with sub-data
            will have an expandable icon.
          </p>
          <div className="text-sm text-muted-foreground">
            <ul className="list-disc list-inside space-y-1">
              <li>Every other row contains expandable sub-rows</li>
              <li>Sub-rows are indented to show hierarchy</li>
              <li>Click the chevron icon to expand/collapse</li>
            </ul>
          </div>
        </div>
        <Table
          data={mockData}
          columns={expandableColumns}
          expandable={{
            getSubRows: originalRow => originalRow.subRows,
          }}
        />
      </div>
    )
  },
}

export const ExpandableTableWithPagination: Story = {
  render: () => {
    const [mockData] = useState<TUserWithSubRows[]>(
      generateMockUsersWithSubRows(50)
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Expandable Table with Pagination
          </h3>
          <p className="text-sm text-muted-foreground">
            Demonstrates expandable rows combined with pagination functionality.
          </p>
        </div>
        <Table
          data={mockData}
          columns={expandableColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10 }}
          expandable={{
            getSubRows: originalRow => originalRow.subRows,
          }}
        />
      </div>
    )
  },
}

export const ExpandableTableWithServerPagination: Story = {
  render: () => {
    const [mockData] = useState<TUserWithSubRows[]>(
      generateMockUsersWithSubRows(50)
    )
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
            Expandable Table with Server Pagination
          </h3>
          <p className="text-sm text-muted-foreground">
            Demonstrates expandable rows with server-side pagination using the{' '}
            <code>Table.Pagination</code> compound component.
          </p>
        </div>
        <Table
          data={data}
          columns={expandableColumns}
          expandable={{
            getSubRows: originalRow => originalRow.subRows,
          }}
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

export const ExpandableTableWithPinnedColumns: Story = {
  render: () => {
    const [mockData] = useState<TUserWithSubRows[]>(
      generateMockUsersWithSubRows(30)
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Expandable Table with Pinned Columns
          </h3>
          <p className="text-sm text-muted-foreground">
            Combines expandable rows with column pinning. The expander and
            number columns are pinned to the left.
          </p>
        </div>
        <Table
          data={mockData}
          columns={expandableColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10 }}
          expandable={{
            getSubRows: originalRow => originalRow.subRows,
          }}
          columnPinning={{
            left: ['number', 'firstName'],
          }}
        />
      </div>
    )
  },
}

export const ExpandableTableWithFooter: Story = {
  render: () => {
    const [mockData] = useState<TUserWithSubRows[]>(
      generateMockUsersWithSubRows(25)
    )

    const columnsWithFooter = expandableColumns.map(col => {
      if ('accessorKey' in col && col.accessorKey === 'age') {
        return {
          ...col,
          footer: () => <TableTitle>Total Age</TableTitle>,
        }
      }
      return col
    }) as ColumnDef<TUserWithSubRows>[]

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Expandable Table with Footer
          </h3>
          <p className="text-sm text-muted-foreground">
            Shows expandable rows with table footer.
          </p>
        </div>
        <Table
          data={mockData}
          columns={columnsWithFooter}
          footer={true}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10 }}
          expandable={{
            getSubRows: originalRow => originalRow.subRows,
          }}
        />
      </div>
    )
  },
}

// ==================== Custom Expanded Content Stories ====================

export const CustomExpandedContent: Story = {
  render: () => {
    const [mockData] = useState<TUserWithSubRows[]>(
      generateMockUsersWithSubRows(20) as TUserWithSubRows[]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Table with Custom Expanded Content
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            Click the chevron to expand rows and show custom content below each
            row.
          </p>
          <div className="text-sm text-muted-foreground">
            <ul className="list-disc list-inside space-y-1">
              <li>Custom content is rendered when a row is expanded</li>
              <li>Content can be any React component or HTML</li>
              <li>Access to full row data via the row parameter</li>
            </ul>
          </div>
        </div>
        <Table
          data={mockData}
          columns={expandableColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10 }}
          expandable={{
            getRowCanExpand: () => true,
            renderExpanded: ({ row }) => (
              <div className="p-4 bg-muted/50 rounded-md">
                <h4 className="font-semibold mb-2">User Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Full Name:</span>{' '}
                    <span className="font-medium">
                      {row.original.firstName} {row.original.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age:</span>{' '}
                    <span className="font-medium">{row.original.age}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>{' '}
                    <span className="font-medium">{row.original.status}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Visits:</span>{' '}
                    <span className="font-medium">{row.original.visits}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Progress:</span>{' '}
                    <span className="font-medium">
                      {row.original.progress}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ID:</span>{' '}
                    <span className="font-mono text-xs">{row.original.id}</span>
                  </div>
                </div>
              </div>
            ),
          }}
        />
      </div>
    )
  },
}

export const CustomExpandedWithProgressBar: Story = {
  render: () => {
    const [mockData] = useState<TUserWithSubRows[]>(
      generateMockUsersWithSubRows(15) as TUserWithSubRows[]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Expanded Content with Progress Visualization
          </h3>
          <p className="text-sm text-muted-foreground">
            Shows a progress bar and detailed statistics in the expanded
            section.
          </p>
        </div>
        <Table
          data={mockData}
          columns={expandableColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10 }}
          columnPinning={{ right: ['status'] }}
          expandable={{
            getRowCanExpand: () => true,
            renderExpanded: ({ row }) => {
              const progress = row.original.progress
              const getProgressColor = (value: number) => {
                if (value < 30) return 'bg-red-500'
                if (value < 70) return 'bg-yellow-500'
                return 'bg-green-500'
              }

              return (
                <div className="p-6 bg-gradient-to-r from-muted/30 to-muted/10">
                  <div className="max-w-2xl">
                    <h4 className="font-semibold mb-4 text-lg">
                      Profile Completion Status
                    </h4>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                        <div
                          className={cn(
                            'h-full transition-all duration-500',
                            getProgressColor(progress)
                          )}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-background/50 p-3 rounded-lg border border-border">
                        <div className="text-2xl font-bold text-primary">
                          {row.original.visits}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total Visits
                        </div>
                      </div>
                      <div className="bg-background/50 p-3 rounded-lg border border-border">
                        <div className="text-2xl font-bold text-primary">
                          {row.original.age}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Years Old
                        </div>
                      </div>
                      <div className="bg-background/50 p-3 rounded-lg border border-border">
                        <div className="text-sm font-semibold">
                          {row.original.status}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Status
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            },
          }}
        />
      </div>
    )
  },
}

export const CustomExpandedWithActions: Story = {
  render: () => {
    const [mockData] = useState<TUserWithSubRows[]>(
      generateMockUsersWithSubRows(15) as TUserWithSubRows[]
    )

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Expanded Content with Action Buttons
          </h3>
          <p className="text-sm text-muted-foreground">
            Interactive expanded section with action buttons and forms.
          </p>
        </div>
        <Table
          data={mockData}
          columns={expandableColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 10 }}
          expandable={{
            getRowCanExpand: () => true,
            renderExpanded: ({ row }) => (
              <div className="p-6 bg-accent/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">
                      {row.original.firstName} {row.original.lastName}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      User ID: {row.original.id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Editing ${row.original.firstName}`)}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Viewing ${row.original.firstName}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        alert(`Deleting ${row.original.firstName}`)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-semibold text-sm">
                      Personal Information
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Age:</span>
                        <span className="font-medium">
                          {row.original.age} years
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium">
                          {row.original.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-semibold text-sm">Activity</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Visits:
                        </span>
                        <span className="font-medium">
                          {row.original.visits}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Completion:
                        </span>
                        <span className="font-medium">
                          {row.original.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          }}
        />
      </div>
    )
  },
}

export const CustomExpandedWithNestedTable: Story = {
  render: () => {
    const [mockData] = useState<TUserWithSubRows[]>(
      generateMockUsersWithSubRows(10) as TUserWithSubRows[]
    )

    // Simple nested data columns
    const nestedColumns = [
      columnHelper.accessor('firstName', {
        header: () => <TableTitle>Activity</TableTitle>,
        cell: () => `Visit ${Math.floor(Math.random() * 100)}`,
      }),
      columnHelper.accessor('age', {
        header: () => <TableTitle>Date</TableTitle>,
        cell: () =>
          new Date(
            Date.now() - Math.random() * 10000000000
          ).toLocaleDateString(),
      }),
      columnHelper.accessor('status', {
        header: () => <TableTitle>Type</TableTitle>,
        cell: () =>
          ['Login', 'Purchase', 'View', 'Comment'][
            Math.floor(Math.random() * 4)
          ],
      }),
    ] as ColumnDef<TUserRecord>[]

    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Expanded Content with Nested Table
          </h3>
          <p className="text-sm text-muted-foreground">
            Shows a nested table inside the expanded section showing related
            data.
          </p>
        </div>
        <Table
          data={mockData}
          columns={expandableColumns}
          pagination={true}
          paginationProps={{ page: 1, pageSize: 5 }}
          expandable={{
            getRowCanExpand: () => true,
            renderExpanded: ({ row }) => (
              <div className="p-4 bg-muted/20">
                <h4 className="font-semibold mb-3">
                  Recent Activities for {row.original.firstName}
                </h4>
                <div className="border border-border rounded-md overflow-hidden">
                  <Table
                    data={generateMockUsersWithSubRows(5)}
                    columns={nestedColumns}
                    border={false}
                  />
                </div>
              </div>
            ),
          }}
        />
      </div>
    )
  },
}
