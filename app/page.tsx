"use client";

import Link from "next/link";
import recipes from "@/data/recipes.json";
import { useStore } from "@/store/useStore";
import { getRecipeMatch } from "@/lib/recipe";

const normalizeDifficulty = (d: string): "easy" | "normal" | "hard" => {
  if (d === "easy" || d === "normal" || d === "hard") return d;
  return "normal";
};

export default function HomePage() {
  const pantryItems = useStore((state) => state.pantryItems);
  const filters = useStore((state) => state.filters);
  const favorites = useStore((state) => state.favorites);
  const recent = useStore((state) => state.recent);

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));
  const recentRecipes = recipes.filter((recipe) => recent.includes(recipe.id));

  return (
    <main className="container-page space-y-6">
      <section className="space-y-3">
        <p className="text-sm font-semibold text-slate-500">冷蔵庫アシスタント</p>
        <h1 className="text-2xl font-bold text-slate-900">今日の食材で作れるレシピを探そう</h1>
        <p className="text-sm text-slate-600">
          食材・条件・好みをまとめて管理し、すぐに作れるレシピを提案します。
        </p>
      </section>

      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">食材チップ</h2>
          <Link className="text-sm font-semibold text-slate-600" href="/pantry">
            管理へ
          </Link>
        </div>
        {pantryItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            まだ食材が登録されていません。まずは食材を追加しましょう。
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pantryItems.slice(0, 16).map((item) => (
              <span key={item.id} className="chip">
                {item.name}
              </span>
            ))}
            {pantryItems.length > 16 && (
              <span className="chip bg-slate-100 text-slate-500">+{pantryItems.length - 16}</span>
            )}
          </div>
        )}
      </section>

      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">条件サマリ</h2>
        <div className="grid gap-3 text-sm text-slate-600 md:grid-cols-2">
          <div>
            <p className="font-semibold text-slate-800">調理時間</p>
            <p>{filters.cookTimeMax}分以内</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">難易度</p>
            <p>{filters.difficulty ? filters.difficulty : "指定なし"}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">ジャンル</p>
            <p>{filters.cuisine ? filters.cuisine : "指定なし"}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">食事制限</p>
            <p>{filters.diet && filters.diet.length > 0 ? filters.diet.join(" / ") : "指定なし"}</p>
          </div>
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold">すぐに始める</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Link className="button-primary text-center" href="/pantry">
            食材を追加
          </Link>
          <Link className="button-secondary text-center" href="/filters">
            条件を設定
          </Link>
          <Link className="button-primary text-center" href="/recipes">
            レシピ検索
          </Link>
        </div>
      </section>

      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">最近見たレシピ</h2>
          <Link className="text-sm font-semibold text-slate-600" href="/recipes">
            一覧へ
          </Link>
        </div>
        {recentRecipes.length === 0 ? (
          <p className="text-sm text-slate-500">まだ閲覧履歴がありません。レシピを開いてみましょう。</p>
        ) : (
          <div className="space-y-3">
            {recentRecipes.map((recipe) => {
              // ✅ difficulty を union 型に正規化してから渡す
              const match = getRecipeMatch(
                { ...recipe, difficulty: normalizeDifficulty(recipe.difficulty) },
                pantryItems
              );

              return (
                <Link
                  key={recipe.id}
                  className="block rounded-2xl border border-slate-200 p-4 hover:bg-slate-50"
                  href={`/recipes/${recipe.id}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{recipe.title}</h3>
                    <span className="text-sm font-semibold text-slate-700">{match.matchScore}%</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    不足 {match.missingIngredients.length} / 時間 {recipe.cookTimeMin}分
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">お気に入り</h2>
          <Link className="text-sm font-semibold text-slate-600" href="/recipes">
            一覧へ
          </Link>
        </div>
        {favoriteRecipes.length === 0 ? (
          <p className="text-sm text-slate-500">お気に入りはまだありません。気になるレシピを保存しましょう。</p>
        ) : (
          <div className="space-y-3">
            {favoriteRecipes.map((recipe) => {
              // ✅ ここも同じく正規化してから渡す
              const match = getRecipeMatch(
                { ...recipe, difficulty: normalizeDifficulty(recipe.difficulty) },
                pantryItems
              );

              return (
                <Link
                  key={recipe.id}
                  className="block rounded-2xl border border-slate-200 p-4 hover:bg-slate-50"
                  href={`/recipes/${recipe.id}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{recipe.title}</h3>
                    <span className="text-sm font-semibold text-slate-700">{match.matchScore}%</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    不足 {match.missingIngredients.length} / 時間 {recipe.cookTimeMin}分
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
