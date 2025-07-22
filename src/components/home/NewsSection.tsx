import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "antd";
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type NewsArticle = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  date: string;
  link: string;
}

type NewsSectionProps = {
  newsData: {
    title: string;
    articles: NewsArticle[];
  };
}

export default function NewsSection({ newsData }: NewsSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const intervalTime = 5000; // 5 seconds for each slide
  
  // Articles for the carousel
  const articles = [
    {
      id: 1,
      title: "Tantangan Petualangan Outdoor",
      subtitle: "Tangkap momen di alam bebas, raih hadiah uang",
      image: "https://picsum.photos/800/600?random=10",
      link: "/blog/outdoor-adventure"
    },
    {
      id: 2,
      title: "Koleksi Terbaik Insta360 2024",
      subtitle: "Bersantai dan simak rekap tahunan 2024 dari kami",
      image: "https://picsum.photos/800/600?random=11",
      link: "/blog/best-of-2024"
    },
    {
      id: 3,
      title: "Flow 2 Pro: Ulasan Lengkap",
      subtitle: "Solusi terbaik untuk pembuat konten mobile",
      image: "https://picsum.photos/800/600?random=12",
      link: "/blog/flow-2-pro-review"
    },
    {
      id: 4,
      title: "Insta360 Enterprise Solutions",
      subtitle: "Kamera profesional untuk kebutuhan bisnis",
      image: "https://picsum.photos/800/600?random=13",
      link: "/blog/enterprise-solutions"
    },
    {
      id: 5,
      title: "Tips Membuat Konten 360°",
      subtitle: "Panduan lengkap untuk pemula hingga profesional",
      image: "https://picsum.photos/800/600?random=14",
      link: "/blog/360-content-tips"
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
        const nextSlide = (activeSlide + 1) % articles.length;
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
    <ScrollReveal>
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="mb-6 text-3xl font-bold">
            The latest news and inspiring stories.
          </h2>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden rounded-lg">
              <Carousel
                ref={carouselRef}
                afterChange={handleSlideChange}
                dots={false}
                autoplay={false}
                effect="scrollx"
                slidesToShow={1.9}
                slidesToScroll={1.2}
                centerMode={false}
                infinite={true}
                className="news-carousel"
                style={{height: '280px', marginBottom: '20px'}}
              >
                {articles.map((article, index) => (
                  <div key={article.id}>
                    <div className="relative h-[260px] md:h-[260px] bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg overflow-hidden">
                      <div className="absolute top-3 left-3">
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <div className="text-blue-600 font-bold italic text-lg">
                              Challenge
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Link href={article.link}>
                        <div className="h-full relative px-6 py-4 flex flex-col justify-end">
                          {index === 0 && (
                            <h3 className="text-3xl font-bold mb-1 text-black italic">
                              <span className="text-blue-600">OUTDOOR</span> ADVENTURE
                            </h3>
                          )}
                          
                          {index === 1 && (
                            <h3 className="text-4xl font-bold mb-1 text-white">
                              <span className="text-white">BEST</span>
                              <br />
                              <span className="text-white">OF</span>
                              <br />
                              <span className="text-white">2024</span>
                            </h3>
                          )}
                          
                          {index > 1 && (
                            <h3 className="text-2xl font-bold mb-1 text-black">
                              {article.title}
                            </h3>
                          )}
                          
                          <div className="flex mt-1">
                            <div className="w-full md:w-1/2">
                              <h4 className="text-lg md:text-xl font-bold mb-1 text-white">
                                {index === 0 ? "Tantangan Petualangan Outdoor" : index === 1 ? "Koleksi Terbaik Insta360 2024" : ""}
                              </h4>
                              <p className="text-xs md:text-sm text-gray-100">
                                {article.subtitle}
                              </p>
                            </div>
                            
                            {index === 0 && (
                              <div className="absolute right-6 bottom-6 flex space-x-1">
                                <div className="w-16 h-16 rounded-md overflow-hidden">
                                  <Image 
                                    src="https://picsum.photos/100/100?random=1" 
                                    alt="Activity" 
                                    width={64} 
                                    height={64}
                                    className="object-cover" 
                                  />
                                </div>
                                <div className="w-16 h-16 rounded-md overflow-hidden">
                                  <Image 
                                    src="https://picsum.photos/100/100?random=2" 
                                    alt="Activity" 
                                    width={64} 
                                    height={64}
                                    className="object-cover" 
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                      
                      {index === 0 && (
                        <Image
                          src="https://picsum.photos/800/600?random=10"
                          alt={article.title}
                          fill
                          className="object-cover mix-blend-soft-light opacity-90 z-0"
                        />
                      )}
                      
                      {index === 1 && (
                        <Image
                          src="https://picsum.photos/800/600?random=11"
                          alt={article.title}
                          fill
                          className="object-cover mix-blend-soft-light opacity-90 z-0"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            
            {/* Custom indicator dots */}
            <div className="flex justify-center gap-3 absolute bottom-4 left-0 right-0 z-10">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselRef.current?.goTo(index)}
                  className={`relative h-1 rounded-full transition-all duration-300 ${
                    index === activeSlide ? 'bg-gray-500/60 w-16' : 'bg-gray-500/40 w-4'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === activeSlide && (
                    <span 
                      className="absolute top-0 left-0 h-full bg-gray-800 rounded-full" 
                      style={{
                        width: '100%',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        animation: `progressAnimation ${intervalTime}ms linear forwards`,
                        boxShadow: '0 0 3px rgba(255, 255, 255, 0.7)',
                        borderRadius: '20px'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes progressAnimation {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        :global(.news-carousel .slick-list) {
          overflow: visible !important;
          padding: 0 !important;
        }
        :global(.news-carousel .slick-track) {
          display: flex !important;
          gap: 8px !important;
        }
        :global(.news-carousel .slick-slide) {
          opacity: 0.7;
          transition: opacity 0.3s ease;
          width: 60% !important;
          padding-right: 12px;
        }
        :global(.news-carousel .slick-slide.slick-active) {
          opacity: 1;
        }
      `}</style>
    </ScrollReveal>
  );
} 