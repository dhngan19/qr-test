import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react"
import typography from "@tailwindcss/typography"

const brand = {
  'hue': 27,
  'saturation': '87%',
  'lightness': '67%',  
}

const schemes = {
  '--brand-light': `hsl(${brand.hue} ${brand.saturation} ${brand.lightness})`,
  '--text1-light': `hsl(${brand.hue} ${brand.saturation} 10%)`,
  '--text2-light': `hsl(${brand.hue} 30% 30%)`,
  '--surface1-light': `hsl(${brand.hue} 25% 90%)`,
  '--surface2-light': `hsl(${brand.hue} 20% 99%)`,
  '--surface3-light': `hsl(${brand.hue} 20% 92%)`,
  '--surface4-light': `hsl(${brand.hue} 20% 85%)`,
  '--surface-shadow-light': `hsl(${brand.hue} 10% 20%)`,
  '--shadow-strength-light': `.02`
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    // screens: {
    //   'mobile': '425px',
    //   'tablet': '640px',
    //   // => @media (min-width: 640px) { ... }

    //   'laptop': '1024px',
    //   // => @media (min-width: 1024px) { ... }

    //   'desktop': '1280px',
    //   // => @media (min-width: 1280px) { ... }      
    // },
  },
  plugins: [nextui({
    prefix: 'qrgen',
    addCommonColors: false,
    themes: {      
      light: {
        colors: {
          background: {
            DEFAULT: schemes['--surface1-light'],
            100: schemes['--surface1-light'],
            200: schemes['--surface2-light'],
            300: schemes['--surface3-light'],
            400: schemes['--surface4-light']
          },          
          divider: schemes['--brand-light'],
          primary: {
            DEFAULT: schemes['--brand-light']
          }
        }       
      },      
    }
  }),
  typography
  ],
}
export default config
