import { flexRender } from '@tanstack/react-table'
import { StyledTFoot, StyledTR, StyledTH } from './StyledTable'
import { useTableContext } from './useTableContext'
import { getCommonPinningStyles } from './Table.config'

const TableFoot = <TData,>() => {
  const { table, border } = useTableContext<TData>()

  return (
    <StyledTFoot border={border}>
      {table?.getFooterGroups().map(footerGroup => {
        return (
          <StyledTR key={footerGroup.id} border={border}>
            {footerGroup.headers.map(head => {
              const Cell = head.column.columnDef.footer
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
    </StyledTFoot>
  )
}

export default TableFoot
