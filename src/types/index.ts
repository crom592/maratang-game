export interface Ingredient {
  id: string;
  name: string;
  price: number;
  spicyLevel: number;
  category: 'meat' | 'vegetable' | 'seafood' | 'noodle' | 'tofu' | 'mushroom' | 'seasoning' | 'special';
  image?: string;
  description?: string;
}

export interface Character {
  level: number;
  money: number;
  inventory: Ingredient[];
  spicyTolerance: number;
}

export interface GameState {
  character: Character;
  currentScene: 'main' | 'cooking' | 'eating' | 'shop';
  selectedIngredients: Ingredient[];
}
