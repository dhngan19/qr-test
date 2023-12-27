'use client'
import React from 'react'
// import { useAnimate, useMotionValue, stagger, AnimationSequence, DOMKeyframesDefinition } from "framer-motion"
import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react"
import {useRouter} from 'next/navigation'
import { PressEvent } from '@react-types/shared'

import { constants } from '@/helpers'
import { useQrStyle } from '@/helpers/hooks/useQR'

const qrTypeList = constants.QR_TYPES

export default function ListQrCard({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const [_, setQrOption] = useQrStyle()  

  const onCardPress = (e: PressEvent, id: string) => {  
    let validQrType = qrTypeList.filter(qrType => qrType.id === id)
    if ( validQrType && validQrType.length > 0 ) {
      setQrOption({
        qrType: id
      })
      router.push(`/qr/${id}`)
    }
  }

  return (
    <Card className='bg-background-200 rad-shadow mt-10'>
      <CardHeader className="justify-center">
        <h1>Please select a QR type</h1>
      </CardHeader>
      <CardBody>
        <div className="gap-2 grid grid-cols-2 lg:grid-cols-6">
          {qrTypeList.map((item) => (
            <Card shadow="sm" key={item.id} isPressable isHoverable onPress={(e) => onCardPress(e, item.id)}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover m-0 h-[80px]"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="text-small justify-center">
                <b>{item.title}</b>                
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}