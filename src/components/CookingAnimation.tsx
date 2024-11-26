import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (isActive) {
      // 버블 애니메이션 생성
      const interval = setInterval(() => {
        setBubbles(prev => {
          const newBubbles = [...prev, Math.random()];
          if (newBubbles.length > 10) {
            return newBubbles.slice(1);
          }
          return newBubbles;
        });
      }, 500);

      // 요리 단계 진행
      const cookingInterval = setInterval(() => {
        setCookingStage(prev => {
          if (prev >= 3) {
            clearInterval(interval);
            clearInterval(cookingInterval);
            onCookingComplete();
            return 0;
          }
          return prev + 1;
        });
      }, 2000);

      return () => {
        clearInterval(interval);
        clearInterval(cookingInterval);
      };
    } else {
      setBubbles([]);
      setCookingStage(0);
    }
  }, [isActive, onCookingComplete]);

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
