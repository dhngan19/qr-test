import QrWrapper from "@/components/CustomizePageComp/QrWrapper"
import CustomizeTabs from "@/components/CustomizePageComp/CustomizeTabs/CustomizeTabs"
import { Card, CardBody } from "@nextui-org/card"


export default function CustomizePage(
    { children }: { children?: React.ReactNode }
) {
    return (
        <>
            <div className="flex flex-col basis-2/3 items-center">
                <CustomizeTabs />
            </div>
            <Card className="basis-1/3">
                <CardBody className="items-center">
                    <QrWrapper />
                </CardBody>                
            </Card>            
        </>
    )
}