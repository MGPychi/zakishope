import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function NewArrivals() {
  const products = [
    {
      id: 1,
      name: "Smart Watch Pro",
      price: "12,900 DA",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: "8,900 DA",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 3,
      name: "4K Android TV Box",
      price: "11,900 DA",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      id: 4,
      name: "Security Camera",
      price: "9,900 DA",
      image: "/placeholder.svg?height=200&width=200"
    }
  ]

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Nouveaux Arrivages</h2>
        <Link href="/products" className="text-primary hover:underline">
          Voir tout
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="group">
            <CardContent className="p-4">
              <div className="relative aspect-square mb-3">
                <Badge className="absolute top-2 right-2 z-10">Nouveau</Badge>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-primary">{product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

