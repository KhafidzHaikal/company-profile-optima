"use client";

import Image from "next/image";

const images = [
  "/images/optima-foto-1.png",
  "/images/optima-foto-2.png",
  "/images/optima-foto-3.png",
  "/images/optima-foto-4.png",
  "/images/optima-foto-5.png",
  "/images/optima-foto-6.png",
  "/images/optima-foto-7.png",
  "/images/optima-foto-8.png",
  "/images/optima-foto-9.png",
  "/images/optima-foto-10.png",
  "/images/optima-foto-11.png",
  "/images/optima-foto-12.png",
  "/images/optima-foto-13.png",
  
];

export default function PortfolioCard() {
  return (
    <div className="px-4 py-10 lg:px-20">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((src, index) => (
          <div key={index} className="break-inside-avoid overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={`Optima Portfolio ${index + 1}`}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
