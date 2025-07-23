'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';

interface SecondaryHeaderProps {
  title?: string;
  sections?: {
    id: string;
    label: string;
  }[];
  cta?: {
    label: string;
    url: string;
  };
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({ 
  title = '',
  sections = [],
  cta
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  console.log(scrolled)
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Track active section based on scroll position
      if (sections.length > 0) {
        const currentSection = sections.find(section => {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom > 100;
          }
          return false;
        });
        
        if (currentSection) {
          setActiveSection(currentSection.id);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  return (
    <div 
      id="secondary-header"
      className="w-full bg-black transition-all duration-500"
    >
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center">
          {title && (
            <h1 className="text-lg font-bold mr-8 text-white transition-all duration-500">{title}</h1>
          )}
        </div>

        <div className="flex justify-end">
          {sections.length > 0 && (
            <nav className="hidden md:flex mr-10">
              <ul className="flex space-x-8">
                {sections.map((section) => (
                  <li key={section.id} className="relative group" style={{ alignContent: 'center' }}>
                    <a 
                      href={`#${section.id}`} 
                      onClick={(e) => handleClick(e, section.id)}
                      className={`text-sm hover:text-white transition-all duration-500 flex items-center uppercase font-bold italic ${
                        activeSection === section.id 
                          ? 'text-white font-medium' 
                          : 'text-gray-300'
                      }`}
                    >
                      {section.label}
                      {section.id === 'highlights' && (
                        <DownOutlined className="ml-1 text-xs" />
                      )}
                    </a>
                    {activeSection === section.id && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 mt-1 transition-all duration-300"></div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        
          {cta && (
            <Link href={cta.url}>
              <button 
                className="bg-white hover:bg-gray-100 text-black border-none rounded-full h-8 px-6 font-medium transition-all duration-500"
              >
                {cta.label}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondaryHeader; 