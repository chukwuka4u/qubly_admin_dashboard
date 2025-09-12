"use client"
import { createConsumer } from "@rails/actioncable"
import { createContext } from "react"

type Cable = ReturnType<typeof createConsumer>;
type CableContextProp = {
    cable: Cable
}
const CableContext = createContext<CableContextProp | undefined>(undefined)

const CableProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const cableurl = 'ws://localhost:3000/cable'//'wss://queue-api-48vb.onrender.com/cable'
    const val: CableContextProp = {
        cable: createConsumer(cableurl)
    };


    return (
        <CableContext.Provider value={val}>
            {children}
        </CableContext.Provider>
    )
}


export { CableContext, CableProvider };