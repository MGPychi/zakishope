'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square">
        <Image
          src={images[currentImage] || '/placeholder.svg?height=600&width=600'}
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
  )
}

