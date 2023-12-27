'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"
import { Button } from "@nextui-org/button"

import DownloadIcon from "../Icons/DownloadIcon"
import SvgFileIcon from "../Icons/SvgFileIcon"
import PngFileIcon from "../Icons/PngFileIcon"

export default function QrDownload(
    { qrCode }: { qrCode: any }
) {

    const handleDownload = (fType: "svg" | "png") => {
        console.log(`Generate ${fType} download`)
		console.log(qrCode.current)
        qrCode?.download({ name: "qr", extension: fType });
	}

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Button 
                    size="lg" 
                    variant="shadow" 
                    color="primary"
                    className="w-[300px] mt-5"
                    endContent={<DownloadIcon/>}
                >
                    Download
                </Button>
            </DropdownTrigger>   
            <DropdownMenu className="not-prose" aria-label="Download Options" variant="faded" color="primary">
                <DropdownItem key="svg" endContent={<SvgFileIcon />} onPress={(e) => handleDownload("svg")}>
                    SVG
                </DropdownItem>
                <DropdownItem key="png" endContent={<PngFileIcon />} onPress={() => handleDownload("png")}>
                    PNG
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}