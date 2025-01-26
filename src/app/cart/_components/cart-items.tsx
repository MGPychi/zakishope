"use client"
import { Minus, Plus, X, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/hooks/useCart"
import Image from 'next/image'

// Skeleton loading component
const CartItemSkeleton = () => (
  <Card>
    <CardContent className="flex items-center p-4">
      <Skeleton className="w-24 h-24 rounded-md mr-4" />
      <div className="flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/4 mb-4" />
        <div className="flex items-center mt-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-16 mx-2" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
      <Skeleton className="h-8 w-8 rounded ml-4" />
    </CardContent>
  </Card>
)

const EmptyCart = () => (
  <Card className="w-full">
    <CardContent className="flex flex-col items-center justify-center p-8">
      <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="font-heading text-xl font-semibold text-gray-700 mb-2">
        Votre panier est vide
      </h3>
      <p className="text-gray-500 text-center mb-4">
        On dirait que vous n&apos;avez pas encore ajouté d&apos;articles à votre panier.
      </p>
      <Button
        variant="default"
        className="mt-2"
        onClick={() => window.history.back()}
      >
        Continuer vos achats
      </Button>
    </CardContent>
  </Card>
)

export function CartItems() {
  const {items, isLoading, updateQuantity: updateItemQt, removeItem: removeCartItem} = useCart()
  
  const updateQuantity = (id: string, newQuantity: number) => {
    updateItemQt(id, newQuantity)
  }
  
  const removeItem = (id: string) => {
    removeCartItem(id)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.item.id}>
          <CardContent className="flex items-center p-4">
            <Image 
              width={300} 
              height={300} 
              src={item?.item?.images[0]?.url} 
              alt={item.item.name.split(" ").slice(0,25).join(" ")} 
              className="w-24 h-24 object-cover rounded-md mr-4" 
            />
            <div className="flex-grow">
              <h3 className="font-heading text-lg font-semibold text-tahat-800">
                {item.item.name.split(" ").slice(0,25).join(" ")}
              </h3>
              <p className="text-tahat-600">{item.item.price.toFixed(2)} DZD</p>
              <div className="flex items-center mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.item.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.qt}
                  min={1}
                  onChange={(e) => updateItemQt(item.item.id, parseInt(e.target.value??"1"), true)}
                  className="w-16 mx-2 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => removeItem(item.item.id)}
            >
              <X className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}