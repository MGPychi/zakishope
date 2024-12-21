import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const relatedProducts = [
  {
    name: "Écouteurs sans fil",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Bracelet connecté",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Montre GPS",
    price: 149.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Casque audio",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export function RelatedProducts() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold font-heading text-tahat-900 mb-8">Produits associés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <Card key={index} className="overflow-hidden transition-transform hover:scale-105">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 object-cover w-full h-full rounded-lg"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-tahat-800">{product.name}</h3>
              <p className="text-tahat-600 font-bold mt-2">{product.price.toFixed(2)} €</p>
            </CardContent>
            <CardFooter className="bg-white">
              <Button className="w-full bg-tahat-800 hover:bg-tahat-900 text-white">
                Voir le produit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

