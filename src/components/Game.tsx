import React, { useState } from 'react';
import '../styles/Game.css';

const Game: React.FC = () => {
  const [money, setMoney] = useState<number>(1000); // 초기 자금
  const [currentScene, setCurrentScene] = useState<'main' | 'cooking' | 'eating'>('main');

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="money-display">💰 {money}</div>
      </div>
      
      <div className="game-content">
        {currentScene === 'main' && (
          <div className="main-menu">
            <h1>마라탕 먹방 챌린지</h1>
            <button onClick={() => setCurrentScene('cooking')}>요리하기</button>
            <button disabled>상점</button>
            <button disabled>업그레이드</button>
          </div>
        )}
        
        {currentScene === 'cooking' && (
          <div className="cooking-scene">
            <h2>마라탕 만들기</h2>
            <button onClick={() => setCurrentScene('main')}>메인으로 돌아가기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
