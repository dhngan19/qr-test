"use client"
import { Tabs, Tab } from "@nextui-org/tabs"
import { Card, CardBody } from "@nextui-org/react"
import FrameIcon from "@/components/Icons/FrameIcon"
import CustomizeFrames from "./CustomizeFrames/CustomizeFrames"
import CustomizeLogo from "./CustomizeLogo/CustomizeLogo"
import CustomizeStyle from "./CustomizeStyle/CustomizeStyle"

const tabs = [
  {
    id: 'custom-frame',
    label: {
      'icon': <FrameIcon />,
      'text': 'Frames'
    },
    Component: CustomizeFrames
  },
  {
    id: 'custom-shape',
    label: {
      'icon': <FrameIcon />,
      'text': 'QR Style'
    },
    Component: CustomizeStyle
  },
  {
    id: 'custom-logo',
    label: {
      'icon': <FrameIcon />,
      'text': 'Logo'
    },
    Component: CustomizeLogo
  }
]

export default async function CustomizeTabs() {
  return (
    <Tabs 
      
      className=""
      color="primary"
      size="lg"
      variant="solid"
      aria-label="Customize tabs" 
      items={tabs}
    >
      
      {(item) => (
        <Tab 
          className="w-full"
          key={item.id} 
          title={
            <div className="flex items-center space-x-2">
              {item.label.icon}
              <span>{item.label.text}</span>
            </div>
          }          
        >
          {<item.Component someProps />}
        </Tab>
      )}

    </Tabs>
  )
}