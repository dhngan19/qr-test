'use client'

import { Card, CardBody } from "@nextui-org/react"

import BodyPattern from "./BodyPattern"
import QrPattern from "./QrPattern"
import {  QrOptions } from "@/helpers/constants"
import { useQrStyle } from "@/helpers/hooks/useQR";

export enum ColorMode {
    single = 'single',
    gradient = 'gradient'
}

export default function CustomizeStyle() {

    const [qrOptions, setQrOptions] = useQrStyle()        
    
    const updateQr = (options: QrOptions) => {
        setQrOptions(options)
    }

    return (
        <div className="flex flex-col gap-4">
            {/* <BodyPattern qrOptions={qrOptions} updateQr={updateQr} /> */}
            <QrPattern pattern="body" qrOptions={qrOptions} updateQr={updateQr} />

            <div className="grid grid-cols-2 gap-4">
                <QrPattern pattern="eyeBorder" qrOptions={qrOptions} updateQr={updateQr} />
                <QrPattern pattern="eyeDot" qrOptions={qrOptions} updateQr={updateQr} />
            </div>

            <Card className="rad-shadow">
                <CardBody>

                </CardBody>
            </Card>
        </div>
    )
}