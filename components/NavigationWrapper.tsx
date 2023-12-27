'use client'

import { useRouter as nRouter } from 'next/router'
import { usePathname, useRouter } from "next/navigation"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Button } from "@nextui-org/button"
import { useQrStyle } from '@/helpers/hooks/useQR';

export default function NavigationWrapper() {
    const pathname = usePathname()
    const router = useRouter()
    const [qrOptions] = useQrStyle()

    let pathLabel, pageTitle
    if (pathname === "/qr/customize") {
        pathLabel = "Styling Your QR"
        pageTitle = "Customize QR"
    } else {
        pathLabel = "Content - " + pathname.replace("/qr/", "")
        pageTitle = "Enter Your Content"
    }    
    // console.log(pathname)
    return (
        <div className="my-10">
            <Breadcrumbs className="not-prose" size="lg" variant="solid" underline="hover">
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem href="#" isDisabled>Type</BreadcrumbItem>
                {pathname === "/qr/customize" && (                    
                    <BreadcrumbItem href={`/qr/${qrOptions?.qrType || '#'}`}>Content</BreadcrumbItem>                    
                )}
                
                <BreadcrumbItem href={pathname}>{pathLabel}</BreadcrumbItem>
            </Breadcrumbs>

            <div className="grid grid-cols-3 items-center my-10">
                <div className="">
                    <Button size="lg" color="primary" variant="shadow" onClick={() => router.back()}>Back</Button>
                </div>
                <div className="text-center">
                    <h1 className="font-bold">{pageTitle}</h1>
                </div>
                <div className=""></div>
            </div>

        </div>
    )
}
