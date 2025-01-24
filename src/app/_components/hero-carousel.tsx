"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const slides = [
  {
    title: "Google TV Box:",
    subtitle: "Xiaomi Mi Box S 2nd",
    description: "4K Google TV",
    offer: "Offre Spéciale",
    image: "/placeholder.svg",
    color: "blue",
  },
  {
    title: "Smart Speaker:",
    subtitle: "Amazon Echo Dot 4th Gen",
    description: "With Alexa",
    offer: "Nouveau Modèle",
    image: "/placeholder.svg",
    color: "indigo",
  },
  {
    title: "Streaming Stick:",
    subtitle: "Roku Streaming Stick 4K",
    description: "4K/HDR/Dolby Vision",
    offer: "Prix Réduit",
    image: "/placeholder.svg",
    color: "purple",
  },
  {
    title: "Apple TV 4K:",
    subtitle: "2nd Generation",
    description: "A12 Bionic Chip",
    offer: "Haute Performance",
    image: "/placeholder.svg",
    color: "gray",
  },
  {
    title: "NVIDIA Shield TV Pro:",
    subtitle: "4K HDR Streaming Media Player",
    description: "AI-Enhanced Upscaling",
    offer: "Pour les Gamers",
    image: "/placeholder.svg",
    color: "green",
  },
]

export function HeroCarousel() {
  return (
    <Carousel className="w-full max-w-5xl mx-auto" opts={{
      align: "start",
      loop: true,
    }}>
      <CarouselContent className="">
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
                  <div className="space-y-4 text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-2xl font-semibold text-primary">{slide.title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold">{slide.subtitle}</h3>
                    <p className="text-xl text-muted-foreground">{slide.description}</p>
                    <p className="text-lg font-semibold text-primary">{slide.offer}</p>
                    <Button size="lg" className="mt-4">Acheter Maintenant</Button>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.subtitle}
                      width={300}
                      height={300}
                      className="rounded-lg object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
