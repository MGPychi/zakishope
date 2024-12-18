import Link from "next/link"
import { Search, RefreshCw, Heart, ShoppingBag } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/placeholder.svg?height=40&width=40" alt="Tahat Store Logo" className="h-10" />
          <span className="text-xl font-bold font-heading text-tahat-800">Tahat Store</span>
        </Link>
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher des produits"
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-tahat-500 focus:ring-tahat-500"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] border-gray-300 focus:border-tahat-500 focus:ring-tahat-500">
                <SelectValue placeholder="Toutes catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="default" className="bg-tahat-800 hover:bg-tahat-900 text-white">
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-tahat-800">
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-tahat-800">
            <Heart className="h-5 w-5" />
          </Button>
          <Link href="/cart">
          <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-tahat-800">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-tahat-800 text-xs text-white flex items-center justify-center">
              0
            </span>
          </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

