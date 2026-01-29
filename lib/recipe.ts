import type { Filters, PantryItem, Recipe } from "./types";
import { substituteMap } from "./substitutes";

export type RecipeMatch = {
  recipe: Recipe;
  matchScore: number;
  missingIngredients: string[];
  substitutes: Record<string, string[]>;
  requiredTotal: number;
  requiredHave: number;
};

const normalize = (value: string) => value.trim().toLowerCase();

export const getPantryNames = (pantryItems: PantryItem[]) =>
  new Set(pantryItems.map((item) => normalize(item.name)));

export const getRecipeMatch = (recipe: Recipe, pantryItems: PantryItem[]): RecipeMatch => {
  const pantryNames = getPantryNames(pantryItems);
  const requiredIngredients = recipe.ingredients.filter((ingredient) => ingredient.required);
  const requiredTotal = requiredIngredients.length;
  const requiredHave = requiredIngredients.filter((ingredient) =>
    pantryNames.has(normalize(ingredient.name))
  ).length;
  const missingIngredients = requiredIngredients
    .filter((ingredient) => !pantryNames.has(normalize(ingredient.name)))
    .map((ingredient) => ingredient.name);
  const baseScore = requiredTotal === 0 ? 0 : (requiredHave / requiredTotal) * 100;
  const bonus = missingIngredients.length === 0 ? 10 : 0;
  const matchScore = Math.min(100, Math.round(baseScore + bonus));
  const substitutes = missingIngredients.reduce<Record<string, string[]>>((acc, ingredient) => {
    acc[ingredient] = substituteMap[ingredient] ?? [];
    return acc;
  }, {});

  return {
    recipe,
    matchScore,
    missingIngredients,
    substitutes,
    requiredTotal,
    requiredHave
  };
};

export const applyFilters = (recipes: Recipe[], filters: Filters): Recipe[] => {
  return recipes.filter((recipe) => {
    if (recipe.cookTimeMin > filters.cookTimeMax) {
      return false;
    }
    if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.cuisine && recipe.cuisine !== filters.cuisine) {
      return false;
    }
    if (filters.diet && filters.diet.length > 0) {
      const dietMatches = filters.diet.every((tag) => recipe.tags.includes(tag));
      if (!dietMatches) {
        return false;
      }
    }
    if (filters.allergies && filters.allergies.length > 0) {
      const hasAllergy = filters.allergies.some((tag) => recipe.tags.includes(tag));
      if (hasAllergy) {
        return false;
      }
    }
    return true;
  });
};
