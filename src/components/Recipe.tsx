import { useParams } from "react-router-dom";
import { useRecipeData } from "../hooks/useRecipeData";
import type { RecipeData } from "../services/api";

const RecipeCard = ({ recipe }: { recipe: RecipeData }) => {
  return (
    <div
      key={recipe.id}
      className="border border-zinc-300 rounded-md flex flex-col md:flex-row"
    >
      <img
        src={recipe.imageUrl}
        alt={recipe.name}
        className="md:max-w-[450px]"
      />

      <div className="p-4 text-zinc-800">
        <h1 className="text-3xl font-semibold pb-6">
          Cuisine: {recipe.cuisineType}
        </h1>

        <div className="mb-6">
          <h2 className="font-semibold text-2xl pb-2">Ingredients:</h2>
          <p>{recipe.ingredients.join(", ")}</p>
        </div>

        <div>
          <h2 className="font-semibold text-2xl pb-2">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-1 pl-4">
            {recipe.instructions.map((inst, index) => (
              <li key={index}>{inst}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export const Recipe = () => {
  const { id } = useParams();
  const { recipeData } = useRecipeData();

  const findRecipe = recipeData.find((recipe) => recipe.id === id);

  if (!findRecipe) {
    return <h1>Loading Recipe...</h1>;
  }
  return (
    <section>
      <h1 className="text-3xl text-zinc-700 font-semibold mb-2">
        {findRecipe.name}
      </h1>
      <RecipeCard recipe={findRecipe} />
    </section>
  );
};
