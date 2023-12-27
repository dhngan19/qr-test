'use client'
import { useContext } from "react"
import { QrContext } from "@/helpers/providers/QrProvider"
import { QrOptions } from "../constants"
import React from "react"

export const useQrLib = (): [any, React.Dispatch<React.SetStateAction<any>>] => {
    const { qrCode } = useContext(QrContext)
    return [
        qrCode.lib,
        qrCode.setLib
    ]
}

export const useQrStyle = (): [QrOptions, React.Dispatch<React.SetStateAction<QrOptions>>] => {    
    const { qrStyle } = useContext(QrContext)    
    const [qrLib] = useQrLib()

    const [options, setOptions] = React.useState<QrOptions>(qrStyle.options)

    React.useEffect(() => {
        if (options) qrStyle.setOptions(options)
    }, [options])

    React.useEffect(() => {
        console.log('run useQrStyle')
        qrLib?.update(qrStyle.options)
    }, [qrStyle.options])

    return [ options, setOptions ]
} 