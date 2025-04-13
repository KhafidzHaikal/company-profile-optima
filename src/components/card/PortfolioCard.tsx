// "use client";

// import Image from "next/image";

// const images = [
//   "/images/optima-foto-1.png",
//   "/images/optima-foto-2.png",
//   "/images/optima-foto-3.png",
//   "/images/optima-foto-4.png",
//   "/images/optima-foto-5.png",
//   "/images/optima-foto-6.png",
//   "/images/optima-foto-7.png",
//   "/images/optima-foto-8.png",
//   "/images/optima-foto-9.png",
//   "/images/optima-foto-10.png",
//   "/images/optima-foto-11.png",
//   "/images/optima-foto-12.png",
//   "/images/optima-foto-13.png",
  
// ];

// export default function PortfolioCard() {
//   return (
//     <div className="px-4 py-10 lg:px-20">
//       <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
//         {images.map((src, index) => (
//           <div key={index} className="break-inside-avoid overflow-hidden rounded-lg">
//             <Image
//               src={src}
//               alt={`Optima Portfolio ${index + 1}`}
//               width={500}
//               height={500}
//               className="w-full h-auto rounded-lg object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageData {
  id: number;
  source: string;
}

export default function PortfolioCard() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      if (!res.ok) return console.error("Failed to load images");

      const data = await res.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <div className="px-4 py-10 lg:px-20">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img) => (
          <div key={img.id} className="break-inside-avoid overflow-hidden rounded-lg">
            <Image
              src={img.source}
              alt={`Optima Portfolio ${img.id}`}
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
