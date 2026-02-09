export enum IngredientType {
    BASE = 'BASE',
    FILLING = 'FILLING',
    TOPPING = 'TOPPING',
    EXTRA = 'EXTRA'
}

export interface Ingredient {
    id: string;
    name: string;
    description: string;
    meaning: string;
    type: IngredientType;
    icon: string; // Emoji or Lucide icon name
}

export interface ChocolateCreation {
    base: Ingredient;
    filling: Ingredient;
    topping: Ingredient;
    partnerName: string;
    senderName: string;
}

export interface GeneratedContent {
    name: string;
    description: string;
    poem: string;
}

export enum AppState {
    INTRO,
    ATELIER,
    MIXING,
    REVEAL,
    GIFT_BOX
}
