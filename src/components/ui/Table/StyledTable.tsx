import React from 'react'
import cn from '@/utils/cn'
import { tv, type VariantProps } from 'tailwind-variants'

interface StyledTableContainerProps extends React.ComponentProps<'div'> {
  ref?: React.Ref<HTMLDivElement>
}

const StyledTableContainer = ({
  className,
  ref,
  ...props
}: StyledTableContainerProps) => {
  return (
    <div
      ref={ref}
      data-slot="table-container"
      className={cn('relative w-full overflow-auto', className)}
      {...props}
    />
  )
}

interface StyledTableProps extends React.ComponentProps<'table'> {
  ref?: React.Ref<HTMLTableElement>
  containerRef?: React.Ref<HTMLDivElement>
  containerClassName?: string
}

const StyledTable = ({
  className,
  ref,
  containerRef,
  containerClassName,
  ...props
}: StyledTableProps) => {
  return (
    <table
      ref={ref}
      data-slot="table"
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  )
}

// ========================

const styledTHeadVariant = tv({
  base: 'font-medium [&>tr]:last:border-b-0',
  variants: {
    variant: {
      default: 'bg-muted/50',
    },
    border: {
      true: 'border-b border-border',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    border: false,
  },
})

interface StyledTHeadProps
  extends React.ComponentProps<'thead'>,
    VariantProps<typeof styledTHeadVariant> {
  ref?: React.Ref<HTMLTableSectionElement>
}

const StyledTHead = ({
  className,
  ref,
  border,
  variant,
  ...props
}: StyledTHeadProps) => {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={styledTHeadVariant({ variant, border, className })}
      {...props}
    />
  )
}

// ========================

const styledTBodyVariant = tv({
  base: '[&_tr:last-child]:border-0',
  variants: {
    variant: {
      default: '[&_tr:last-child]:border-border',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface StyledTBodyProps
  extends React.ComponentProps<'tbody'>,
    VariantProps<typeof styledTBodyVariant> {
  ref?: React.Ref<HTMLTableSectionElement>
}

const StyledTBody = ({
  className,
  ref,
  variant,
  ...props
}: StyledTBodyProps) => {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={styledTBodyVariant({ variant, className })}
      {...props}
    />
  )
}

// ========================

const styledTFootVariant = tv({
  base: 'font-medium [&>tr]:last:border-b-0',
  variants: {
    variant: {
      default: 'bg-muted/50',
    },
    border: {
      true: 'border-t border-border',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    border: false,
  },
})

interface StyledTFootProps
  extends React.ComponentProps<'tfoot'>,
    VariantProps<typeof styledTFootVariant> {
  ref?: React.Ref<HTMLTableSectionElement>
}

const StyledTFoot = ({
  className,
  ref,
  border,
  variant,
  ...props
}: StyledTFootProps) => {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={styledTFootVariant({ variant, border, className })}
      {...props}
    />
  )
}

// ========================

const styledTRVariant = tv({
  base: 'transition-colors',
  variants: {
    variant: {
      default: 'hover:bg-muted/50 data-[state=selected]:bg-muted ',
    },
    border: {
      true: 'border-b border-border',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    border: false,
  },
})

interface StyledTRProps
  extends React.ComponentProps<'tr'>,
    VariantProps<typeof styledTRVariant> {
  ref?: React.Ref<HTMLTableRowElement>
}

const StyledTR = ({
  className,
  ref,
  border,
  variant,
  ...props
}: StyledTRProps) => {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={styledTRVariant({ variant, border, className })}
      {...props}
    />
  )
}

// ========================

const styledTHVariant = tv({
  base: 'h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
  variants: {
    variant: {
      default: 'text-foreground bg-muted',
    },
    border: {
      true: 'border-r border-r-border last:border-r-0',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    border: false,
  },
})

interface StyledTHProps
  extends React.ComponentProps<'th'>,
    VariantProps<typeof styledTHVariant> {
  border?: boolean
  ref?: React.Ref<HTMLTableCellElement>
}

const StyledTH = ({
  className,
  border = false,
  variant,
  ref,
  ...props
}: StyledTHProps) => {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={styledTHVariant({ variant, border, className })}
      {...props}
    />
  )
}

// ========================

const styledTDVariant = tv({
  base: 'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
  variants: {
    variant: {
      default: '',
    },
    border: {
      true: 'border-r border-r-border last:border-r-0',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    border: false,
  },
})

interface StyledTDProps
  extends React.ComponentProps<'td'>,
    VariantProps<typeof styledTDVariant> {
  border?: boolean
  ref?: React.Ref<HTMLTableCellElement>
}

const StyledTD = ({
  className,
  border = false,
  variant,
  ref,
  ...props
}: StyledTDProps) => {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={styledTDVariant({ variant, border, className })}
      {...props}
    />
  )
}

// ========================

const styledTCaptionVariant = tv({
  base: 'mt-4 text-sm',
  variants: {
    variant: {
      default: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface StyledTCaptionProps
  extends React.ComponentProps<'caption'>,
    VariantProps<typeof styledTCaptionVariant> {
  ref?: React.Ref<HTMLTableCaptionElement>
}

const StyledTCaption = ({
  className,
  ref,
  variant,
  ...props
}: StyledTCaptionProps) => {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={styledTCaptionVariant({ variant, className })}
      {...props}
    />
  )
}

export type {
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
}
