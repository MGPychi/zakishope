"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [current, setCurrent] = React.useState(0)
  const slides = [
    {
      title: "Google TV Box:",
      subtitle: "Xiaomi Mi Box S 2nd",
      description: "4K Google TV",
      offer: "Offre Spéciale (:",
      image: "",
    },
    // Add more slides as needed
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-tahat-50 to-tahat-100">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-none">
            <div className="container grid lg:grid-cols-2 gap-6 py-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl text-tahat-800 font-heading">{slide.title}</h2>
                  <h1 className="text-5xl font-bold font-heading text-tahat-900">{slide.subtitle}</h1>
                  <p className="text-3xl text-tahat-700">{slide.description}</p>
                  <p className="text-3xl font-bold text-tahat-800">{slide.offer}</p>
                </div>
                <Button className="bg-tahat-800 hover:bg-tahat-900 text-white text-lg px-8 py-3 rounded-full transition-transform hover:scale-105">
                  Acheter Maintenant
                </Button>
              </div>
              <div className="flex justify-center">
                <img
                  src={slide.image}
                  alt="Product"
                  className="max-w-md rounded-lg shadow-lg transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`h-3 w-3 rounded-full ${
              current === index ? "bg-tahat-800" : "bg-tahat-300"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}

