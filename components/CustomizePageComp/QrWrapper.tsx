'use client'
import { useQrLib, useQrStyle } from "@/helpers/hooks/useQR"

import React from 'react'
import QrDownload from "./QrDownload"

export default function QrWrapper() {
    const [qrLib]  = useQrLib()
    const [qrStyle]  = useQrStyle()
    
    const ref = React.useRef<any>()

    React.useEffect(() => {
        if (typeof window !== 'undefined' && qrLib) {            
            qrLib?.append(ref.current)
        }                       
    }, [qrLib])

    

    return (
        <>
            <div className="rounded-xl" ref={ref} />
            <QrDownload qrCode={qrLib} />            
        </>    
    )
}