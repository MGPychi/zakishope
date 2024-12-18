import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

const products = [
  {
    name: "Xiaomi Mi Watch",
    price: "129.99 €",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Écouteurs sans fil",
    price: "79.99 €",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Caméra de sécurité",
    price: "89.99 €",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Tablette Android",
    price: "199.99 €",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export function FeaturedProducts() {
  return (
    <div className="bg-tahat-50 py-12">
      <div className="container">
        <h2 className="text-3xl font-bold font-heading text-tahat-900 mb-8 text-center">Produits Vedettes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.name} className="overflow-hidden transition-transform hover:scale-105">
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 object-cover w-full h-full rounded-lg"
                  />
                </div>
                <CardTitle className="text-lg font-heading text-tahat-800">{product.name}</CardTitle>
                <p className="text-tahat-600 font-bold mt-2">{product.price}</p>
              </CardContent>
              <CardFooter className="bg-white">
                <Button className="w-full bg-tahat-800 hover:bg-tahat-900 text-white">
                  Ajouter au panier
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

