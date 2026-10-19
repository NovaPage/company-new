'use client'

import * as React from 'react'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export type ResponsiveModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  contentClassName?: string
}

/**
 * Centralized responsive modal component:
 * - Desktop (>= 768px): Centered Radix Dialog.
 * - Mobile (< 768px): Touch-friendly Bottom Drawer Sheet.
 *
 * Uses design system theme variables, accessible primitives, and zero hardcoded styles.
 */
export function ResponsiveModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  contentClassName,
}: ResponsiveModalProps) {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            'sm:max-w-3xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-card border border-border shadow-2xl rounded-2xl',
            className
          )}
        >
          {(title || description) && (
            <DialogHeader className="px-6 py-5 border-b border-border/60 text-left shrink-0">
              {title && (
                <DialogTitle className="text-xl md:text-2xl font-efour text-primary tracking-wide">
                  {title}
                </DialogTitle>
              )}
              {description && (
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}

          <div
            className={cn(
              'flex-1 overflow-y-auto px-6 py-5 overscroll-contain',
              contentClassName
            )}
          >
            {children}
          </div>

          {footer && (
            <div className="px-6 py-4 border-t border-border/60 bg-muted/20 flex flex-wrap items-center justify-end gap-3 shrink-0">
              {footer}
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          'max-h-[92vh] rounded-t-3xl flex flex-col p-0 overflow-hidden bg-card border-t border-border shadow-2xl focus:outline-none',
          className
        )}
      >
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 rounded-full bg-muted-foreground/25 mx-auto mt-3 shrink-0" />

        {(title || description) && (
          <SheetHeader className="px-5 py-4 border-b border-border/60 text-left shrink-0">
            {title && (
              <SheetTitle className="text-lg font-efour text-primary tracking-wide">
                {title}
              </SheetTitle>
            )}
            {description && (
              <SheetDescription className="text-xs text-muted-foreground mt-1">
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
        )}

        <div
          className={cn(
            'flex-1 overflow-y-auto px-5 py-4 overscroll-contain',
            contentClassName
          )}
        >
          {children}
        </div>

        {footer && (
          <div className="px-5 py-3 border-t border-border/60 bg-muted/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 shrink-0">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
