"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { useCallback, useState } from "react";

interface ImageGalleryProps {
  images: { url: string }[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (images.length === 0) return;
      setActiveIndex((index + images.length) % images.length);
    },
    [images.length],
  );

  if (images.length === 0) {
    return (
      <div className="surface-card flex aspect-square items-center justify-center bg-[var(--color-bg-tertiary)]">
        <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
          <ImageOff className="h-12 w-12" aria-hidden="true" />
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="surface-card relative aspect-square overflow-hidden bg-[var(--color-bg-tertiary)]">
        {images.map((image, index) => (
          <div
            key={image.url}
            className={`absolute inset-0 p-6 transition-opacity duration-500 ${
              index === activeIndex
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={image.url}
              alt={`${productName} — image ${index + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority={index === 0}
            />
          </div>
        ))}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 text-[var(--color-text-primary)] backdrop-blur-sm transition-colors hover:border-[var(--color-border-hover)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 text-[var(--color-text-primary)] backdrop-blur-sm transition-colors hover:border-[var(--color-border-hover)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-[var(--color-brand)]"
                  : "w-2.5 bg-[var(--color-border)] hover:bg-[var(--color-border-hover)]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
