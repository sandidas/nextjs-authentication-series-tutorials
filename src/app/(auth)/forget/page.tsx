import Card from "@/components/card/Card";
import Forget from "@/components/forms/Forget";
import React from "react";

const ForgetPasswordPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div></div>

      <Card title={"RESET PASSWORD"}>
        <Forget />
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
