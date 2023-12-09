import React from "react";
import Link from "next/link";
import HoverCard from "./HoverCard";

const menuItems = [
  {
    title: "Home",
    linkUri: "/",
  },
  {
    title: "Register",
    linkUri: "/register",
  },
  {
    title: "Login",
    linkUri: "/login",
  },
];

const PrimaryNavigation = () => {
  return (
    <div className="max-w-screen-2xl px-5 xl:px-10 mx-auto flex items-center justify-between">
      <div className="flex gap-2">
        {menuItems?.map((item, index) => (
          <Link className="px-5 py-3 text-white font-medium text-xl hover:bg-red-600 uppercase" href={item?.linkUri} key={index}>
            {item?.title}
          </Link>
        ))}
      </div>

      <HoverCard />
    </div>
  );
};

export default PrimaryNavigation;
