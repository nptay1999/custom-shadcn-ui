import { InboxIcon } from 'lucide-react'
import Empty, { EmptyHeader, EmptyMedia, EmptyTitle } from '../Empty'
import { StyledTBody, StyledTD, StyledTR } from './StyledTable'
import { useTableContext } from './useTableContext'
import { memo } from 'react'

const TableEmpty = <TData,>() => {
  const { table } = useTableContext<TData>()
  const numOfCol = table?.getHeaderGroups().at(-1)?.headers.length ?? 1

  return (
    <StyledTBody>
      <StyledTR>
        <StyledTD colSpan={numOfCol}>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="default">
                <InboxIcon className="size-10 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle>No Data</EmptyTitle>
            </EmptyHeader>
          </Empty>
        </StyledTD>
      </StyledTR>
    </StyledTBody>
  )
}

export default memo(TableEmpty)
