import React from 'react'
import { useDebouncyEffect } from 'use-debouncy'
import { Input } from '@nextui-org/input'

export const DebouncedPickerV2 = ({ color, onChange, offset }) => {
    const [value, setValue] = React.useState({ color, offset });
    // const [offset, setOffset] = React.useState(offset);

    useDebouncyEffect(() => onChange(value.color, value.offset), 300, [value.color]);

    return (
        <Input
            type="color"
            variant="bordered"
            size="sm"
            classNames={{
                base: "max-w-[200px]",
                inputWrapper: "flex-row items-center cursor-pointer",
                innerWrapper: "block cursor-pointer",
                input: "cursor-pointer h-full",
                label: `cursor-pointer relative w-full h-full origin-bottom group-data-[filled-within=true]:scale-100 text-base group-data-[filled-within=true]:-translate-y-[calc(0%_+_theme(fontSize.tiny)/2_-_8px_-_theme(borderWidth.medium))]`
            }}
            label={value.color}
            // startContent={
            //     <span className="min-w-[70px]"></span>
            // }
            value={value.color}
            onValueChange={color => setValue({color, offset})}
        />
    )
}