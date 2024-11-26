import { Ingredient } from '../types';

export const ingredients: Ingredient[] = [
  {
    id: 'beef',
    name: '소고기',
    price: 3000,
    spicyLevel: 0,
    image: '/assets/ingredients/beef.png',
    category: 'meat',
    description: '부드러운 소고기 슬라이스'
  },
  {
    id: 'pork',
    name: '돼지고기',
    price: 2500,
    spicyLevel: 0,
    image: '/assets/ingredients/pork.png',
    category: 'meat',
    description: '쫄깃한 돼지고기 슬라이스'
  },
  {
    id: 'tofu',
    name: '두부',
    price: 1000,
    spicyLevel: 0,
    image: '/assets/ingredients/tofu.png',
    category: 'tofu',
    description: '부드러운 두부'
  },
  {
    id: 'mushroom',
    name: '버섯',
    price: 1500,
    spicyLevel: 0,
    image: '/assets/ingredients/mushroom.png',
    category: 'mushroom',
    description: '신선한 버섯'
  },
  {
    id: 'noodle',
    name: '면',
    price: 1000,
    spicyLevel: 0,
    image: '/assets/ingredients/noodle.png',
    category: 'noodle',
    description: '쫄깃한 면'
  },
  {
    id: 'shrimp',
    name: '새우',
    price: 2000,
    spicyLevel: 0,
    image: '/assets/ingredients/shrimp.png',
    category: 'seafood',
    description: '신선한 새우'
  }
];
