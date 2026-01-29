"use client";
import Link from "next/link";
import recipes from "@/data/recipes.json";
import { getRecipeMatch, getPantryNames } from "@/lib/recipe";
import { useStore } from "@/store/useStore";

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

const normalizeDifficulty = (d: string): "easy" | "normal" | "hard" =>
  d === "easy" || d === "normal" || d === "hard" ? d : "normal";

const normalizeCuisine = (c: string): "jp" | "western" | "chinese" | "other" =>
  c === "jp" || c === "western" || c === "chinese" || c === "other" ? c : "other";

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const recipeId = params.id;

  const pantryItems = useStore((s) => s.pantryItems);
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);

  const recipe = recipes.find((r) => r.id === recipeId);

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

  const match = getRecipeMatch(
    {
      ...recipe,
      difficulty: normalizeDifficulty(recipe.difficulty),
      cuisine: normalizeCuisine(recipe.cuisine),
    },
    pantryItems
  );

  const pantryNames = getPantryNames(pantryItems);
  const isFavorite = favorites.includes(recipe.id);

  return (
    <main className="container-page space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <p className="text-sm text-slate-600">
            一致度 {match.matchScore}% / {recipe.cookTimeMin}分
          </p>
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
                <span className="text-xs font-semibold">{hasItem ? "ある" : "ない"}</span>
              </div>
            );
          })}
        </div>
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
