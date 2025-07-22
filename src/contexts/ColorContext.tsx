'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getDominantColor } from '@/utils/colorUtils';

type ColorContextType = {
  isDarkImage: boolean;
  setIsDarkImage: (isDark: boolean) => void;
  analyzeCurrentImage: (imageUrl: string) => Promise<void>;
  currentImageUrl: string | null;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkImage, setIsDarkImage] = useState(true); // Default to dark for white text
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const isAnalyzing = useRef(false);

  const analyzeCurrentImage = async (imageUrl: string) => {
    // Skip if already analyzing or if it's the same image
    if (isAnalyzing.current || imageUrl === currentImageUrl) return;
    if (!imageUrl || imageUrl.endsWith('.mp4')) {
      // Skip videos or empty URLs
      return;
    }

    try {
      isAnalyzing.current = true;
      setCurrentImageUrl(imageUrl);
      
      const result = await getDominantColor(imageUrl);
      setIsDarkImage(!result.isLight); // If image is light, we need dark text (isDarkImage = false)
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Default to dark image (white text) on error
      setIsDarkImage(true);
    } finally {
      isAnalyzing.current = false;
    }
  };

  return (
    <ColorContext.Provider value={{ isDarkImage, setIsDarkImage, analyzeCurrentImage, currentImageUrl }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
};