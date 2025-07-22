"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { type BoldContentItem, boldContentItems } from "@/data/bold-content-items";

const BoldContentItemCard: React.FC<{ item: BoldContentItem }> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsHovered(true);
    
    // Debounce the play to avoid rapid play/pause calls
    timeoutRef.current = setTimeout(() => {
      if (videoRef.current && !isPlaying) {
        // Try-catch to handle any play() errors
        try {
          const playPromise = videoRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch(error => {
                console.log("Video play error:", error);
              });
          }
        } catch (error) {
          console.log("Video play error:", error);
        }
      }
    }, 150); // Short delay to debounce
  };

  const handleMouseLeave = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsHovered(false);
    
    // Debounce the pause to avoid rapid play/pause calls
    timeoutRef.current = setTimeout(() => {
      if (videoRef.current && isPlaying) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }, 150); // Short delay to debounce
  };

  return (
    <div 
      className="relative flex-shrink-0 overflow-hidden bg-transparent cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full relative aspect-square w-[350px] flex-shrink-0 overflow-hidden bg-black cursor-pointer group">
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className={`object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <video 
          ref={videoRef}
          playsInline
          muted
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          src={item.videoSrc}
          preload="none"
        />
        {/* <div className={`absolute top-4 left-4 w-24 h-auto z-10 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <Image 
            src="/insta360-logo-white.svg" 
            alt="Insta360" 
            width={96}
            height={24}
            className="object-contain"
          />
        </div> */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>
      
      <div className="left-4 p-2 text-white">
        <h3 className="font-medium text-lg">{item.title}</h3>
      </div>
    </div>
  );
};

const BoldContentSlider: React.FC = () => {
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
        <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold">Best of the Bold</h2>
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
          {boldContentItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="snap-start"
            >
              <BoldContentItemCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoldContentSlider; 