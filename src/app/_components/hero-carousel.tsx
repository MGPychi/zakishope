"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useRef } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import Image1 from "../../../public/getImage.png"
import Image2 from "../../../public/2.png"
import Image3 from "../../../public/3.png"
import Image4 from "../../../public/4.png"

const slides = [
  {
    title: "NVIDIA Shield TV Pro:",
    subtitle: "4K HDR Streaming Media Player",
    description: "AI-Enhanced Upscaling",
    offer: "Pour les Gamers",
    image: Image1,
  },
  {
    title: "Google TV Box:",
    subtitle: "Xiaomi Mi Box S 2nd",
    description: "4K Google TV",
    offer: "Offre Spéciale",
    image: Image2,
  },
  {
    title: "Smart Speaker:",
    subtitle: "Amazon Echo Dot 4th Gen",
    description: "With Alexa",
    offer: "Nouveau Modèle",
    image: Image3,
  },
  {
    title: "Streaming Stick:",
    subtitle: "Roku Streaming Stick 4K",
    description: "4K/HDR/Dolby Vision",
    offer: "Prix Réduit",
    image: Image4,
  },
]

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!api) {
      return
    }

    intervalRef.current = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [api])

  return (
    <div className="w-full lg:w-full overflow-hidden rounded-lg bg-white">
      <Carousel
        className="w-full"
        onMouseEnter={() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
        }}
        onMouseLeave={() => {
          intervalRef.current = setInterval(() => {
            api?.scrollNext()
          }, 4000)
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-2 sm:p-4">
                <div className="flex flex-col items-center sm:items-start gap-4 p-4 sm:p-6 bg-white rounded-lg">

                    <Image
                      src={slide.image || ""}
                      alt={slide.subtitle}
                      fill
                      className="top-0 left-0 object-cover  rounded-lg  "
                      priority={index === 0}
                    />
                  <div className="w-full  space-y-2 text-center sm:text-left">
                    <h2 className="text-base sm:text-xl font-semibold text-primary line-clamp-1">{slide.title}</h2>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 line-clamp-2">{slide.subtitle}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground line-clamp-1">{slide.description}</p>
                    <p className="text-sm sm:text-lg font-semibold text-primary">{slide.offer}</p>
                  </div>
                  <div className="w-full aspect-[4/3] relative max-w-[200px] mx-auto">
                  </div>
                  <Button size="sm" className="w-full sm:w-auto">
                    Acheter Maintenant
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="-left-3 sm:left-2 h-8 w-8 sm:h-10 sm:w-10" />
          <CarouselNext className="-right-3 sm:right-2 h-8 w-8 sm:h-10 sm:w-10" />
        </div>
      </Carousel>
    </div>
  )
}

