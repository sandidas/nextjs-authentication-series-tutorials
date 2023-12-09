import Card from "@/components/card/Card";
import EmailLogin from "@/components/forms/EmailLogin";
import ProviderLogin from "@/components/forms/ProviderLogin";
import Register from "@/components/forms/Register";
import LineBreak from "@/components/linBreak/LineBreak";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

const RegisterPage = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div></div>

      <Card title={"REGISTER NOW"}>
        <ProviderLogin />
        <LineBreak>Or</LineBreak>
        <Register />
        <LineBreak>Or</LineBreak>
        <EmailLogin />
      </Card>
    </div>
  );
};

export default RegisterPage;
