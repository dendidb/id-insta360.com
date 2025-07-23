'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Typography, Row, Col, Card, Select} from 'antd';
import Image from 'next/image';
import { EnvironmentOutlined, PhoneOutlined, DownOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// Define types
interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  city: string;
  mapUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Store location data
const storeLocations: StoreLocation[] = [
  {
    id: 'jpc-kemang',
    name: 'JPC KEMANG',
    address: 'Jl. Kemang Raya No.47C, RT.6/RW.2, Bangka, Kec. Mampang Prapatan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730',
    phone: '(021) 7180487',
    city: 'Jakarta',
    mapUrl: '/images/map-jakarta.jpg',
    coordinates: { lat: -6.2604, lng: 106.8186 }
  },
  {
    id: 'doss-grand-indonesia',
    name: 'DOSS GRAND INDONESIA',
    address: 'Mal Grand Indonesia - East Mall Lt. 3A Unit PU 3, Daerah Khusus Ibukota Jakarta 10310',
    phone: '8128258166',
    city: 'Jakarta',
    mapUrl: '/images/map-jakarta.jpg',
    coordinates: { lat: -6.1944, lng: 106.8229 }
  },
  {
    id: 'doss-surabaya',
    name: 'DOSS',
    address: 'Jl. Mayjen HR. Muhammad No.374, RT.001/RW.001, Sonokwijenan, Kec. Sukomanunggal, Surabaya, Jawa Timur 60189',
    phone: '3159573913',
    city: 'Surabaya',
    mapUrl: '/images/map-surabaya.jpg',
    coordinates: { lat: -7.2756, lng: 112.7353 }
  },
  {
    id: 'doss-bandung',
    name: 'DOSS',
    address: 'Jl. Cihampelas No. 160, Cipaganti, Kec. Coblong, Kota Bandung, Jawa Barat 40131',
    phone: '2220001234',
    city: 'Bandung',
    mapUrl: '/images/map-bandung.jpg',
    coordinates: { lat: -6.8915, lng: 107.6107 }
  }
];

export default function StorePage() {
  const [storeTab, setStoreTab] = useState('retail');
  const [selectedCity, setSelectedCity] = useState('Jakarta');
  const [selectedLocation, setSelectedLocation] = useState(storeLocations[0]);
  
  // References for the toggle buttons to measure positions
  const retailBtnRef = useRef<HTMLButtonElement>(null);
  const onlineBtnRef = useRef<HTMLButtonElement>(null);
  
  // Animation state for the sliding highlight
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
    transition: 'none'
  });

  // Filter stores by selected city
  const filteredLocations = storeLocations.filter(location => 
    location.city === selectedCity
  );

  const handleLocationClick = (location: StoreLocation) => {
    setSelectedLocation(location);
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    // Set the first location of the selected city as the selected location
    const firstLocationInCity = storeLocations.find(loc => loc.city === value);
    if (firstLocationInCity) {
      setSelectedLocation(firstLocationInCity);
    }
  };
  
  // Update the highlight position when tab changes or on component mount
  useEffect(() => {
    const updateHighlight = () => {
      if (storeTab === 'retail' && retailBtnRef.current) {
        setHighlightStyle({
          left: 0,
          width: retailBtnRef.current.offsetWidth,
          transition: 'all 0.4s ease'
        });
      } else if (storeTab === 'online' && onlineBtnRef.current) {
        setHighlightStyle({
          left: retailBtnRef.current?.offsetWidth || 0,
          width: onlineBtnRef.current.offsetWidth,
          transition: 'all 0.4s ease'
        });
      }
    };
    
    // Short delay to ensure DOM is ready
    setTimeout(updateHighlight, 10);
    
    // Also update on window resize
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [storeTab]);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Title level={2} className="font-bold mb-8 text-center sm:text-left">Where to Buy</Title>
        
        {/* Enhanced toggle buttons with animated highlight */}
        <div className="mb-10 bg-white rounded-full inline-flex shadow-sm border border-gray-100 relative">
          {/* Animated highlight that slides */}
          <div 
            className="absolute top-0 bottom-0 rounded-full bg-yellow-400 z-0 shadow-sm"
            style={{
              left: highlightStyle.left,
              width: highlightStyle.width,
              transition: highlightStyle.transition
            }}
          ></div>
          
          <button 
            ref={retailBtnRef}
            onClick={() => setStoreTab('retail')}
            className={`relative z-10 font-bold px-8 py-4 rounded-full text-sm focus:outline-none transition-all cursor-pointer duration-100 ${
              storeTab === 'retail' 
                ? 'text-black' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            RETAIL STORES
          </button>
          <button 
            ref={onlineBtnRef}
            onClick={() => setStoreTab('online')}
            className={`relative z-10 font-bold px-8 py-4 rounded-full text-sm focus:outline-none transition-all cursor-pointer duration-100 ${
              storeTab === 'online' 
                ? 'text-black' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            ONLINE STORE
          </button>
        </div>

        {storeTab === 'retail' ? (
          <div>
            {/* Location selector and map display */}
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={16}>
                {/* Map display */}
                <div className="relative h-[400px] md:h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-md">
                  {/* Placeholder for the map - in a real app, this could be Google Maps or similar */}
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    {/* Replace this with actual Google Maps integration */}
                    <div className="relative w-full h-full">
                      <Image 
                        src={selectedLocation.mapUrl || "/images/map-placeholder.jpg"} 
                        alt="Store location map"
                        fill
                        className="object-cover"
                      />
                      {/* Marker for selected location */}
                      <div className="absolute" style={{ 
                        top: `${(selectedLocation.coordinates.lat + 10) * 5}%`, 
                        left: `${(selectedLocation.coordinates.lng - 100) * -1}%`
                      }}>
                        <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                          <EnvironmentOutlined className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              
              <Col xs={24} lg={8}>
                {/* Enhanced location filter */}
                <div className="mb-6">
                  <div className="p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <Text className="text-gray-700 font-medium">Location:</Text>
                      <Select 
                        defaultValue="Jakarta" 
                        style={{ width: 180 }} 
                        onChange={handleCityChange}
                        className="custom-select"
                        suffixIcon={<DownOutlined className="text-gray-500" />}
                        dropdownStyle={{ borderRadius: '8px' }}
                        variant="borderless"
                      >
                        <Option value="Jakarta">Jakarta</Option>
                        <Option value="Surabaya">Surabaya</Option>
                        <Option value="Bandung">Bandung</Option>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {/* Location list */}
                <div className="space-y-4">
                  {filteredLocations.map(location => (
                    <Card 
                      key={location.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                        selectedLocation.id === location.id 
                          ? 'border-yellow-400 border-2 shadow-md' 
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                      onClick={() => handleLocationClick(location)}
                      styles={{
                        body: {
                          padding: '16px'
                        }
                      }}
                    >
                      <Title level={5} className="mb-2">{location.name}</Title>
                      <Paragraph className="text-sm text-gray-600 mb-1">
                        <EnvironmentOutlined className="mr-1 text-yellow-500" /> 
                        {location.address}
                      </Paragraph>
                      <Paragraph className="text-sm text-gray-600">
                        <PhoneOutlined className="mr-1 text-yellow-500" /> 
                        {location.phone}
                      </Paragraph>
                      {selectedLocation.id === location.id && (
                        <div className="mt-3 text-right">
                          <Text className="text-xs text-yellow-600 font-medium">CURRENTLY VIEWING</Text>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          // Online store view
          <div>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Title level={3} className="mb-6">ONLINE STORES</Title>
              </Col>
              
              <Col xs={24} sm={12} md={6}>
                <Card hoverable className="text-center h-full shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative h-[60px] w-[150px] mx-auto mb-4">
                    <Image 
                      src="/images/tokopedia-logo.png" 
                      alt="Tokopedia" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Title level={5}>Tokopedia</Title>
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={6}>
                <Card hoverable className="text-center h-full shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative h-[60px] w-[150px] mx-auto mb-4">
                    <Image 
                      src="/images/shopee-logo.png" 
                      alt="Shopee" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Title level={5}>Shopee</Title>
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={6}>
                <Card hoverable className="text-center h-full shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative h-[60px] w-[150px] mx-auto mb-4">
                    <Image 
                      src="/images/lazada-logo.png" 
                      alt="Lazada" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Title level={5}>Lazada</Title>
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={6}>
                <Card hoverable className="text-center h-full shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative h-[60px] w-[150px] mx-auto mb-4">
                    <Image 
                      src="/images/blibli-logo.jpg" 
                      alt="Blibli" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Title level={5}>Blibli</Title>
                </Card>
              </Col>
            </Row>
            
            <Row gutter={[24, 24]} className="mt-10">
              <Col span={24}>
                <Title level={3} className="mb-6">SOCIAL MEDIA</Title>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <Card hoverable className="text-center h-full shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative h-[60px] w-[150px] mx-auto mb-4">
                    <Image 
                      src="/images/facebook-logo.png" 
                      alt="Facebook" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Title level={5}>Facebook</Title>
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={8}>
                <Card hoverable className="text-center h-full shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative h-[60px] w-[150px] mx-auto mb-4">
                    <Image 
                      src="/images/instagram-logo.jpg" 
                      alt="Instagram" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Title level={5}>Instagram</Title>
                </Card>
              </Col>
              
            </Row>
          </div>
        )}
      </div>

      {/* Add custom styles for the select component */}
      <style jsx global>{`
        .custom-select .ant-select-selector {
          background-color: #fff !important;
          border-radius: 8px !important;
          height: 40px !important;
          padding: 4px 16px !important;
          display: flex !important;
          align-items: center !important;
        }

        .custom-select .ant-select-selection-item {
          font-weight: 500 !important;
          color: #333 !important;
        }
      `}</style>
    </div>
  );
} 