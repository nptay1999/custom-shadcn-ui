import { flexRender, type Row } from '@tanstack/react-table'
import { StyledTBody, StyledTR, StyledTD } from './StyledTable'
import { useTableContext } from './useTableContext'
import { getCommonPinningStyles } from './Table.config'
import { Virtualizer, type VirtualItem } from '@tanstack/react-virtual'
import { css } from '@emotion/css'
import cn from '@/utils/cn'
import { memo } from 'react'

interface TableBodyVirtualizedProps {
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>
}

const TableBodyVirtualized = <TData,>({
  rowVirtualizer,
}: TableBodyVirtualizedProps) => {
  const { table } = useTableContext<TData>()

  const rows = table?.getRowModel().rows || []

  return (
    <StyledTBody
      data-role="table-body-virtualized"
      className={cn(
        'relative',
        css`
          height: ${rowVirtualizer.getTotalSize()}px;
        `
      )}
    >
      {rowVirtualizer.getVirtualItems().map(virtualRow => {
        const row = rows[virtualRow.index]

        return (
          <TableBodyRow<TData> key={row.id} row={row} virtualRow={virtualRow} />
        )
      })}
    </StyledTBody>
  )
}

interface TableBodyRowProps<TData> {
  row: Row<TData>
  virtualRow: VirtualItem
}

const TableBodyRow = <TData,>({
  row,
  virtualRow,
}: TableBodyRowProps<TData>) => {
  const { table, border } = useTableContext<TData>()
  const cells = row.getVisibleCells()

  return (
    <>
      <StyledTR
        // needed for dynamic row height measurement
        data-index={virtualRow.index}
        key={row.id}
        border={border}
        className={cn(
          'flex content-stretch absolute w-full',
          css`
            height: ${virtualRow.size}px;
            transform: translateY(${virtualRow.start}px);
          `
        )}
      >
        {cells.map(cell => {
          const Cell = cell.column.columnDef.cell
          const props = cell.getContext()
          const { column } = cell

          return (
            <StyledTD
              key={cell.id}
              border={border}
              className={cn(
                getCommonPinningStyles(column),
                css`
                  min-width: ${column.getSize()}px;
                  width: ${table
                    ? `${(column.getSize() / table?.getTotalSize()) * 100}%`
                    : 'auto'};
                `
              )}
            >
              {flexRender(Cell, props)}
            </StyledTD>
          )
        })}
      </StyledTR>

      {/* {row.getIsExpanded() && isManualRenderExpanded && (
        <StyledTR key={`${row.id}-expanded`} border={border}>
          <StyledTD colSpan={row.getVisibleCells().length} border={border}>
            {renderExpanded?.({ row })}
          </StyledTD>
        </StyledTR>
      )} */}
    </>
  )
}

export default memo(TableBodyVirtualized)
