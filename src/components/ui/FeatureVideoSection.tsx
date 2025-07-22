import React from 'react';
import { motion } from 'framer-motion';

export type FeatureVideoSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  videoUrl: string;
  videoAlt?: string;
  videoRounded?: boolean;
  videoShadow?: boolean;
  align?: 'left' | 'right' | 'center';
  scrollReveal?: boolean;
  animationType?: string; // e.g. 'fade-up', 'zoom-in', etc.
  background?: string;
};

const animationVariants: Record<string, any> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  },
  'zoom-out': {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  },
  'flip-up': {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0, transition: { duration: 0.7 } },
  },
  'flip-down': {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0, transition: { duration: 0.7 } },
  },
  'flip-left': {
    hidden: { opacity: 0, rotateY: -90 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.7 } },
  },
  'flip-right': {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.7 } },
  },
};

const FeatureVideoSection: React.FC<FeatureVideoSectionProps> = ({
  eyebrow,
  title,
  description,
  videoUrl,
  videoAlt = '',
  videoRounded = true,
  videoShadow = false,
  align = 'center',
  scrollReveal = false,
  animationType = 'fade-up',
  background = 'bg-black',
}) => {
  const MotionSection = scrollReveal ? motion.section : 'section';
  const variants = animationVariants[animationType] || animationVariants['fade-up'];
  const bgClass = background.startsWith('bg-') ? background : '';
  const bgStyle = !background.startsWith('bg-') ? { background } : undefined;

  return (
    <MotionSection
      className={`w-full flex flex-col items-${align} justify-center py-16 px-4 text-white ${bgClass}`}
      style={bgStyle}
      {...(scrollReveal
        ? {
            initial: 'hidden',
            whileInView: 'visible',
            viewport: { once: true, amount: 0.3 },
            variants,
          }
        : {})}
    >
      <div className="max-w-3xl mx-auto mb-8 uppercase">
        <div className="text-sm text-blue-300 font-semibold mb-2 italic">{eyebrow}</div>
        <h2 className="text-4xl md:text-4xl font-bold italic mb-4 whitespace-pre-line">{title}</h2>
        <p className="text-base md:text-sm text-gray-400 mb-8">{description}</p>
      </div>
      <div className="flex justify-center">
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className={`w-full max-w-3xl ${videoRounded ? 'rounded-2xl' : ''} ${videoShadow ? 'shadow-2xl' : ''}`}
          aria-label={videoAlt}
        />
      </div>
    </MotionSection>
  );
};

export default FeatureVideoSection; 