import { flexRender } from '@tanstack/react-table'
import { StyledTBody, StyledTR, StyledTD } from './StyledTable'
import { useTableContext } from './useTableContext'

const TableBody = <TData,>() => {
  const { table, border } = useTableContext<TData>()

  return (
    <StyledTBody>
      {table?.getRowModel().rows.map(row => {
        const cells = row.getVisibleCells()

        return (
          <StyledTR key={row.id} border={border}>
            {cells.map(cell => {
              const Cell = cell.column.columnDef.cell
              const props = cell.getContext()

              return (
                <StyledTD key={cell.id} border={border}>
                  {flexRender(Cell, props)}
                </StyledTD>
              )
            })}
          </StyledTR>
        )
      })}
    </StyledTBody>
  )
}

export default TableBody
