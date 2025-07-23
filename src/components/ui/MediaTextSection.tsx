import Image from 'next/image';
import React from 'react';

export type MediaTextSectionProps = {
  mediaType: 'image' | 'video';
  mediaUrl: string;
  mediaAlt?: string;
  mediaBadge?: string;
  mediaRounded?: boolean;
  mediaShadow?: boolean;
  textEyebrow?: string;
  textTitle: string;
  textDescription: string;
  textAlign?: 'left' | 'right' | 'center';
  textTitleClassName?: string;
  textDescriptionClassName?: string;
  textEyebrowClassName?: string;
  layout?: 'media-left' | 'media-right';
  background?: string;
};

const MediaTextSection: React.FC<MediaTextSectionProps> = ({
  mediaType,
  mediaUrl,
  mediaAlt = '',
  mediaBadge,
  mediaRounded = true,
  mediaShadow = false,
  textEyebrow,
  textTitle,
  textDescription,
  textAlign = 'left',
  textTitleClassName = 'text-3xl md:text-4xl font-bold italic text-white',
  textDescriptionClassName = 'text-base md:text-sm text-gray-400',
  textEyebrowClassName = 'text-xs text-blue-300 font-semibold italic mb-2',
  layout = 'media-left',
  background = 'bg-black',
}) => {
  const bgClass = background.startsWith('bg-') ? background : '';
  const bgStyle = !background.startsWith('bg-') ? { background } : undefined;
  const isMediaLeft = layout === 'media-left';

  return (
    <section
      className={`w-full py-12 px-4 mt-12 ${bgClass}`}
      style={bgStyle}
    >
      <div className={`max-w-6xl mx-auto flex flex-col md:flex-row ${isMediaLeft ? '' : 'md:flex-row-reverse'} items-center gap-8`}>
        {/* Media */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          {mediaType === 'image' ? (
            <Image
              src={mediaUrl}
              alt={mediaAlt}
              className={`w-full max-w-lg ${mediaRounded ? 'rounded-2xl' : ''} ${mediaShadow ? 'shadow-2xl' : ''}`}
            />
          ) : (
            <video
              src={mediaUrl}
              autoPlay
              muted
              playsInline
              loop
              className={`w-full max-w-lg ${mediaRounded ? 'rounded-2xl' : ''} ${mediaShadow ? 'shadow-2xl' : ''}`}
              aria-label={mediaAlt}
            />
          )}
          {mediaBadge && (
            <span className="absolute top-4 left-4 bg-white text-xs font-semibold px-4 py-1 rounded-full shadow">
              {mediaBadge}
            </span>
          )}
        </div>
        {/* Text */}
        <div className={`w-full md:w-1/2 flex flex-col whitespace-pre-line ${textAlign === 'center' ? 'items-center text-center' : textAlign === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
          {textEyebrow && <div className={`uppercase ${textEyebrowClassName}`}>{textEyebrow}</div>}
          <h2 className={`uppercase ${textTitleClassName}`}>{textTitle}</h2>
          <p className={textDescriptionClassName}>{textDescription}</p>
        </div>
      </div>
    </section>
  );
};

export default MediaTextSection; 