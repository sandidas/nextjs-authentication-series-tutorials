"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../button/Button";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

interface IUserRegister {
  password: string;
  token: string;
}
const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verify = searchParams.get("verified");
  const router = useRouter();

  // console.log("token", token);
  // console.log("verify", verify);

  useEffect(() => {
    if (!token || verify !== "true") {
      router.push("/");
    }
  }, [token, verify, router]);

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
      token: "",
    },
  });

  const handleSubmitForm = async (data: IUserRegister) => {
    try {
      data.token = token as string;
      const response = await axios.post("/api/users/reset-password", data);

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
          RESET NOW
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
