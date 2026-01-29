import type { Recipe } from "./types";
import recipesData from "@/data/recipes.json";

const allowedDifficulties: Recipe["difficulty"][] = ["easy", "normal", "hard"];

const normalizeDifficulty = (value: string): Recipe["difficulty"] => {
  if (allowedDifficulties.includes(value as Recipe["difficulty"])) {
    return value as Recipe["difficulty"];
  }
  return "normal";
};

export const recipes: Recipe[] = recipesData.map((recipe) => ({
  ...recipe,
  difficulty: normalizeDifficulty(recipe.difficulty)
})) as Recipe[];
