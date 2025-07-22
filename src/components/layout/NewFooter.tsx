'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Row, Col, Typography, Space } from 'antd';
import {
  FacebookOutlined,
  InstagramOutlined,
  ShoppingOutlined,
  ChromeOutlined,
  AppleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const NewFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Row gutter={[48, 32]}>
          {/* Products Column */}
          <Col xs={24} sm={12} md={8}>
            <div className="mb-8">
              <Title level={5} className="font-bold mb-4">Produk Kami</Title>
              
              {/* Consumer Products */}
              <div className="mb-6">
                <Text strong className="text-sm text-gray-700 mb-2 block">Konsumen</Text>
                <ul className="space-y-1">
                  <li><Link href="/products/x4" className="text-gray-600 hover:text-black text-sm">Insta360 X4</Link></li>
                  <li><Link href="/products/x3" className="text-gray-600 hover:text-black text-sm">Insta360 X3</Link></li>
                  <li><Link href="/products/ace-pro-2" className="text-gray-600 hover:text-black text-sm">Insta360 Ace Pro 2</Link></li>
                  <li><Link href="/products/ace-pro" className="text-gray-600 hover:text-black text-sm">Insta360 Ace Pro & Insta360 Ace</Link></li>
                  <li><Link href="/products/go-3s" className="text-gray-600 hover:text-black text-sm">Insta360 GO 3S & Insta360 GO 3</Link></li>
                  <li><Link href="/products/flow-2-pro" className="text-gray-600 hover:text-black text-sm">Insta360 Flow 2 Pro</Link></li>
                  <li><Link href="/products/one-rs" className="text-gray-600 hover:text-black text-sm">Insta360 ONE RS</Link></li>
                  <li><Link href="/products/flow-pro" className="text-gray-600 hover:text-black text-sm">Insta360 Flow Pro & Insta360 Flow</Link></li>
                </ul>
              </div>
              
              {/* Virtual Reality Products */}
              <div className="mb-6">
                <Text strong className="text-sm text-gray-700 mb-2 block">Rapat Virtual</Text>
                <ul className="space-y-1">
                  <li><Link href="/products/link-2" className="text-gray-600 hover:text-black text-sm">Insta360 Link 2 & Insta360 Link 2C</Link></li>
                  <li><Link href="/products/link" className="text-gray-600 hover:text-black text-sm">Insta360 Link</Link></li>
                  <li><Link href="/products/connect" className="text-gray-600 hover:text-black text-sm">Insta360 Connect</Link></li>
                </ul>
              </div>
              
              {/* Professional Products */}
              <div>
                <Text strong className="text-sm text-gray-700 mb-2 block">Professional</Text>
                <ul className="space-y-1">
                  <li><Link href="/products/pro-2" className="text-gray-600 hover:text-black text-sm">Insta360 Pro 2</Link></li>
                  <li><Link href="/products/titan" className="text-gray-600 hover:text-black text-sm">Insta360 Titan</Link></li>
                  <li><Link href="/products/pro" className="text-gray-600 hover:text-black text-sm">Insta360 Pro</Link></li>
                </ul>
              </div>
            </div>
          </Col>

          {/* Explore Column */}
          <Col xs={24} sm={12} md={8}>
            <div>
              <Title level={5} className="font-bold mb-4">Explore</Title>
              <ul className="space-y-1">
                <li><Link href="/dealers" className="text-gray-600 hover:text-black text-sm">Dealer Resmi</Link></li>
                <li><Link href="/service" className="text-gray-600 hover:text-black text-sm">Service Center</Link></li>
                <li><Link href="/b2b" className="text-gray-600 hover:text-black text-sm">Layanan B2B</Link></li>
              </ul>
            </div>
          </Col>

          {/* Head Office Column */}
          <Col xs={24} md={8}>
            <div>
              <Title level={5} className="font-bold mb-4">Head Office</Title>
              <div className="mb-5">
                <Text strong className="block mb-1">PT Denka Pratama Indonesia</Text>
                <Text className="text-gray-600 block">
                  Gold Coast Office Pik Tower Eiffel Lt. 22 Unit H4, Penjaringan,
                </Text>
                <Text className="text-gray-600 block">Jakarta Utara, 14470.</Text>
                <Text className="text-gray-600 block mt-2">No Telp: (021) 50110277</Text>
                <Text className="text-gray-600 block mt-2">Jam Operasional:</Text>
                <Text className="text-gray-600 block">10.00 – 19.00</Text>
              </div>
              
              <div className="mt-4">
                <div style={{position: 'relative', paddingBottom: '75%', height: 0, overflow: 'hidden'}}>
                  <iframe style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0}} loading="lazy" allowFullScreen src="https://maps.google.com/maps?q=pt+denka+pratama+indonesia&z=16&output=embed"></iframe>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        
        <Space size="middle" style={{float: 'right'}}>
          <Link href="https://facebook.com/insta360" target="_blank" rel="noopener noreferrer">
            <FacebookOutlined className="text-xl text-gray-600 hover:text-black transition-colors" />
          </Link>
          <Link href="https://instagram.com/insta360" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined className="text-xl text-gray-600 hover:text-black transition-colors" />
          </Link>
          <Link href="https://shop.insta360.com" target="_blank" rel="noopener noreferrer">
            <ShoppingOutlined className="text-xl text-gray-600 hover:text-black transition-colors" />
          </Link>
          <Link href="https://web.insta360.com" target="_blank" rel="noopener noreferrer">
            <ChromeOutlined className="text-xl text-gray-600 hover:text-black transition-colors" />
          </Link>
          <Link href="https://apple.insta360.com" target="_blank" rel="noopener noreferrer">
            <AppleOutlined className="text-xl text-gray-600 hover:text-black transition-colors" />
          </Link>
        </Space>
        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Text className="text-gray-500 text-xs">
            Copyright © {currentYear} Insta360 Indonesia Authorized Distributor (PT. Denka Pratama Indonesia)
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter; 