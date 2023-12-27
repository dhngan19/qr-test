'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { Input } from "@nextui-org/input"
import { Select, SelectItem } from "@nextui-org/select"
import { useFormContext } from "react-hook-form"

import { useRawData } from "@/helpers/providers/RawDataProvider"

const QR_TYPE = "wifi"
const Encryptions = [
    {
        id: 'wpa',
        value: 'wpa',
        label: 'WPA'
    },
    {
        id: 'wep',
        value: 'wep',
        label: 'WEP'
    },
    {
        id: 'none',
        value: 'none',
        label: 'NONE'
    }
]

type TWifiData = {
    ssid: string;
    encryption: string;
    password: string;
}

export function WifiPage() {

    const { setQrData } = useRawData()
    const { register, formState: {errors} } = useFormContext()

    const [encryption, setEncryption] = useState<string>("wpa")

    const [wifiData, setWifiData] = useState<TWifiData>({
        ssid: "",
        encryption: encryption,
        password: ""
    })

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        inputName: string
    ) => {        
        setWifiData({
            ...wifiData,
            [inputName]: e.target.value
        })        
        console.log(inputName)
        console.log(e.target.value)
        if (inputName === "encryption") {
            setEncryption(e.target.value)
        }
    }

    useEffect(() => {
        // console.log(wifiData)
        setQrData({
            type: QR_TYPE,
            raw: `WIFI:S:${wifiData.ssid};T:${wifiData.encryption.toUpperCase()};P:${wifiData.password};H:true;;`
        })
    }, [wifiData])

    return (
        <>
            <Input
                className="max-w-md my-5"
                label="Wifi name (SSID)"                
                color="primary"
                variant="faded"
                size="md"                               
                {...register("wifiData.ssid", {
                    required: {
                        value: true, message: 'SSID is required'
                    },                    
                    onChange: (e) => handleInputChange(e, 'ssid')
                })}                
                isInvalid={(errors.wifiData as any)?.ssid}
                errorMessage={(errors.wifiData as any)?.ssid && `${(errors.wifiData as any)?.ssid?.message}`}
            />
            <Select 
                className="max-w-md mb-5"
                label="Encryption types" 
                color="primary"
                variant="faded"
                size="md"                               
                listboxProps={{
                    className: "not-prose"
                }}
                selectedKeys={[encryption]}
                {...register("wifiData.encryption", {
                    required: {
                        value: true, message: 'Please select one of encryption methods'
                    },
                    onChange: (e) => handleInputChange(e, 'encryption')
                })}    
                isInvalid={(errors.wifiData as any)?.encryption}
                errorMessage={(errors.wifiData as any)?.encryption && `${(errors.wifiData as any)?.encryption?.message}`}          
            >
                {Encryptions.map(mode => (
                    <SelectItem key={mode.id} value={mode.value}>{mode.label}</SelectItem>
                ))}
            </Select>
            {encryption !== 'none' && (
                <Input 
                    className="max-w-md mb-5"
                    label="Password"                
                    color="primary"
                    variant="faded"
                    size="md"
                    {...register("wifiData.password", {
                        required: {
                            value: true, message: "Choose Encryption to None if your wifi don't have password"
                        },                    
                        onChange: (e) => handleInputChange(e, 'password')
                    })}                
                    isInvalid={(errors.wifiData as any)?.password}
                    errorMessage={(errors.wifiData as any)?.password && `${(errors.wifiData as any)?.password?.message}`}
                />
            )}

        </>
    )
}