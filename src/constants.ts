import { Ingredient, IngredientType } from './types';

export const BASES: Ingredient[] = [
    { id: 'dark', name: '70% Dark Intensity', description: 'Deep, intense, and sophisticated.', meaning: 'The depth of our late-night conversations', type: IngredientType.BASE, icon: '🌑' },
    { id: 'milk', name: 'Creamy Milk Silk', description: 'Smooth, comforting, and classic.', meaning: 'The comfort of your voice on the phone', type: IngredientType.BASE, icon: '🥛' },
    { id: 'white', name: 'Velvet White Vanilla', description: 'Sweet, dreamy, and pure.', meaning: 'The purity of my love for you', type: IngredientType.BASE, icon: '✨' },
];

export const FILLINGS: Ingredient[] = [
    { id: 'caramel', name: 'Salted Caramel Flow', description: 'Rich, gooey, and perfectly balanced.', meaning: 'our sweetest memories together', type: IngredientType.FILLING, icon: '🍯' },
    { id: 'hazelnut', name: 'Roasted Hazelnut Crunch', description: 'Nutty, earthy, and full of texture.', meaning: 'the strength that holds us together', type: IngredientType.FILLING, icon: '🌰' },
    { id: 'berry', name: 'Wild Raspberry Coulis', description: 'Tart, vibrant, and exciting.', meaning: 'the spark and passion we share', type: IngredientType.FILLING, icon: '🍓' },
];

export const TOPPINGS: Ingredient[] = [
    { id: 'gold', name: '24K Edible Gold', description: 'Luxurious and precious.', meaning: 'how precious you are to me', type: IngredientType.TOPPING, icon: '🌟' },
    { id: 'sea_salt', name: 'Himalayan Sea Salt', description: 'Enhances every flavor.', meaning: 'the tears of missing you that make the reunion sweeter', type: IngredientType.TOPPING, icon: '🧂' },
    { id: 'chili', name: 'Hint of Chili', description: 'A warm, lingering heat.', meaning: 'the anticipation of seeing you again', type: IngredientType.TOPPING, icon: '🌶️' },
];
