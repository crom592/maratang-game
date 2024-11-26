import React, { useState, useEffect, useCallback } from 'react';
import '../styles/CookingAnimation.css';

interface CookingAnimationProps {
  isActive: boolean;
  onCookingComplete: () => void;
  ingredients: string[];
}

const CookingAnimation: React.FC<CookingAnimationProps> = ({
  isActive,
  onCookingComplete,
  ingredients
}) => {
  const [bubbles, setBubbles] = useState<number[]>([]);
  const [cookingStage, setCookingStage] = useState(0);

  const completeCooking = useCallback(() => {
    onCookingComplete();
  }, [onCookingComplete]);

  useEffect(() => {
    if (isActive) {
      const bubbleInterval = setInterval(() => {
        setBubbles(prev => {
          const newBubbles = [...prev, Math.random()];
          return newBubbles.slice(-10);
        });
      }, 500);

      const cookingInterval = setInterval(() => {
        setCookingStage(prev => {
          if (prev >= 3) {
            clearInterval(bubbleInterval);
            clearInterval(cookingInterval);
            completeCooking();
            return 0;
          }
          return prev + 1;
        });
      }, 2000);

      return () => {
        clearInterval(bubbleInterval);
        clearInterval(cookingInterval);
      };
    } else {
      setBubbles([]);
      setCookingStage(0);
    }
  }, [isActive, completeCooking]);

  return (
    <div className={`cooking-animation ${isActive ? 'active' : ''}`}>
      <div className="pot">
        <div className="soup-base">
          {ingredients.map((ingredient, index) => (
            <div
              key={`${ingredient}-${index}`}
              className={`ingredient ingredient-${ingredient} ${
                cookingStage > 0 ? 'cooking' : ''
              }`}
              style={{
                left: `${(index * 20) % 80}%`,
                top: `${30 + (Math.floor(index / 4) * 20)}%`
              }}
            />
          ))}
          {bubbles.map((bubble, index) => (
            <div
              key={index}
              className="bubble"
              style={{
                left: `${bubble * 80}%`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
        </div>
        <div className="steam-container">
          {isActive && (
            <>
              <div className="steam steam-1" />
              <div className="steam steam-2" />
              <div className="steam steam-3" />
            </>
          )}
        </div>
      </div>
      {isActive && (
        <div className="cooking-status">
          {cookingStage === 0 && "재료 준비 중..."}
          {cookingStage === 1 && "육수 끓이는 중..."}
          {cookingStage === 2 && "마라소스 넣는 중..."}
          {cookingStage === 3 && "마지막 손질 중..."}
        </div>
      )}
    </div>
  );
};

export default CookingAnimation;
