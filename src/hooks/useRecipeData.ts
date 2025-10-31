import { useEffect, useState } from "react";
import { recipeAPI, type RecipeData } from "../services/api.ts";

export const useRecipeData = () => {
  const [recipeData, setRecipeData] = useState<RecipeData[]>([]);

  const fetchData = async () => {
    try {
      const recipies = await recipeAPI.getAllRecipe();
      setRecipeData(recipies);
    } catch (error) {
      console.error("Error getting recipe data", error);
    }
  };

  const refreshRecipiesData = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { recipeData, setRecipeData, refreshRecipiesData };
};
