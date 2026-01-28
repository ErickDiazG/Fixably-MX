'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ClipboardList, Menu } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

interface DashboardSidebarProps {
  items: NavItem[]
  title: string
}

export function DashboardSidebar({ items, title }: DashboardSidebarProps) {
  const pathname = usePathname()

  const NavContent = () => (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="flex h-16 items-center border-b border-border px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <ClipboardList className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">
                TheBlue<span className="text-primary">ColorList</span>
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <p className="mb-4 text-xs font-semibold uppercase text-muted-foreground">
              {title}
            </p>
            <NavContent />
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center border-b border-border px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <ClipboardList className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">
                  TheBlue<span className="text-primary">ColorList</span>
                </span>
              </Link>
            </div>
            <div className="p-4">
              <p className="mb-4 text-xs font-semibold uppercase text-muted-foreground">
                {title}
              </p>
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
        <span className="font-semibold text-foreground">{title}</span>
      </div>
    </>
  )
}
