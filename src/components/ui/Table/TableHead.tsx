import { flexRender } from '@tanstack/react-table'
import { StyledTHead, StyledTR, StyledTH } from './StyledTable'
import { useTableContext } from './useTableContext'
import { getCommonPinningStyles } from './Table.config'

const TableHead = <TData,>() => {
  const { table, border } = useTableContext<TData>()

  return (
    <StyledTHead border={border}>
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
                  className={getCommonPinningStyles(column, true)}
                >
                  {flexRender(head.isPlaceholder ? null : Cell, props)}
                </StyledTH>
              )
            })}
          </StyledTR>
        )
      })}
    </StyledTHead>
  )
}

export default TableHead
