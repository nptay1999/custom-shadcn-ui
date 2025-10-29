import type { RowData } from '@tanstack/react-table'
import { type TableProps } from './Table'
import TableBody from './TableBody'
import TableEmpty from './TableEmpty'
import TableFoot from './TableFoot'
import TableHead from './TableHead'
import TablePaginationControlled from './TablePaginationControlled'
import TableComponent from './Table'
import { useTableContext } from './useTableContext'
import {
  StyledTableContainer,
  StyledTable,
  StyledTHead,
  StyledTBody,
  StyledTFoot,
  StyledTH,
  StyledTR,
  StyledTD,
  StyledTCaption,
  styledTHeadVariant,
  styledTBodyVariant,
  styledTCaptionVariant,
  styledTFootVariant,
  styledTHVariant,
  styledTRVariant,
  styledTDVariant,
} from './StyledTable'
import type {
  StyledTableContainerProps,
  StyledTableProps,
  StyledTHeadProps,
  StyledTBodyProps,
  StyledTFootProps,
  StyledTRProps,
  StyledTHProps,
  StyledTDProps,
  StyledTCaptionProps,
} from './StyledTable'

// Optionally, you can declare the static properties on the Table component type for better type safety:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableComponent<TData extends RowData = any>
  extends React.FC<TableProps<TData>> {
  TableHead: typeof TableHead
  TableBody: typeof TableBody
  TableFoot: typeof TableFoot
  TableEmpty: typeof TableEmpty
  TablePagination: typeof TablePaginationControlled
  StyledTableContainer: typeof StyledTableContainer
  StyledTable: typeof StyledTable
  StyledTHead: typeof StyledTHead
  StyledTBody: typeof StyledTBody
  StyledTFoot: typeof StyledTFoot
  StyledTH: typeof StyledTH
  StyledTR: typeof StyledTR
  StyledTD: typeof StyledTD
  StyledTCaption: typeof StyledTCaption
}

const Table = TableComponent as unknown as TableComponent

// Add static properties with types
Table.TableHead = TableHead as typeof TableHead
Table.TableBody = TableBody as typeof TableBody
Table.TableFoot = TableFoot as typeof TableFoot
Table.TableEmpty = TableEmpty as typeof TableEmpty
Table.TablePagination =
  TablePaginationControlled as typeof TablePaginationControlled
Table.StyledTableContainer = StyledTableContainer as typeof StyledTableContainer
Table.StyledTable = StyledTable as typeof StyledTable
Table.StyledTHead = StyledTHead as typeof StyledTHead
Table.StyledTBody = StyledTBody as typeof StyledTBody
Table.StyledTFoot = StyledTFoot as typeof StyledTFoot
Table.StyledTH = StyledTH as typeof StyledTH
Table.StyledTR = StyledTR as typeof StyledTR
Table.StyledTD = StyledTD as typeof StyledTD
Table.StyledTCaption = StyledTCaption as typeof StyledTCaption

export type {
  TableProps,
  StyledTableContainerProps,
  StyledTableProps,
  StyledTHeadProps,
  StyledTBodyProps,
  StyledTFootProps,
  StyledTRProps,
  StyledTHProps,
  StyledTDProps,
  StyledTCaptionProps,
}
export {
  useTableContext,
  styledTHeadVariant,
  styledTBodyVariant,
  styledTCaptionVariant,
  styledTFootVariant,
  styledTHVariant,
  styledTRVariant,
  styledTDVariant,
}
export default Table
