'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQrLib } from "@/helpers/hooks/useQR"

export function NavigationEvents() {
    const [qrLib] = useQrLib()
    const router = useRouter()

    useEffect(() => {
        if (!qrLib) {
            console.log("QRLIB WASN'T INITIALIZED")
            router.push("/")
        }        
    }, [qrLib])

    return null
}