"use client";

import Link from "next/link";
import recipesRaw from "@/data/recipes.json";
import { useStore } from "@/store/useStore";
import { applyFilters, getRecipeMatch } from "@/lib/recipe";
import type { Recipe } from "@/lib/types";

const normalizeDifficulty = (d: string): "easy" | "normal" | "hard" => {
  if (d === "easy" || d === "normal" || d === "hard") return d;
  return "normal";
};

const normalizeCuisine = (c: string): "jp" | "western" | "chinese" | "other" => {
  if (c === "jp" || c === "western" || c === "chinese" || c === "other") return c;
  return "other";
};

const normalizedRecipes: Recipe[] = (recipesRaw as any[]).map((r) => ({
  ...r,
  difficulty: normalizeDifficulty(r.difficulty),
  cuisine: normalizeCuisine(r.cuisine),
}));

export default function RecipesPage() {
  const pantryItems = useStore((state) => state.pantryItems);
  const filters = useStore((state) => state.filters);

  const filteredRecipes = applyFilters(normalizedRecipes, filters);

  const matchedRecipes = filteredRecipes
    .map((recipe) => getRecipeMatch(recipe, pantryItems))
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <main className="container-page space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">冷蔵庫アシスタント</p>
          <h1 className="text-2xl font-bold text-slate-900">レシピ一覧</h1>
          <p className="text-sm text-slate-600">条件に合うレシピを一致度順に表示します。</p>
        </div>
        <Link className="button-secondary" href="/filters">
          条件を変更
        </Link>
      </section>

      {matchedRecipes.length === 0 ? (
        <div className="card space-y-2">
          <p className="font-semibold">該当するレシピがありません</p>
          <p className="text-sm text-slate-600">条件をゆるめるか、食材を追加してみてください。</p>
          <div className="flex gap-2">
            <Link className="button-secondary" href="/pantry">
              食材を追加
            </Link>
            <Link className="button-primary" href="/filters">
              条件を設定
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {matchedRecipes.map((match) => (
            <Link
              key={match.recipe.id}
              className="block rounded-2xl border border-slate-200 p-4 hover:bg-slate-50"
              href={`/recipes/${match.recipe.id}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{match.recipe.title}</h2>
                <span className="text-sm font-semibold text-slate-700">{match.matchScore}%</span>
              </div>
              <p className="text-xs text-slate-500">
                不足 {match.missingIngredients.length} / 時間 {match.recipe.cookTimeMin}分
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
