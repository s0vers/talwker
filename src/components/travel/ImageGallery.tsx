"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Grid, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ImageGallery({ images, alt, className }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className={cn("grid gap-3", className)}>
        {/* Main Image */}
        <div
          className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-2xl"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={images[selectedImage]}
            alt={`${alt} - Image ${selectedImage + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 70vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          <button className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
            <Maximize className="h-4 w-4" />
            View all photos
          </button>
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3 md:grid-cols-5 lg:grid-cols-6">
            {images.slice(0, 6).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-xl transition-all",
                  selectedImage === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "hover:opacity-80"
                )}
              >
                <Image
                  src={image}
                  alt={`${alt} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
                {index === 5 && images.length > 6 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-lg font-semibold text-white">
                      +{images.length - 6}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image counter */}
            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              {selectedImage + 1} / {images.length}
            </div>

            {/* Main image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative h-[80vh] w-[90vw] max-w-6xl"
            >
              <Image
                src={images[selectedImage]}
                alt={`${alt} - Image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 overflow-x-auto rounded-full bg-white/10 p-2 backdrop-blur-sm">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg transition-all",
                    selectedImage === index
                      ? "ring-2 ring-white"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Grid Gallery Component for Trip Pages
interface GridGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export function GridGallery({ images, alt, className }: GridGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImages = images.slice(0, 5);
  const remainingCount = images.length - 5;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className={cn("grid gap-2 md:grid-cols-4 md:grid-rows-2", className)}>
        {/* Main large image */}
        <div
          className="group relative cursor-pointer overflow-hidden rounded-l-2xl md:col-span-2 md:row-span-2"
          onClick={() => openLightbox(0)}
        >
          <div className="aspect-[4/3] md:aspect-auto md:h-full">
            <Image
              src={displayImages[0]}
              alt={`${alt} - Main`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        </div>

        {/* Right side images */}
        {displayImages.slice(1).map((image, index) => (
          <div
            key={index}
            className={cn(
              "group relative hidden cursor-pointer overflow-hidden md:block",
              index === 1 && "rounded-tr-2xl",
              index === 3 && "rounded-br-2xl"
            )}
            onClick={() => openLightbox(index + 1)}
          >
            <div className="h-full">
              <Image
                src={image}
                alt={`${alt} - Image ${index + 2}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="25vw"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

            {/* Show more button on last image */}
            {index === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="flex items-center gap-2 text-white">
                  <Grid className="h-5 w-5" />
                  <span className="font-semibold">+{remainingCount} more</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Mobile show all button */}
        <button
          onClick={() => openLightbox(0)}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-medium text-slate-700 md:hidden"
        >
          <Grid className="h-4 w-4" />
          View all {images.length} photos
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              {selectedImage + 1} / {images.length}
            </div>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative h-[80vh] w-[90vw] max-w-6xl"
            >
              <Image
                src={images[selectedImage]}
                alt={`${alt} - Image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage(
                      (prev) => (prev - 1 + images.length) % images.length
                    )
                  }
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) => (prev + 1) % images.length)
                  }
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 overflow-x-auto rounded-full bg-white/10 p-2 backdrop-blur-sm">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg transition-all",
                    selectedImage === index
                      ? "ring-2 ring-white"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
