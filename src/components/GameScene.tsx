import React from 'react';
import '../styles/GameScene.css';
import Character from './Character';

interface GameSceneProps {
  onIngredientClick?: (id: string) => void;
  selectedIngredients: string[];
  isEating: boolean;
  onEatingComplete?: () => void;
}

const GameScene: React.FC<GameSceneProps> = ({ 
  onIngredientClick, 
  selectedIngredients,
  isEating,
  onEatingComplete
}) => {
  return (
    <div className="game-scene">
      <div className="bowl-container">
        <div className="maratang-bowl">
          <div className="soup">
            {selectedIngredients.map((id) => (
              <div key={id} className={`ingredient ingredient-${id}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="character-container">
        <Character isEating={isEating} onEatingComplete={onEatingComplete} />
      </div>
    </div>
  );
};

export default GameScene;
