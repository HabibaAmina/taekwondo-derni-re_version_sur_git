import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface ProductImageLightboxProps {
  images: string[];
  alt: string;
}

const ProductImageLightbox: React.FC<ProductImageLightboxProps> = ({ images, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const slides = images.map(src => ({ src }));

  return (
    <>
      <div 
        className="cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={images[0]} 
          alt={alt} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white bg-black/50 px-2 py-1 rounded text-sm">Voir l'image</span>
        </div>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        carousel={{ finite: slides.length <= 1 }}
      />
    </>
  );
};

export default ProductImageLightbox;
