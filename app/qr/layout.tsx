import React from 'react'
import NavigationWrapper from "@/components/NavigationWrapper"
import QrProvider from '../../helpers/providers/QrProvider'

export default function QrPage(
    { children }: { children: React.ReactNode }
) {     
    return (
        <>
            <NavigationWrapper />
            {children}
        </>
    )
}