"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import recipes from "@/data/recipes.json";
import { useStore } from "@/store/useStore";
import { getRecipeMatch, getPantryNames } from "@/lib/recipe";

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const pantryItems = useStore((state) => state.pantryItems);
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const addRecent = useStore((state) => state.addRecent);

  const recipe = useMemo(() => recipes.find((item) => item.id === recipeId), [recipeId]);
  const pantryNames = useMemo(() => getPantryNames(pantryItems), [pantryItems]);

  useEffect(() => {
    if (recipeId) {
      addRecent(recipeId);
    }
  }, [recipeId, addRecent]);

  if (!recipe) {
    return (
      <main className="container-page space-y-6">
        <Link className="button-secondary" href="/recipes">
          一覧へ戻る
        </Link>
        <p className="text-sm text-slate-500">レシピが見つかりませんでした。</p>
      </main>
    );
  }

  const match = getRecipeMatch(recipe, pantryItems);
  const isFavorite = favorites.includes(recipe.id);

  return (
    <main className="container-page space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <p className="text-sm text-slate-600">一致度 {match.matchScore}% / {recipe.cookTimeMin}分</p>
        </div>
        <Link className="button-secondary" href="/recipes">
          一覧へ
        </Link>
      </section>

      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">材料</h2>
          <button
            className={isFavorite ? "button-primary" : "button-secondary"}
            onClick={() => toggleFavorite(recipe.id)}
            type="button"
          >
            {isFavorite ? "お気に入り済み" : "お気に入り"}
          </button>
        </div>
        <div className="space-y-3">
          {recipe.ingredients.map((ingredient) => {
            const hasItem = pantryNames.has(ingredient.name.trim().toLowerCase());
            return (
              <div
                key={`${recipe.id}-${ingredient.name}`}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                  hasItem ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
                }`}
              >
                <div>
                  <p className="font-semibold">{ingredient.name}</p>
                  <p className="text-xs text-slate-500">
                    {ingredient.required ? "必須" : "任意"}
                    {ingredient.quantity ? ` ・ ${ingredient.quantity}` : ""}
                  </p>
                </div>
                <span className="text-xs font-semibold">
                  {hasItem ? "ある" : "ない"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">不足材料と代替候補</h2>
        {match.missingIngredients.length === 0 ? (
          <p className="text-sm text-slate-500">不足材料はありません。</p>
        ) : (
          <div className="space-y-3">
            {match.missingIngredients.map((ingredient) => (
              <div key={ingredient} className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold">{ingredient}</p>
                <p className="text-xs text-slate-500">
                  代替: {match.substitutes[ingredient]?.length ? match.substitutes[ingredient].join(" / ") : "なし"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">手順</h2>
        <ol className="list-decimal space-y-2 pl-4 text-sm text-slate-600">
          {recipe.steps.map((step, index) => (
            <li key={`${recipe.id}-step-${index}`}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
