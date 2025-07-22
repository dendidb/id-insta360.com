"use client";

import React from "react";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        muted
        loop
        playsInline
        src="/videos/kv-index.mp4"
      />
      
      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040916] via-[#040916]/10 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Team Insta360</h1>
        <p className="text-xl md:text-2xl mb-8">The bold ones.</p>
        <Button 
          type="default" 
          size="large"
          icon={<PlayCircleOutlined />}
          className="bg-gray-700 bg-opacity-60 text-white border-gray-500 hover:bg-gray-600 hover:text-white"
          onClick={() => {
            // This would typically open a modal with the full video
            console.log("Play video clicked");
          }}
          style={{
            backdropFilter: "blur(10px)",
            background: "#c3c3c30d",
            border: "none",
            color: "white",
            padding: "30px",
            fontWeight: 700
          }}
        >
          Watch Video
        </Button>
      </div>
    </div>
  );
};

export default HeroSection; 