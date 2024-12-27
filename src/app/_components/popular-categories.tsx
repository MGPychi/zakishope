import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export function PopularCategories() {
  const categories = [
    {
      name: "Smart Watch",
      image: "/placeholder.svg?height=300&width=300",
      count: "12 produits",
      href: "/categories/smart-watch"
    },
    {
      name: "Box TV",
      image: "/placeholder.svg?height=300&width=300",
      count: "8 produits",
      href: "/categories/box-tv"
    },
    {
      name: "Écouteurs",
      image: "/placeholder.svg?height=300&width=300",
      count: "15 produits",
      href: "/categories/ecouteurs"
    },
    {
      name: "Caméras",
      image: "/placeholder.svg?height=300&width=300",
      count: "10 produits",
      href: "/categories/cameras"
    },
    {
      name: "Smart Home",
      image: "/placeholder.svg?height=300&width=300",
      count: "6 produits",
      href: "/categories/smart-home"
    },
    {
      name: "Accessoires",
      image: "/placeholder.svg?height=300&width=300",
      count: "20 produits",
      href: "/categories/accessories"
    }
  ]

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Catégories Populaires</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Link key={index} href={category.href}>
            <Card className="group h-full">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="relative w-full aspect-square mb-3">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover rounded-md group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

