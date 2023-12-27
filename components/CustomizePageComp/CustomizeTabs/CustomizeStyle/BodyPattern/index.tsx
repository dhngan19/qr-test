import CustomRadio from "@/components/Custom/CustomRadio";
import { DebouncedPicker } from "@/components/Custom/DebounceColorPicker";
import { BODY_PATTERN, QrOptions } from "@/helpers/constants";
import { Card, CardBody, RadioGroup, Tooltip, Image, CardFooter, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import NextImage from "next/image"
import { useCallback, useState } from "react";

import { ColorMode } from '../CustomizeStyle'

import type { DotType, Gradient, GradientType } from "qr-code-styling";

export default function BodyPattern({
    qrOptions,
    updateQr    
}: {
    qrOptions: QrOptions;
    updateQr: (options: QrOptions) => void;
}) {
    
    const [bodyColorMode, setBodyColorMode] = useState<ColorMode>(
        qrOptions?.dotsOptions?.color ?
            ColorMode.single :
            ColorMode.gradient
    )
    const [bodyColor, setBodyColor] = useState<string>(
        qrOptions?.dotsOptions?.color
    )
    const [bodyGradient, setBodyGradient] = useState<Gradient>({
        type: 'linear',
        rotation: 0,
        colorStops: [{ offset: 0, color: '#222222' }, { offset: 1, color: '#77779C' }]
    })

    const handleBodyPatternChange = (value: DotType) => {
        updateQr({
            ...qrOptions,
            dotsOptions: {
                ...qrOptions.dotsOptions,
                type: value
            }
        })
    }

    const handleBodyColorModeChange = (value: ColorMode) => {

        

        const newDotsOptions = {
            type: qrOptions?.dotsOptions?.type
        }
        if (value === ColorMode.single) {
            newDotsOptions['color'] = bodyColor
            newDotsOptions['gradient'] = undefined
        }
        else {
            newDotsOptions['color'] = undefined
            newDotsOptions['gradient'] = bodyGradient
        }

        updateQr({
            ...qrOptions,
            dotsOptions: newDotsOptions
        })
        setBodyColorMode(value)

    }

    const handleBodyColorChange = (color) => {
        if (bodyColorMode === ColorMode.single) {
            const curOptions = Object.assign({}, qrOptions)
            if (Object.keys(curOptions).length > 0) {
                delete curOptions.dotsOptions.gradient
                curOptions.dotsOptions.color = color

                setBodyColor(color)
                updateQr(curOptions)
            }
        }
        // setBodyColor(color)
    }

    const handleBodyGradientChange = (value, offset: number) => {
        if (bodyColorMode === ColorMode.gradient) {
            const currentDotOptions = Object.assign({}, qrOptions?.dotsOptions)
            if (currentDotOptions) {
                // currentDotOptions.color = undefined
                currentDotOptions.gradient.colorStops[offset].color = value

                updateQr({
                    ...qrOptions,
                    dotsOptions: currentDotOptions
                })

                setBodyGradient(currentDotOptions.gradient)
            }
        }
    }

    const handleBodyGradientRotationChange = (newRotation) => {
        const newBodyGradient = {
            ...bodyGradient,
            rotation: Number(newRotation)
        }
        setBodyGradient(newBodyGradient)
        updateQr({
            dotsOptions: {
                ...qrOptions.dotsOptions,
                gradient: newBodyGradient
            }
        })

    }

    const handleBodyGradientType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newGradientType = e.target.value as GradientType
        const newBodyGradient = {
            ...bodyGradient,
            type: newGradientType
        }
        setBodyGradient(newBodyGradient)
        updateQr({
            dotsOptions: {
                ...qrOptions.dotsOptions,
                gradient: newBodyGradient
            }
        })
    }

    return (
        <Card className="rad-shadow">
            {/* <CardHeader>
                    Body parttern
                </CardHeader> */}
            <CardBody>
                <RadioGroup
                    label="Body parttern"
                    orientation="horizontal"
                    value={qrOptions?.dotsOptions?.type}
                    onValueChange={handleBodyPatternChange}
                >
                    {BODY_PATTERN.map(p => (
                        <CustomRadio key={p.id} value={p.value} className="not-prose">
                            <Tooltip placement="bottom" content={p.name} color="primary" shadow="sm">
                                <Image
                                    as={NextImage}
                                    className="opacity-1"
                                    loading="lazy"
                                    src={p.image}
                                    alt={p.name}
                                    isZoomed
                                />
                            </Tooltip>
                        </CustomRadio>
                    ))}
                </RadioGroup>
            </CardBody>
            <CardFooter>
                <div className="flex flex-col gap-4 w-full">
                    <RadioGroup
                        label="Do you prefer a single color or a gradient of colors?"
                        orientation="horizontal"
                        value={bodyColorMode}
                        onValueChange={handleBodyColorModeChange}
                    >
                        <Radio value="single">Single</Radio>
                        <Radio value="gradient">Gradient</Radio>
                    </RadioGroup>
                    {bodyColorMode === ColorMode.single && (
                        <div className="max-w-xs">
                            <DebouncedPicker color={bodyColor} onChange={handleBodyColorChange} />
                        </div>
                    )}
                    {bodyColorMode === ColorMode.gradient && (
                        <div className="grid grid-cols-4 gap-3">
                            <DebouncedPicker
                                inputStyle={{ maxWidth: 100 }}
                                offset={0}
                                color={bodyGradient?.colorStops[0].color}
                                onChange={handleBodyGradientChange}
                            />
                            <DebouncedPicker
                                inputStyle={{ maxWidth: 100 }}
                                offset={1}
                                color={bodyGradient?.colorStops[1].color}
                                onChange={handleBodyGradientChange}
                            />
                            <Input
                                type="number"
                                inputMode="numeric"
                                label="Rotation"
                                labelPlacement="inside"
                                variant="bordered"
                                size="sm"
                                value={bodyGradient?.rotation?.toString() || "0"}
                                onValueChange={handleBodyGradientRotationChange}
                            />
                            <Select
                                className="w-full"
                                label="Gradient Type"
                                size="sm"
                                variant="bordered"
                                selectedKeys={[bodyGradient.type]}
                                onChange={handleBodyGradientType}
                            >
                                {["linear", "radial"].map(gt => (
                                    <SelectItem key={gt} value={gt}>
                                        {gt}
                                    </SelectItem>
                                ))}
                            </Select>

                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}