"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "Google TV Box:",
    subtitle: "Xiaomi Mi Box S 2nd",
    description: "4K Google TV",
    offer: "Offre Spéciale (:",
    image: "/placeholder.svg?height=600&width=600",
  },
  // Add more slides as needed
]

export function HeroCarousel() {
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((current + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [current])

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-out min-h-[400px]" 
        style={{ 
          transform: `translateX(-${current * 100}%)`,
          background: `
            linear-gradient(135deg, #ffffff 25%, transparent 25%) -50px 0,
            linear-gradient(225deg, #ffffff 25%, transparent 25%) -50px 0,
            linear-gradient(315deg, #ffffff 25%, transparent 25%),
            linear-gradient(45deg, #ffffff 25%, transparent 25%)
          `,
          backgroundColor: '#f5f5f5',
          backgroundSize: '100px 100px'
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-none">
            <div className="container grid lg:grid-cols-2 gap-8 py-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl text-blue-500">{slide.title}</h2>
                  <div className="space-y-2">
                    <h1 className="text-4xl lg:text-5xl font-bold">
                      <span className="text-gray-800">Xiaomi</span>{" "}
                      <span className="text-gray-600">Mi Box S 2nd</span>
                    </h1>
                    <p className="text-3xl text-gray-600">4K Google TV</p>
                    <p className="text-3xl">
                      Offre <span className="font-bold">Spéciale</span> (:
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-tahat-800 hover:bg-tahat-900 text-white px-8 py-6 h-auto text-lg rounded-md"
                >
                  Acheter Maintenant
                </Button>
              </div>
              <div className="flex justify-center">
                <img
                  src={slide.image}
                  alt={slide.subtitle}
                  className="max-w-md w-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {[0,1,2,3,4].map((index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? "bg-tahat-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

