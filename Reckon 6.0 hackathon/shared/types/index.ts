export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'supplements' | 'equipment' | 'nutrition';
  image: string;
  dietTypes: string[];
}

export interface DietPlan {
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
  };
  recommendations: string[];
}

export interface Meal {
  name: string;
  portion: string;
  calories: number;
} 