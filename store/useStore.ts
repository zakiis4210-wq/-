"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Filters, PantryItem, PantryCategory } from "@/lib/types";

export type StoreState = {
  pantryItems: PantryItem[];
  filters: Filters;
  favorites: string[];
  recent: string[];
  addPantryItem: (item: Omit<PantryItem, "id" | "createdAt"> & { id?: string }) => void;
  removePantryItem: (id: string) => void;
  updateFilters: (filters: Filters) => void;
  toggleFavorite: (recipeId: string) => void;
  addRecent: (recipeId: string) => void;
  clearPantry: () => void;
};

const nowIso = () => new Date().toISOString();

const createItem = (name: string, category: PantryCategory): PantryItem => ({
  id: crypto.randomUUID(),
  name,
  category,
  createdAt: nowIso()
});

const initialPantryItems: PantryItem[] = [
  createItem("玉ねぎ", "veg"),
  createItem("にんじん", "veg"),
  createItem("じゃがいも", "veg"),
  createItem("キャベツ", "veg"),
  createItem("もやし", "veg"),
  createItem("ねぎ", "veg"),
  createItem("トマト", "veg"),
  createItem("きのこ", "veg"),
  createItem("ピーマン", "veg"),
  createItem("なす", "veg"),
  createItem("鶏むね", "meat"),
  createItem("鶏もも", "meat"),
  createItem("豚こま", "meat"),
  createItem("ひき肉", "meat"),
  createItem("ベーコン", "meat"),
  createItem("ツナ缶", "fish"),
  createItem("鮭", "fish"),
  createItem("卵", "dairy"),
  createItem("牛乳", "dairy"),
  createItem("チーズ", "dairy"),
  createItem("バター", "dairy"),
  createItem("ごはん", "staple"),
  createItem("パスタ", "staple"),
  createItem("うどん", "staple"),
  createItem("食パン", "staple"),
  createItem("醤油", "seasoning"),
  createItem("みりん", "seasoning"),
  createItem("酒", "seasoning"),
  createItem("味噌", "seasoning"),
  createItem("酢", "seasoning"),
  createItem("塩", "seasoning"),
  createItem("こしょう", "seasoning"),
  createItem("油", "seasoning")
];

const initialFilters: Filters = {
  cookTimeMax: 30,
  difficulty: undefined,
  cuisine: undefined,
  diet: [],
  allergies: []
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      pantryItems: initialPantryItems,
      filters: initialFilters,
      favorites: [],
      recent: [],
      addPantryItem: (item) => {
        const newItem: PantryItem = {
          id: item.id ?? crypto.randomUUID(),
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          expireDate: item.expireDate,
          createdAt: nowIso()
        };
        set({ pantryItems: [newItem, ...get().pantryItems] });
      },
      removePantryItem: (id) => {
        set({ pantryItems: get().pantryItems.filter((item) => item.id !== id) });
      },
      updateFilters: (filters) => {
        set({ filters });
      },
      toggleFavorite: (recipeId) => {
        const favorites = get().favorites;
        if (favorites.includes(recipeId)) {
          set({ favorites: favorites.filter((id) => id !== recipeId) });
        } else {
          set({ favorites: [recipeId, ...favorites] });
        }
      },
      addRecent: (recipeId) => {
        const next = [recipeId, ...get().recent.filter((id) => id !== recipeId)];
        set({ recent: next.slice(0, 20) });
      },
      clearPantry: () => {
        set({ pantryItems: [] });
      }
    }),
    {
      name: "fridge-mvp",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
