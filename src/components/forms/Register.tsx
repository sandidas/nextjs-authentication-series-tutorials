"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import axios from "axios";

interface IUserRegister {
  name: string;
  password: string;
  email: string;
}
const Register = () => {
  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IUserRegister>({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const handleSubmitForm = async (data: IUserRegister) => {
    try {
      const response = await axios.post("/api/users/register", data);

      console.log("response", response);
    } catch (error: any) {
      console.log("error", error?.message);
    }

    // console.log("data: " + JSON.stringify(data));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-5">
        <Input
          type="text"
          label="Your Full Name"
          placeholder="Sandipan Das"
          {...register("name", {
            required: "Name is required",
          })}
          error={errors.name?.message}
        />

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
          Register Now
        </Button>
      </form>
    </div>
  );
};

export default Register;
