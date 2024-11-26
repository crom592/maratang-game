import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Character.css';

interface CharacterProps {
  isEating: boolean;
  onEatingComplete?: () => void;
}

const Character: React.FC<CharacterProps> = ({ isEating, onEatingComplete }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const TOTAL_CYCLES = 5; // 전체 사이클 수 (5번 반복)
  
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
            setCycleCount(prevCycle => {
              if (prevCycle >= TOTAL_CYCLES - 1) {
                completeEating();
                return 0;
              }
              return prevCycle + 1;
            });
          }
          return nextFrame;
        });
      }, 300); // 프레임 속도를 300ms로 변경

      return () => {
        clearInterval(animationInterval);
        setCycleCount(0);
      };
    } else {
      setCurrentFrame(0);
      setCycleCount(0);
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
