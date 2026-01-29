"use client";

import Link from "next/link";
import recipes from "@/data/recipes.json";
import { useStore } from "@/store/useStore";
import { applyFilters, getRecipeMatch } from "@/lib/recipe";

export default function RecipesPage() {
  const pantryItems = useStore((state) => state.pantryItems);
  const filters = useStore((state) => state.filters);

  const filteredRecipes = applyFilters(recipes, filters);
  const matchedRecipes = filteredRecipes
    .map((recipe) => getRecipeMatch(recipe, pantryItems))
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <main className="container-page space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">レシピ一覧</h1>
          <p className="text-sm text-slate-600">一致度順で並びます。</p>
        </div>
        <Link className="button-secondary" href="/">
          ホーム
        </Link>
      </section>

      <section className="card space-y-4">
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full border border-slate-200 px-3 py-1">時間: {filters.cookTimeMax}分以内</span>
          <span className="rounded-full border border-slate-200 px-3 py-1">
            難易度: {filters.difficulty ?? "指定なし"}
          </span>
          <span className="rounded-full border border-slate-200 px-3 py-1">
            ジャンル: {filters.cuisine ?? "指定なし"}
          </span>
        </div>

        {matchedRecipes.length === 0 ? (
          <p className="text-sm text-slate-500">
            該当するレシピがありません。条件や食材を見直してみてください。
          </p>
        ) : (
          <div className="space-y-3">
            {matchedRecipes.map((match) => (
              <Link
                key={match.recipe.id}
                className="block rounded-2xl border border-slate-200 p-4 hover:bg-slate-50"
                href={`/recipes/${match.recipe.id}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold">{match.recipe.title}</h2>
                  <span className="text-sm font-semibold text-slate-700">{match.matchScore}%</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>不足 {match.missingIngredients.length}</span>
                  <span>必須 {match.requiredHave}/{match.requiredTotal}</span>
                  <span>時間 {match.recipe.cookTimeMin}分</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
