// https://nextui.org/docs/components/radio-group#custom-implementation
'use client'

import { useRadio, VisuallyHidden, cn, RadioProps } from "@nextui-org/react";

export default function CustomRadio (props: RadioProps) {
  const {
    Component,
    children,
    //isSelected,
    //description,
    getBaseProps,
    //getWrapperProps,
    getInputProps,
    getLabelProps,
    //getLabelWrapperProps,
    //getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
        "max-w-[100px] max-h-[100px] cursor-pointer border-2 border-default rounded-lg gap-4 p-1",
        "data-[selected=true]:border-primary",
        props.className
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {/* <span {...getWrapperProps()}>
                <span {...getControlProps()} />
            </span> */}
      <div className="flex flex-col">
        {children && <span {...getLabelProps()}>{children}</span>}
        {/* {description && (
                    <span className="text-small text-foreground opacity-70">{description}</span>
                )} */}
      </div>
    </Component>
  );
};