import type { Table } from '@tanstack/react-table'
import { createContext, useContext } from 'react'

export interface TTableContext<TData> {
  table?: Table<TData>
  border?: boolean
  loading?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TTableContext<any>>({
  border: true,
  loading: false,
})

export const useTableContext = <TData,>() => {
  const context = useContext<TTableContext<TData>>(TableContext)

  if (!context || !context.table) {
    throw Error('Table components must be used within a Table context')
  }

  return context
}
