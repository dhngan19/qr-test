import EyeBorderSquare from "@/components/Icons/eye_border_square.svg"
import EyeBorderRounded from "@/components/Icons/eye_border_rounded.svg"
import EyeBorderCircle from "@/components/Icons/eye_border_circle.svg"

import EyeDotSquare from "@/components/Icons/eye_dot_square.svg"
import EyeDotCircle from "@/components/Icons/eye_dot_circle.svg"

import NotSelect from "@/components/Icons/not-allowed.svg"

export const EYE_BORDER = [
    {
        id: 'not_selected',
        name: 'Not Select',
        value: 'not_selected',
        image: NotSelect
    },
    {
        id: 'eye_border_square',
        name: 'Eye Border Square',
        value: 'square',       
        image: EyeBorderSquare
    },
    {
        id: 'eye_border_rounded',
        name: 'Eye Border Rounded',
        value: 'extra-rounded',
        image: EyeBorderRounded
    },
    {
        id: 'eye_border_circle',
        name: 'Eye Border Circle',
        value: 'dot',
        image: EyeBorderCircle
    },
]

export const EYE_DOT = [
    {
        id: 'not_selected',
        name: 'Not Select',
        value: 'not_selected',
        image: NotSelect
    },
    {
        id: 'eye_square',
        name: 'Eye Square',
        value: 'square', 
        image: EyeDotSquare
    },
    {
        id: 'eye_dot',
        name: 'Eye Dot',
        value: 'dot',
        image: EyeDotCircle
    },
]