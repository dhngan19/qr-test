'use client'
import { RadioGroup, Card, CardBody } from "@nextui-org/react";
import { frames } from "./FramesSVG";
import { useQrLib } from "@/helpers/hooks/useQR";
import { QrOptions } from "@/helpers/constants";
// import { useClientRenderToString } from "@/helpers/hooks/useClientRenderToString";
import { clientRenderToString } from "@/helpers/hooks/clientRenderToString";
import React from "react";

import CustomRadio from "@/components/Custom/CustomRadio";

async function extension(svg, options: QrOptions, value, html) {
  if (typeof window !== 'undefined') {
    if (value !== 'default') {
      const {
        options: frameOptions,
      } = frames[value]

      const { width, height } = options;
      const size = Math.min(width, height);
      const border = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      const borderAttributes = {
        "width": size,
        "height": size,
        "viewBox": frameOptions.viewBox
      }
      Object.keys(borderAttributes).forEach(attribute => {
        border.setAttribute(attribute, borderAttributes[attribute]);
      });

      border.innerHTML = html
      svg.appendChild(border);
    }
  }

}

export default function CustomizeFrames(props) {

  const [qrLib] = useQrLib()

  const [currentFrameValue, setFrameValue] = React.useState<any>()
  const [html, setHtml] = React.useState<any>()

  React.useEffect(() => {
    (async () => {
      if (currentFrameValue && currentFrameValue !== "default") {
        const {
          reactElement
        } = frames[currentFrameValue]

        const html = await clientRenderToString(reactElement())
        setHtml(html)
      }
    })()
  }, [currentFrameValue])

  React.useEffect(() => {
    if (html) {
      qrLib?.applyExtension((svg, options: QrOptions) => extension(svg, options, currentFrameValue, html))

      qrLib.update({
        margin: currentFrameValue !== "default" ? 40 : 10
      })

    }
  }, [html, currentFrameValue])

  const handleFrameSelection = (value: string) => {
    setFrameValue(value)
  }

  return (
    <Card className="rad-shadow">
      <CardBody>
        <RadioGroup
          label="Frames"
          orientation="horizontal"
          onValueChange={handleFrameSelection}
        >
          <CustomRadio key="default" value="default">
            X
          </CustomRadio>
          {Object.entries(frames).map(([key, value]) => {
            return (
              <CustomRadio key={key} value={key}>
                <svg {...value.options} width={100} height={100}>
                  <value.reactElement />
                </svg>
              </CustomRadio>
            )
          })}
        </RadioGroup>
      </CardBody>
    </Card>
  )
}