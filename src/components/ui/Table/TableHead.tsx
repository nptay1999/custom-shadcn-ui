import { flexRender, type Header } from '@tanstack/react-table'
import { StyledTHead, StyledTR, StyledTH, IconSorting } from './StyledTable'
import { useTableContext } from './useTableContext'
import { getCommonPinningStyles } from './Table.config'
import { memo, type MouseEvent } from 'react'

import cn from '@/utils/cn'

// @ts-ignore
interface TableHeadProps<TData> {
  className?: string
}

const TableHead = <TData,>({ className }: TableHeadProps<TData>) => {
  const { table, border, isSorting, isMultiSort } = useTableContext<TData>()

  const handleSorting = (
    head: Header<TData, unknown>
  ): ((event: MouseEvent<HTMLDivElement>) => void) => {
    // Return no-op if sorting is disabled or column can't be sorted
    if (!isSorting || !head.column.getCanSort()) {
      return () => undefined
    }

    // Multi-sort mode: manually toggle sorting with multi-select support
    if (isMultiSort) {
      return () => {
        const nextSortOrder = String(head.column.getNextSortingOrder())
        const descMap = {
          asc: false,
          desc: true,
          false: undefined,
        }
        head.column.toggleSorting(
          descMap[nextSortOrder as keyof typeof descMap],
          isMultiSort
        )
      }
    }

    // Single-sort mode: use built-in toggle handler
    return head.column.getToggleSortingHandler() as (
      event: MouseEvent<HTMLDivElement>
    ) => void
  }

  const getHeadTitle = (head: Header<TData, unknown>) => {
    if (!head.column.getCanSort()) return undefined

    const nextSortOrder = String(head.column.getNextSortingOrder())
    const titleMap = {
      asc: 'Sort ascending',
      desc: 'Sort descending',
      false: 'Clear sort',
    }
    return titleMap[nextSortOrder as keyof typeof titleMap]
  }

  return (
    <StyledTHead border={border} className={className}>
      {table?.getHeaderGroups().map(headerGroup => {
        return (
          <StyledTR key={headerGroup.id} border={border}>
            {headerGroup.headers.map(head => {
              const Cell = head.column.columnDef.header
              const props = head.getContext()
              const { column } = head

              return (
                <StyledTH
                  key={head.id}
                  colSpan={head.colSpan}
                  border={border}
                  className={cn(
                    getCommonPinningStyles(column, true),
                    'group/header'
                  )}
                >
                  {head.isPlaceholder ? null : (
                    <div
                      className={cn('flex items-center justify-between', {
                        'cursor-pointer select-none':
                          isSorting && column.getCanSort(),
                      })}
                      onClick={handleSorting(head)}
                      title={getHeadTitle(head)}
                    >
                      {flexRender(Cell, props)}
                      {isSorting && column.getCanSort() && (
                        <IconSorting variant={column.getIsSorted()} />
                      )}
                    </div>
                  )}
                </StyledTH>
              )
            })}
          </StyledTR>
        )
      })}
    </StyledTHead>
  )
}

export default memo(TableHead)
