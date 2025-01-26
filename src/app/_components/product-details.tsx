"use client"

import { useState } from "react"
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {  getProductDetailWithSlug } from "../data/products-data"

interface Props {
  product:Awaited<ReturnType<typeof getProductDetailWithSlug>>
}
export function ProductDetailsClient({ product }:Props) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="aspect-square relative">
          <Image
            width={400}
            height={400}
            src={product!.images[selectedImage]?.url??""}
            alt={product!.name}
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex gap-4">
          {product!.images.map((image, index) => (
            <button
              key={index}
              className={`w-20 h-20 rounded-md overflow-hidden ${
                index === selectedImage ? "ring-2 ring-tahat-800" : ""
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image width={100} height={100} src={image?.url??""} alt={`${product!.name} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-heading text-tahat-900">{product!.name}</h1>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                index < Math.floor(4.5)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-tahat-600">({4.5})</span>
        </div>
        <p className="text-2xl font-bold text-tahat-800">{product!.price.toFixed(2)} €</p>
        <p className="text-tahat-600">{product!.description}</p>
        <ul className="list-disc list-inside space-y-2">
          {product!.features.map((feature, index) => (
            <li key={index} className="text-tahat-600">{feature.value}</li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-16 mx-2 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="flex-1 bg-tahat-800 hover:bg-tahat-900 text-white">
            <ShoppingCart className="mr-2 h-4 w-4" /> Ajouter au panier
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
