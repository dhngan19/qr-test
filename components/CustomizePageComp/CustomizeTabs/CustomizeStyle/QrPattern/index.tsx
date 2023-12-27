import { Card, CardBody, RadioGroup, Tooltip, Image, CardFooter, Radio, Input, Select, SelectItem } from "@nextui-org/react";
import NextImage from "next/image"
import { useCallback, useState } from "react";
import type { Gradient, CornerSquareType, GradientType } from "qr-code-styling";

import { ColorMode } from '../CustomizeStyle'
import CustomRadio from "@/components/Custom/CustomRadio";
import { EYE_BORDER, EYE_DOT, BODY_PATTERN, QrOptions } from "@/helpers/constants";
import { DebouncedPicker } from "@/components/Custom/DebounceColorPicker";


const PATTERN = {
    "body": {
        key: "dotsOptions",
        items: BODY_PATTERN,
        label: "Body Pattern",
        layoutClass: "flex w-full gap-3",
        childClass: "flex w-full gap-3"
    },
    "eyeBorder": {
        key: "cornersSquareOptions",
        items: EYE_BORDER,
        label: "Eye Border",
        layoutClass: "flex flex-row flex-wrap gap-3",
        childClass: "grid grid-cols-2 gap-2 w-full"
    },
    "eyeDot": {
        key: "cornersDotOptions",
        items: EYE_DOT,
        label: "Eye Dot",
        layoutClass: "flex flex-row flex-wrap gap-3",
        childClass: "grid grid-cols-2 gap-2 w-full"
    }
}

