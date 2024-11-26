import React, { useState, useEffect } from 'react';
import '../styles/Character.css';

interface CharacterProps {
  isEating: boolean;
  onEatingComplete?: () => void;
}

const Character: React.FC<CharacterProps> = ({ isEating, onEatingComplete }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  
  useEffect(() => {
    if (isEating) {
      const animationInterval = setInterval(() => {
        setCurrentFrame((prev) => {
          const nextFrame = (prev + 1) % 4; // 4 frames of animation
          if (nextFrame === 0 && onEatingComplete) {
            onEatingComplete();
          }
          return nextFrame;
        });
      }, 500); // Change frame every 500ms

      return () => clearInterval(animationInterval);
    } else {
      setCurrentFrame(0);
    }
  }, [isEating, onEatingComplete]);

  return (
    <div className="character">
      <div className={`character-face frame-${currentFrame} ${isEating ? 'eating' : ''}`}>
        <div className="eyes" />
        <div className="mouth" />
      </div>
    </div>
  );
};

export default Character;
