'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BasicHero from '../../../components/ui/BasicHero';
import FeatureVideoSection from '../../../components/ui/FeatureVideoSection';
import BigVideoTextSection from '../../../components/ui/BigVideoTextSection';
import MediaTextSection from '../../../components/ui/MediaTextSection';
import SingleImageSection from '../../../components/ui/SingleImageSection';
import SpecsSection from '../../../components/ui/SpecsSection';
import CenteredImageCtaSection from '../../../components/ui/CenteredImageCtaSection';
import AccessoriesSection from '@/components/ui/AccessoriesSection';

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  BasicHero,
  FeatureVideoSection,
  BigVideoTextSection,
  MediaTextSection,
  SingleImageSection,
  SpecsSection,
  CenteredImageCtaSection,
  AccessoriesSection
};

const mockApiFetch = async (slug: string) => {
  // Simulate API response
  return {
    title: 'Insta360 X4',
    id: 1,
    components: [
      {
        type: 'BasicHero',
        options: {
          backgroundImage: '/images/products/insta360-x4-hero.jpg',
          title: 'Insta360 X4',
          subtitle: 'All day. All night. All angles.',
          buyNowUrl: '/store',
          watchIntroUrl: 'https://youtu.be/kmeK1GNKfaU',
          videoButtonUrl: '/images/products/insta360-x4-video-button.mp4',
          ctaPosition: 'left',
        },
      },
      {
        type: 'FeatureVideoSection',
        options: {
          eyebrow: '8K 360° CAPTURE',
          title: 'BEST EVER\nIMAGE QUALITY',
          description: '8K is here! Powered by a new 5nm AI chip, immerse yourself in a world of unbelievable clarity, and relive moments like it was the first time. Every frame of action and every streak of color in unprecedented detail.',
          videoUrl: '/images/products/insta360-x4-feature-video-1.mp4',
          videoAlt: '8K 360 capture sample',
          videoRounded: true,
          videoShadow: false,
          align: 'center',
          scrollReveal: true,
          animationType: 'fade-up',
        },
      },
      {
        type: 'FeatureVideoSection',
        options: {
          eyebrow: '5.7K60FPS 360° VIDEO',
          title: 'Higher frame rates,\nhigher quality',
          description: 'Experience smoother, sharper images for every frame with an improved 60fps! Ideal for action sports or scenes with lots of motion. For cinematic slow motion drop it down to 4K100fps!',
          videoUrl: '/images/products/insta360-x4-feature-video-2.mp4',
          videoAlt: '5.7K60FPS 360° VIDEO',
          videoRounded: true,
          videoShadow: false,
          align: 'center',
          scrollReveal: true,
          animationType: 'fade-up',
        },
      },
      {
        type: 'FeatureVideoSection',
        options: {
          eyebrow: 'REFRAMING',
          title: 'Shoot first,\nframe later',
          description: "The magic of 360º capture is choosing the best angles after recording. You'll never miss a moment again! With AI-powered reframing tools in the Insta360 app, just hit record and find the perfect shot after.",
          videoUrl: '/images/products/insta360-x4-feature-video-3.mp4',
          videoAlt: 'REFRAMING',
          videoRounded: true,
          videoShadow: false,
          align: 'center',
          scrollReveal: true,
          animationType: 'fade-up',
        },
      },
      {
        type: 'BigVideoTextSection',
        options: {
          videoUrl: '/images/products/insta360-x4-single-video.mp4',
          text: 'SINGLE LENS',
          textPosition: 'center',
          textClassName: 'text-5xl md:text-6xl font-bold italic text-white',
          background: 'bg-black',
        },
      },
      {
        type: 'MediaTextSection',
        options: {
          mediaType: 'video',
          mediaUrl: '/images/products/insta360-x4-media-text-1.mp4',
          mediaAlt: 'Active HDR',
          mediaRounded: true,
          mediaShadow: false,
          textEyebrow: 'INVISIBLE SELFIE STICK',
          textTitle: 'IMPOSSIBLE THIRD-PERSON VIEWS',
          textDescription: 'The Invisible Selfie Stick automatically disappears from your footage! Capture incredible third-person shots and drone-like angles that are impossible with other action cameras. No drone? No problem!',
          textAlign: 'left',
          layout: 'media-left',
          background: 'bg-black',
        },
      },
      {
        type: 'MediaTextSection',
        options: {
          mediaType: 'video',
          mediaUrl: '/images/products/insta360-x4-media-text-2.mp4',
          mediaAlt: 'Active HDR',
          mediaRounded: true,
          mediaShadow: false,
          textEyebrow: '360° ACTIVE HDR',
          textTitle: 'Shoot it\nhow you see it',
          textDescription: 'An innovative HDR video mode that brings out the details and maintains superb stabilization for action sports. Active HDR boosts colors in the highlights and shadows that other action cameras miss.',
          textAlign: 'left',
          layout: 'media-right',
          background: 'bg-black',
        },
      },
      {
        type: 'SingleImageSection',
        options: {
          imageUrl: '/images/products/insta360-x4-single-image.png',
          imageAlt: 'Sample Single Image',
          imageRounded: true,
          imageShadow: false,
          background: 'bg-black',
          height: '600px',
        },
      },
      {
        type: "SpecsSection",
        options: {
          title: "Specs",
          background: "bg-black",
          sectionClassName: "mt-0",
          data: [
            ["SENSOR SIZE", "1/2\""],
            ["APERTURE", "F1.9"],
            ["35MM EQUIVALENT FOCAL LENGTH", "6.7mm"],
            ["VIDEO RESOLUTION", "360° Mode:\n8K: 7680x3840@30/25/24fps\n5.7K+: 5760x2880@30/25/24fps\n5.7K: 5760x2880@60/50/30/25/24fps\n4K: 3840x1920@100/60/50/30/25/24fps\n\nSingle-Lens Mode:\n4K: 3840x2160@60/50/30/25/24fps\n2.7K: 2720x1536@60/50/30/25/24fps\n1080p: 1920x1080@60/50/30/25/24fps\n\nMe Mode:\n4K: 3840x2160@30/25/24fps\n2.7K: 2720x1536@120/100/60/50fps\n1080p: 1920x1080@120/100/60/50fps"],
            ["PHOTO RESOLUTION", "Approx. 72MP (11904x5952)\nApprox. 18MP (5888x2944)"],
            ["VIDEO FORMAT", "Single-Lens Mode: MP4\n360: INSV"],
            ["PHOTO FORMAT", "INSP (can export via mobile app or Studio desktop software)\nDNG"],
            ["VIDEO MODES", "Video, Active HDR, Timelapse, TimeShift, Bullet Time, Loop Recording, Pre-recording"],
            ["PHOTO MODES", "Photo, HDR Photo, Interval, Starlapse, Burst"],
            ["COLOR PROFILES", "Standard, Vivid, Flat"],
            ["VIDEO CODING", "H.264, H.265"],
            ["MAX. VIDEO BITRATE", "200Mbps"],
            ["EXPOSURE VALUE", "±4EV"],
            ["ISO RANGE", "100-6400"],
            ["SHUTTER SPEED", "Photo: 1/8000 - 120s\nVideo: 1/8000 - to the limit of frames per second"],
            ["WHITE BALANCE", "2000K-10000K"],
            ["AUDIO MODES", "· Auto Wind Reduction\n· Active Wind Reduction\n· Stereo\n· Direction Focus"],
            ["AUDIO FORMAT", "48 kHz, 16bits, AAC"],
            ["WEIGHT", "203g"],
            ["DIMENSIONS (W x H x D)", "46×123.6×37.6mm"],
            ["MICROSD CARD", "UHS-I V30 speed class, exFAT format SD cards with a max storage of 1TB are recommended."],
            ["BATTERY CAPACITY", "2290mAh"],
            ["CHARGING TIME", "Charge to 80% in 38 minutes (9V 2A)\nCharge to 100% in 55 minutes (9V 2A)"],
            ["RUN TIME", "135 mins\nTested in a lab environment in Video Mode at 5.7K30fps. Run time at 8K30fps is 75 minutes."],
            ["OPERATING TEMPERATURE", "-4°F to 104°F (-20°C to 40°C)"],
            ["WATERPROOF", "10m"],
            ["BLUETOOTH", "BLE 5.2"],
            ["WI-FI", "5GHz 802.11a/n/ac"],
            ["USB", "Type-C USB 3.0"],
            ["GYROSCOPE", "6-axis gyroscope"],
            ["COLOR", "Black"],
            ["MOBILE PHONES/TABLETS", "iOS Devices:\nCompatible with iOS mobile devices with chips A12 or above and iOS version 13.0 or above, including iPhoneXS, iPhoneXSMax, iPhone11, iPhone 11 Pro, iPhone 11 Pro Max, iPhone12, iPhone 12 Pro, iPhone 12 Pro Max, iPhone12 mini, iPhone 13, iPhone 13 Pro, iPhone 13 Pro Max, iPhone 13 mini, iPhone 14, iPhone 14 Plus, iPhone 14 Pro, iPhone 14 Pro Max, iPhone 15, iPhone 15 Plus, iPhone15 Pro, iPhone 15 Pro Max, iPad Air(2020), iPad Pro and newer iPad models.\n\nAndroid Devices:\nCompatible with Android mobile devices that meet the following capabilities, including:\n• Android devices with Kirin 990 and above chips, including Huawei Mate 30, P40 or newer models.\n• Android devices with Snapdragon 855 and above chips, including Samsung Galaxy S10, Xiaomi Mi 9 or newer models.\n• Android devices with Exynos 2200 and above chips, including Samsung Galaxy S22, S22 Ultra and newer models.\n(system should be Android 10.0 or above, or HarmonyOS 2.0.0 or above)\n\nNote:\n1. Devices that do not meet the above requirements may still be able to use the app to control the camera, however, performance of some processor-intensive and AI-powered features may be sub-optimal.\n2. After testing, phones equipped with Qualcomm SDM765 5G chips have poor hardware decoding capabilities and are not supported for use, such as OPPO Reno 3 5G.\n3. App installation requires a mobile phone with a 64-bit system. A 32-bit system does not support app installation."],
            ["BLUETOOTH DEVICES", "Motorcycle Bluetooth Headsets:\nSENA: 50S, ST1, 10S\nCardo: PACKTALK EDGE\nAiride: G7+\nASMAX: F1\nLexinmoto: G4\nVimoto: V9S, V9X\n\nOther Bluetooth Headsets:\nApple AirPods 2nd generation, Apple AirPods 3rd generation, Apple AirPods Pro 2nd generation\nSamsung Galaxy Buds2"]
          ]
        }
      },
      {
        type: 'CenteredImageCtaSection',
        options: {
          imageUrl: '/images/products/insta360-x4-cta.png',
          imageAlt: 'Insta360 X4',
          imageRounded: true,
          imageShadow: true,
          title: 'Insta360 X4',
          subtitle: 'Magic in action.',
          ctaLabel: 'BUY NOW',
          ctaHref: '/store',
          textPosition: 'left',
          buttonPosition: 'below-text',
          background: 'bg-black',
          sectionClassName: '',
          textClassName: 'text-white',
          titleClassName: 'text-4xl md:text-5xl font-bold',
          subtitleClassName: 'text-2xl md:text-3xl font-normal text-gray-300',
          buttonClassName: 'bg-gradient-to-r from-blue-400 to-blue-200 text-black font-bold px-8 py-3 rounded-full shadow hover:from-blue-500 hover:to-blue-300 transition',
          overlay: true,
          overlayClassName: 'flex flex-col items-start justify-center text-center inset-0 pl-12',
        },
      },
      {
        type: "AccessoriesSection",
        options: {
          title: "MORE ACCESSORIES",
          titleClassName: "text-5xl font-bold italic text-white mb-12 text-center bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text",
          background: "bg-black",
          sectionClassName: "",
          cardBackground: "bg-[#16171b]",
          cardClassName: "",
          cardTextClassName: "",
          accessories: [
            {
              imageUrl: "/images/products/insta360-x4-lens-cap.png",
              title: "Lens Cap",
              description: "Keep your X4 lens safe and snug.",
              ctaLabel: "BUY NOW",
              ctaHref: "/store"
            },
            {
              imageUrl: "/images/products/insta360-x4-dive-cap.png",
              hoverImageUrl: "/images/products/insta360-x4-dive-cap-hover.png",
              title: "Invisible Dive Cap",
              description: "The secret to immersive underwater shots.",
              ctaLabel: "BUY NOW",
              ctaHref: "/store"
            },
            {
              imageUrl: "/images/products/insta360-x4-premium-lens-guard.jpg",
              hoverImageUrl: "/images/products/insta360-x4-premium-lens-guard-hover.jpg",
              title: "Premium Lens Guard",
              description: "The best lens protector in town.",
              ctaLabel: "BUY NOW",
              ctaHref: "/store"
            },
            {
              imageUrl: "/images/products/insta360-x4-gps-remote.jpg",
              hoverImageUrl: "/images/products/insta360-x4-gps-remote-hover.jpg",
              title: "GPS Preview Remote",
              description: "Full control with unique stats for X4.",
              ctaLabel: "BUY NOW",
              ctaHref: "/store"
            },
            {
              imageUrl: "/images/products/insta360-x4-bike-handler.jpg",
              hoverImageUrl: "/images/products/insta360-x4-bike-handler-hover.jpg",
              title: "Third-Person Bike Handlebar Mount",
              description: "The ultimate tool for third-person cycling shots.",
              ctaLabel: "BUY NOW",
              ctaHref: "/store"
            }
          ]
        }
      }
    ],
  };
};

const ProductPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      document.title = `Insta360 ${slug.toString().toUpperCase().replace(/-/g, ' ')}`;
      // Fetch data from API (replace mockApiFetch with real fetch in production)
      mockApiFetch(slug as string).then(setPageData);
    }
  }, [slug]);

  if (!pageData) return (
    <div className="flex flex-col items-center justify-center min-h-[100vh]">
      <span className="block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></span>
      <span className="text-gray-400 text-lg">Loading...</span>
    </div>
  );

  return (
    <>
      {pageData.components.map((comp: any, idx: number) => {
        const Comp = COMPONENT_MAP[comp.type];
        console.log(comp.type, Comp);
        if (!Comp) return null;
        return <Comp key={idx} {...comp.options} />;
      })}
    </>
  );
};

export default ProductPage;