import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';

/**
 * Full image gallery with thumbnail strip and lightbox modal.
 * @param {{ images: Array<{ id: string, image_url: string, alt_text: string, sort_order: number, caption?: string }> }} props
 */
export default function ImageGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const current = images[activeIndex] || images[0];

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Showcase Viewer */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#EAE3D9] cursor-pointer group border border-[#E8E1D7]"
      >
        <img
          src={current.image_url}
          alt={current.alt_text}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {current.caption && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 sm:p-6 text-[#FAF8F5]">
            <p className="text-xs sm:text-sm font-light leading-snug">{current.caption}</p>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(true); }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm transition-colors"
          aria-label="View full screen"
        >
          <Maximize className="w-4 h-4" />
        </button>

        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative shrink-0 w-24 sm:w-32 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                activeIndex === idx
                  ? 'border-[#C5A059] scale-95 shadow'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.image_url}
                alt={img.alt_text}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-6xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.image_url}
              alt={current.alt_text}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-center text-white/80 text-sm font-light">
            <p>{current.caption || current.alt_text}</p>
            <span className="text-xs text-white/50 mt-1 block">
              {activeIndex + 1} of {images.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
