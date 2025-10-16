import type { ReactNode } from 'react'
import { type TUserRecord } from './mock'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'

const columnHelper = createColumnHelper<TUserRecord>()

const TableTitle = ({ children }: { children: ReactNode }) => (
  <span className="font-bold">{children}</span>
)

const CenterText = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-center">{children}</div>
)

export const columns: ColumnDef<TUserRecord>[] = [
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
