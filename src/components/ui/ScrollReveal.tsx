import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";

type ScrollRevealProps = {
  children: React.ReactNode;
};

export const ScrollReveal = ({ children }: ScrollRevealProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      {children}
    </motion.div>
  );
}; 