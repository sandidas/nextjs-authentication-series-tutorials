"use client"
import React from 'react';
import { useSession } from "next-auth/react";

const CheckSession = () => {

const { data: session } = useSession();
console.log("session", session);

    return (
        <div>
            
        </div>
    );
};

export default CheckSession;