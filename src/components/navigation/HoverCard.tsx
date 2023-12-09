"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

const menuItems = [
  {
    title: "Profile",
    linkUri: "/profile",
  },
  {
    title: "Dashboard",
    linkUri: "/dashboard",
  },
];

const HoverCard = () => {
  const [showHoverCard, setShowHoverCard] = useState(false);
  // console.log("showHoverCard", showHoverCard);

  return (
    <div className="relative">
      <button onClick={() => setShowHoverCard((i) => !i)}>
        <Image className="h-10 w-10 rounded-full" src={"https://placehold.co/300x300.png"} alt="U" height={50} width={50} />
      </button>

      {showHoverCard && (
        <div className="absolute right-5 top-10 z-50 bg-slate-700 w-64 flex flex-col rounded-xl shadow-xl">
          {menuItems?.map((item, index) => (
            <Link className="px-5 py-3 rounded-xl w-full text-white font-medium text-xl hover:bg-red-600 uppercase" href={item?.linkUri} key={index}>
              {item?.title}
            </Link>
          ))}

          <button onClick={() => signOut()} className="px-5 py-3 rounded-xl text-left w-full text-white font-medium text-xl hover:bg-red-600 uppercase">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default HoverCard;
