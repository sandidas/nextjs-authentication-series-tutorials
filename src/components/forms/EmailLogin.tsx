"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import { signIn } from "next-auth/react";

interface IUserRegister {
  email: string;
}
const EmailLogin = () => {
  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IUserRegister>({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitForm = async (data: IUserRegister) => {
    // console.log("data: " + JSON.stringify(data));
    try {
      await signIn("email", {
        email: data.email,
      });
    } catch (error: any) {
      console.log("error: " + JSON.stringify(error?.message));
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-5">
        <Input
          type="email"
          label="Email"
          placeholder="hello@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address format",
            },
          })}
          error={errors.email?.message}
        />

        <Button disabled={!isDirty || !isValid} type="submit">
          Login With Email
        </Button>
      </form>
    </div>
  );
};

export default EmailLogin;
