import React, { useState } from 'react';
import '../styles/Game.css';
import GameScene from './GameScene';
import CookingAnimation from './CookingAnimation';
import StreamView from './StreamView';
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

  const [isEating, setIsEating] = useState(false);
  const [isCooking, setIsCooking] = useState(false);

  const calculateSpicyLevel = () => {
    return gameState.selectedIngredients.reduce((total, ingredient) => 
      total + ingredient.spicyLevel, 0);
  };

  const handleDonation = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      character: {
        ...prev.character,
        money: prev.character.money + amount
      }
    }));
  };

  const handleIngredientSelect = (ingredientId: string) => {
    const selectedIngredient = ingredients.find(i => i.id === ingredientId);
    if (selectedIngredient) {
      setGameState(prev => ({
        ...prev,
        selectedIngredients: [...prev.selectedIngredients, selectedIngredient]
      }));
    }
  };

  const handleCookingComplete = () => {
    setIsCooking(false);
    setGameState(prev => ({ ...prev, currentScene: 'main' }));
  };

  const handleEatingComplete = () => {
    setIsEating(false);
    setGameState(prev => ({
      ...prev,
      character: {
        ...prev.character,
        money: prev.character.money + (prev.selectedIngredients.length * 100),
        spicyTolerance: prev.character.spicyTolerance + 0.1
      },
      selectedIngredients: []
    }));
  };

  const startCooking = () => {
    setIsCooking(true);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="money-display">💰 {gameState.character.money}</div>
        <div className="level-display">Level {gameState.character.level}</div>
        <div className="spicy-tolerance">🌶️ {gameState.character.spicyTolerance.toFixed(1)}</div>
      </div>
      
      <div className="game-content">
        {!isCooking ? (
          <GameScene 
            selectedIngredients={gameState.selectedIngredients.map(i => i.id)}
            onIngredientClick={handleIngredientSelect}
            isEating={isEating}
            onEatingComplete={handleEatingComplete}
          />
        ) : (
          <CookingAnimation 
            isActive={isCooking}
            onCookingComplete={handleCookingComplete}
            ingredients={gameState.selectedIngredients.map(i => i.id)}
          />
        )}

        {isEating && (
          <StreamView 
            isStreaming={isEating}
            spicyLevel={calculateSpicyLevel()}
            onDonation={handleDonation}
          />
        )}
        
        {gameState.currentScene === 'main' && (
          <div className="main-menu">
            <h1>마라탕 먹방 챌린지</h1>
            <button onClick={() => setGameState(prev => ({ ...prev, currentScene: 'cooking' }))}>
              요리하기
            </button>
            <button onClick={() => setGameState(prev => ({ ...prev, currentScene: 'shop' }))}>
              상점
            </button>
            {gameState.selectedIngredients.length > 0 && !isCooking && (
              <button onClick={() => setIsEating(true)}>먹방 시작!</button>
            )}
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
                  <div className="ingredient-name">{ingredient.name}</div>
                  <div className="ingredient-spicy">
                    {'🌶️'.repeat(ingredient.spicyLevel)}
                  </div>
                </div>
              ))}
            </div>
            {gameState.selectedIngredients.length > 0 && !isCooking && (
              <button onClick={startCooking}>요리 시작!</button>
            )}
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
