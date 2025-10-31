import { Link } from "react-router-dom";
import { useRecipeData } from "../hooks/useRecipeData";
import { recipeAPI, type RecipeData } from "../services/api";
import { useState } from "react";

const RecipeCard = ({
  recipes,
  setRecipeData,
}: {
  recipes: RecipeData[];
  setRecipeData: React.Dispatch<React.SetStateAction<RecipeData[]>>;
}) => {
  const [loading, setLoading] = useState(false);

  const handleRecipeDelete = async (id: string) => {
    setLoading(true);
    try {
      await recipeAPI.deleteRecipe(id);
      setRecipeData((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {recipes.length === 0 ? (
        <p className="text-xl text-blue-700 py-8">No Recipe Found!</p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border border-zinc-300 rounded-md my-7 flex flex-col"
          >
            <Link to={`/${recipe.id}`}>
              <img
                className="md:h-[600px] md:w-full md:object-cover"
                src={recipe.imageUrl}
                alt={recipe.name}
              />
              <div className="p-4">
                <h1 className="text-2xl font-semibold pb-2">{recipe.name}</h1>
                <ul className="space-y-1">
                  <li>
                    <span className="font-semibold">Cuisine Type: </span>
                    {recipe.cuisineType}
                  </li>
                  <li>
                    <span className="font-semibold">Ingredients: </span>
                    <Link
                      to={`/${recipe.id}`}
                      className="text-blue-500 underline"
                    >
                      See Recipe
                    </Link>
                  </li>
                  <li>
                    <span className="font-semibold">Instructions: </span>
                    <Link
                      to={`/${recipe.id}`}
                      className="text-blue-500 underline"
                    >
                      See Recipe
                    </Link>
                  </li>
                </ul>
              </div>
            </Link>

            <button
              disabled={loading}
              onClick={() => handleRecipeDelete(recipe.id ?? "")}
              className={`m-4 py-1 text-white rounded-md
                ${
                  loading
                    ? "bg-red-700 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700/90 transition-colors"
                }
              `}
            >
              {loading ? "Deleting Recipe..." : "Delete"}
            </button>
          </div>
        ))
      )}
    </>
  );
};
export const RecipeListingPage = () => {
  const { recipeData, setRecipeData } = useRecipeData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = recipeData.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 md:px-8 mt-6">
      <div className="w-full mb-6">
        <input
          type="text"
          placeholder="Search by recipe name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-zinc-300 rounded-lg px-4 py-2 text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      <h1 className="text-3xl font-semibold text-zinc-700">All Recipes:</h1>

      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:space-x-6">
        {<RecipeCard recipes={filteredRecipes} setRecipeData={setRecipeData} />}
      </div>
    </div>
  );
};
