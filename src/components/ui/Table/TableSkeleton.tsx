import { memo } from 'react'
import { StyledTBody, StyledTR, StyledTD } from './StyledTable'
import { useTableContext } from './useTableContext'
import Skeleton from '@ui/Skeleton'

const DEFAULT_SKELETON_ROWS = 10

function TableSkeleton<TData>() {
  const { table, border } = useTableContext<TData>()
  const pageSize =
    table?.getState().pagination.pageSize ?? DEFAULT_SKELETON_ROWS
  const numOfCol = table?.getHeaderGroups().at(-1)?.headers.length ?? 1

  return (
    <StyledTBody>
      {Array.from({ length: pageSize }).map((_, rowIndex) => {
        return (
          <StyledTR key={rowIndex} border={border}>
            {Array.from({ length: numOfCol }).map((_, colIndex) => {
              return (
                <StyledTD
                  key={colIndex}
                  border={border}
                  className="px-0 first:pl-2 last:pr-2 border-r-0"
                >
                  <Skeleton className="h-5 w-full rounded-none" />
                </StyledTD>
              )
            })}
          </StyledTR>
        )
      })}
    </StyledTBody>
  )
}

export default memo(TableSkeleton)
