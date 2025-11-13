"use client"
import { createContext, useContext, useEffect, useState } from "react"
import { authenticate, new_admin } from "@/lib/requests"
import { clearAdminName, clearToken, getAdminName, getToken, storeAdminName } from "@/app/session"
import { useRouter } from "next/navigation"

interface AuthContextProps {
    admin?: string,
    signIn: (form: any) => Promise<any>
    signUp: (form: any) => Promise<boolean>
    signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState("")

    //check if token already exists
    const router = useRouter()
    useEffect(() => {
        const token = getToken();
        if (token) {
            const name = getAdminName()
            name && setAdmin(name!.toString())
        }
        else {
            router.push("/authentication/login")
        }
    }, [])

    const signIn = async (form: any) => {
        const { email, password } = form
        const login = await authenticate(email, password)
        storeAdminName(email)
        setAdmin(email);
        return login
    }

    const signUp = async (form: any) => {
        const { adminName, organization, address, email, password, passwordConfirmation } = form
        const login = await new_admin(adminName, organization, address, email, password, passwordConfirmation)
        storeAdminName(email)
        setAdmin(email);
        return login
    }
    const signOut = async () => {
        clearAdminName();
        clearToken();
        setAdmin("")
        router.replace("/authentication/login")
    }

    const val: AuthContextProps = {
        admin,
        signIn,
        signUp,
        signOut,
    }
    return (
        <AuthContext.Provider value={val}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("use within context");
    return context;
}
export default AuthProvider;