
import React, { useEffect, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className={className}
      style={{ y }}
      animate={{
        x: mousePosition.x,
        rotateX: mousePosition.y * 0.1,
        rotateY: mousePosition.x * 0.1,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
