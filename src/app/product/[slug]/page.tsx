'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/layout/site-header/site-header'

interface Product {
  id: string
  name: string
  price: number
  image: string
}

export default function ProductDetail() {
  const [currentImage, setCurrentImage] = useState(0)
  
  const images = [
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
    '/placeholder.svg?height=600&width=600',
  ]

  const specs = [
    { label: 'CPU', value: 'Amlogic S905Y4 Quad core ARM Cortex-A35, 16500 DMIPS' },
    { label: 'GPU', value: 'ARM G31 MP2 GPU, OpenGL ES 3.2, Vulkan 1.1 et OpenCL 2.0' },
    { label: 'SDRAM', value: '2 Go' },
    { label: 'Storage', value: '32 Go' },
    { label: 'WiFi', value: '2T2R 2.4G et 5G 802.11 a/b/g/n/ac' },
    { label: 'Bluetooth', value: 'BT5.1' },
    { label: 'Ethernet LAN', value: '10/100 M' },
    { label: 'Indicateur LED', value: '1 * puissance LED : ROUGE-OFF; BLEU-SUR' },
    { label: 'Accessoires', value: '1 * Adaptateur 5V/2A, 1 * Boîte de vente au détail, 1 * télécommande IR + BT Vioce(Prise en charge de la fonction SSU) avec touches numériques, 1 * câble HDMI, 1 * Manuel utilisateur' },
  ]

  const latestProducts: Product[] = [
    { id: '1', name: 'Smart Watch', price: 129.99, image: '/placeholder.svg?height=200&width=200' },
    { id: '2', name: 'Wireless Earbuds', price: 79.99, image: '/placeholder.svg?height=200&width=200' },
    { id: '3', name: 'Bluetooth Speaker', price: 59.99, image: '/placeholder.svg?height=200&width=200' },
    { id: '4', name: 'Fitness Tracker', price: 49.99, image: '/placeholder.svg?height=200&width=200' },
    { id: '5', name: 'Portable Charger', price: 39.99, image: '/placeholder.svg?height=200&width=200' },
  ]

  return (
    <>
    <SiteHeader/>
    <main className="min-h-screen container mx-auto max-w-screen-2xl bg-background px-4 py-8">
      <div className="grid lg:grid-cols-6 gap-8">
        {/* Latest Products Section */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold">Latest Products</h2>
          <div className="space-y-2">
            {latestProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md transition-colors">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Product Content */}
        <div className="lg:col-span-5 space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square">
                <Image
                  src={images[currentImage]}
                  alt="Product image"
                  fill
                  className="object-cover rounded-lg"
                />
                <button 
                  onClick={() => setCurrentImage(i => i > 0 ? i - 1 : images.length - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => setCurrentImage(i => i < images.length - 1 ? i + 1 : 0)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`relative w-20 aspect-square flex-shrink-0 ${
                      currentImage === idx ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Product thumbnail ${idx + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">MECOOL KM7 SE Android TV Box</h1>
                <div className="mt-4 flex items-baseline gap-4">
                  <span className="text-3xl font-bold">11,900 DA</span>
                  <span className="text-lg text-muted-foreground line-through">13,500 DA</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" variant="outline" className="flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" className="flex-1 bg-primary">
                  Pay Now
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <p>MECOOL KM7 SE est officiellement certifié par Google. Cette box TV Android offre une expérience de streaming exceptionnelle avec:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Streaming 4K Ultra HD fluide et sans latence</li>
                  <li>Compatible avec toutes les applications populaires de streaming</li>
                  <li>Interface utilisateur intuitive et réactive</li>
                  <li>Mise à jour régulière du système Android TV</li>
                  <li>Installation facile et configuration rapide</li>
                  <li>Support technique disponible en français</li>
                </ul>
                <p>Profitez d une expérience multimédia complète avec accès à des milliers d applications via le Google Play Store.</p>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex flex-col">
                  <dt className="font-medium">{spec.label}</dt>
                  <dd className="text-muted-foreground">{spec.value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

