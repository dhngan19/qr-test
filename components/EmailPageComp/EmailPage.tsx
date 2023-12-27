'use client'

import { Input, Textarea } from "@nextui-org/react"
import { useFormContext } from "react-hook-form"

import { useRawData } from "@/helpers/providers/RawDataProvider"
import { useEffect, useState } from "react"


type TEmailData = {
    email: string;
    subject: string;
    body: string;
}

const QR_TYPE = 'email'
export function EmailPage() {

    const { setQrData } = useRawData()
    const { register, formState: {errors} } = useFormContext()

    const [emailData, setEmailData] = useState<TEmailData>({
        email: "",
        subject: "",
        body: ""
    })

    useEffect(() => {
        // console.log(wifiData)
        setQrData({
            type: QR_TYPE,
            raw: `MATMSG:TO:${emailData.email};SUB:${emailData.subject};Body:${emailData.body};;`
        })
    }, [emailData])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        inputName: string
    ) => {        
        setEmailData({
            ...emailData,
            [inputName]: e.target.value
        })
    }

    return (
        <>
            <Input
                className="max-w-md my-5"
                type="email"                
                label="Your Email"
                labelPlacement="outside"
                variant="faded"
                size="lg"
                color="primary"
                placeholder="example@mail.com"                                
                {...register("emailData.email", {
                    required: {
                        value: true, message: 'An Email is required'
                    }, 
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                        message: 'Please enter an valid Email address'
                    },                   
                    onChange: (e) => handleInputChange(e, 'email')
                })}
                isInvalid={(errors.emailData as any)?.email}
                errorMessage={(errors.emailData as any)?.email && `${(errors.emailData as any)?.email?.message}`}
            />
            <Input
                className="max-w-md mb-5"
                type="text"
                label="Subject"
                labelPlacement="outside"
                variant="faded"
                size="lg"
                color="primary"
                placeholder=" "                
                {...register("emailData.subject", {                                        
                    onChange: (e) => handleInputChange(e, 'subject')
                })}
                isInvalid={(errors.emailData as any)?.subject}
                errorMessage={(errors.emailData as any)?.subject && `${(errors.emailData as any)?.subject?.message}`}
            />
            <Textarea 
                className="max-w-md mb-5"
                label="Message"
                labelPlacement="outside"
                variant="faded"
                color="primary"
                size="lg"   
                {...register("emailData.body", {                                        
                    onChange: (e) => handleInputChange(e, 'body')
                })}
                isInvalid={(errors.emailData as any)?.body}
                errorMessage={(errors.emailData as any)?.body && `${(errors.emailData as any)?.body?.message}`}             
            />
        </>
    )
}