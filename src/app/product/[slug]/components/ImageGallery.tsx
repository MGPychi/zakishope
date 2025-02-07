"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect iOS devices
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (mainImageRef.current) {
        mainImageRef.current.style.height = isFullscreen ? "100vh" : "auto";
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    if (!isFullscreen && mainImageRef.current) {
      mainImageRef.current.style.height = "auto";
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isFullscreen]);

  const goToPreviousImage = () => {
    setCurrentImage((i) => (i > 0 ? i - 1 : images.length - 1));
  };

  const goToNextImage = () => {
    setCurrentImage((i) => (i < images.length - 1 ? i + 1 : 0));
  };

  const toggleFullscreen = () => {
    // Disable fullscreen for iOS
    if (isIOS) return;

    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(null); // Reset touch end position
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const swipeThreshold = 50; // Minimum swipe distance to trigger navigation
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > swipeThreshold) {
      goToPreviousImage(); // Swipe right to go to the previous image
    } else if (swipeDistance < -swipeThreshold) {
      goToNextImage(); // Swipe left to go to the next image
    }
  };

  return (
    <div
      className={`w-full max-w-full overflow-hidden px-4 space-y-4 transition-all duration-300 
      ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-black/90 flex flex-col justify-center p-4"
          : ""
      }`}
    >
      <div
        ref={mainImageRef}
        className={`w-full ${
          isFullscreen && "aspect-auto max-w-4xl mx-auto"
        } aspect-square relative`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentImage] || ""}
          alt={`Product Image ${currentImage + 1}`}
          fill
          priority
          className={`object-contain rounded-lg transition-transform duration-300 w-full max-w-full`}
        />

        <button
          onClick={goToPreviousImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all group"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={goToNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all group"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        {!isIOS && (
          <button
            onClick={toggleFullscreen}
            className={`${
              isFullscreen ? "fixed top-14 right-4" : "absolute top-2 right-2"
            } bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all group`}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
            ) : (
              <Maximize2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
            )}
          </button>
        )}
      </div>

      <div className="text-center text-sm text-gray-500">
        {currentImage + 1} / {images.length}
      </div>

      <div
        className={`flex gap-2 overflow-x-auto pb-2 w-full max-w-full transition-all 
        ${isFullscreen ? "hidden" : ""}`}
      >
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`relative w-20 h-20 flex-shrink-0 
              ${
                currentImage === idx
                  ? "ring-2 ring-primary"
                  : "opacity-60 hover:opacity-100"
              }
              transition-all duration-300 ease-in-out
            `}
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