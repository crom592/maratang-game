import React, { useState } from 'react';
import '../styles/Shop.css';
import { Ingredient } from '../types';

interface ShopProps {
  money: number;
  onPurchase: (ingredient: Ingredient) => void;
  inventory: Ingredient[];
}

const Shop: React.FC<ShopProps> = ({ money, onPurchase, inventory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: '전체' },
    { id: 'meat', name: '고기' },
    { id: 'seafood', name: '해산물' },
    { id: 'vegetable', name: '채소' },
    { id: 'noodle', name: '면류' },
    { id: 'seasoning', name: '양념' },
    { id: 'special', name: '스페셜' }
  ];

  const shopItems: Ingredient[] = [
    // 고기류
    { 
      id: 'beef', 
      name: '소고기', 
      category: 'meat', 
      price: 3000, 
      spicyLevel: 0,
      description: '부드럽고 고소한 소고기'
    },
    { 
      id: 'pork', 
      name: '돼지고기', 
      category: 'meat', 
      price: 2000, 
      spicyLevel: 0,
      description: '쫄깃한 돼지고기'
    },
    { 
      id: 'lamb', 
      name: '양고기', 
      category: 'meat', 
      price: 4000, 
      spicyLevel: 0,
      description: '특유의 풍미가 있는 양고기'
    },
    // 해산물
    { 
      id: 'shrimp', 
      name: '새우', 
      category: 'seafood', 
      price: 2500, 
      spicyLevel: 0,
      description: '탱글탱글한 새우'
    },
    { 
      id: 'squid', 
      name: '오징어', 
      category: 'seafood', 
      price: 2000, 
      spicyLevel: 0,
      description: '쫄깃한 오징어'
    },
    { 
      id: 'mussel', 
      name: '홍합', 
      category: 'seafood', 
      price: 1500, 
      spicyLevel: 0,
      description: '신선한 홍합'
    },
    // 채소류
    { 
      id: 'mushroom', 
      name: '버섯', 
      category: 'vegetable', 
      price: 1000, 
      spicyLevel: 0,
      description: '영양만점 버섯'
    },
    { 
      id: 'cabbage', 
      name: '배추', 
      category: 'vegetable', 
      price: 800, 
      spicyLevel: 0,
      description: '아삭한 배추'
    },
    { 
      id: 'sprout', 
      name: '숙주나물', 
      category: 'vegetable', 
      price: 500, 
      spicyLevel: 0,
      description: '아삭한 숙주나물'
    },
    // 면류
    { 
      id: 'noodle', 
      name: '중국당면', 
      category: 'noodle', 
      price: 1500, 
      spicyLevel: 0,
      description: '쫄깃한 중국당면'
    },
    { 
      id: 'udon', 
      name: '우동면', 
      category: 'noodle', 
      price: 1200, 
      spicyLevel: 0,
      description: '탱글탱글한 우동면'
    },
    // 양념
    { 
      id: 'chili_oil', 
      name: '칠리오일', 
      category: 'seasoning', 
      price: 2000, 
      spicyLevel: 2,
      description: '매콤한 칠리오일'
    },
    { 
      id: 'mala_sauce', 
      name: '마라소스', 
      category: 'seasoning', 
      price: 3000, 
      spicyLevel: 3,
      description: '마비칠정도로 매운 마라소스'
    },
    { 
      id: 'sichuan_pepper', 
      name: '화자오', 
      category: 'seasoning', 
      price: 2500, 
      spicyLevel: 2,
      description: '얼얼한 화자오'
    },
    // 스페셜 아이템
    { 
      id: 'ghost_pepper', 
      name: '고스트페퍼', 
      category: 'special', 
      price: 10000, 
      spicyLevel: 5,
      description: '세상에서 가장 매운 고추'
    },
    { 
      id: 'golden_soup', 
      name: '황금육수', 
      category: 'special', 
      price: 8000, 
      spicyLevel: 1,
      description: '특제 비법으로 만든 황금육수'
    }
  ];

  const filteredItems = shopItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const handlePurchase = (item: Ingredient) => {
    if (money >= item.price) {
      onPurchase(item);
    }
  };

  const getItemCount = (itemId: string) => {
    return inventory.filter(item => item.id === itemId).length;
  };

  return (
    <div className="shop">
      <div className="shop-header">
        <h2>마라탕 재료 상점</h2>
        <div className="money">💰 {money.toLocaleString()}원</div>
      </div>
      
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="shop-items">
        {filteredItems.map(item => (
          <div key={item.id} className="shop-item">
            <div className="item-image">
              <img src={`/assets/ingredients/${item.id}.png`} alt={item.name} />
            </div>
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>가격: {item.price.toLocaleString()}원</p>
              {item.spicyLevel > 0 && (
                <p>매운맛: {'🌶️'.repeat(item.spicyLevel)}</p>
              )}
              <p>보유: {getItemCount(item.id)}개</p>
              <p>설명: {item.description}</p>
            </div>
            <button
              className="purchase-btn"
              onClick={() => handlePurchase(item)}
              disabled={money < item.price}
            >
              구매하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
