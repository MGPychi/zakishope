"use client"
import { ProductCard } from "./product-card"

const products = [
  {
    name: "Xiaomi Mi Watch",
    price: "129.99 €",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Écouteurs sans fil",
    price: "79.99 €",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Caméra de sécurité",
    price: "89.99 €",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Tablette Android",
    price: "199.99 €",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Produits Vedettes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}

