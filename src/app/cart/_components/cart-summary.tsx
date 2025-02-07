"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/hooks/useCart"
import * as motion from "motion/react-m"

export function CartSummary() {
  const { getTotal, isLoading } = useCart()
  const subtotal = getTotal()
  const shipping = 0.0
  const total = subtotal + shipping

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-28" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <CardTitle className="font-heading text-xl">Résumé de la commande</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <motion.div
              className="flex justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} DZD</span>
            </motion.div>
            <motion.div
              className="flex justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <span>Frais de livraison</span>
              <span>{shipping.toFixed(2)} DZD</span>
            </motion.div>
            <motion.div
              className="flex justify-between font-bold text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <span>Total</span>
              <span>{total.toFixed(2)} DZD</span>
            </motion.div>
          </motion.div>
        </CardContent>
        <CardFooter>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <Button className="w-full bg-tahat-800 hover:bg-tahat-900 text-white">Passer à la caisse</Button>
            </motion.div>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

