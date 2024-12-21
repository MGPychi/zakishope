"use client";
import { Product } from "@/interfaces/CartItem";
import { ProductCard } from "../../components/cards/product-card/product-card";

const products:Product[] = [
  {

    id:"120r9fupj",
    name: "Xiaomi Mi Watch",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id:"02hifn",
    name: "Écouteurs sans fil",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id:"230rwifjs02hifn",
    name: "Caméra de sécurité",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id:"230rwifjs02hif203rwqihfn",
    name: "Tablette Android",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
  },
];

export function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Produits Vedettes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
