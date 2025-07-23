import React from "react";
import Link from "next/link";
import { Typography, Input, Button, Space, Divider } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  SendOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and newsletter section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Link href="/">
                <div className="h-10 w-32 relative flex items-center">
                  {/* Use a simpler approach for the logo */}
                  <div className="text-white font-bold text-2xl">Insta360</div>
                </div>
              </Link>
            </div>
            <Paragraph className="text-gray-400 mb-6">
              Insta360 adalah pemimpin global dalam kamera 360-derajat dan perangkat lunak
              pengeditan inovatif yang memberdayakan orang untuk menciptakan, berbagi dan menikmati
              momen hidup mereka.
            </Paragraph>
            <div className="mb-8">
              <Title level={5} className="text-white mb-4">
                Berlangganan Newsletter
              </Title>
              <div className="flex">
                <Input
                  placeholder="Alamat email Anda"
                  className="mr-2 bg-gray-800 border-gray-700"
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={() => console.log("Subscribe newsletter")}
                >
                  Langganan
                </Button>
              </div>
            </div>
          </div>

          {/* Links section */}
          <div>
            <Title level={5} className="text-white mb-4">
              Produk
            </Title>
            <ul className="space-y-2">
              <li>
                <Link href="/products/category/action-360" className="text-gray-400 hover:text-white">
                  Kamera 360
                </Link>
              </li>
              <li>
                <Link href="/products/category/action-biasa" className="text-gray-400 hover:text-white">
                  Kamera Aksi Biasa
                </Link>
              </li>
              <li>
                <Link href="/products/category/gimbal-stabilizer" className="text-gray-400 hover:text-white">
                  Gimbal Stabilizer
                </Link>
              </li>
              <li>
                <Link href="/products/category/rumah-kantor" className="text-gray-400 hover:text-white">
                  Rumah & Kantor
                </Link>
              </li>
              <li>
                <Link href="/products/category/professional" className="text-gray-400 hover:text-white">
                  Professional
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-gray-400 hover:text-white">
                  Aksesoris
                </Link>
              </li>
            </ul>
          </div>

          {/* Support section */}
          <div>
            <Title level={5} className="text-white mb-4">
              Bantuan & Dukungan
            </Title>
            <ul className="space-y-2">
              <li>
                <Link href="/support/download" className="text-gray-400 hover:text-white">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/support/user-guide" className="text-gray-400 hover:text-white">
                  User Guide
                </Link>
              </li>
              <li>
                <Link href="/support/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support/contact" className="text-gray-400 hover:text-white">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-400 hover:text-white">
                  Garansi
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-400 hover:text-white">
                  Lokasi Toko
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Divider className="border-gray-700 my-8" />

        {/* Social and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Space size="large">
              <Link href="https://facebook.com/insta360" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined className="text-2xl text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://twitter.com/insta360" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined className="text-2xl text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://instagram.com/insta360" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined className="text-2xl text-gray-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://youtube.com/insta360" target="_blank" rel="noopener noreferrer">
                <YoutubeOutlined className="text-2xl text-gray-400 hover:text-white transition-colors" />
              </Link>
            </Space>
          </div>
          <div className="text-center md:text-right text-gray-400">
            <p>© {new Date().getFullYear()} Insta360. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                Kebijakan Privasi
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 