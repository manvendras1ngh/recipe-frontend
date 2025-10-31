import { Routes, Route } from "react-router-dom";
import { RecipeListingPage } from "./components/RecipeListingPage";
import { Layout } from "./components/Layout";
import { NewRecipeForm } from "./components/NewRecipeForm";
import { Recipe } from "./components/Recipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecipeListingPage />} />
        <Route path="/:id" element={<Recipe />} />
        <Route path="/new" element={<NewRecipeForm />} />
      </Route>
    </Routes>
  );
}

export default App;
