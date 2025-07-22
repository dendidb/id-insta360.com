import React from 'react';
import Image from "next/image";
import { Button, Typography } from "antd";
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const { Title, Paragraph } = Typography;

export default function Insta360PlusSection() {
  return (
    <ScrollReveal>
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-2/5 mb-8 md:mb-0 md:pr-8">
              <div className="flex items-center mb-6">
                <div className="relative w-40 h-12">
                  <Image
                    src="https://via.placeholder.com/200x60/0080ff/ffffff?text=Insta360+"
                    alt="Insta360+"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <Title level={3} className="text-3xl font-bold mb-4">Save. Store. Share.</Title>
              <Paragraph className="text-gray-600 mb-8 text-lg">
                Store unlimited 360° photos and videos in original quality. Access your shots from anywhere and share them with friends.
              </Paragraph>
              <Button 
                className="bg-black text-white border-none hover:bg-gray-800 rounded-full px-8 h-10"
                href="/insta360-plus"
              >
                LEARN MORE
              </Button>
            </div>
            <div className="w-full md:w-3/5">
              <div className="relative w-full h-[350px]">
                <Image
                  src="https://via.placeholder.com/800x600/eeeeff/333333?text=App+Interface"
                  alt="Insta360+ App"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
} 