export interface Ingredient {
  id: string;
  name: string;
  price: number;
  spicyLevel: number;
  image: string;
  category: 'meat' | 'vegetable' | 'seafood' | 'noodle' | 'tofu' | 'mushroom';
  description: string;
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
