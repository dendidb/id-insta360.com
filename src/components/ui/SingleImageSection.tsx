import Image from 'next/image';
import React from 'react';

export type SingleImageSectionProps = {
  imageUrl: string;
  imageAlt?: string;
  imageBadge?: string;
  imageRounded?: boolean;
  imageShadow?: boolean;
  background?: string;
  height?: string; // e.g. '400px', '60vh'
};

const SingleImageSection: React.FC<SingleImageSectionProps> = ({
  imageUrl,
  imageAlt = '',
  imageBadge,
  imageRounded = true,
  imageShadow = false,
  background = 'bg-black',
  height = 'auto',
}) => {
  const bgClass = background.startsWith('bg-') ? background : '';
  const bgStyle = !background.startsWith('bg-') ? { background } : undefined;

  return (
    <section
      className={`w-full flex justify-center items-center py-12 px-4 ${bgClass}`}
      style={{ ...bgStyle, minHeight: height }}
    >
      <div className="relative flex justify-center items-center">
        <Image
          src={imageUrl}
          alt={imageAlt}
          className={`max-w-full ${imageRounded ? 'rounded-2xl' : ''} ${imageShadow ? 'shadow-2xl' : ''}`}
          style={{ height: height !== 'auto' ? height : undefined }}
        />
        {imageBadge && (
          <span className="absolute top-4 left-4 bg-white text-xs font-semibold px-4 py-1 rounded-full shadow">
            {imageBadge}
          </span>
        )}
      </div>
    </section>
  );
};

export default SingleImageSection; 