import type { Recipe } from "@/lib/types";

declare module "@/data/recipes.json" {
  const value: Recipe[];
  export default value;
}
