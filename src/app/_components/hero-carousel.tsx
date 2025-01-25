"use client";
import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import Image1 from "../../../public/getImage.png";
import Image2 from "../../../public/2.png";
import Image3 from "../../../public/3.png";
import Image4 from "../../../public/4.png";
import Container from "@/components/layout/Container";

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
];

export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setActiveSlide(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => {
      api.off("select", handleSelect);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api]);

  return (
    <Container>
      <div className="py-4"/>
      <div className="relative w-full  mx-auto px-4">
        <Carousel
          className="w-full"
          onMouseEnter={() => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }}
          onMouseLeave={() => {
            intervalRef.current = setInterval(() => {
              api?.scrollNext();
            }, 4000);
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-6">
                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row items-center">
                  <div className="relative w-full md:w-1/2 h-64 md:h-96">
                    <Image
                      src={slide.image}
                      alt={slide.subtitle}
                      fill
                      priority={index === 0}
                      className="object-contain md:object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="w-full md:w-1/2 p-4 md:p-6 text-center md:text-left space-y-3">
                    <h2 className="text-sm md:text-base font-medium text-primary truncate">
                      {slide.title}
                    </h2>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 line-clamp-2">
                      {slide.subtitle}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                      {slide.description}
                    </p>
                    <p className="text-base md:text-lg font-semibold text-primary">
                      {slide.offer}
                    </p>

                    <Button size="sm" className="w-full md:w-auto mt-4">
                      Acheter Maintenant
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Mobile Indicators */}
          <div className="flex justify-center mt-4 space-x-2 md:hidden">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "bg-primary w-6" : "bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <CarouselPrevious className="left-4 h-10 w-10 bg-white/80 hover:bg-white shadow-md" />
            <CarouselNext className="right-4 h-10 w-10 bg-white/80 hover:bg-white shadow-md" />
          </div>
        </Carousel>
      </div>
    </Container>
  );
}
