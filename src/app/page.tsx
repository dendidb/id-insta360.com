"use client";

import { useState } from "react";
import homepageData from '@/data/homepage.json';

// Import all the components
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import ShopByInterestSection from "@/components/home/ShopByInterestSection";
import ProductFinderSection from "@/components/home/ProductFinderSection";
import NewsSection from "@/components/home/NewsSection";
import EnterpriseSection from "@/components/home/EnterpriseSection";
import SupportLinksSection from "@/components/home/SupportLinksSection";
import Header from "@/components/layout/Header";
import NewFooter from "@/components/layout/NewFooter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white" style={{marginTop: '-64px'}}>
      <Header id="root-header" />
      <HeroSection />
      <ProductsSection />
      <ShopByInterestSection categories={homepageData.activityCategories.categories} />
      <ProductFinderSection />
      {/* <Insta360PlusSection /> */}
      <NewsSection newsData={homepageData.news} />
      <EnterpriseSection businessData={homepageData.businessSection} />
      <SupportLinksSection />
      <NewFooter />
    </div>
  );
}
