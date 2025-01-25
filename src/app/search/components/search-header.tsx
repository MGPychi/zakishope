'use client'

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function SearchHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher des produits" className="pl-8" />
      </div>
    </div>
  )
}

