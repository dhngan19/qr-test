import InputQrWrapper from "@/components/InputQrWrapper"
import RawDataProvider from "@/helpers/providers/RawDataProvider"


export default function QrTypeLayout(
    {children}: {children: React.ReactNode}
) {    

    
    // const onSubmit = data => console.log(data);

    return (
        <RawDataProvider>            
            <InputQrWrapper>
                {children}
            </InputQrWrapper>            
        </RawDataProvider>
    )
    
}