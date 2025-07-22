"use client";

import React from "react";
import HeroSection from "@/components/team/HeroSection";
import TeamIntroSection from "@/components/team/TeamIntroSection";
import TeamGridSection from "@/components/team/TeamGridSection";
import BoldContentSlider from "@/components/team/BoldContentSlider";
import ProductsSlider from "@/components/team/ProductsSlider";

const TeamInsta360Page: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <HeroSection />
      <TeamIntroSection />
      <TeamGridSection />
      <BoldContentSlider />
      <ProductsSlider />
    </div>
  );
};

export default TeamInsta360Page; 