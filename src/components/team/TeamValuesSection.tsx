"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TeamValue } from "./types";
import { teamValues } from "@/data/team-data";

const TeamValuesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The principles that drive our team to create innovative products and experiences that empower creators worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamValues.map((value, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 inline-block bg-yellow-100 p-4 rounded-full">
                <Image 
                  src={value.icon} 
                  alt={value.title} 
                  width={40} 
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamValuesSection; 