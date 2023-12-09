import Card from "@/components/card/Card";
import EmailLogin from "@/components/forms/EmailLogin";
import Login from "@/components/forms/Login";
import ProviderLogin from "@/components/forms/ProviderLogin";
import LineBreak from "@/components/linBreak/LineBreak";
import { getServerSession } from "next-auth";

import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

const LoginPage = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div></div>

      <Card title={"LOGIN NOW"}>
        <EmailLogin />
        <LineBreak>Or</LineBreak>
        <ProviderLogin />
        <LineBreak>Or</LineBreak>
        <Login />
        <Link className="text-center hover:underline" href={"/forget"}>
          Forget Password
        </Link>
      </Card>
    </div>
  );
};

export default LoginPage;
