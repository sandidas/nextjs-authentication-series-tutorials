"use client";
import Image from "next/image";
import React from "react";
import Button from "../button/Button";
import { signIn } from "next-auth/react";

const GithubIcon = "http://localhost:3000/images/icons/github.svg";
const GoogleIcon = "http://localhost:3000/images/icons/google.svg";

const providers = [
  {
    name: "github",
    Icon: GithubIcon,
  },
  {
    name: "google",
    Icon: GoogleIcon,
  },
];
const ProviderLogin = () => {
  const handleSignIn = (provider: string) => {
    // console.log("Calling provider login", provider);
    signIn(provider);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
      {providers?.map((provider, index) => (
        <Button handler={() => handleSignIn(provider?.name)} key={index} className="flex items-center justify-center gap-2" variant="secondary">
          <Image src={provider?.Icon} alt="" height={50} width={50} className="h-8 w-8 p-1 bg-white rounded-full" />
          <h3 className="text-base uppercase">Continue With {provider?.name} </h3>
        </Button>
      ))}
    </div>
  );
};

export default ProviderLogin;
