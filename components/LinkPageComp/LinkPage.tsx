'use client'

import React from "react"
import Image from "next/image"

import { Input } from "@nextui-org/input"
import { useFormContext } from "react-hook-form"

import UrlIcon from '@/components/Icons/hyperlink.svg'
import { useRawData } from "@/helpers/providers/RawDataProvider"


const QR_TYPE = "url"
export default function LinkPage() {

    const {setQrData} = useRawData()
    const { register, formState: {errors} } = useFormContext()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {                        
        setQrData({
            type: QR_TYPE,
            raw: e.target.value
        })      
    }

    return (
        <Input
            type="url"            
            className="max-w-md my-5"
            inputMode="url"
            variant="faded"
            size="lg"
            placeholder="https://example.site"
            startContent={
                <div className="pointer-events-none flex items-center">                    
                    <Image src={UrlIcon} alt="url-qr"/>
                </div>
            }
            {...register("urlData", {
                required: {
                    value: true, message: 'This field is required'
                },
                pattern: {
                    value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                    message: 'Please enter a valid URL'
                },
                onChange: handleInputChange
            })}
            isInvalid={Object.keys(errors).length > 0}
            errorMessage={Object.keys(errors).length > 0 && `${errors.urlData.message}`}
        />
    )
}