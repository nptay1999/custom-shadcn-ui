import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type PaginationState,
  type Row,
  type RowData,
  type SortingState,
  type Table,
  type TableOptions,
} from '@tanstack/react-table'
import { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { StyledTable, StyledTableContainer } from './StyledTable'
import cn from '@/utils/cn'
import TablePagination, { type TablePaginationProps } from './TablePagination'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableFoot from './TableFoot'
import TableEmpty from './TableEmpty'
import TableProvider from './TableProvider'
import TableSkeleton from './TableSkeleton'
import { css } from '@emotion/css'
import isEmpty from 'lodash-es/isEmpty'
import omit from 'lodash-es/omit'
import get from 'lodash-es/get'
import TableBodyVirtualized from './TableBodyVirtualized'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { TablePaginationControlledProps } from './TablePaginationControlled'
import TablePaginationControlled from './TablePaginationControlled'

type TPaginationState = {
  page: number
  pageSize: number
}

type TUncontrolledPaginationProps = Omit<TablePaginationProps, 'table'> & {
  type?: 'uncontrolled'
  page: number
  pageSize: number
}

type TControlledPaginationProps = TablePaginationControlledProps & {
  type?: 'controlled'
}

type TExpandable<TData> = {
  getSubRows?: (originalRow: TData, index: number) => TData[]
  renderExpanded?: ({ row }: { row: Row<TData> }) => React.ReactNode
  getRowCanExpand?: (row: Row<TData>) => boolean
}

type TSorting = {
  sortingState: SortingState
  onSortingChange: (sorting: SortingState) => void
  enableMultiSort?: boolean
}

type TScroll = {
  x?: number | 'content'
  y?: number
  pingingHeader?: boolean
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
   * If false, no pagination is rendered.
   * If an object is provided, the table will render pagination controls.
   * Supports both uncontrolled and controlled pagination modes.
   */
  pagination?: false | TUncontrolledPaginationProps | TControlledPaginationProps
  renderPagination?:
    | ((table: Table<TData>) => React.ReactNode)
    | React.ReactNode
  onPaginationChange?: (pagination: TPaginationState) => void
  filter?: boolean | ColumnFiltersState
  sorting?: false | TSorting
  columnPinning?: ColumnPinningState
  expandable?: TExpandable<TData>
  virtualized?: boolean
  scroll?: TScroll
}

const TableComponent = <TData extends RowData>({
  ref,
  data,
  columns,
  loading = false,
  footer = false,
  border = true,
  pagination = { type: 'uncontrolled', page: 1, pageSize: 10 },
  renderPagination,
  onPaginationChange,
  filter = false,
  sorting = false,
  columnPinning = undefined,
  expandable,
  virtualized = false,
  scroll = undefined,
}: TableProps<TData>) => {
  // Props preprocessing
  const isNoPagination = pagination === undefined || pagination === false
  const paginationType = get(pagination, 'type', 'uncontrolled')
  const page = get(pagination, 'page', 1)
  const pageSize = get(pagination, 'pageSize', 10)
  const controlledPaginationProps = omit(pagination || {}, [
    'type',
  ]) as TablePaginationControlledProps
  const uncontrolledPaginationProps = omit(controlledPaginationProps, [
    'page',
    'pageSize',
  ]) as TablePaginationProps

  // State Management
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    { pageIndex: page - 1, pageSize }
  )
  const [internalSorting, setInternalSorting] = useState<SortingState>(
    typeof sorting === 'object' ? sorting.sortingState : []
  )
  const tableContainerRef = useRef<HTMLDivElement>(null)

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

  const handleSortingChange = (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => {
    const newState =
      typeof updater === 'function' ? updater(internalSorting) : updater

    setInternalSorting(newState)
    if (typeof sorting === 'object') {
      sorting.onSortingChange(newState)
    }
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

  const sortingConfig: Partial<TableOptions<TData>> = useMemo(() => {
    if (sorting === false) {
      return {}
    }

    return {
      manualSorting: true,
      enableMultiSort: sorting.enableMultiSort,
      state: {
        sorting: internalSorting,
      },
      onSortingChange: handleSortingChange,
    }
  }, [sorting, internalSorting])

  const paginationConfig: Partial<TableOptions<TData>> = useMemo(() => {
    // Check if pagination should be managed manually
    const shouldUseManualPagination =
      isNoPagination || paginationType === 'controlled' || !!renderPagination

    if (shouldUseManualPagination) {
      return {
        getPaginationRowModel: undefined,
        manualPagination: true,
      }
    }

    // Use uncontrolled pagination with automatic row model
    return {
      getPaginationRowModel: getPaginationRowModel(),
      manualPagination: false,
      state: { pagination: internalPagination },
      onPaginationChange: handlePaginationChange,
    }
  }, [isNoPagination, paginationType, renderPagination, internalPagination])

  const columnPinningConfig: Partial<TableOptions<TData>> = useMemo(() => {
    if (!columnPinning) return {}

    return {
      state: {
        columnPinning,
      },
    }
  }, [columnPinning])

  const expandableConfig: Partial<TableOptions<TData>> = useMemo(() => {
    if (!expandable) return {}

    const configs = omit(expandable, ['renderExpanded'])
    return {
      getExpandedRowModel: getExpandedRowModel(),
      ...configs,
    }
  }, [expandable])

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...paginationConfig,
    ...filterConfig,
    ...expandableConfig,
    ...sortingConfig,
    state: {
      ...paginationConfig.state,
      ...filterConfig.state,
      ...columnPinningConfig.state,
      ...sortingConfig.state,
    },
  })

  const rowVirtualizer = useVirtualizer({
    count: table?.getRowModel().rows.length || 0,
    getScrollElement: () =>
      tableContainerRef ? tableContainerRef.current : null,
    estimateSize: () => 48,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  // Expose the table instance through the ref
  useImperativeHandle(ref, () => table, [table])

  const hasData = !!table.getRowModel().rows.length

  return (
    <TableProvider
      table={table}
      border={border}
      loading={loading}
      renderExpanded={expandable?.renderExpanded}
      isSorting={typeof sorting === 'object'}
      isMultiSort={
        typeof sorting === 'object' ? (sorting.enableMultiSort ?? false) : false
      }
    >
      <div
        className={cn('rounded-md overflow-hidden mb-4', {
          'border border-border': border,
        })}
      >
        <StyledTableContainer
          ref={tableContainerRef}
          className={cn(
            (virtualized || scroll?.y) &&
              css`
                position: relative;
                max-height: ${scroll?.y ?? '800'}px;
              `
          )}
        >
          <StyledTable
            className={cn(
              (!isEmpty(columnPinningConfig) || virtualized || scroll?.x) &&
                css`
                  min-width: ${typeof scroll?.x === 'number'
                    ? scroll?.x
                    : table.getTotalSize()}px;
                `
            )}
          >
            {/** Table Header */}
            <TableHead
              className={cn({
                'sticky top-0 z-1': virtualized || scroll?.pingingHeader,
              })}
            />

            {/** Table body */}
            {loading ? (
              <TableSkeleton />
            ) : hasData ? (
              virtualized ? (
                <TableBodyVirtualized rowVirtualizer={rowVirtualizer} />
              ) : (
                <TableBody />
              )
            ) : (
              <TableEmpty />
            )}

            {/** Table footer */}
            {typeof footer === 'function'
              ? footer(table)
              : footer && <TableFoot />}
          </StyledTable>
        </StyledTableContainer>
      </div>

      {/** Pagination */}
      {!isNoPagination && hasData && (
        <>
          {renderPagination ? (
            // Custom pagination rendering
            typeof renderPagination === 'function' ? (
              renderPagination(table)
            ) : (
              renderPagination
            )
          ) : // Default pagination components
          paginationType === 'uncontrolled' ? (
            <TablePagination {...uncontrolledPaginationProps} />
          ) : (
            <TablePaginationControlled {...controlledPaginationProps} />
          )}
        </>
      )}
    </TableProvider>
  )
}

export default TableComponent
