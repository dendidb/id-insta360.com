"use client";

import React from "react";
import { motion } from "framer-motion";

const TeamIntroSection: React.FC = () => {
  return (
    <section className="py-28 bg-[#040916] text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-2xl md:text-3xl font-normal leading-relaxed tracking-wide">
            Team Insta360 brings together a diverse group of athletes, adventurers, and creators 
            who continuously push the limits of what is possible. We are always moving forward 
            and always think bold.
          </p>
          <div className="mt-6 inline-block">
            <div className="h-1 w-28 bg-yellow-400 mx-auto"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamIntroSection; 