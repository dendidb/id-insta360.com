"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type ProductItem, productItems } from "@/data/product-items";

const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={product.link}
      className="relative flex-shrink-0 overflow-hidden bg-transparent cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[450px] relative w-[350px] flex-shrink-0 overflow-hidden bg-[#171821]">
        <div className="flex items-center justify-center h-full p-4">
          <Image
            src={product.imageSrc}
            alt={product.title}
            width={280}
            height={350}
            className="object-contain max-h-full transition-transform duration-300"
          />
        </div>
        
        {/* Hover image that slides up from bottom */}
        <div 
          className={`absolute inset-x-0 bottom-0 w-full transition-transform duration-500 ease-in-out ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ height: '100%' }}
        >
          <Image
            src={product.hoverImageSrc}
            alt={`${product.title} in action`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      {/* <div className="text-center p-2 mt-4 text-white">
        <h3 className="font-medium text-xl">{product.title}</h3>
      </div> */}
    </Link>
  );
};

const ProductsSlider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: "smooth"
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-20 bg-[#000916] text-white overflow-hidden">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold">Shoot Like the Pros</h2>
          <div className="flex gap-2">
            <button 
              onClick={handleScrollLeft}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={handleScrollRight}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none' }}
        >
          {productItems.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="snap-start"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSlider; 