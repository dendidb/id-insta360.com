import React from 'react';
import Image from 'next/image';

export type BasicHeroProps = {
  backgroundImage: string;
  ctaPosition: string;
  videoButtonUrl: string;
  title: string;
  subtitle: string;
  buyNowUrl: string;
  watchIntroUrl: string;
  background: string;
};

const BasicHero: React.FC<BasicHeroProps> = ({
  backgroundImage,
  ctaPosition,
  title,
  subtitle,
  buyNowUrl,
  watchIntroUrl,
  videoButtonUrl,
  background = 'bg-black',
}) => {
  
  const bgClass = background.startsWith('bg-') ? background : '';
  const bgStyle = !background.startsWith('bg-') ? { background } : undefined;

  return (
    <section className={`relative w-full h-screen flex overflow-hidden ${bgClass}`} style={bgStyle}>
      {/* Background */}
      <Image
        src={backgroundImage}
        alt="Hero Background"
        fill
        className="object-cover z-0"
        priority
      />
      {/* Content */}
      <div className={`w-7xl mx-auto ${ctaPosition === 'left' ? 'pl-12' : (ctaPosition === 'center' ? 'justify-center' : 'justify-end pr-12')}`}>
        <div className="relative z-20 flex flex-col justify-center h-full pl-12 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">{title}</h1>
          <p className="text-2xl text-gray-200 mb-10 drop-shadow-lg">{subtitle}</p>
          <div className="flex gap-4">
            <a href={buyNowUrl} className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-200 transition">BUY NOW</a>
            <a href={watchIntroUrl} className="relative flex items-center font-semibold px-8 py-3 rounded-full overflow-hidden border border-white/40 transition group" style={{background: 'transparent'}}>
              {/* Video background for button */}
              <video
                className="absolute inset-0 w-full h-full object-cover z-0 group-hover:opacity-80 opacity-60 transition-opacity duration-300"
                src={videoButtonUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              <span className="relative z-10 text-white flex items-center">
                WATCH INTRO <span className="ml-2">▶</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicHero; 