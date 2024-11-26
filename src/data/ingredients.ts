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
  },
  {
    id: 'chili_oil',
    name: '마라소스',
    price: 500,
    spicyLevel: 1,
    image: '/assets/ingredients/chili_oil.png',
    category: 'seasoning',
    description: '기본 마라소스'
  },
  {
    id: 'sichuan_pepper',
    name: '화자오',
    price: 800,
    spicyLevel: 2,
    image: '/assets/ingredients/sichuan_pepper.png',
    category: 'seasoning',
    description: '마비감이 있는 화자오'
  },
  {
    id: 'dried_chili',
    name: '건고추',
    price: 600,
    spicyLevel: 3,
    image: '/assets/ingredients/dried_chili.png',
    category: 'seasoning',
    description: '매운 건고추'
  }
];
