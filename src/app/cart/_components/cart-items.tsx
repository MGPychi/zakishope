"use client"


import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/useCart"


export function CartItems() {
  const {items,updateQuantity:updateItemQt,removeItem:removeCartItem} = useCart()

  const updateQuantity = (id: string, newQuantity: number) => {
    console.log(items)
    console.log("update",id,newQuantity)
    console.log(items.filter(i=>i.item.id==id)[0])
    updateItemQt(id,newQuantity)
  }

  const removeItem = (id: string) => {
    removeCartItem(id)
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.item.id}>
          <CardContent className="flex items-center p-4">
            <img src={item.item.image} alt={item.item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
            <div className="flex-grow">
              <h3 className="font-heading text-lg font-semibold text-tahat-800">{item.item.name}</h3>
              <p className="text-tahat-600">{item.item.price.toFixed(2)} €</p>
              <div className="flex items-center mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.item.id,  - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.qt}
                  onChange={(e) => updateQuantity(item.item.id, parseInt(e.target.value))}
                  className="w-16 mx-2 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.item.id,  1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeItem(item.item.id)}>
              <X className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

