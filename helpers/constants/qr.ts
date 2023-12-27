import type { Gradient, Options } from 'qr-code-styling';

export type QrOptions = {
    qrType?: string;
    rawData?: string;
} & Options

export interface IDotsOptions {
    color: string;
    gradient: Gradient;
    type: "square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded";
}

// export type StylingQrOptions = Options

export const DEFAULT_QR_OPTIONS: QrOptions = {
    qrType: 'text',
    rawData: 'http://quick-qr.vn',
    width: 300,
    height: 300,
    type: 'svg',
    data: 'http://quick-qr.vn',
    image: undefined,
    margin: 10,
    qrOptions: { // v: 0 e: H m: byte => max 23648 bits
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 5,
        crossOrigin: 'anonymous',
    },
    dotsOptions: {
        color: '#222222',
        type: 'square' // square, dots, rounded, extra-rounded, classy, classy-rounded
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#222222' }, { offset: 1, color: '#77779C' }]
        // },
    },
    backgroundOptions: {
        color: 'transparent'//'#FFFFFF' //'#5FD4F3',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
    },
    cornersSquareOptions: {
        color: '#222222',
        // type: 'square',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
    },
    cornersDotOptions: {
        color: '#222222',
        // type: 'square',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
    }
}

export const QR_TYPES = [
    {
        id: "text",
        title: "Text",
        img: "/images/fruit-1.jpeg",
    },
    {
        id: "url",
        title: "URL",
        img: "/images/fruit-1.jpeg",
    },
    {
        id: "wifi",
        title: "Wifi",
        img: "/images/fruit-1.jpeg",
    },
    {
        id: "email",
        title: "Email",
        img: "/images/fruit-1.jpeg",
    },
    {
        id: "sms",
        title: "SMS",
        img: "/images/fruit-1.jpeg",
    },
    {
        id: "vcard",
        title: "V-Card",
        img: "/images/fruit-1.jpeg",
    },
]