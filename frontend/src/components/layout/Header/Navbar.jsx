import React from "react";
import useCategory from "../../../hooks/useCategory";
import { Link } from "react-router-dom";
const Navbar = () => {
  const categories = useCategory();
  return (
    <div className="">
      <ul className="flex justify-center flex-wrap gap-8 text-white">
        {categories?.map((c) => (
          <li key={c._id}>
            <Link className="" to={`/category/${c.slug}`}>
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
