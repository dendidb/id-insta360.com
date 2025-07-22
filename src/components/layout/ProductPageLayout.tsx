'use client';

import React, { ReactNode } from 'react';
import Header from './Header';

interface ProductPageLayoutProps {
  children: ReactNode;
  productTitle: string;
  sections?: {
    id: string;
    label: string;
  }[];
  ctaButton?: {
    label: string;
    url: string;
  };
}

const ProductPageLayout: React.FC<ProductPageLayoutProps> = ({
  children,
  productTitle,
  sections = [],
  ctaButton = { label: 'BUY NOW', url: '/store' }
}) => {
  return (
    <>
      {/* Pass product information to Header */}
      <Header 
        productTitle={productTitle}
        productSections={sections}
        productCtaButton={ctaButton}
      />
      
      <main className="relative">
        {children}
      </main>
    </>
  );
};

export default ProductPageLayout; 