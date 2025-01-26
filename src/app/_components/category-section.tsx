import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface CategorySectionProps {
  title: string
  slug: string
  className?: string
  children: React.ReactNode
}

export function CategorySection({ title,slug, className, children }: CategorySectionProps) {
  return (
    <section className={cn("space-y-6 px-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <Link href={ `/search?category=${slug}`  }className="flex items-center text-sm font-medium hover:underline">
          Tout l&apos;univers
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      {children}
    </section>
  )
}

