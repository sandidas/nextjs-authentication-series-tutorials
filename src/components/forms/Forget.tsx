"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import axios from "axios";

interface IUserRegister {
  email: string;
}
const Forget = () => {
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
    try {
      const response = await axios.post("/api/users/forget", data);
      console.log("response", response);
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

        <Button disabled={!isDirty || !isValid} type="submit">
          Send A Request
        </Button>
      </form>
    </div>
  );
};

export default Forget;
