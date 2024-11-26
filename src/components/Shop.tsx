import React, { useState } from 'react';
import '../styles/Shop.css';
import { Ingredient } from '../types';
import { ingredients } from '../data/ingredients';

interface ShopProps {
  money: number;
  inventory: Ingredient[];
  onPurchase: (ingredient: Ingredient) => void;
  onClose: () => void;
}

const Shop: React.FC<ShopProps> = ({ money, inventory, onPurchase, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('vegetable');

  const categories = {
    vegetable: '채소',
    meat: '고기',
    seafood: '해산물',
    noodle: '면',
    mushroom: '버섯',
    special: '특별 재료'
  };

  const filteredIngredients = ingredients.filter(
    ingredient => ingredient.category === selectedCategory
  );

  const isInInventory = (ingredient: Ingredient) => {
    return inventory.some(item => item.id === ingredient.id);
  };

  const canAfford = (price: number) => {
    return money >= price;
  };

  return (
    <div className="shop">
      <div className="shop-header">
        <h2>마라탕 재료 상점</h2>
        <div className="shop-money">💰 {money}</div>
        <button className="close-button" onClick={onClose}>✕</button>
      </div>

      <div className="category-tabs">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            className={`category-tab ${selectedCategory === key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="ingredients-grid">
        {filteredIngredients.map(ingredient => {
          const owned = isInInventory(ingredient);
          const affordable = canAfford(ingredient.price);

          return (
            <div key={ingredient.id} className="ingredient-card">
              <div className="ingredient-image">
                {ingredient.image ? (
                  <img src={ingredient.image} alt={ingredient.name} />
                ) : (
                  <div className="placeholder-image">🥘</div>
                )}
              </div>
              <div className="ingredient-info">
                <h3>{ingredient.name}</h3>
                <p className="spicy-level">
                  매운맛: {'🌶️'.repeat(ingredient.spicyLevel)}
                </p>
                <p className="price">가격: 💰 {ingredient.price}</p>
                {ingredient.description && (
                  <p className="description">{ingredient.description}</p>
                )}
              </div>
              <button
                className={`purchase-button ${owned ? 'owned' : ''} ${!affordable ? 'cant-afford' : ''}`}
                onClick={() => !owned && affordable && onPurchase(ingredient)}
                disabled={owned || !affordable}
              >
                {owned ? '보유중' : affordable ? '구매하기' : '돈이 부족해요'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
