
import React, { useState, useEffect } from 'react';

interface AnimatedPlaceholderProps {
  placeholders: string[];
  interval?: number;
}

const AnimatedPlaceholder = ({ placeholders, interval = 3000 }: AnimatedPlaceholderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
        setIsVisible(true);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [placeholders.length, interval]);

  return (
    <span className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-50'}`}>
      {placeholders[currentIndex]}
    </span>
  );
};

export default AnimatedPlaceholder;
