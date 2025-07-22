import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from '@/components/ui/ScrollReveal';

type EnterpriseSectionProps = {
  businessData: {
    title: string;
    subtitle: string;
    image: string;
    ctaText: string;
    ctaLink: string;
  };
}

export default function EnterpriseSection({ businessData }: EnterpriseSectionProps) {
  return (
    <ScrollReveal>
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
              <h4 className="text-gray-400 mb-2 text-2xl font-thin">Insta360 Enterprise</h4>
              <h3 className="font-bold text-2xl mb-6 text-black">Kamera Proffesional Untuk Kebutuhan Bisnis.</h3>
              <Link 
                href="/enterprise" 
                className="inline-block px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded-full"
              >
                Selengkapnya
              </Link>
            </div>
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Image
                    src="https://picsum.photos/800/500?random=20"
                    alt="Enterprise Solution"
                    width={500}
                    height={300}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <Image
                    src="https://picsum.photos/600/400?random=21"
                    alt="Enterprise Solution 2"
                    width={240}
                    height={140}
                    className="object-cover w-full h-full rounded"
                  />
                  <Image
                    src="https://picsum.photos/600/400?random=22"
                    alt="Enterprise Solution 3"
                    width={240}
                    height={140}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
} 