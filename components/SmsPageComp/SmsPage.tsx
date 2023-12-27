'use client'

import { useRawData } from "@/helpers/providers/RawDataProvider";
import { Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";


type TSmsData = {
    phone: string;
    body: string;
}

const QR_TYPE = 'sms'
export function SmsPage() {

    const { setQrData } = useRawData()
    const { register, formState: {errors} } = useFormContext()

    const [smsData, setSmsData] = useState<TSmsData>({
        phone: "",
        body: ""
    })

    useEffect(() => {
        setQrData({
            type: QR_TYPE,
            raw: `SMSTO:${smsData.phone}:${smsData.body}`
        })
    }, [smsData])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        inputName: string
    ) => {        
        setSmsData({
            ...smsData,
            [inputName]: e.target.value
        })
    }

    return (
        <>
            <Input 
                className="max-w-md my-5"     
                type="tel"        
                label="Phone number"
                labelPlacement="outside"
                variant="faded"
                size="lg"
                color="primary"
                placeholder="090xxxxxx"       
                {...register("smsData.phone", {
                    required: {
                        value: true, message: 'A Phone number is required'
                    }, 
                    setValueAs: v => v.replace(/[^0-9-]/g, ''),                    
                    minLength: { value: 7, message: 'Invalid phone number length' },              
                    maxLength: { value: 10, message: 'Invalid length of phone number' },
                    onChange: (e) => handleInputChange(e, 'phone')
                })}
                isInvalid={(errors.smsData as any)?.phone}
                errorMessage={(errors.smsData as any)?.phone && `${(errors.smsData as any)?.phone?.message}`}         
            />
            <Textarea 
                className="max-w-md mb-5"
                label="Message"
                labelPlacement="outside"
                variant="faded"
                color="primary"
                size="lg"
                {...register("smsData.body", {                                        
                    onChange: (e) => handleInputChange(e, 'body')
                })}
                isInvalid={(errors.smsData as any)?.body}
                errorMessage={(errors.smsData as any)?.body && `${(errors.smsData as any)?.body?.message}`}
            />
        </>
    )
}