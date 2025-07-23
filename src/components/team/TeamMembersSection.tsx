"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tabs, Button } from "antd";
import { motion } from "framer-motion";
import { LinkedinOutlined, InstagramOutlined } from "@ant-design/icons";
import { teamMembers } from "@/data/team-data";

const { TabPane } = Tabs;

const TeamMembersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredMembers = activeTab === "all" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === activeTab);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The passionate individuals behind Insta360&apos;s innovative products and experiences.
          </p>
        </div>

        <Tabs 
          centered 
          activeKey={activeTab} 
          onChange={setActiveTab}
          size="large"
          className="mb-12"
        >
          <TabPane tab="All" key="all" />
          <TabPane tab="Design" key="design" />
          <TabPane tab="Engineering" key="engineering" />
          <TabPane tab="Marketing" key="marketing" />
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, index) => (
            <motion.div 
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-64 relative overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-yellow-600 mb-3">{member.title}</p>
                <p className="text-gray-500 text-sm mb-3">{member.location}</p>
                <p className="text-gray-700 mb-4">{member.bio}</p>
                <div className="flex space-x-2">
                  {member.linkedin && (
                    <Button 
                      type="text" 
                      shape="circle" 
                      icon={<LinkedinOutlined />} 
                      href={member.linkedin} 
                      target="_blank"
                      className="text-blue-700"
                    />
                  )}
                  {member.instagram && (
                    <Button 
                      type="text" 
                      shape="circle" 
                      icon={<InstagramOutlined />} 
                      href={member.instagram} 
                      target="_blank"
                      className="text-pink-600"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembersSection; 