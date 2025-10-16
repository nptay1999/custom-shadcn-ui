import type { Column } from '@tanstack/react-table'
import { css } from '@emotion/css'

export const getCommonPinningStyles = <TData>(
  column: Column<TData>,
  isHeader: boolean = false
): string => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  if (!isPinned) {
    return css`
      width: ${column.getSize()}px;
    `
  }

  return css`
    left: ${isPinned === 'left' ? `${column.getStart('left')}px` : 'auto'};
    right: ${isPinned === 'right' ? `${column.getAfter('right')}px` : 'auto'};
    background-color: ${isHeader ? 'var(--color-muted)' : 'var(--background)'};
    position: ${isPinned ? 'sticky' : 'relative'};
    width: ${column.getSize()}px;
    z-index: ${isPinned ? 1 : 0};

    ${isPinned === 'left' &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -1px;
        bottom: 0;
        width: 0;
        height: 100%;
        border-right: 1px solid var(--border);
      }

      &:first-child::before {
        display: none;
      }
    `}

    ${isPinned === 'right' &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 0;
        height: 100%;
        border-left: 1px solid var(--border);
      }

      &:last-child::before {
        display: none;
      }
    `}

    ${isLastLeftPinnedColumn &&
    css`
      &::after {
        position: absolute;
        top: 0;
        right: -1px;
        bottom: 0px;
        width: 30px;
        transform: translateX(100%);
        transition: box-shadow 0.3s;
        content: '';
        pointer-events: none;
        will-change: transform;
        border-left: 1px solid var(--border);
        box-shadow: inset 10px 0 8px -8px var(--muted);
      }
    `}

    ${isFirstRightPinnedColumn &&
    css`
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 30px;
        transform: translateX(-100%);
        transition: box-shadow 0.3s;
        content: '';
        pointer-events: none;
        will-change: transform;
        border-right: 1px solid var(--border);
        box-shadow: inset -10px 0 8px -8px var(--muted);
      }
    `}
  `
}
