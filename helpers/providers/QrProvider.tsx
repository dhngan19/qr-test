'use client'
import { Dispatch, SetStateAction, createContext, useState, useEffect } from 'react'

import { DEFAULT_QR_OPTIONS, QrOptions } from "@/helpers/constants"


type QrContextStyle = {
    options: QrOptions;
    setOptions: Dispatch<SetStateAction<QrOptions>>;
}
type QrContextCode = {
    lib: any;
    setLib: Dispatch<SetStateAction<any>>;
}
type QrContext = {
    qrStyle: QrContextStyle;
    qrCode: QrContextCode;
}


export const QrContext = createContext<QrContext>(null)

export default function QrProvider({ children }: { children: React.ReactNode }) {
    const [qrOption, setQrOption] = useState<QrOptions>(DEFAULT_QR_OPTIONS)
    const [qrCode, setQrCode] = useState<any>()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            (async () => {


                
                const QRCodeStylingLib = await require("qr-code-styling")
                const qrLib = new QRCodeStylingLib(qrOption)
                //console.log(qrLib)
                setQrCode(qrLib)

            })()
            
        }
    }, [])

    return (
        <QrContext.Provider value={{
            qrStyle: {
                options: qrOption,
                setOptions: setQrOption
            },
            qrCode: {
                lib: qrCode,
                setLib: setQrCode
            }
        }}>
            {children}
        </QrContext.Provider>
    )
}