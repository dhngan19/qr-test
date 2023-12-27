'use client'

import { useQrLib } from "@/helpers/hooks/useQR"
import { Card, CardBody } from "@nextui-org/react"
// import { Input } from "@nextui-org/input"
import { Slider } from "@nextui-org/slider"
import React from "react"

export default function CustomizeLogo() {

    const [qrLib] = useQrLib()

    const handleResizeLogo = (e: number | Array<number>) => {
        console.log(e)
        if (typeof e === 'number' && e <= 0.5 && e >= 0) {
            qrLib?.update({
                imageOptions: {
                    imageSize: e
                }
            })
        }
    }

    return (
        <Card className="rad-shadow">
            <CardBody>
                <input
                    className="file-input file-input-bordered file-input-primary w-full max-w-md"
                    type="file"
                    // onChange={e => onLogoChange(e.target.files || null)} 
                    multiple={false}
                    aria-label="logo-upload"
                    aria-placeholder="logo-upload"
                />
                <div className="mt-4">
                    <Slider
                        label="Logo size"
                        color="primary"
                        hideValue={true}
                        step={0.05}
                        maxValue={0.5}
                        minValue={0.2}
                        defaultValue={0.4}
                        className="max-w-md"
                        onChangeEnd={value => handleResizeLogo(value)}
                    />
                </div>
            </CardBody>
        </Card>
    )
}