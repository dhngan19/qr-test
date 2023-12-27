import React from 'react'
import { useDebouncyEffect } from 'use-debouncy'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { cn, Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react'


type TDebouncePicker = {
  color: string;
  onChange: (value: string, offset?: number) => void;
  offset?: number;
  inputStyle?: React.CSSProperties
}

export const DebouncedPicker = ({ color, onChange, offset, inputStyle }: TDebouncePicker) => {
  const [value, setValue] = React.useState({color, offset});

  // call setValue to trigger debounce effect
  useDebouncyEffect(() => onChange(value.color, value.offset), 300, [value.color]);

  return (
    <div className='flex gap-0 w-full'>
      <HexColorInput
        className={cn(
          "px-3 min-h-unit-12 h-5 py-2 text-small",
          "tap-highlight-transparent shadow-sm border-medium border-default-200 rounded-md",
          "hover:border-default-400 group-data-[focus=true]:border-default-foreground",
          "transition-background !duration-150 transition-colors motion-reduce:transition-none",
          "rounded-r-none border-r-0"
        )}
        style={inputStyle}
        color={value.color}
        onChange={newColor => setValue({...value, color: newColor})}
      />
      <Popover placement="bottom" className='basis-full flex-grow'>
        <PopoverTrigger>
          <Button style={{ backgroundColor: value.color, borderColor: value.color }} className="rounded-md min-w-0 w-full rounded-l-none" size="lg" />
        </PopoverTrigger>
        <PopoverContent>
          <HexColorPicker color={value.color} onChange={(newColor) => setValue({...value, color: newColor})} />
        </PopoverContent>
      </Popover>
    </div>
  )
}