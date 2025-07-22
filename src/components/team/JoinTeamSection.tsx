"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { teamPerks } from "@/data/team-data";

const JoinTeamSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] overflow-hidden rounded-lg">
            <Image 
              src="/images/team/join-team.jpg" 
              alt="Join Insta360 Team" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Work With Us</h3>
              <p className="text-white/90">Join a team that's redefining how the world captures moments.</p>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-lg text-gray-600 mb-8">
              At Insta360, we're always looking for passionate, creative individuals who want to push the boundaries of what's possible in imaging technology. Join us in creating the next generation of innovative cameras.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {teamPerks.map((perk, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>{perk}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <Link href="/careers">
                <Button 
                  type="primary" 
                  size="large" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black border-none mr-4"
                >
                  View Open Positions
                </Button>
              </Link>
              <Link href="/about/culture" className="text-gray-800 hover:text-yellow-600 transition-colors inline-flex items-center">
                Learn about our culture <RightOutlined style={{ fontSize: '12px', marginLeft: '8px' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection; 