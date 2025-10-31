import { Outlet } from "react-router-dom";

import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <section>
      <Navbar />

      <div className="p-8">
        <Outlet />
      </div>
    </section>
  );
};
