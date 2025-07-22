import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ProductFinderSection() {
  return (
    <ScrollReveal>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Finder Section - Left */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm group" style={{height: '400px'}}>
              <div className="relative h-full w-full">
                {/* Image with zoom effect */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <div className="relative w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110">
                    <Image
                      src="/images/pc-compare.jpg"
                      alt="Insta360 Product Comparison"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Gradient overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div> */}
                </div>
                
                {/* Content overlay */}
                <div className="relative p-8 h-full flex flex-col">
                  <div className="mb-auto">
                    <div className="mb-2">
                      <h3 className="text-gray-400 text-sm">Temukan Produk</h3>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                      Dapatkan kamera terbaik untuk Anda dengan membandingkan produk atau mengikuti kuis singkat.
                    </h2>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Link href="/compare" className="inline-block">
                        <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer">
                          BANDINGKAN
                        </button>
                      </Link>
                      <Link href="/quiz" className="inline-block">
                        <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition cursor-pointer">
                          COBA KUIS
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Accessories Section - Right */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm group" style={{height: '400px'}}>
              <div className="relative h-full w-full">
                {/* Image with zoom effect */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <div className="relative w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110">
                    <Image
                      src="/images/AccPC.jpg"
                      alt="Insta360 Accessories"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Gradient overlay */}
                  {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div> */}
                </div>
                
                {/* Content overlay */}
                <div className="relative p-8 h-full flex flex-col">
                  <div className="mb-auto">
                    <div className="mb-2">
                      <h3 className="text-gray-400 text-sm">Aksesoris</h3>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">
                      Maksimalkan rekaman Anda dengan perlengkapan resmi Insta360.
                    </h2>
                    <div className="mt-6">
                      <Link href="/accessories" className="inline-block">
                        <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition cursor-pointer">
                          BELANJA SEKARANG
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
} 