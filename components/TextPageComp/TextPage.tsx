'use client'

import React from "react"
import { Textarea } from "@nextui-org/react"

import { useRawData } from "@/helpers/providers/RawDataProvider"
import { useFormContext } from "react-hook-form"

const QR_TYPE = "text"
export default function TextPageComp() {

    const {setQrData} = useRawData()
    const { register, formState: {errors} } = useFormContext()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {                        
        setQrData({
            type: QR_TYPE,
            raw: e.target.value
        })      
    }

    return (

        <Textarea
            label="Text"
            labelPlacement="outside"
            variant="faded"
            size="lg"
            placeholder="The text that will be shown after scanning the QR code"
            className="max-w-md my-5"                        
            {...register("textData", {
                required: {
                    value: true, message: 'The text field is required'
                },
                onChange: handleInputChange
            })}
            isInvalid={Object.keys(errors).length > 0}
            errorMessage={Object.keys(errors).length > 0 && `${errors.textData.message}`}
        />

    )
}