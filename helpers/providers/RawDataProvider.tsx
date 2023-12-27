'use client'

import { Dispatch, SetStateAction, createContext, useState, useContext } from 'react'

type TDrawDataContext = {    
    qrData: TQrData;
    setQrData: Dispatch<SetStateAction<TQrData>>;
}

export type QrType = "text" | "url" | "wifi" | "email" | "sms" | "vcard"

export type TQrData = {
    type?: QrType,
    raw?: string
}

const DrawDataContext = createContext<TDrawDataContext>(null)

export function useRawData() {
    return useContext(DrawDataContext)
}

export default function RawDataProvider({children}: {children: React.ReactNode}) {

    const [qrData, setQrData] = useState<TQrData>()

    return (
        <DrawDataContext.Provider value={{
            qrData,
            setQrData
        }}>
            {children}
        </DrawDataContext.Provider>
    )
}