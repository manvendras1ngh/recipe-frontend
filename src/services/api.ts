import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/recipe";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export type RecipeData = {
  id?: string;
  name: string;
  cuisineType: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
};

export const recipeAPI = {
  getAllRecipe: async (): Promise<RecipeData[]> => {
    const response = await api.get("/");

    return response.data.data.map(({ _id, ...rest }: any) => ({
      id: _id,
      ...rest,
    }));
  },

  createNewRecipe: async (recipeData: RecipeData): Promise<string> => {
    const response = await api.post("/new", recipeData);
    return response.data;
  },

  deleteRecipe: async (id: string): Promise<string> => {
    const response = await api.delete(`/${id}`);
    return response.data.message;
  },
};
