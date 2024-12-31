'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImage((i) => (i > 0 ? i - 1 : images.length - 1));
  };

  const goToNextImage = () => {
    setCurrentImage((i) => (i < images.length - 1 ? i + 1 : 0));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={images[currentImage] || '/placeholder.svg'}
          alt={`Image ${currentImage + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover rounded-lg"
        />
        {/* Navigation Buttons */}
        <button
          onClick={goToPreviousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`relative w-24 aspect-square flex-shrink-0 ${
              currentImage === idx ? 'ring-2 ring-primary' : ''
            }`}
            aria-label={`Select image ${idx + 1}`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 3vw"
              className="object-cover rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
