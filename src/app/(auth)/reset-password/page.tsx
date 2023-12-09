import Card from "@/components/card/Card";

import ResetPassword from "@/components/forms/ResetPassword";

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

      <Card title={"RESET PASSWORD"}>
        <ResetPassword />
      </Card>
    </div>
  );
};

export default RegisterPage;
