'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu, X, Wrench, ClipboardList } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/buscar', label: 'Buscar Pro' },
    { href: '/registro-profesional', label: 'Soy Profesional' },
    { href: '/recursos', label: 'Recursos' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary">
            <ClipboardList className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-black tracking-tight uppercase text-foreground">
            Fixably<span className="text-accent underline decoration-4 underline-offset-4">MX</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground hover:underline decoration-accent decoration-2 underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" className="rounded-sm border-2 font-bold uppercase tracking-wide" asChild>
            <Link href="/login">Acceder</Link>
          </Button>
          <Button asChild className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90 border-2 border-primary font-bold uppercase tracking-wide">
            <Link href="/publicar-proyecto">
              <Wrench className="mr-2 h-4 w-4" />
              Publicar Proyecto
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Button variant="outline" asChild>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Acceder
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/publicar-proyecto" onClick={() => setIsOpen(false)}>
                    <Wrench className="mr-2 h-4 w-4" />
                    Publicar Proyecto
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
