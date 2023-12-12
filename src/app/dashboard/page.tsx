// "use client";
// import { useSession } from "next-auth/react";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  // const { data: session } = useSession();
  // console.log("session", session);
  return (
    <div>
      DASHBOARD PAGE
      {JSON.stringify(session?.user)}
    </div>
  );
};

export default DashboardPage;
