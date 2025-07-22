"use client";

import Link from "next/link";
import { Layout, Divider } from "antd";
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined, TwitterOutlined } from "@ant-design/icons";

const { Footer } = Layout;

export function MainFooter() {
  return (
    <Footer className="bg-gray-900 text-white p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Insta360 Indonesia</h3>
            <p className="text-gray-400">
              Official Insta360 Indonesia Website. Explore our range of 360-degree cameras and accessories.
            </p>
            <div className="flex mt-4 space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FacebookOutlined style={{ fontSize: 24 }} />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white">
                <InstagramOutlined style={{ fontSize: 24 }} />
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-white">
                <YoutubeOutlined style={{ fontSize: 24 }} />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
                <TwitterOutlined style={{ fontSize: 24 }} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/products/x3" className="text-gray-400 hover:text-white">Insta360 X3</Link></li>
              <li><Link href="/products/one-rs" className="text-gray-400 hover:text-white">Insta360 ONE RS</Link></li>
              <li><Link href="/products/go-2" className="text-gray-400 hover:text-white">Insta360 GO 2</Link></li>
              <li><Link href="/products/accessories" className="text-gray-400 hover:text-white">Accessories</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white">All Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/warranty" className="text-gray-400 hover:text-white">Warranty</Link></li>
              <li><Link href="/dealers" className="text-gray-400 hover:text-white">Find a Dealer</Link></li>
              <li><Link href={`${process.env.NEXT_PUBLIC_FORUM_URL}`} className="text-gray-400 hover:text-white">Community Forum</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white">News</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <Divider className="border-gray-700 my-6" />
        
        <div className="text-center text-gray-400">
          <p>© {new Date().getFullYear()} Insta360 Indonesia. All rights reserved.</p>
        </div>
      </div>
    </Footer>
  );
} 