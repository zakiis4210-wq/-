"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import recipes from "@/data/recipes.json";
import { useStore } from "@/store/useStore";
import { getRecipeMatch, getPantryNames } from "@/lib/recipe";

export function generateStaticParams() {
  return recipes.map((r) => ({ id: r.id }));
}

const normalizeDifficulty = (d: string): "easy" | "normal" | "hard" =>
  d === "easy" || d === "normal" || d === "hard" ? d : "normal";

const normalizeCuisine = (c: string): "jp" | "western" | "chinese" | "other" =>
  c === "jp" || c === "western" || c === "chinese" || c === "other" ? c : "other";

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = Array.isArray(params.id) ? params.id[0] : params.id;

  const pantryItems = useStore((s) => s.pantryItems);
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const addRecent = useStore((s) => s.addRecent);

  const recipe = useMemo(
    () => recipes.find((r) => r.id === recipeId),
    [recipeId]
  );

  const pantryNames = useMemo(
    () => getPantryNames(pantryItems),
    [pantryItems]
  );

  useEffect(() => {
    if (recipeId) addRecent(recipeId);
  }, [recipeId, addRecent]);

  if (!recipe) {
    return (
      <main className="container-page space-y-6">
        <Link href="/recipes" className="button-secondary">
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
      cuisine: normalizeCuisine(recipe.cuis
