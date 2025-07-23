"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { teamMembers } from "@/data/team-members";

const TeamGridSection: React.FC = () => {
  const [category, setCategory] = useState<string>("all");
  
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      select option {
        background-color: white;
        color: black;
      }
      select option:checked,
      select option:hover {
        background-color: #0066ff;
        color: white;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const filteredMembers = category === "all" 
    ? teamMembers 
    : teamMembers.filter(member => member.category === category);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-[#040916] text-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Meet the Team</h2>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none bg-transparent border border-white/20 rounded px-4 py-2 pr-8 text-white w-[180px] cursor-pointer focus:outline-none"
            >
              <option value="all">Category</option>
              <option value="motorsport">Motorsport</option>
              <option value="winter-sports">Winter Sports</option>
              <option value="aerial">Aerial</option>
              <option value="cycling">Cycling</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <motion.div 
          key={`team-grid-${category}`}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          {filteredMembers.map((member) => (
            <motion.div 
              key={member.id}
              className="relative overflow-hidden bg-[#0D1225] rounded-lg aspect-square cursor-pointer group"
              variants={itemVariants}
            >
              <div className="h-full w-full relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white font-medium text-lg">{member.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamGridSection; 