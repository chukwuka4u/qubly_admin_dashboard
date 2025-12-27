"use client"
import { useAuth } from "@/context/auth-context";
import React from "react";

const SignOut = () => {
    const { signOut } = useAuth();
    React.useEffect(() => {
        (async function () {
            await signOut()
        })()
    }, [])
    return (
        <div>Loging Out...</div>
    )
}

export default SignOut;