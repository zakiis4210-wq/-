import type { Recipe } from "./types";
import recipesData from "@/data/recipes.json";

type RawRecipe = Omit<Recipe, "difficulty"> & { difficulty?: Recipe["difficulty"] | string };

const allowedDifficulties: Recipe["difficulty"][] = ["easy", "normal", "hard"];

const normalizeDifficulty = (value?: string): Recipe["difficulty"] => {
  if (value && allowedDifficulties.includes(value as Recipe["difficulty"])) {
    return value as Recipe["difficulty"];
  }
  return "normal";
};

const rawRecipes = recipesData as RawRecipe[];

export const recipes: Recipe[] = rawRecipes.map(
  (recipe): Recipe => ({
    ...recipe,
    difficulty: normalizeDifficulty(recipe.difficulty)
  })
);