export default function QrPattern({
    pattern,
    qrOptions,
    updateQr
}: {
    pattern: "eyeBorder" | "eyeDot" | "body";
    qrOptions: QrOptions;
    updateQr: (options: QrOptions) => void;
}) {

    const eyeKey = PATTERN[pattern].key
    const patternItems = PATTERN[pattern].items

    const [eyeBorderPattern, setEyeBorderPattern] = useState(qrOptions[eyeKey]?.type || "not_selected")
    const [eyeBorderColorMode, setEyeBorderColorMode] = useState<ColorMode>(
        qrOptions[eyeKey]?.color ?
            ColorMode.single :
            ColorMode.gradient
    )
    const [eyeBorderColor, setEyeBorderColor] = useState<string>(
        qrOptions[eyeKey]?.color
    )
    const [eyeBorderGradient, setEyeBorderGradient] = useState<Gradient>({
        type: 'linear',
        rotation: 0,
        colorStops: [{ offset: 0, color: '#222222' }, { offset: 1, color: '#77779C' }]
    })

    const handleEyeBorderPatternChange = useCallback((value: CornerSquareType | "not_selected") => {
        let type = value !== "not_selected" ? value : undefined
        // console.log(qrOptions.cornersSquareOptions)
        updateQr({
            [eyeKey]: {
                ...qrOptions[eyeKey],
                type: type
            }
        })
        setEyeBorderPattern(type)
    }, [eyeBorderPattern, qrOptions[eyeKey]])

    const handleEyeBorderColorModeChange = useCallback((newMode: ColorMode) => {
        const newEyeBorderColorMode = {
            type: qrOptions[eyeKey]?.type
        }
        if (newMode === ColorMode.single) {
            newEyeBorderColorMode['color'] = eyeBorderColor
            newEyeBorderColorMode['gradient'] = undefined
        } else {
            newEyeBorderColorMode['color'] = undefined
            newEyeBorderColorMode['gradient'] = eyeBorderGradient
        }

        updateQr({
            [eyeKey]: newEyeBorderColorMode
        })
        setEyeBorderColorMode(newMode)
    }, [eyeBorderColorMode, qrOptions[eyeKey]])

    const handleEyeBorderColor = useCallback((newColor: string) => {
        if (newColor) {            
            updateQr({
                [eyeKey]: {
                    ...qrOptions[eyeKey],
                    color: newColor
                }
            })
            setEyeBorderColor(newColor)
        }
    }, [eyeBorderColor, qrOptions[eyeKey]])

    const handleEyeBorderGradientChange = useCallback((newColor, offset: number) => {
        if (eyeBorderColorMode === ColorMode.gradient) {
            const currentEyeBorderOptions = Object.assign({}, qrOptions[eyeKey])
            if (currentEyeBorderOptions) {
                // currentDotOptions.color = undefined
                currentEyeBorderOptions.gradient.colorStops[offset].color = newColor

                updateQr({                    
                    [eyeKey]: currentEyeBorderOptions
                })

                setEyeBorderGradient(currentEyeBorderOptions.gradient)
            }
            console.log()
        }
    }, [qrOptions[eyeKey]])

    const handleEyeBorderGradientRotationChange = useCallback((newRotation) => {
        const newBodyGradient = {
            ...eyeBorderGradient,
            rotation: Number(newRotation)
        }
        setEyeBorderGradient(newBodyGradient)
        updateQr({
            [eyeKey]: {
                ...qrOptions[eyeKey],
                gradient: newBodyGradient
            }
        })
    }, [eyeBorderGradient.rotation, qrOptions[eyeKey]])

    const handleEyeBorderGradientTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newGradientType = e.target.value as GradientType
        const newBodyGradient = {
            ...eyeBorderGradient,
            type: newGradientType
        }
        setEyeBorderGradient(newBodyGradient)
        updateQr({
            [eyeKey]: {
                ...qrOptions[eyeKey],
                gradient: newBodyGradient
            }
        })
    }, [eyeBorderGradient.type, qrOptions[eyeKey]])

    return (
        <Card className="rad-shadow">
            <CardBody>
                <RadioGroup
                    label={PATTERN[pattern].label}
                    orientation="horizontal"
                    value={eyeBorderPattern}
                    onValueChange={handleEyeBorderPatternChange}
                >
                    {patternItems.map(p => (
                        <CustomRadio key={p.id} value={p.value} className="not-prose">
                            <Tooltip placement="bottom" content={p.name} color="primary" shadow="sm">
                                <Image
                                    as={NextImage}
                                    className="opacity-1"
                                    loading="lazy"
                                    src={p.image}
                                    alt={p.name}
                                // isZoomed
                                />
                            </Tooltip>
                        </CustomRadio>
                    ))}
                </RadioGroup>
            </CardBody>
            <CardFooter>
                <div className="flex flex-col gap-4 w-full">
                    <RadioGroup
                        label="Choose your favorite color"
                        orientation="horizontal"
                        value={eyeBorderColorMode}
                        onValueChange={handleEyeBorderColorModeChange}
                    >
                        <Radio value="single">Single</Radio>
                        <Radio value="gradient">Gradient</Radio>
                    </RadioGroup>
                    {eyeBorderColorMode === ColorMode.single && (
                        <div className="max-w-xs">
                            <DebouncedPicker color={eyeBorderColor} onChange={handleEyeBorderColor} />
                        </div>
                    )}
                    {eyeBorderColorMode === ColorMode.gradient && (
                        <div className={PATTERN[pattern].layoutClass}>
                            <div className={PATTERN[pattern].childClass}>
                                <DebouncedPicker
                                    inputStyle={{ maxWidth: 100 }}
                                    offset={0}
                                    color={eyeBorderGradient?.colorStops[0].color}
                                    onChange={handleEyeBorderGradientChange}
                                />
                                <DebouncedPicker
                                    inputStyle={{ maxWidth: 100 }}
                                    offset={1}
                                    color={eyeBorderGradient?.colorStops[1].color}
                                    onChange={handleEyeBorderGradientChange}
                                />
                            </div>

                            <div className={PATTERN[pattern].childClass}>
                                <Input
                                    type="number"
                                    inputMode="numeric"
                                    label="Rotation"
                                    labelPlacement="inside"
                                    variant="bordered"
                                    size="sm"
                                    value={eyeBorderGradient?.rotation?.toString() || "0"}
                                    onValueChange={handleEyeBorderGradientRotationChange}
                                />
                                <Select
                                    className="w-full"
                                    label="Gradient Type"
                                    size="sm"
                                    variant="bordered"
                                    selectedKeys={[eyeBorderGradient.type]}
                                    onChange={handleEyeBorderGradientTypeChange}
                                >
                                    {["linear", "radial"].map(gt => (
                                        <SelectItem key={gt} value={gt}>
                                            {gt}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    )
}