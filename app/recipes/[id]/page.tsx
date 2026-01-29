import { recipes } from "@/lib/recipes";
import RecipeDetailClient from "./recipe-detail-client";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }));
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  return <RecipeDetailClient recipeId={params.id} />;
}
