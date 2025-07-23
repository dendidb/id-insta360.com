import React from 'react';
import Image from 'next/image';
import { Typography } from "antd";
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const { Title } = Typography;

type CategoryData = {
  id: string;
  name: string;
  image: string;
  products: number[];
}

type ShopByInterestProps = {
  categories: CategoryData[];
}

export default function ShopByInterestSection({ categories }: ShopByInterestProps) {
  const {} = categories;
  return (
    <ScrollReveal>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Title level={2} className="mb-8 text-3xl font-extrabold">Temukan Produk Sesuai Minat</Title>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Interest Category - Travel */}
            <div className="interest-card rounded-lg overflow-hidden relative h-60 md:h-80 cursor-pointer group">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                  <Image 
                    src="/images/Travel-PC.jpg"
                    alt="Travel"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                <div className="text-white p-4">
                  <h3 className="text-lg font-bold">Travel</h3>
                </div>
              </div>
            </div>

            {/* Interest Category - Motorcycling */}
            <div className="interest-card rounded-lg overflow-hidden relative h-60 md:h-80 cursor-pointer group">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                  <Image 
                    src="/images/Motorcycle.jpg"
                    alt="Motorcycling"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                <div className="text-white p-4">
                  <h3 className="text-lg font-bold">Motorcycling</h3>
                </div>
              </div>
            </div>

            {/* Interest Category - Water Sports */}
            <div className="interest-card rounded-lg overflow-hidden relative h-60 md:h-80 cursor-pointer group">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                  <Image 
                    src="/images/WaterSports.jpg"
                    alt="Water Sports"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                <div className="text-white p-4">
                  <h3 className="text-lg font-bold">Water Sports</h3>
                </div>
              </div>
            </div>

            {/* Interest Category - Biking */}
            <div className="interest-card rounded-lg overflow-hidden relative h-60 md:h-80 cursor-pointer group">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                  <Image 
                    src="/images/Biking.jpg"
                    alt="Biking"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                <div className="text-white p-4">
                  <h3 className="text-lg font-bold">Biking</h3>
                </div>
              </div>
            </div>

            {/* Interest Category - Winter Sports */}
            <div className="interest-card rounded-lg overflow-hidden relative h-60 md:h-80 cursor-pointer group">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                  <Image 
                    src="/images/WinterSports.jpg"
                    alt="Winter Sports"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                <div className="text-white p-4">
                  <h3 className="text-lg font-bold">Winter Sports</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
} 