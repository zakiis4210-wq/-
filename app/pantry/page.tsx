"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import type { PantryCategory } from "@/lib/types";

const categories: { value: PantryCategory; label: string }[] = [
  { value: "veg", label: "野菜" },
  { value: "meat", label: "肉" },
  { value: "fish", label: "魚" },
  { value: "dairy", label: "乳製品・卵" },
  { value: "staple", label: "主食" },
  { value: "seasoning", label: "調味料" },
  { value: "other", label: "その他" }
];

export default function PantryPage() {
  const pantryItems = useStore((state) => state.pantryItems);
  const addPantryItem = useStore((state) => state.addPantryItem);
  const removePantryItem = useStore((state) => state.removePantryItem);
  const clearPantry = useStore((state) => state.clearPantry);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PantryCategory>("veg");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const keyword = search.trim();
    if (!keyword) {
      return pantryItems;
    }
    return pantryItems.filter((item) => item.name.includes(keyword));
  }, [pantryItems, search]);

  const handleAdd = () => {
    if (!name.trim()) return;
    addPantryItem({ name: name.trim(), category });
    setName("");
  };

  return (
    <main className="container-page space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">食材の管理</h1>
          <p className="text-sm text-slate-600">カテゴリと名前で食材を追加・削除できます。</p>
        </div>
        <Link className="button-secondary" href="/">
          ホーム
        </Link>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold">食材を追加</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            placeholder="食材名を入力"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <select
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            value={category}
            onChange={(event) => setCategory(event.target.value as PantryCategory)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <button className="button-primary" onClick={handleAdd} type="button">
            追加する
          </button>
        </div>
      </section>

      <section className="card space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">登録済みの食材</h2>
          <button className="text-xs font-semibold text-slate-500" onClick={clearPantry} type="button">
            全て削除
          </button>
        </div>
        <input
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          placeholder="検索で絞り込み"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {filteredItems.length === 0 ? (
          <p className="text-sm text-slate-500">検索条件に一致する食材がありません。</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    カテゴリ: {categories.find((cat) => cat.value === item.category)?.label}
                  </p>
                </div>
                <button
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                  onClick={() => removePantryItem(item.id)}
                  type="button"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
