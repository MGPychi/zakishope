"use client"

import { useState } from "react"
import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const initialItems = [
  {
    id: 1,
    name: "Xiaomi Mi Watch",
    price: 129.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Écouteurs sans fil",
    price: 79.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function CartItems() {
  const [items, setItems] = useState(initialItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex items-center p-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
            <div className="flex-grow">
              <h3 className="font-heading text-lg font-semibold text-tahat-800">{item.name}</h3>
              <p className="text-tahat-600">{item.price.toFixed(2)} €</p>
              <div className="flex items-center mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 mx-2 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
              <X className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

