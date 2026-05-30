import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltContainerProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Maximum tilt rotation in degrees
  perspective?: number; // CSS perspective value
}

export default function TiltContainer({
  children,
  className = '',
  maxRotation = 12,
  perspective = 1000
}: TiltContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalized relative mouse coordinates: 0.5 is centered, 0 is left/top, 1 is right/bottom
  const xNormal = useMotionValue(0.5);
  const yNormal = useMotionValue(0.5);

  // Smooth springs for fluid, bounce-free responsiveness matching elegant physics
  const springConfig = { damping: 24, stiffness: 220, mass: 0.6 };
  const rotateXSpring = useSpring(useTransform(yNormal, [0, 1], [maxRotation, -maxRotation]), springConfig);
  const rotateYSpring = useSpring(useTransform(xNormal, [0, 1], [-maxRotation, maxRotation]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const xRelative = (e.clientX - rect.left) / rect.width;
    const yRelative = (e.clientY - rect.top) / rect.height;

    xNormal.set(xRelative);
    yNormal.set(yRelative);
  };

  const handleMouseLeave = () => {
    // Return gracefully to center position on leave
    xNormal.set(0.5);
    yNormal.set(0.5);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: perspective,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring
      }}
      className={`will-change-transform ${className}`}
    >
      {/* Propagate the preserve-3d context to prevent flat rendering of inner elements */}
      <div style={{ transformStyle: 'preserve-3d' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
