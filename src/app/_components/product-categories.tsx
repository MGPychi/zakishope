import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const categories = [
  {
    title: "SMART WATCH",
    image: "",
    category: "CATEGORIE",
  },
  {
    title: "SMARTHOME",
    image: "",
    category: "CATEGORIE",
  },
  {
    title: "ECOUTEURS",
    image: "",
    category: "CATEGORIE",
  },
  {
    title: "INFORMATIQUE",
    image: "",
    category: "CATEGORIE",
  },
]

export function ProductCategories() {
  return (
    <div className="container py-12">
      <h2 className="text-3xl font-bold font-heading text-tahat-900 mb-8 text-center">Nos Catégories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Card key={category.title} className="overflow-hidden transition-transform hover:scale-105">
            <CardHeader className="bg-tahat-800 text-white">
              <CardTitle className="text-lg font-heading">{category.title}</CardTitle>
              <p className="text-sm text-tahat-100">{category.category}</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-white">
              <Button className="w-full bg-tahat-800 hover:bg-tahat-900 text-white">
                Acheter
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

