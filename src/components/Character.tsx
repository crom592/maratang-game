import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/Character.css';
import avatarImage from '../assets/images/avatar.jpeg';
import eatingSound from '../assets/sounds/eating.mp3';  

interface CharacterProps {
  isEating: boolean;
  onEatingComplete?: () => void;
}

const Character: React.FC<CharacterProps> = ({ isEating, onEatingComplete }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const TOTAL_CYCLES = 5; 
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const completeEating = useCallback(() => {
    if (onEatingComplete) {
      onEatingComplete();
    }
  }, [onEatingComplete]);

  useEffect(() => {
    if (isEating) {
      // 먹기 시작할 때 소리 재생
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => console.log('Audio playback failed:', error));
      }

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
      }, 300); 

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
      <audio ref={audioRef} src={eatingSound} preload="auto" />
      <div className={`character-avatar ${isEating ? 'eating' : ''} frame-${currentFrame}`}>
        <img src={avatarImage} alt="Character Avatar" />
      </div>
    </div>
  );
};

export default Character;
