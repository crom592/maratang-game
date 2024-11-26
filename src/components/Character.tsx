import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Character.css';

interface CharacterProps {
  isEating: boolean;
  onEatingComplete?: () => void;
}

const Character: React.FC<CharacterProps> = ({ isEating, onEatingComplete }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  
  const completeEating = useCallback(() => {
    if (onEatingComplete) {
      onEatingComplete();
    }
  }, [onEatingComplete]);

  useEffect(() => {
    if (isEating) {
      const animationInterval = setInterval(() => {
        setCurrentFrame((prev) => {
          const nextFrame = (prev + 1) % 4;
          if (nextFrame === 0) {
            completeEating();
          }
          return nextFrame;
        });
      }, 500);

      return () => clearInterval(animationInterval);
    } else {
      setCurrentFrame(0);
    }
  }, [isEating, completeEating]);

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
