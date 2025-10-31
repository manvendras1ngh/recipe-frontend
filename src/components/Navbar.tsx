import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="flex justify-between p-6 bg-zinc-200/70 shadow-2xl">
      <h1 className="text-xl text-zinc-600">Recipe Organizer</h1>

      <ul className="flex space-x-4">
        <li>
          <Link to={"/"} className="text-blue-500">
            Recipes
          </Link>
        </li>

        <li>
          <Link to={"/new"} className="text-blue-500">
            Add Recipe
          </Link>
        </li>
      </ul>
    </header>
  );
};
