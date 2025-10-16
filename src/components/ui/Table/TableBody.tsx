import { flexRender } from '@tanstack/react-table'
import { StyledTBody, StyledTR, StyledTD } from './StyledTable'
import { useTableContext } from './useTableContext'
import { getCommonPinningStyles } from './Table.config'
import { Fragment } from 'react'

const TableBody = <TData,>() => {
  const { table, border, renderExpanded } = useTableContext<TData>()

  const isManualRenderExpanded = !!renderExpanded

  return (
    <StyledTBody>
      {table?.getRowModel().rows.map(row => {
        const cells = row.getVisibleCells()

        return (
          <Fragment key={row.id}>
            <StyledTR border={border}>
              {cells.map(cell => {
                const Cell = cell.column.columnDef.cell
                const props = cell.getContext()
                const { column } = cell

                return (
                  <StyledTD
                    key={cell.id}
                    border={border}
                    className={getCommonPinningStyles(column)}
                  >
                    {flexRender(Cell, props)}
                  </StyledTD>
                )
              })}
            </StyledTR>

            {row.getIsExpanded() && isManualRenderExpanded && (
              <StyledTR border={border}>
                <StyledTD
                  colSpan={row.getVisibleCells().length}
                  border={border}
                >
                  {renderExpanded?.({ row })}
                </StyledTD>
              </StyledTR>
            )}
          </Fragment>
        )
      })}
    </StyledTBody>
  )
}

export default TableBody
