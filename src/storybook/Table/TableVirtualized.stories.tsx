import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import Table from '@ui/Table'
import { generateMockUsers, type TUserRecord } from '@/mock'
import Button from '@ui/Button'
import { Eye, Pencil, Trash } from 'lucide-react'

const meta: Meta = {
  title: 'UI/Table/Virtualized',
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

// ==================== Basic Examples ====================

export const RowVirtualizedTable: Story = {
  render: () => {
    const [mockData] = useState<TUserRecord[]>(generateMockUsers(10_000))

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
        <Table
          data={mockData}
          columns={basicColumns}
          pagination={false}
          virtualized
        />
      </div>
    )
  },
}
