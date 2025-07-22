import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Typography } from "antd";
import { 
  CloudDownloadOutlined,
  CustomerServiceOutlined
} from "@ant-design/icons";

const { Text } = Typography;

export default function SupportLinksSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Link href="/support" className="flex flex-col items-center p-8 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 flex items-center justify-center mb-6">
              <Image src='/images/ic-product-support.svg' alt='Product Support' width={48} height={48} />
            </div>
            <Text className="text-base font-medium">Product Support</Text>
          </Link>
          
          <Link href="/downloads" className="flex flex-col items-center p-8 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 flex items-center justify-center mb-6">
              <Image src='/images/ic-downloads.svg' alt='Downloads' width={48} height={48} />
            </div>
            <Text className="text-base font-medium">Downloads</Text>
          </Link>
          
          <Link href="/service-center" className="flex flex-col items-center p-8 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 flex items-center justify-center mb-6">
              <Image src='/images/ic-aftersales.svg' alt='Service Center' width={48} height={48} />
            </div>
            <Text className="text-base font-medium">Service Center</Text>
          </Link>
        </div>
      </div>
    </section>
  );
} 