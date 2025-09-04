"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

// Move arrays outside component to prevent recreation on every render
const countertopImages = [
  { src: "/gallery/epoxyworkbench.jpg", alt: "Epoxy Workbench", title: "Custom Epoxy Workbench" },
];

const flooringImages = [
  { src: "/gallery/flakefloor1.jpg", alt: "Flake Floor 1", title: "Decorative Flake Floor" },
  { src: "/gallery/flakefloor2.jpg", alt: "Flake Floor 2", title: "Multi-Color Flake Design" },
  { src: "/gallery/flakefloor3.jpg", alt: "Flake Floor 3", title: "Professional Floor Coating" },
  { src: "/gallery/flakefloor4.jpg", alt: "Flake Floor 4", title: "Garage Floor Transformation" },
  { src: "/gallery/flakefloor5.jpg", alt: "Flake Floor 5", title: "Commercial Floor Project" },
  { src: "/gallery/flakefloor6.jpg", alt: "Flake Floor 6", title: "Basement Floor Coating" },
  { src: "/gallery/metallic-floor.jpg", alt: "Metallic Floor", title: "Metallic Epoxy Floor" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Use useMemo to combine all images
  const allImages = useMemo(() => [...countertopImages, ...flooringImages], []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedImage(prev => prev === 0 ? allImages.length - 1 : (prev || 0) - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedImage(prev => prev === allImages.length - 1 ? 0 : (prev || 0) + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, allImages.length]);

  const openModal = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? allImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === allImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const GallerySection = ({ title, images, id, startIndex }: { title: string; images: any[]; id: string; startIndex: number }) => (
    <div className="mb-16">
      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight gradient-resin-text mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-2xl ring-1 ring-resin-blue/20 bg-gradient-to-br from-white/5 to-white/[0.02] resin-glow cursor-pointer"
            onClick={() => openModal(startIndex + index)}
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 text-sm backdrop-blur bg-black/20">
              {image.title}
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <section className="mt-20" id="showcase">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight gradient-resin-text mb-12">Gallery</h2>
          
          <GallerySection 
            title="Countertops & Surfaces" 
            images={countertopImages} 
            id="countertops"
            startIndex={0}
          />
          
          <GallerySection 
            title="Flooring Solutions" 
            images={flooringImages} 
            id="flooring"
            startIndex={countertopImages.length}
          />
        </div>
      </section>

      {/* Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="relative max-w-7xl max-h-[90vh] mx-4">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-resin-blue transition-colors duration-200 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-resin-blue transition-colors duration-200 z-10 bg-black/50 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-resin-blue transition-colors duration-200 z-10 bg-black/50 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <div 
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[selectedImage].src}
                alt={allImages[selectedImage].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                priority
              />
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-lg font-semibold mb-1">
                  {allImages[selectedImage].title}
                </h3>
                <p className="text-white/80 text-sm">
                  {selectedImage + 1} of {allImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


