'use client'

// import PhoneInput from "react-phone-number-input";
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form'
import 'react-phone-number-input/style.css'
import { Input, InputProps } from "@nextui-org/input";
// import { Button } from "@nextui-org/button"
// import { Image } from "@nextui-org/image";
// import NextImage from "next/image";

import React from "react";
import { fileToUri } from "@/helpers";
import { useFormContext } from "react-hook-form"

import { useRawData } from "@/helpers/providers/RawDataProvider"
import { cn } from '@nextui-org/react';

const inputStyles: InputProps = {
    className: "",
    variant: "faded",
    size: "md",
    color: "primary"
}

type inputName = "lastName" | "firstName" | "mobile" | "work" | "email" | "address" | "website" | "company" | "jobTitle" | "logo"

export type TVcardData = {
    lastName: string;
    firstName: string;
    mobile: string;
    work: string;
    email: string;
    address: string;
    website: string;
    company: string;
    jobTitle: string;
    logo: string;
}

const QR_TYPE = "vcard"
export function VcardPage() {

    const { setQrData } = useRawData()
    const { register, control, formState: { errors } } = useFormContext()
    const [logo, setLogo] = React.useState<string>()

    const [vCardData, setVcardData] = React.useState<TVcardData>({
        lastName: "",
        firstName: "",
        mobile: "",
        work: "",
        email: "",
        address: "",
        website: "",
        company: "",
        jobTitle: "",
        logo: ""
    })

    React.useEffect(() => {
        setQrData({
            type: QR_TYPE,
            raw: JSON.stringify(vCardData)
        })
        setLogo(vCardData.logo)
    }, [vCardData])

    const handleInputChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        inputName: inputName
    ) => {
        let value = ""
        if (inputName === "logo" && e.target.files.length > 0) {
            const logoURI = await fileToUri(e.target.files[0])
            value = logoURI
        }
        else value = e.target.value

        console.log(value)

        setVcardData({
            ...vCardData,
            [inputName]: value
        })
    }

    // const CustomPhoneInput = React.forwardRef((props, ref) => {
    //     return (
    //         <Input
    //             {...props} 
    //             ref={ref}
    //             {...inputStyles}                        
    //             type="tel"
    //             placeholder="Mobile"
    //             {...register("vcardData.mobile", {
    //                 setValueAs: v => v.replace(/[^0-9-]/g, ''),
    //                 minLength: { value: 7, message: 'Invalid phone number length' },
    //                 maxLength: { value: 10, message: 'Invalid length of phone number' },
    //                 onChange: (e) => handleInputChange(e, 'mobile')
    //             })}
    //             isInvalid={(errors.vcardData as any)?.mobile}
    //             errorMessage={(errors.vcardData as any)?.mobile && `${(errors.vcardData as any)?.mobile?.message}`}
    //         />
    //     )
    // })

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col mb-3">
                <span className="min-w-[100px]"><b>Name</b></span>
                <div className="flex gap-3">
                    <Input {...inputStyles}
                        placeholder="Last name"
                        {...register("vcardData.lastName", {
                            required: {
                                value: true, message: 'Last name is required'
                            },
                            onChange: (e) => handleInputChange(e, 'lastName')
                        })}
                        isInvalid={(errors.vcardData as any)?.lastName}
                        errorMessage={(errors.vcardData as any)?.lastName && `${(errors.vcardData as any)?.lastName?.message}`}
                    />
                    <Input {...inputStyles}
                        placeholder="First name"
                        {...register("vcardData.firstName", {
                            required: {
                                value: true, message: 'First name is required'
                            },
                            onChange: (e) => handleInputChange(e, 'firstName')
                        })}
                        isInvalid={(errors.vcardData as any)?.firstName}
                        errorMessage={(errors.vcardData as any)?.firstName && `${(errors.vcardData as any)?.firstName?.message}`}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3 mb-3">
                <span className="min-w-[100px]"><b>Contacts</b> - <i>optional</i></span>
                <div className="flex gap-3">
                    {/* <Input {...inputStyles}                        
                        type="tel"
                        placeholder="Mobile"
                        {...register("vcardData.mobile", {
                            setValueAs: v => v.replace(/[^0-9-]/g, ''),
                            minLength: { value: 7, message: 'Invalid phone number length' },
                            maxLength: { value: 10, message: 'Invalid length of phone number' },
                            onChange: (e) => handleInputChange(e, 'mobile')
                        })}
                        isInvalid={(errors.vcardData as any)?.mobile}
                        errorMessage={(errors.vcardData as any)?.mobile && `${(errors.vcardData as any)?.mobile?.message}`}
                    />
                    <Input {...inputStyles}
                        type="tel"
                        placeholder="Work"
                        {...register("vcardData.work", {
                            setValueAs: v => v.replace(/[^0-9-]/g, ''),
                            minLength: { value: 7, message: 'Invalid phone number length' },
                            maxLength: { value: 10, message: 'Invalid length of phone number' },
                            onChange: (e) => handleInputChange(e, 'work')
                        })}
                        isInvalid={(errors.vcardData as any)?.work}
                        errorMessage={(errors.vcardData as any)?.work && `${(errors.vcardData as any)?.work?.message}`}
                    /> */}

                    <div className="group flex flex-col w-full" data-slot="base" data-filled="true" data-filled-within="true">
                        <div data-slot="main-wrapper" className="h-full">
                            <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 border-medium border-default-200 min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background !duration-150 hover:border-primary focus-within:border-primary transition-colors motion-reduce:transition-none outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2 cursor-text">
                                <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end">
                                    <PhoneInputWithCountry
                                        // as={Input}    
                                        placeholder="Mobile"                     
                                        className={cn(
                                            'not-prose grow',
                                            '[&>input]:w-full [&>input]:font-normal [&>input]:bg-transparent [&>input]:!outline-none [&>input]:placeholder:text-foreground-500 [&>input]:focus-visible:outline-none [&>input]:text-small'
                                        )}
                                        name="vcardData.mobile"
                                        rules={{
                                            onChange: e => handleInputChange(e, 'mobile')
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group flex flex-col w-full" data-slot="base" data-filled="true" data-filled-within="true">
                        <div data-slot="main-wrapper" className="h-full">
                            <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 border-medium border-default-200 min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background !duration-150 hover:border-primary focus-within:border-primary transition-colors motion-reduce:transition-none outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2 cursor-text">
                                <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end">
                                    <PhoneInputWithCountry
                                        // as={Input}  
                                        placeholder="Work"                       
                                        className={cn(
                                            'not-prose grow',
                                            '[&>input]:w-full [&>input]:font-normal [&>input]:bg-transparent [&>input]:!outline-none [&>input]:placeholder:text-foreground-500 [&>input]:focus-visible:outline-none [&>input]:text-small'
                                        )}
                                        name="vcardData.work"
                                        rules={{
                                            onChange: e => handleInputChange(e, 'work')
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                <div className="flex flex-wrap gap-3 grow">
                    <Input {...inputStyles}
                        type="email"
                        placeholder="your@email.com"
                        {...register("vcardData.email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                                message: 'Please enter an valid Email address'
                            },
                            onChange: (e) => handleInputChange(e, 'email')
                        })}
                        isInvalid={(errors.vcardData as any)?.email}
                        errorMessage={(errors.vcardData as any)?.email && `${(errors.vcardData as any)?.email?.message}`}
                    />
                </div>
                <div className="flex gap-3 grow">
                    <Input {...inputStyles}
                        placeholder="Address"
                        {...register("vcardData.address", {
                            onChange: (e) => handleInputChange(e, 'address')
                        })}
                    />
                </div>
                <div className="flex gap-3 grow">
                    <Input {...inputStyles}
                        placeholder="Website"
                        {...register("vcardData.website", {
                            pattern: {
                                value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
                                message: 'Please enter a valid URL, you may missing http or https'
                            },
                            onChange: (e) => handleInputChange(e, 'website')
                        })}
                        isInvalid={(errors.vcardData as any)?.website}
                        errorMessage={(errors.vcardData as any)?.website && `${(errors.vcardData as any)?.website?.message}`}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="min-w-[100px]"><b>Company Infomation</b> - <i>optional</i></span>
                <div className="flex gap-3">
                    <Input {...inputStyles}
                        placeholder="Company Name"
                        {...register("vcardData.company", {
                            onChange: (e) => handleInputChange(e, 'company')
                        })}
                    />
                    <Input {...inputStyles}
                        placeholder="Job Title"
                        {...register("vcardData.jobTitle", {
                            onChange: (e) => handleInputChange(e, 'jobTitle')
                        })}
                    />
                </div>
            </div>

            {/* <div className="flex flex-col gap-3">
                <span className="min-w-[100px]"><b>Logo</b> - <i>optional</i></span>
                <div className="flex gap-3">
                    <div id="dropbox"
                        onDragEnter={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log("drag enter")
                        }}
                        onDragOver={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log("drag over")
                        }}
                        onDrop={async (e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log("drag drop")
                            const dt = e.dataTransfer;
                            const files = dt.files;
                            // handleInputChange(e, 'logo')
                            const logoURI = await fileToUri(files[0])
                            setVcardData({
                                ...vCardData,
                                logo: logoURI
                            })                            
                        }}
                    >
                        <div className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-unit-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2">
                            <div className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5">
                                <input
                                    className="cursor-pointer w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground"
                                    type="file"
                                    multiple={false}
                                    aria-label="logo-upload"
                                    aria-placeholder="logo-upload"
                                    {...register("vcardData.logo", {
                                        onChange: async (e) => await handleInputChange(e, 'logo'),
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    {logo && (
                        <Image
                            className="m-0"
                            as={NextImage}
                            src={logo}
                            width={150}
                            height={150}
                            alt="Logo"
                        />
                    )}
                </div>
            </div> */}

        </div>
    )
}