"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import type { Filters } from "@/lib/types";

const dietOptions = ["vegetarian", "vegan", "low-carb", "high-protein", "dairy-free"];
const allergyOptions = ["egg", "dairy", "wheat", "soy", "fish", "pork", "meat"];

export default function FiltersPage() {
  const filters = useStore((state) => state.filters);
  const updateFilters = useStore((state) => state.updateFilters);
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const toggleMulti = (key: "diet" | "allergies", value: string) => {
    const current = localFilters[key] ?? [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setLocalFilters({ ...localFilters, [key]: next });
  };

  const handleSave = () => {
    updateFilters(localFilters);
  };

  return (
    <main className="container-page space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">条件設定</h1>
          <p className="text-sm text-slate-600">調理時間やジャンルを指定できます。</p>
        </div>
        <Link className="button-secondary" href="/">
          ホーム
        </Link>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold">調理時間</h2>
        <div className="flex flex-wrap gap-3">
          {[15, 30, 60].map((value) => (
            <button
              key={value}
              className={
                localFilters.cookTimeMax === value
                  ? "button-primary"
                  : "button-secondary"
              }
              type="button"
              onClick={() => setLocalFilters({ ...localFilters, cookTimeMax: value as 15 | 30 | 60 })}
            >
              {value}分以内
            </button>
          ))}
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold">難易度</h2>
        <div className="flex flex-wrap gap-3">
          {["easy", "normal", "hard"].map((level) => (
            <button
              key={level}
              className={localFilters.difficulty === level ? "button-primary" : "button-secondary"}
              type="button"
              onClick={() =>
                setLocalFilters({
                  ...localFilters,
                  difficulty: localFilters.difficulty === level ? undefined : (level as Filters["difficulty"])
                })
              }
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold">ジャンル</h2>
        <div className="flex flex-wrap gap-3">
          {["jp", "western", "chinese", "other"].map((cuisine) => (
            <button
              key={cuisine}
              className={localFilters.cuisine === cuisine ? "button-primary" : "button-secondary"}
              type="button"
              onClick={() =>
                setLocalFilters({
                  ...localFilters,
                  cuisine: localFilters.cuisine === cuisine ? undefined : (cuisine as Filters["cuisine"])
                })
              }
            >
              {cuisine}
            </button>
          ))}
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold">食事制限</h2>
        <div className="flex flex-wrap gap-3">
          {dietOptions.map((option) => (
            <button
              key={option}
              className={localFilters.diet?.includes(option) ? "button-primary" : "button-secondary"}
              type="button"
              onClick={() => toggleMulti("diet", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold">アレルギー</h2>
        <div className="flex flex-wrap gap-3">
          {allergyOptions.map((option) => (
            <button
              key={option}
              className={localFilters.allergies?.includes(option) ? "button-primary" : "button-secondary"}
              type="button"
              onClick={() => toggleMulti("allergies", option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="flex justify-end">
        <button className="button-primary" onClick={handleSave} type="button">
          保存する
        </button>
      </section>
    </main>
  );
}
