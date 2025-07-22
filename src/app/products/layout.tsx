'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import { ColorProvider } from '@/contexts/ColorContext';
import NewFooter from '@/components/layout/NewFooter';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const slug = pathname.split('/')[2]; // Get the product slug from the URL
  
  // Define default product information
  let productTitle = '';
  let productSections = [
    { id: 'features', label: 'Features' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'compare', label: 'Compare' },
    { id: 'specs', label: 'Specs' }
  ];
  const productCta = { label: 'Beli Sekarang', url: `/store/product/${slug}` };
  
  // Set product title based on slug if available
  if (slug && !['category', 'comparison', 'index.tsx'].includes(slug)) {
    productTitle = `Insta360 ${slug.toUpperCase().replace(/-/g, ' ')}`;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Override the Header from the root layout */}
      <style jsx global>{`
        /* Hide the root layout's header */
        #root-header {
          display: none;
        }
        
        /* Fix margin for product pages */
        body > div > main {
          margin-top: 0 !important;
        }
      `}</style>
      
      {/* Product-specific header with secondary navigation */}
      <ColorProvider>
        <Header 
          id="product-header"
          productTitle={productTitle}
          productSections={productSections}
          productCtaButton={productCta}
        />
      </ColorProvider>
      <div className="flex flex-col min-h-screen bg-black">
        {children}
      </div>
      <NewFooter />
    </div>
  );
} 