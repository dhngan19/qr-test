'use client'

import { Card, CardBody, CardFooter, Button } from "@nextui-org/react"

import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form";

import { useRawData } from "@/helpers/providers/RawDataProvider"
import { useQrStyle } from "@/helpers/hooks/useQR"
import { convertToVcard } from "@/helpers";


export default function InputQrWrapper(
    { children }:
        { children?: React.ReactNode }
) {
    const [qrOptions, setQrOptions] = useQrStyle()
    const methods = useForm();
    const router = useRouter()
    const { qrData } = useRawData()

    const onSubmit = (data: unknown) => {
        console.log(qrData)
        if (qrData) {
            try {
                
                // const rawData = qrData.type !== "vcard" ? data : JSON.parse(data as string)
                let data = "" 
                if (qrData.type === 'vcard') {
                    const rawData = JSON.parse(qrData.raw)
                    data = convertToVcard(rawData)
                }
                else {
                    data = qrData.raw
                }

                console.log(data)
                setQrOptions({
                    qrType: qrData.type,
                    rawData: data,
                    data: data
                })

                router.push("/qr/customize")
            } catch (e) {
                console.error(e)
            }                        
        }
        console.log(data)
    }

    return (
        <FormProvider {...methods} >
            <Card className="rad-shadow">
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <CardBody>

                        {children}

                    </CardBody>
                    <CardFooter className="justify-center">
                        <Button
                            className="max-w-md my-5"
                            size="lg"
                            color="primary"
                            variant="shadow"
                            //isDisabled={!methods.formState.isValid}
                            type="submit"
                        >
                            Customize QR Style
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </FormProvider>
    )

}