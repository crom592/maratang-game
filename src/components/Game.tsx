import React, { useState } from 'react';
import '../styles/Game.css';
import GameScene from './GameScene';
import { Ingredient, GameState } from '../types';
import { ingredients } from '../data/ingredients';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    character: {
      level: 1,
      money: 10000,
      inventory: [],
      spicyTolerance: 1
    },
    currentScene: 'main',
    selectedIngredients: []
  });

  const handleIngredientSelect = (ingredientId: string) => {
    setGameState(prev => ({
      ...prev,
      selectedIngredients: [...prev.selectedIngredients, ingredientId]
    }));
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="money-display">💰 {gameState.character.money}</div>
        <div className="level-display">Level {gameState.character.level}</div>
      </div>
      
      <div className="game-content">
        <GameScene 
          selectedIngredients={gameState.selectedIngredients}
          onIngredientClick={handleIngredientSelect}
        />
        
        {gameState.currentScene === 'main' && (
          <div className="main-menu">
            <h1>마라탕 먹방 챌린지</h1>
            <button onClick={() => setGameState(prev => ({ ...prev, currentScene: 'cooking' }))}>
              요리하기
            </button>
            <button onClick={() => setGameState(prev => ({ ...prev, currentScene: 'shop' }))}>
              상점
            </button>
          </div>
        )}
        
        {gameState.currentScene === 'cooking' && (
          <div className="cooking-scene">
            <h2>마라탕 만들기</h2>
            <div className="ingredients-grid">
              {ingredients.map(ingredient => (
                <div 
                  key={ingredient.id}
                  className="ingredient-item"
                  onClick={() => handleIngredientSelect(ingredient.id)}
                >
                  {ingredient.name}
                </div>
              ))}
            </div>
            <button onClick={() => setGameState(prev => ({ ...prev, currentScene: 'main' }))}>
              메인으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
