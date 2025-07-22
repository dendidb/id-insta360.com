import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Carousel } from "antd";

type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const intervalTime = 6000; // 6 seconds for each slide

  // Hero slides data
  const slides: HeroSlide[] = [
    {
      id: 'x5',
      title: 'Insta360 X5',
      subtitle: 'All day. All night. All angles.',
      image: '/images/x5-hero.jpg', // Replace with actual image path
      buttonText: 'BUY NOW',
      buttonLink: '/products/x5',
    },
    {
      id: 'ace-pro',
      title: 'Ace Pro 2',
      subtitle: 'The AI-powered 8K action camera.',
      image: '/images/ace-2-pro-hero.jpg', // Replace with actual image path
      buttonText: 'BUY NOW',
      buttonLink: '/products/ace-pro-2',
    },
    {
      id: 'flow',
      title: 'Flow 2 Pro',
      subtitle: 'Your pocket AI filmmaker.',
      image: '/images/flow-2-pro-hero.jpg', // Replace with actual image path
      buttonText: 'BUY NOW',
      buttonLink: '/products/flow-2-pro',
    }
  ];

  // Function to handle slide change
  const handleSlideChange = (current: number) => {
    setActiveSlide(current);
    resetTimer();
  };

  // Function to reset and start the timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      if (carouselRef.current) {
        const nextSlide = (activeSlide + 1) % slides.length;
        carouselRef.current.goTo(nextSlide);
      }
    }, intervalTime);
  };

  // Set up the timer when component mounts
  useEffect(() => {
    resetTimer();
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeSlide]);

  return (
    <section className="relative bg-black text-white">
      <Carousel
        ref={carouselRef}
        afterChange={handleSlideChange}
        dots={false}
        autoplay={false}
        effect="fade"
        className="hero-carousel"
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative h-[90vh]">
            {/* Hero Background Image */}
            <div className="absolute inset-0">
              <Image
                src={index === 0 ? "https://picsum.photos/1920/1080?random=1" : slide.image} 
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-16 lg:px-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-2">{slide.title}</h1>
                <p className="text-lg md:text-2xl mb-8">{slide.subtitle}</p>
                <div className="flex space-x-4">
                  <Link href={slide.buttonLink}>
                    <button className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-3 font-medium transition-colors duration-300">
                      {slide.buttonText}
                    </button>
                  </Link>
                  <Link href={`${slide.buttonLink}/learn-more`}>
                    <button className="border border-white text-white hover:border-gray-300 hover:text-gray-300 rounded-full px-8 py-3 font-medium transition-colors duration-300">
                      LEARN MORE
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom indicator dots */}
      <div className="flex justify-center gap-3 absolute bottom-8 left-0 right-0 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => carouselRef.current?.goTo(index)}
            className={`relative h-1.5 rounded-full transition-all duration-300 ${
              index === activeSlide ? 'bg-white/70 w-20' : 'bg-white/40 w-6'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === activeSlide && (
              <span 
                className="absolute top-0 left-0 h-full bg-white rounded-full" 
                style={{
                  width: '100%',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  animation: `heroProgressAnimation ${intervalTime}ms linear forwards`,
                  boxShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
                  borderRadius: '20px'
                }}
              />
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes heroProgressAnimation {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
} 