export type PantryCategory = "veg" | "meat" | "fish" | "dairy" | "staple" | "seasoning" | "other";

export type PantryItem = {
  id: string;
  name: string;
  category: PantryCategory;
  quantity?: string;
  expireDate?: string;
  createdAt: string;
};

export type Filters = {
  cookTimeMax: 15 | 30 | 60;
  difficulty?: "easy" | "normal" | "hard";
  cuisine?: "jp" | "western" | "chinese" | "other";
  diet?: string[];
  allergies?: string[];
};

export type RecipeIngredient = {
  name: string;
  required: boolean;
  quantity?: string;
};

export type Recipe = {
  id: string;
  title: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  cookTimeMin: number;
  difficulty: "easy" | "normal" | "hard";
  cuisine: "jp" | "western" | "chinese" | "other";
  tags: string[];
};
