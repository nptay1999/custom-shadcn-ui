import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowData,
  type Table,
  type TableOptions,
} from '@tanstack/react-table'
import { isValidElement, useImperativeHandle, useMemo, useState } from 'react'
import { StyledTable } from './StyledTable'
import cn from '@/utils/cn'
import TablePagination, { type TablePaginationProps } from './TablePagination'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableFoot from './TableFoot'
import TableEmpty from './TableEmpty'
import TableProvider from './TableProvider'
import TableSkeleton from './TableSkeleton'

type TPaginationState = {
  page: number
  pageSize: number
}

export interface TableProps<TData extends RowData, TValue = unknown> {
  data: Array<TData>
  columns: ColumnDef<TData, TValue>[]
  ref?: React.Ref<Table<TData>>
  loading?: boolean
  /**
   * If false (default) no footer is rendered.
   * If true the table will render column footers defined in columnDefs.
   * If a function is provided it will be called with the table instance
   * and should return a ReactNode to render as the footer area.
   */
  footer?: boolean | ((table: Table<TData>) => React.ReactNode)
  border?: boolean
  /**
   * If false (default) no pagination is rendered.
   * If true the table will render default pagination controls.
   * If a function is provided it will be called with the table instance
   * and should return a ReactNode to render as the pagination area.
   */
  pagination?:
    | boolean
    | ((table: Table<TData>) => React.ReactNode)
    | React.ReactNode
  paginationProps?: TPaginationState & Omit<TablePaginationProps, 'table'>
  onPaginationChange?: (pagination: TPaginationState) => void
  filter?: boolean | ColumnFiltersState
}

const TableComponent = <TData extends RowData>({
  ref,
  data,
  columns,
  loading = false,
  footer = false,
  border = true,
  pagination = false,
  paginationProps = { page: 1, pageSize: 10 },
  onPaginationChange,
  filter = false,
}: TableProps<TData>) => {
  // Props preprocessing
  const { page, pageSize, ...uncontrolledPaginationProps } = paginationProps

  // State Management
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    { pageIndex: page - 1, pageSize }
  )

  // Functions
  const handlePaginationChange = (
    updater: PaginationState | ((old: PaginationState) => PaginationState)
  ) => {
    const newState =
      typeof updater === 'function' ? updater(internalPagination) : updater
    setInternalPagination(newState)
    onPaginationChange?.({
      page: newState.pageIndex + 1,
      pageSize: newState.pageSize,
    })
  }

  const filterConfig: Partial<TableOptions<TData>> = useMemo(() => {
    if (filter) {
      return {
        manualFiltering: false,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
          columnFilters: Array.isArray(filter) ? filter : undefined,
        },
      }
    }

    return {
      manualFiltering: true,
    }
  }, [filter])

  const paginationConfig: Partial<TableOptions<TData>> = useMemo(() => {
    if (pagination === true) {
      return {
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: false,
        state: { pagination: internalPagination },
        onPaginationChange: handlePaginationChange,
      }
    }

    if (typeof pagination === 'function' || isValidElement(pagination)) {
      return {
        getPaginationRowModel: undefined,
        manualPagination: true,
      }
    }

    return {
      getPaginationRowModel: undefined,
      manualPagination: undefined,
    }
  }, [pagination, internalPagination])

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...paginationConfig,
    ...filterConfig,
    state: {
      ...paginationConfig.state,
      ...filterConfig.state,
    },
  })

  // Expose the table instance through the ref
  useImperativeHandle(ref, () => table, [table])

  const hasData = !!table.getRowModel().rows.length

  return (
    <TableProvider table={table} border={border} loading={loading}>
      <div
        className={cn('rounded-md overflow-hidden mb-4', {
          'border border-border': border,
        })}
      >
        <StyledTable>
          {/** Table Header */}
          <TableHead />

          {/** Table body */}
          {loading ? (
            <TableSkeleton />
          ) : hasData ? (
            <TableBody />
          ) : (
            <TableEmpty />
          )}

          {/** Table footer */}
          {typeof footer === 'function'
            ? footer(table)
            : footer && <TableFoot />}
        </StyledTable>
      </div>

      {/** Pagination */}
      {pagination && hasData && (
        <>
          {typeof pagination === 'function' ? (
            pagination(table)
          ) : isValidElement(pagination) ? (
            pagination
          ) : (
            <TablePagination {...uncontrolledPaginationProps} />
          )}
        </>
      )}
    </TableProvider>
  )
}

export default TableComponent
