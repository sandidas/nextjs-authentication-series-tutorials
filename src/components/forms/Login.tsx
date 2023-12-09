"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import { signIn } from "next-auth/react";

interface IUserRegister {
  password: string;
  email: string;
}
const Login = () => {
  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IUserRegister>({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const handleSubmitForm = async (data: IUserRegister) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });
      console.log("Done");
    } catch (error: any) {
      console.log("Error: ", error?.message);
    }

    // console.log("data: " + JSON.stringify(data));
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

        <Input
          type="password"
          label="Password"
          placeholder="*****"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          })}
          error={errors.password?.message}
        />

        <Button disabled={!isDirty || !isValid} type="submit">
          Login Now
        </Button>
      </form>
    </div>
  );
};

export default Login;
