import React from 'react'
import { TableContext, type TTableContext } from './useTableContext'

interface TableProviderProps<TData>
  extends TTableContext<TData>,
    React.PropsWithChildren {}

function TableProvider<TData>({
  children,
  ...props
}: TableProviderProps<TData>) {
  return (
    <TableContext.Provider value={{ ...props }}>
      {children}
    </TableContext.Provider>
  )
}

export default TableProvider
