import type { Row, Table } from '@tanstack/react-table'
import { createContext, useContext } from 'react'

export interface TTableContext<TData> {
  table?: Table<TData>
  border?: boolean
  loading?: boolean
  renderExpanded?: ({ row }: { row: Row<TData> }) => React.ReactNode
  isSorting?: boolean
  isMultiSort?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TTableContext<any>>({
  border: true,
  loading: false,
  isSorting: false,
  isMultiSort: false,
})

export const useTableContext = <TData,>() => {
  const context = useContext<TTableContext<TData>>(TableContext)

  if (!context || !context.table) {
    throw Error('Table components must be used within a Table context')
  }

  return context
}
