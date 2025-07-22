import React, { useRef, useEffect, useState } from 'react';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

export type Accessory = {
  imageUrl: string;
  hoverImageUrl?: string;
  imageAlt?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type AccessoriesSectionProps = {
  title?: string;
  titleClassName?: string;
  background?: string;
  sectionClassName?: string;
  cardBackground?: string;
  cardClassName?: string;
  cardTextClassName?: string;
  accessories: Accessory[];
};

const AUTO_SCROLL_INTERVAL = 4000;

const AccessoriesSection: React.FC<AccessoriesSectionProps> = ({
  title = 'More Accessories',
  titleClassName = 'text-5xl font-bold italic text-white mb-12 text-center',
  background = 'bg-black',
  sectionClassName = '',
  cardBackground = 'bg-[#181f2b]',
  cardClassName = '',
  cardTextClassName = 'text-white',
  accessories,
}) => {
  const bgClass = background.startsWith('bg-') ? background : '';
  const bgStyle = !background.startsWith('bg-') ? { background } : undefined;
  const cardBgClass = cardBackground.startsWith('bg-') ? cardBackground : '';
  const cardBgStyle = !cardBackground.startsWith('bg-') ? { background: cardBackground } : undefined;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Carousel auto-scroll
  useEffect(() => {
    if (!scrollRef.current || isHovered) return;
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const amount = clientWidth * 0.7;
      if (scrollLeft + amount >= maxScroll - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      }
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Simple scroll navigation
  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.offsetWidth * 0.7;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <section className={`w-full py-16 px-4 ${bgClass} ${sectionClassName}`} style={bgStyle} id="accessories">
      <div className="max-w-7xl mx-auto">
        {title && <h2 className={titleClassName}>{title}</h2>}
        
        <div className="flex gap-4 mb-10">
          <button
            className="w-10 h-10 flex items-center justify-center border-2 border-white/80 bg-black/70 hover:bg-black/90 rounded-full text-2xl text-white transition cursor-pointer"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            type="button"
          >
            <LeftOutlined />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center border-2 border-white/80 bg-black/70 hover:bg-black/90 rounded-full text-2xl text-white transition cursor-pointer"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            type="button"
          >
            <RightOutlined />
          </button>
        </div>
        <div className="relative">
          {/* Navigation icons (Ant Design) */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide py-4"
            style={{ scrollSnapType: 'x mandatory' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            {accessories.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center rounded-2xl min-w-[260px] max-w-xs w-full shadow-lg overflow-hidden ${cardBgClass} ${cardClassName} group`}
                style={cardBgStyle}
              >
                <div className="relative w-full mb-4 aspect-square overflow-hidden flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    className={`w-full h-full object-contain absolute left-0 top-0 transition-transform duration-500 ${item.hoverImageUrl ? 'group-hover:-translate-y-full' : ''}`}
                    style={{ zIndex: 1 }}
                  />
                  {item.hoverImageUrl && (
                    <img
                      src={item.hoverImageUrl}
                      alt={item.imageAlt || item.title + ' hover'}
                      className="w-full h-full object-cover absolute left-0 top-0 transition-transform duration-500 group-hover:translate-y-0 translate-y-full"
                      style={{ zIndex: 2 }}
                    />
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className={`text-lg font-semibold mb-2 text-white ${cardTextClassName}`}>{item.title}</h3>
                  <p className={`text-xs mb-6 text-gray-500 ${cardTextClassName}`}>{item.description}</p>
                  <a
                    href={item.ctaHref}
                    className="bg-gradient-to-r from-blue-400 to-blue-200 text-black font-bold px-6 py-2 rounded-full shadow hover:from-blue-500 hover:to-blue-300 transition duration-500 italic"
                  >
                    {item.ctaLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessoriesSection; 