import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

type ProductCategory = {
  id: string;
  name: string;
}

type Product = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  categories: string[];
}

type ProductSectionProps = {
  productSectionData?: {
    title: string;
    categories: ProductCategory[];
    products: Product[];
  };
}

export default function ProductsSection({ productSectionData }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('popular');
  
  // Categories
  const categories: ProductCategory[] = [
    { id: 'popular', name: 'Paling Populer' },
    { id: '360', name: 'Kamera 360' },
    { id: 'wide-angle', name: 'Kamera Wide-Angle' },
    { id: 'gimbal', name: 'Gimbal Genggam' },
    { id: 'vr', name: 'Rapat Virtual' },
    { id: 'pro', name: 'Professional' },
  ];
  
  // Products data
  const products: Product[] = [
    {
      id: 'x5',
      name: 'Insta360 X5',
      tagline: 'The 8K game changer.',
      image: '/images/x5.png',
      categories: ['popular', '360']
    },
    {
      id: 'x3',
      name: 'Insta360 X3',
      tagline: 'The 360° powerhouse.',
      image: '/images/x3.png',
      categories: ['popular', '360']
    },
    {
      id: 'ace-pro-2',
      name: 'Insta360 Ace Pro 2',
      tagline: '8K AI-Powered Action Cam',
      image: '/images/ace-2-pro.png',
      categories: ['popular', 'wide-angle']
    },
    {
      id: 'go-3s',
      name: 'Insta360 GO 3S',
      tagline: 'Your tiny mighty 4K cam.',
      image: '/images/go-s.png',
      categories: ['popular', 'wide-angle']
    },
    {
      id: 'flow-2-pro',
      name: 'Insta360 Flow 2 Pro',
      tagline: 'Your pocket AI filmmaker.',
      image: '/images/flow-2-pro.png',
      categories: ['popular', 'gimbal']
    },
    {
      id: 'link-2',
      name: 'Insta360 Link 2\nInsta360 Link 2C',
      tagline: 'AI 4K webcam, pro audio.',
      image: '/images/link-2-2-c.png',
      categories: ['popular', 'vr']
    },
  ];
  
  // Filter products by active category
  const filteredProducts = products.filter(product => 
    product.categories.includes(activeCategory)
  );

  return (
    <ScrollReveal>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-8">
            Produk Inovatif untuk <br />
            Kreativitas Tanpa Batas.
          </h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Products Grid - 3 columns for desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[600px]">
            <AnimatePresence mode="wait">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id} 
                  className="bg-gray-50 rounded-lg p-6 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  layout
                >
                  <div className="text-center mb-1">
                    <h3 className="text-xl font-semibold whitespace-pre-line">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.tagline}</p>
                  </div>
                  
                  <div className="relative h-56 my-6 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Link 
                      href={`/products/${product.id}`} 
                      className="text-gray-500 text-sm uppercase hover:underline"
                    >
                      SELENGKAPNYA
                    </Link>
                    
                    <Link 
                      href={`/products/${product.id}/buy`}
                      className="bg-black text-white px-4 py-1.5 text-sm rounded-full hover:bg-gray-800 transition-colors duration-300"
                    >
                      BELI SEKARANG
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
} 