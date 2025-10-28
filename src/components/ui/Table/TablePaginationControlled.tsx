import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ui/Pagination'
import Button from '@ui/Button'
import Input from '@ui/Input'
import { ChevronFirst, ChevronLast } from 'lucide-react'
import { useState } from 'react'
import cn from '@/utils/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/Select'

export interface TablePaginationControlledProps {
  page: number
  total: number
  pageSize: number
  pageSizeOptions?: number[]
  showPageSizeSelector?: boolean
  showGoToPage?: boolean
  showItemsInfo?: boolean
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

const TablePaginationControlled = ({
  page = 1,
  total = 0,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showPageSizeSelector = true,
  showGoToPage = true,
  showItemsInfo = true,
  onPageChange,
  onPageSizeChange,
}: TablePaginationControlledProps) => {
  const [goToPageInput, setGoToPageInput] = useState('')

  const currentPage = page
  const totalPages = Math.ceil(total / pageSize)
  const totalItems = total
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(startItem + pageSize - 1, totalItems)

  const canPreviousPage = currentPage > 1
  const canNextPage = currentPage < totalPages

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPageInput, 10)
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum)
      setGoToPageInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoToPage()
    }
  }

  const handleGoToInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value, 10)
    if (page !== currentPage) {
      handleGoToPage()
    }
  }

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 7 // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Items info */}
        {showItemsInfo && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{startItem}</span> -{' '}
            <span className="font-medium text-foreground">{endItem}</span> of{' '}
            <span className="font-medium text-foreground">{totalItems}</span>{' '}
            items
          </div>
        )}

        {/* Pagination controls */}
        <Pagination className="flex-1 justify-end">
          {/* Page size selector */}
          <div className="flex items-center gap-2  mr-4">
            {showPageSizeSelector && (
              <>
                <span className="text-sm text-muted-foreground">
                  Page size:
                </span>
                <Select
                  value={String(pageSize)}
                  onValueChange={value => onPageSizeChange?.(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={pageSize} />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizeOptions.map(size => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>

          <PaginationContent>
            {/* First page button */}
            <PaginationItem>
              <Button
                onClick={() => onPageChange(1)}
                disabled={!canPreviousPage}
                variant="ghost"
                size="icon"
                aria-label="Go to first page"
                className={cn({
                  'opacity-50 cursor-not-allowed': !canPreviousPage,
                })}
              >
                <ChevronFirst className="size-4" />
              </Button>
            </PaginationItem>

            {/* Previous button */}
            <PaginationItem>
              <PaginationPrevious
                onClick={e => {
                  e.preventDefault()
                  if (canPreviousPage) onPageChange(currentPage - 1)
                }}
                className={cn({
                  'opacity-50 cursor-not-allowed pointer-events-none':
                    !canPreviousPage,
                })}
              />
            </PaginationItem>

            {/* Page numbers */}
            {pageNumbers.map((page, index) => (
              <PaginationItem key={`page-${index}`}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={e => {
                      e.preventDefault()
                      onPageChange(Number(page))
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next button */}
            <PaginationItem>
              <PaginationNext
                onClick={e => {
                  e.preventDefault()
                  if (canNextPage) onPageChange(currentPage + 1)
                }}
                className={cn({
                  'opacity-50 cursor-not-allowed pointer-events-none':
                    !canNextPage,
                })}
              />
            </PaginationItem>

            {/* Last page button */}
            <PaginationItem>
              <Button
                onClick={() => onPageChange(totalPages)}
                disabled={!canNextPage}
                variant="ghost"
                size="icon"
                aria-label="Go to last page"
                className={cn({
                  'opacity-50 cursor-not-allowed': !canNextPage,
                })}
              >
                <ChevronLast className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>

          {/* Go to page */}
          {showGoToPage && (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Go to
              </span>
              <Input
                type="number"
                className="w-16 h-9"
                min={1}
                max={totalPages}
                value={goToPageInput}
                placeholder={currentPage.toString()}
                onChange={e => setGoToPageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleGoToInputBlur}
              />
            </div>
          )}
        </Pagination>
      </div>
    </>
  )
}

export default TablePaginationControlled
