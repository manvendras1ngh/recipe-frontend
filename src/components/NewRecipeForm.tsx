import { useState } from "react";
import { recipeAPI } from "../services/api";

export const NewRecipeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    cuisineType: "",
    imageUrl: "",
    ingredients: "",
    instructions: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const recipeData = {
        ...formData,
        ingredients: formData.ingredients.split(",").map((i) => i.trim()),
        instructions: formData.instructions
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      };

      await recipeAPI.createNewRecipe(recipeData);
      setMessage("Recipe added successfully!");
      setFormData({
        name: "",
        cuisineType: "",
        imageUrl: "",
        ingredients: "",
        instructions: "",
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
      setMessage("Failed to add recipe. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold text-zinc-800 mb-4 text-center">
        Add a New Recipe
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Recipe Name"
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="cuisineType"
          type="text"
          value={formData.cuisineType}
          onChange={handleChange}
          placeholder="Cuisine Type"
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="imageUrl"
          type="text"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />

        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Instructions (comma separated)"
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition-colors"
          }`}
        >
          {loading ? "Adding Recipe..." : "Add Recipe"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.includes("added") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};
