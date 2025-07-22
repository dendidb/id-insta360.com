import React from 'react';

export type BigVideoTextSectionProps = {
  videoUrl: string;
  videoAlt?: string;
  text: string;
  textPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  textClassName?: string;
  overlayClassName?: string;
  background?: string;
};

const positionClassMap: Record<string, string> = {
  center: 'items-center justify-center',
  top: 'items-center justify-start',
  bottom: 'items-center justify-end',
  left: 'items-start justify-center',
  right: 'items-end justify-center',
  'top-left': 'items-start justify-start',
  'top-right': 'items-end justify-start',
  'bottom-left': 'items-start justify-end',
  'bottom-right': 'items-end justify-end',
};

const BigVideoTextSection: React.FC<BigVideoTextSectionProps> = ({
  videoUrl,
  videoAlt = '',
  text,
  textPosition = 'center',
  textClassName = 'text-5xl md:text-6xl font-bold italic text-white',
  overlayClassName = '',
  background = 'bg-black',
}) => {
  const bgClass = background.startsWith('bg-') ? background : '';
  const bgStyle = !background.startsWith('bg-') ? { background } : undefined;

  return (
    <section
      className={`relative w-screen h-screen overflow-hidden big-video-text-section ${bgClass}`}
      style={{ ...bgStyle, minHeight: '100vh', width: '100%' }}
    >
      {/* Video background */}
      <video
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={videoAlt}
      />
      {/* Overlay for text */}
      <div className={`absolute inset-0 flex ${positionClassMap[textPosition]} ${overlayClassName}`}> 
        <span className={textClassName}>{text}</span>
      </div>
    </section>
  );
};

export default BigVideoTextSection; 