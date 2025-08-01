import React, { useState, useEffect } from 'react';

interface AnimatedPlaceholderProps {
  examples: string[];
  prefix?: string;
  interval?: number;
}

function AnimatedPlaceholder({ examples, prefix = '', interval = 3000 }: AnimatedPlaceholderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (examples.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % examples.length);
    }, interval);

    return () => clearInterval(timer);
  }, [examples.length, interval]);

  if (examples.length === 0) return null;

  return (
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <span className="text-muted-foreground text-sm opacity-70 transition-opacity duration-500">
        {prefix} {examples[currentIndex]}
      </span>
    </div>
  );
}

export default AnimatedPlaceholder;