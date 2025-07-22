import React from 'react';

export type CenteredImageCtaSectionProps = {
  imageUrl: string;
  imageAlt?: string;
  imageRounded?: boolean;
  imageShadow?: boolean;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  textPosition?: 'above' | 'below' | 'left' | 'right';
  buttonPosition?: 'below-text' | 'beside-text' | 'below-image';
  background?: string;
  sectionClassName?: string;
  textClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  buttonClassName?: string;
  overlay?: boolean;
  overlayClassName?: string;
};

const CenteredImageCtaSection: React.FC<CenteredImageCtaSectionProps> = ({
  imageUrl,
  imageAlt = '',
  imageRounded = true,
  imageShadow = true,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  textPosition = 'below',
  buttonPosition = 'below-text',
  background = 'bg-black',
  sectionClassName = '',
  textClassName = 'text-white',
  titleClassName = 'text-3xl md:text-4xl font-bold',
  subtitleClassName = 'text-lg md:text-xl font-normal',
  buttonClassName = 'bg-gradient-to-r from-blue-400 to-blue-200 text-black font-bold px-8 py-3 rounded-full shadow hover:from-blue-500 hover:to-blue-300 transition',
  overlay = false,
  overlayClassName = 'flex flex-col items-center justify-center text-center inset-0',
}) => {
  const bgClass = background.startsWith('bg-') ? background : '';
  const bgStyle = !background.startsWith('bg-') ? { background } : undefined;

  // Layout logic
  const isRow = textPosition === 'left' || textPosition === 'right';
  const isTextLeft = textPosition === 'left';
  const isTextRight = textPosition === 'right';
  const isTextAbove = textPosition === 'above';
  const isTextBelow = textPosition === 'below';

  // Button placement
  const renderButton = () => (
    <a
      href={ctaHref}
      className={buttonClassName}
      tabIndex={0}
    >
      {ctaLabel}
    </a>
  );

  // Text block
  const renderText = () => (
    <div className={`flex flex-col gap-4 ${textClassName} justify-center items-${isRow ? (isTextLeft ? 'end' : 'start') : 'center'} text-${isRow ? (isTextLeft ? 'right' : 'left') : 'center'}`}>
      <h2 className={titleClassName}>{title}</h2>
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
      {buttonPosition === 'beside-text' && (
        <div className="mt-2 flex justify-center md:justify-start">{renderButton()}</div>
      )}
    </div>
  );

  if (overlay) {
    return (
      <section
        className={`w-full flex justify-center items-center relative min-h-[400px] md:min-h-[600px] ${bgClass} ${sectionClassName}`}
        style={bgStyle}
      >
        <div className="relative flex items-center justify-center w-full max-w-5xl px-4">
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`w-full ${imageRounded ? 'rounded-2xl' : ''} ${imageShadow ? 'shadow-2xl' : ''}`}
          />
          <div className={`absolute ${overlayClassName}`} style={{ pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'auto' }}>
              {renderText()}
              {buttonPosition !== 'beside-text' && <div className="mt-6">{renderButton()}</div>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`w-full flex justify-center items-center min-h-[400px] md:min-h-[600px] ${bgClass} ${sectionClassName}`}
      style={bgStyle}
    >
      <div className={`flex ${isRow ? 'flex-row' : 'flex-col'} items-center justify-center w-full max-w-5xl gap-8 px-4`}>
        {/* Text above */}
        {isTextAbove && (
          <>
            {renderText()}
            {buttonPosition === 'below-text' && <div className="mt-6">{renderButton()}</div>}
          </>
        )}
        {/* Image */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={imageUrl}
            alt={imageAlt}
            className={`w-full ${imageRounded ? 'rounded-2xl' : ''} ${imageShadow ? 'shadow-2xl' : ''}`}
          />
          {buttonPosition === 'below-image' && <div className="mt-6">{renderButton()}</div>}
        </div>
        {/* Text below */}
        {isTextBelow && (
          <>
            {renderText()}
            {buttonPosition === 'below-text' && <div className="mt-6">{renderButton()}</div>}
          </>
        )}
        {/* Text left/right */}
        {isRow && (
          <>
            {isTextLeft && (
              <>
                {renderText()}
                {buttonPosition === 'below-text' && <div className="mt-6">{renderButton()}</div>}
              </>
            )}
            {/* Image is already rendered above */}
            {isTextRight && (
              <>
                {renderText()}
                {buttonPosition === 'below-text' && <div className="mt-6">{renderButton()}</div>}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CenteredImageCtaSection; 